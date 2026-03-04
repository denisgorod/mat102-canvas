import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const replaceAllLiteral = (text, searchValue, replaceValue) => text.split(searchValue).join(replaceValue);

const extractMathSegments = (markdown) => {
  const segments = [];
  let output = "";

  const pushSegment = (segment) => {
    const token = `@@MATH_${segments.length}@@`;
    segments.push(segment);
    output += token;
  };

  for (let i = 0; i < markdown.length; i += 1) {
    const current = markdown[i];

    if (current !== "$" || markdown[i - 1] === "\\") {
      output += current;
      continue;
    }

    // Display math block $$ ... $$ (can span lines).
    if (markdown[i + 1] === "$") {
      const end = markdown.indexOf("$$", i + 2);

      if (end !== -1) {
        pushSegment(markdown.slice(i, end + 2));
        i = end + 1;
        continue;
      }
    }

    // Inline math $ ... $ (single-line).
    let inlineEnd = -1;

    for (let j = i + 1; j < markdown.length; j += 1) {
      if (markdown[j] === "\n") break;

      if (markdown[j] === "$" && markdown[j - 1] !== "\\" && markdown[j + 1] !== "$") {
        inlineEnd = j;
        break;
      }
    }

    if (inlineEnd !== -1) {
      pushSegment(markdown.slice(i, inlineEnd + 1));
      i = inlineEnd;
      continue;
    }

    output += current;
  }

  return { markdown: output, segments };
};

const restoreMathSegments = (html, segments) => {
  let restored = html;

  segments.forEach((segment, index) => {
    restored = replaceAllLiteral(restored, `@@MATH_${index}@@`, segment);
  });

  return restored;
};

// Custom parser that renders Obsidian-style callouts and preserves LaTeX for MathJax.
const mathParser = async (text) => {
  const calloutTitles = {
    d: "Definition",
    e: "Exercise",
    s: "Statement",
    p: "Proof",
    t: "Theorem",
    note: "Note",
    info: "Info",
    tip: "Tip",
    warning: "Warning",
    example: "Example",
    quote: "Quote"
  };

  const calloutClassMap = {
    d: "definition",
    e: "exercise",
    s: "statement",
    p: "proof",
    t: "theorem"
  };

  const lines = text.split(/\r?\n/);
  const callouts = [];
  const outputLines = [];
  const calloutStartRegex = /^\s*>\s*\[!([^\]]+)\]\s*(.*)$/;
  const quotedLineRegex = /^\s*>\s?(.*)$/;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const calloutMatch = calloutStartRegex.exec(line);

    if (!calloutMatch) {
      outputLines.push(line);
      continue;
    }

    const rawType = calloutMatch[1].trim();
    const typeKey = rawType.replace(/[+-]$/, "").toLowerCase();
    const title = calloutMatch[2]?.trim() ?? "";
    const contentLines = [];

    for (let j = i + 1; j < lines.length; j += 1) {
      const nextLine = lines[j];
      const nestedCalloutMatch = calloutStartRegex.exec(nextLine);
      const quotedMatch = quotedLineRegex.exec(nextLine);

      if (nestedCalloutMatch) {
        break;
      }

      if (quotedMatch) {
        contentLines.push(quotedMatch[1]);
        i = j;
        continue;
      }

      break;
    }

    callouts.push({
      typeKey,
      title,
      content: contentLines.join("\n")
    });

    outputLines.push(`@@CALLOUT_${callouts.length - 1}@@`);
  }

  const rawMarkdown = outputLines.join("\n");
  const { markdown: protectedMarkdown, segments: mathSegments } = extractMathSegments(rawMarkdown);
  let html = await parser(protectedMarkdown);
  html = restoreMathSegments(html, mathSegments);

  const renderedCallouts = await Promise.all(
    callouts.map(async (callout) => {
      const defaultTitle = calloutTitles[callout.typeKey] ?? callout.typeKey;
      const classKey = calloutClassMap[callout.typeKey] ?? callout.typeKey;
      const safeClassKey = classKey.toLowerCase().replace(/[^a-z0-9_-]/g, "") || "note";
      const displayTitle = callout.title || defaultTitle;
      // Parse callout body with this same parser so nested callouts render too.
      const contentHtml = await mathParser(callout.content);

      return `
        <div class="callout callout-${safeClassKey}">
          <div class="callout-title">${displayTitle}</div>
          <div class="callout-content">${contentHtml}</div>
        </div>
      `;
    })
  );

  renderedCallouts.forEach((calloutHtml, index) => {
    const token = `@@CALLOUT_${index}@@`;
    const paragraphTokenRegex = new RegExp(`<p>\\s*${escapeRegex(token)}\\s*</p>`, "g");
    html = html.replace(paragraphTokenRegex, calloutHtml);
    html = html.replace(token, calloutHtml);
  });

  return html;
};

const canvasForViewer = structuredClone(canvasJSON);
const edgeLabels = canvasForViewer.edges
  .filter((edge) => typeof edge.label === "string" && edge.label.trim().length > 0)
  .map((edge) => ({ ...edge, label: edge.label.trim() }));

// Disable built-in canvas labels; we render collision-aware DOM labels instead.
canvasForViewer.edges.forEach((edge) => {
  edge.label = "";
});

const getAnchorCoord = (node, side) => {
  const centerX = node.x + node.width / 2;
  const centerY = node.y + node.height / 2;

  switch (side) {
    case "top":
      return { x: centerX, y: node.y };
    case "bottom":
      return { x: centerX, y: node.y + node.height };
    case "left":
      return { x: node.x, y: centerY };
    case "right":
      return { x: node.x + node.width, y: centerY };
    default:
      return { x: centerX, y: centerY };
  }
};

const getEdgeControlPoints = (from, to, fromSide, toSide) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const magnitude = Math.min(Math.abs(dx), Math.abs(dy)) + 0.3 * Math.max(Math.abs(dx), Math.abs(dy));
  const pull = Math.max(60, Math.min(300, 0.5 * magnitude));

  let cp1x = from.x;
  let cp1y = from.y;
  let cp2x = to.x;
  let cp2y = to.y;

  switch (fromSide) {
    case "top":
      cp1y -= pull;
      break;
    case "bottom":
      cp1y += pull;
      break;
    case "left":
      cp1x -= pull;
      break;
    case "right":
      cp1x += pull;
      break;
    default:
      break;
  }

  switch (toSide) {
    case "top":
      cp2y -= pull;
      break;
    case "bottom":
      cp2y += pull;
      break;
    case "left":
      cp2x -= pull;
      break;
    case "right":
      cp2x += pull;
      break;
    default:
      break;
  }

  return { cp1x, cp1y, cp2x, cp2y };
};

const cubicBezierPoint = (p0, p1, p2, p3, t = 0.5) => {
  const u = 1 - t;
  return (
    (u ** 3) * p0 +
    3 * (u ** 2) * t * p1 +
    3 * u * (t ** 2) * p2 +
    (t ** 3) * p3
  );
};

const edgeLabelColorMap = {
  "0": { bg: "#6b7280", text: "#ffffff" },
  "1": { bg: "#ef4444", text: "#ffffff" },
  "2": { bg: "#f97316", text: "#111827" },
  "3": { bg: "#eab308", text: "#111827" },
  "4": { bg: "#10b981", text: "#ffffff" },
  "5": { bg: "#3b82f6", text: "#ffffff" },
  "6": { bg: "#8b5cf6", text: "#ffffff" }
};

const getEdgeLabelColors = (colorKey) => edgeLabelColorMap[String(colorKey ?? "0")] ?? {
  bg: "rgba(17, 24, 39, 0.86)",
  text: "#ffffff"
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const wrapTextLines = (ctx, text, maxContentWidth) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [text];

  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const word = words[i];
    const candidate = `${currentLine} ${word}`;

    if (ctx.measureText(candidate).width <= maxContentWidth) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  lines.push(currentLine);
  return lines;
};

const canvasRoot = document.getElementById("canvas-root");

// Create viewer
const viewer = new JSONCanvasViewer({
  container: canvasRoot,
  canvas: canvasForViewer,
  parser: mathParser,
  shadowed: false // Keep content in light DOM so MathJax can access content
});

const findDataManagerModule = (root) => {
  const stack = [root];
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || (typeof current !== "object" && typeof current !== "function")) continue;
    if (visited.has(current)) continue;
    visited.add(current);

    if (
      current.data &&
      typeof current.resetView === "function" &&
      typeof current.middleViewer === "function" &&
      typeof current.data.offsetX === "number" &&
      typeof current.data.offsetY === "number" &&
      typeof current.data.scale === "number" &&
      current.data.nodeMap &&
      current.data.edgeMap
    ) {
      return current;
    }

    if (current instanceof Map) {
      current.forEach((value) => stack.push(value));
      continue;
    }

    if (current instanceof Set) {
      current.forEach((value) => stack.push(value));
      continue;
    }

    Object.keys(current).forEach((key) => {
      let value;

      try {
        value = current[key];
      } catch {
        return;
      }

      if (value && (typeof value === "object" || typeof value === "function")) {
        stack.push(value);
      }
    });
  }

  return null;
};

const dataManager = findDataManagerModule(viewer);

const focusState = {
  nodeId: null,
  panel: null,
  panAnimationFrame: null
};

const easeInOutCubic = (t) => (t < 0.5)
  ? 4 * t * t * t
  : 1 - ((-2 * t + 2) ** 3) / 2;

const getNodeById = (nodeId) => canvasJSON.nodes.find((node) => node.id === nodeId);

const getNodeLabel = (nodeId) => {
  const node = getNodeById(nodeId);
  if (!node) return "Unknown node";
  if (typeof node.text !== "string" || node.text.trim().length === 0) return node.id;

  const firstLine = node.text.split(/\r?\n/).find((line) => line.trim().length > 0) ?? node.id;
  return firstLine.replace(/^#+\s*/, "").trim().slice(0, 80);
};

const ensureOutgoingPanel = () => {
  if (focusState.panel) return focusState.panel;

  const panel = document.createElement("aside");
  panel.className = "outgoing-panel";
  panel.innerHTML = `
    <div class="outgoing-title">Outgoing Annotations</div>
    <div class="outgoing-list"></div>
  `;
  canvasRoot.appendChild(panel);
  focusState.panel = panel;

  panel.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".outgoing-link") : null;
    if (!button) return;

    const toNodeId = button.dataset.toNodeId;
    if (!toNodeId) return;

    smoothPanToNode(toNodeId, { durationMs: 520 });
  });

  return panel;
};

const computeCenterOffsetForNode = (node, scale) => {
  const viewportWidth = canvasRoot.clientWidth || window.innerWidth;
  const viewportHeight = canvasRoot.clientHeight || window.innerHeight;
  const centerX = node.x + (node.width / 2);
  const centerY = node.y + (node.height / 2);

  return {
    x: (viewportWidth / 2) - (centerX * scale),
    y: (viewportHeight / 2) - (centerY * scale)
  };
};

const renderOutgoingPanel = () => {
  const panel = ensureOutgoingPanel();
  const list = panel.querySelector(".outgoing-list");
  if (!list) return;

  if (!focusState.nodeId) {
    panel.classList.remove("is-visible");
    list.innerHTML = "";
    return;
  }

  const outgoingEdges = canvasJSON.edges
    .filter((edge) => edge.fromNode === focusState.nodeId)
    .map((edge) => ({
      id: edge.id,
      toNode: edge.toNode,
      label: (edge.label && edge.label.trim().length > 0) ? edge.label.trim() : `Go to: ${getNodeLabel(edge.toNode)}`
    }));

  if (outgoingEdges.length === 0) {
    panel.classList.remove("is-visible");
    list.innerHTML = "";
    return;
  }

  list.innerHTML = "";

  outgoingEdges.forEach((edge) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "outgoing-link";
    button.dataset.toNodeId = edge.toNode;
    button.textContent = edge.label;
    list.appendChild(button);
  });

  panel.classList.add("is-visible");
};

const setFocusedNode = (nodeId) => {
  focusState.nodeId = nodeId;
  renderOutgoingPanel();
};

const cancelPanAnimation = () => {
  if (focusState.panAnimationFrame !== null) {
    window.cancelAnimationFrame(focusState.panAnimationFrame);
    focusState.panAnimationFrame = null;
  }
};

const smoothPanToNode = (nodeId, options = {}) => {
  const targetNode = getNodeById(nodeId);
  if (!targetNode) return;
  if (!dataManager?.data) {
    focusNode(nodeId);
    return;
  }

  setFocusedNode(nodeId);
  cancelPanAnimation();

  const durationMs = options.durationMs ?? 520;
  const fixedScale = dataManager.data.scale;
  const startOffsetX = dataManager.data.offsetX;
  const startOffsetY = dataManager.data.offsetY;
  const targetOffset = computeCenterOffsetForNode(targetNode, fixedScale);
  const startedAt = performance.now();

  const step = (now) => {
    const elapsed = now - startedAt;
    const rawT = durationMs <= 0 ? 1 : elapsed / durationMs;
    const t = Math.max(0, Math.min(1, rawT));
    const eased = easeInOutCubic(t);

    dataManager.data.offsetX = startOffsetX + ((targetOffset.x - startOffsetX) * eased);
    dataManager.data.offsetY = startOffsetY + ((targetOffset.y - startOffsetY) * eased);

    if (typeof viewer.refresh === "function") {
      viewer.refresh();
    }

    if (t < 1) {
      focusState.panAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    focusState.panAnimationFrame = null;
  };

  focusState.panAnimationFrame = window.requestAnimationFrame(step);
};

const intersects = (a, b, margin = 0) => !(
  a.right < (b.left - margin) ||
  a.left > (b.right + margin) ||
  a.bottom < (b.top - margin) ||
  a.top > (b.bottom + margin)
);

const overlapArea = (a, b) => {
  const left = Math.max(a.left, b.left);
  const right = Math.min(a.right, b.right);
  const top = Math.max(a.top, b.top);
  const bottom = Math.min(a.bottom, b.bottom);
  const width = right - left;
  const height = bottom - top;

  if (width <= 0 || height <= 0) return 0;
  return width * height;
};

const edgeLabelCandidates = [
  [0, -16],
  [0, 16],
  [-18, 0],
  [18, 0],
  [-28, -12],
  [28, -12],
  [-28, 12],
  [28, 12],
  [0, -30],
  [0, 30],
  [-40, 0],
  [40, 0]
];

const renderEdgeLabels = () => {
  const overlaysRoot = canvasRoot.querySelector(".JCV-overlays");
  if (!overlaysRoot) return false;

  let layer = overlaysRoot.querySelector(".edge-label-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "edge-label-layer";
    layer.style.position = "absolute";
    layer.style.left = "0";
    layer.style.top = "0";
    layer.style.width = "0";
    layer.style.height = "0";
    layer.style.overflow = "visible";
    layer.style.zIndex = "0";
    layer.style.pointerEvents = "none";
    overlaysRoot.prepend(layer);

    layer.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest(".edge-label-box") : null;
      if (!target) return;

      const edgeId = target.dataset.edgeId;
      const edge = canvasJSON.edges.find((item) => item.id === edgeId);
      if (!edge) return;

      focusNode(edge.toNode);
    });
  }

  layer.innerHTML = "";

  const nodeMap = new Map(canvasJSON.nodes.map((node) => [node.id, node]));
  const nodeBoxes = canvasJSON.nodes.map((node) => ({
    left: node.x,
    top: node.y,
    right: node.x + node.width,
    bottom: node.y + node.height
  }));
  const placedLabelBoxes = [];

  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  if (!measureCtx) return false;
  measureCtx.font = "18px sans-serif";

  edgeLabels.forEach((edge) => {
    const fromNode = nodeMap.get(edge.fromNode);
    const toNode = nodeMap.get(edge.toNode);
    if (!fromNode || !toNode || !edge.label) return;

    const fromAnchor = getAnchorCoord(fromNode, edge.fromSide);
    const toAnchor = getAnchorCoord(toNode, edge.toSide);
    const cps = getEdgeControlPoints(fromAnchor, toAnchor, edge.fromSide, edge.toSide);

    const centerX = cubicBezierPoint(fromAnchor.x, cps.cp1x, cps.cp2x, toAnchor.x, 0.5);
    const centerY = cubicBezierPoint(fromAnchor.y, cps.cp1y, cps.cp2y, toAnchor.y, 0.5);

    const edgeLength = Math.hypot(toAnchor.x - fromAnchor.x, toAnchor.y - fromAnchor.y);
    const maxLabelWidth = clamp(edgeLength * 0.52, 140, 260);
    const horizontalPadding = 8;
    const verticalPadding = 4;
    const lineHeight = 18;
    const lines = wrapTextLines(measureCtx, edge.label, Math.max(60, maxLabelWidth - (horizontalPadding * 2)));
    const textWidth = lines.reduce((max, line) => Math.max(max, measureCtx.measureText(line).width), 0);
    const width = Math.min(maxLabelWidth, textWidth + (horizontalPadding * 2));
    const height = (lines.length * lineHeight) + (verticalPadding * 2);

    let bestNonOverlap = null;
    let bestFallback = null;

    edgeLabelCandidates.forEach(([dx, dy]) => {
      const rect = {
        left: centerX + dx - width / 2,
        top: centerY + dy - height / 2 - 2,
        right: centerX + dx + width / 2,
        bottom: centerY + dy + height / 2 - 2
      };

      const overlapsNode = nodeBoxes.some((box) => intersects(rect, box, 2));
      const overlapsLabel = placedLabelBoxes.some((box) => intersects(rect, box, 2));
      const overlapScore = nodeBoxes.reduce((sum, box) => sum + overlapArea(rect, box), 0);
      const distanceScore = (dx * dx) + (dy * dy);

      if (!overlapsNode && !overlapsLabel) {
        if (!bestNonOverlap || distanceScore < bestNonOverlap.distanceScore) {
          bestNonOverlap = { rect, distanceScore };
        }
        return;
      }

      const penalty = overlapScore + (overlapsNode ? 100000 : 0) + (overlapsLabel ? 20000 : 0) + (distanceScore * 0.02);

      if (!bestFallback || penalty < bestFallback.penalty) {
        bestFallback = { rect, penalty };
      }
    });

    const finalRect = bestNonOverlap?.rect ?? bestFallback?.rect ?? {
      left: centerX - width / 2,
      top: centerY - height / 2 - 2,
      right: centerX + width / 2,
      bottom: centerY + height / 2 - 2
    };

    placedLabelBoxes.push(finalRect);

    const box = document.createElement("button");
    box.type = "button";
    box.className = "edge-label-box";
    box.dataset.edgeId = edge.id;
    box.textContent = edge.label;
    box.style.left = `${(finalRect.left + finalRect.right) / 2}px`;
    box.style.top = `${(finalRect.top + finalRect.bottom) / 2}px`;
    box.style.maxWidth = `${Math.round(maxLabelWidth)}px`;
    box.style.width = `${Math.round(width)}px`;

    const colors = getEdgeLabelColors(edge.color);
    box.style.backgroundColor = colors.bg;
    box.style.color = colors.text;
    box.style.pointerEvents = "auto";

    layer.appendChild(box);
  });

  return true;
};

const ensureEdgeLabels = (attempt = 0) => {
  const done = renderEdgeLabels();
  if (done || attempt >= 30) return;

  window.setTimeout(() => {
    ensureEdgeLabels(attempt + 1);
  }, 120);
};

ensureEdgeLabels();
window.addEventListener("resize", () => {
  renderEdgeLabels();
  renderOutgoingPanel();
});

const clearNodeActiveState = () => {
  canvasRoot.querySelectorAll(".JCV-overlay-container.JCV-active").forEach((el) => {
    el.classList.remove("JCV-active");
  });
};

const getOverlayNodeIdFromTarget = (target) => {
  if (!(target instanceof Element)) return null;
  if (target.closest(".edge-label-box")) return null;
  if (target.closest(".controls, button, input, textarea, select, a, label")) return null;

  const overlay = target.closest(".JCV-overlay-container");
  if (!overlay || !overlay.id) return null;

  return overlay.id;
};

const nodeClickState = {
  pointerId: null,
  nodeId: null,
  startX: 0,
  startY: 0
};

canvasRoot.addEventListener("pointerdown", (event) => {
  const nodeId = getOverlayNodeIdFromTarget(event.target);

  if (!nodeId) {
    nodeClickState.pointerId = null;
    nodeClickState.nodeId = null;
    return;
  }

  nodeClickState.pointerId = event.pointerId;
  nodeClickState.nodeId = nodeId;
  nodeClickState.startX = event.clientX;
  nodeClickState.startY = event.clientY;
}, true);

canvasRoot.addEventListener("pointerup", (event) => {
  if (nodeClickState.pointerId !== event.pointerId || !nodeClickState.nodeId) return;

  const releasedNodeId = getOverlayNodeIdFromTarget(event.target);
  const dx = event.clientX - nodeClickState.startX;
  const dy = event.clientY - nodeClickState.startY;
  const moved = Math.hypot(dx, dy);
  const isClick = releasedNodeId === nodeClickState.nodeId && moved <= 8;

  const clickedNodeId = isClick ? nodeClickState.nodeId : null;

  nodeClickState.pointerId = null;
  nodeClickState.nodeId = null;

  if (!clickedNodeId) return;

  focusNode(clickedNodeId);

  // Prevent sticky active state from interfering with wheel zoom.
  window.setTimeout(() => {
    clearNodeActiveState();
  }, 0);
}, true);

let mathTypesetTimer = null;
let mathTypesettingInProgress = false;
let mathObserver = null;

const observeMathChanges = () => {
  if (!mathObserver) return;
  mathObserver.observe(canvasRoot, {
    childList: true,
    subtree: true
  });
};

const runMathTypeset = async () => {
  if (mathTypesettingInProgress) return;

  const mathJax = window.MathJax;
  if (!mathJax || !mathJax.typesetPromise) return;

  mathTypesettingInProgress = true;

  try {
    if (mathObserver) {
      mathObserver.disconnect();
    }

    if (mathJax.startup?.promise) {
      await mathJax.startup.promise;
    }

    if (typeof mathJax.typesetClear === "function") {
      mathJax.typesetClear([canvasRoot]);
    }

    await mathJax.typesetPromise([canvasRoot]);
  } catch (err) {
    console.warn("MathJax typeset failed:", err);
  } finally {
    mathTypesettingInProgress = false;
    observeMathChanges();
  }
};

const scheduleMathTypeset = () => {
  if (mathTypesetTimer !== null) {
    window.clearTimeout(mathTypesetTimer);
  }

  mathTypesetTimer = window.setTimeout(() => {
    mathTypesetTimer = null;
    void runMathTypeset();
  }, 120);
};

// Initial pass after scripts have loaded.
window.addEventListener("load", scheduleMathTypeset);

// Re-typeset when content changes (e.g., zoom, node selection).
mathObserver = new MutationObserver(() => {
  if (mathTypesettingInProgress) return;
  scheduleMathTypeset();
});

observeMathChanges();

// Run once in case initial content is already present.
scheduleMathTypeset();

function focusNode(nodeId) {
  const node = canvasJSON.nodes.find(n => n.id === nodeId);
  if (!node) return;
  setFocusedNode(nodeId);
  cancelPanAnimation();

  const viewportWidth = canvasRoot.clientWidth || window.innerWidth;
  const viewportHeight = canvasRoot.clientHeight || window.innerHeight;
  const viewportCenter = {
    x: viewportWidth / 2,
    y: viewportHeight / 2
  };

  const centerX = node.x + (node.width / 2);
  const centerY = node.y + (node.height / 2);
  const fitZoom = Math.min(viewportWidth / node.width, viewportHeight / node.height) * 0.94;
  const targetZoom = Math.max(0.2, Math.min(4, fitZoom));
  const targetOffset = {
    x: viewportCenter.x - (centerX * targetZoom),
    y: viewportCenter.y - (centerY * targetZoom)
  };

  if (dataManager?.data) {
    dataManager.data.scale = targetZoom;
    dataManager.data.offsetX = targetOffset.x;
    dataManager.data.offsetY = targetOffset.y;

    if (typeof viewer.refresh === "function") {
      viewer.refresh();
    }
    return;
  }

  // Fallback: public interaction APIs if internal module lookup fails.
  if (typeof viewer.zoomToScale === "function" && typeof viewer.panToCoords === "function") {
    viewer.zoomToScale(targetZoom, viewportCenter);
    window.requestAnimationFrame(() => {
      viewer.panToCoords(targetOffset);
    });
    return;
  }

  if (typeof viewer.setViewport === "function") {
    viewer.setViewport({ x: centerX, y: centerY, zoom: targetZoom });
  }
}
