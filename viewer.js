import { JSONCanvasViewer, parser }
  from "./vendor/json-canvas-viewer-4.3.2/chimp.js";


const defaultCanvasPath = "./MAT102.canvas";
const canvasPathParam = new URLSearchParams(window.location.search).get("canvas");
const requestedCanvasPath = (canvasPathParam && canvasPathParam.trim().length > 0)
  ? canvasPathParam.trim()
  : defaultCanvasPath;

const response = await fetch(requestedCanvasPath);
if (!response.ok) {
  throw new Error(`Failed to load canvas: ${requestedCanvasPath} (${response.status})`);
}
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

const toPosixPath = (path) => String(path ?? "").replace(/\\/g, "/");
const getBasename = (path) => {
  const normalized = toPosixPath(path);
  const segments = normalized.split("/");
  return segments[segments.length - 1] ?? "";
};
const stripFileExtension = (fileName) => String(fileName ?? "").replace(/\.[^./\\]+$/, "");
const getDisplayFileName = (path) => stripFileExtension(getBasename(path));
const getDirectoryPath = (path) => {
  const normalized = toPosixPath(path);
  const index = normalized.lastIndexOf("/");
  if (index < 0) return "./";

  const directory = normalized.slice(0, index + 1);
  if (directory.startsWith("./") || directory.startsWith("../") || directory.startsWith("/")) {
    return directory;
  }

  return `./${directory}`;
};
const ensureRelativePath = (path) => {
  const normalized = toPosixPath(path);
  if (normalized.startsWith("./") || normalized.startsWith("../") || normalized.startsWith("/")) {
    return normalized;
  }

  return `./${normalized}`;
};
const isHttpPath = (path) => /^https?:\/\//i.test(String(path ?? ""));

// Strip YAML frontmatter (--- ... ---) from the top of a markdown string.
const stripFrontmatter = (text) => {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("---")) return text;

  const afterOpen = trimmed.slice(3);
  const closeIndex = afterOpen.search(/^---\s*$/m);
  if (closeIndex === -1) return text;

  return afterOpen.slice(closeIndex + 3).replace(/^\r?\n/, "");
};

// Fetch a single file trying candidates in order; return { text, resolvedPath } or null.
// Rejects HTML responses so that CDN error pages (e.g. GitHub Pages rate-limit
// pages) are never mistaken for file content.
const fetchFirstReachable = async (candidates) => {
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const response = await fetch(candidate);
      if (!response.ok) continue;

      // Reject HTML responses — these are error/rate-limit pages, not .md files.
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) continue;

      const text = await response.text();
      return { text, resolvedPath: candidate };
    } catch {
      // try next candidate
    }
  }
  return null;
};

// Run at most `limit` async tasks concurrently.
// Replaces Promise.all for large batches to avoid triggering CDN rate limits.
const withConcurrency = async (limit, tasks) => {
  let index = 0;
  const worker = async () => {
    while (index < tasks.length) {
      await tasks[index++]();
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
};

// Pre-fetch all file-node contents in parallel and return a map of
// baseName → markdown text.  Embedding the text directly into the canvas
// data avoids any dependency on how the viewer resolves attachment paths.
const preloadFileContents = async (canvasData, canvasPath, onProgress) => {
  const files = canvasData.nodes.filter(
    (node) => node.type === "file" && typeof node.file === "string"
  );
  const canvasDirectory = getDirectoryPath(canvasPath);
  const contentMap = {};

  // Deduplicate by baseName so we only fetch each file once.
  const seen = new Set();
  const uniqueFiles = files.filter((node) => {
    if (isHttpPath(node.file)) return false;
    const baseName = getBasename(node.file);
    if (!baseName || seen.has(baseName)) return false;
    seen.add(baseName);
    return true;
  });

  const total = uniqueFiles.length;

  // Fast path: a build-time bundle (tools/build-content-bundle.mjs) of every
  // file keyed by basename, so first paint costs ONE fetch instead of ~351.
  // Anything the bundle doesn't cover (or the whole thing, if it's absent) falls
  // back to the per-file fetches below — the bundle is an optimisation, never a
  // requirement.
  let bundle = null;
  try {
    const res = await fetch("./content-bundle.json");
    if (res.ok && !((res.headers.get("content-type") ?? "").includes("text/html"))) {
      bundle = await res.json();
    }
  } catch {
    // no bundle — fall back to per-file fetches
  }

  const misses = [];
  for (const node of uniqueFiles) {
    const baseName = getBasename(node.file);
    if (bundle && typeof bundle[baseName] === "string") {
      contentMap[baseName] = stripFrontmatter(bundle[baseName]);
    } else {
      misses.push(node);
    }
  }

  let completed = total - misses.length;
  onProgress?.(completed, total);

  // Use a concurrency limit (8) so we don't hammer GitHub Pages CDN with
  // hundreds of simultaneous requests, which triggers rate limiting.
  await withConcurrency(8, misses.map((fileNode) => async () => {
    const baseName = getBasename(fileNode.file);
    const normalizedOriginal = ensureRelativePath(fileNode.file);
    const candidates = [
      normalizedOriginal,
      `${canvasDirectory}${baseName}`,
      `./Bits/${baseName}`,
      `./${baseName}`,
    ];

    const result = await fetchFirstReachable([...new Set(candidates)]);
    if (result) contentMap[baseName] = stripFrontmatter(result.text);

    completed += 1;
    onProgress?.(completed, total);
  }));

  return contentMap;
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

// Show progress while pre-fetching all file contents in parallel.
const updateLoadingProgress = (completed, total) => {
  const bar = document.getElementById("loading-bar");
  const label = document.getElementById("loading-label");
  if (bar) bar.style.width = `${Math.round((completed / total) * 100)}%`;
  if (label) label.textContent = `Loading… ${completed} / ${total}`;
};

// Fetch all file content up-front in one parallel burst.
const fileContentMap = await preloadFileContents(canvasJSON, requestedCanvasPath, updateLoadingProgress);

// Embed content directly into canvasForViewer: convert each file node into
// a text node carrying the pre-loaded markdown.  The viewer then renders
// everything from memory with no further network requests.
//
// NOTE: nodeTypeById is built from the original canvasJSON below, so the
// "file" type is preserved there — meaning .node-type-file CSS (scrollable
// content area, etc.) still applies correctly to these nodes.
canvasForViewer.nodes = canvasForViewer.nodes.map((node) => {
  if (node.type !== "file" || typeof node.file !== "string") return node;
  const baseName = getBasename(node.file);
  const content = fileContentMap[baseName];
  if (content == null) return node; // leave as-is if fetch failed
  const { file: _removed, ...rest } = node;
  return { ...rest, type: "text", text: content };
});

// No attachment map needed — all content is already embedded above.
const attachmentMap = {};

// Hide loading overlay once all files are pre-fetched.
const loadingOverlay = document.getElementById("loading-overlay");
if (loadingOverlay) {
  loadingOverlay.style.opacity = "0";
  loadingOverlay.addEventListener("transitionend", () => loadingOverlay.remove(), { once: true });
}
const edgeLabels = canvasForViewer.edges
  .filter((edge) => typeof edge.label === "string" && edge.label.trim().length > 0)
  .map((edge) => ({ ...edge, label: edge.label.trim() }));

// Edge relationship → canvas colour key. `prerequisite` (≈96% of edges — the
// backbone) is left uncoloured so it stays neutral; the rarer `related` /
// `analogy` links get a colour so the map's actual cross-connections read as
// highlights rather than drowning in the prerequisite lattice. The keys map
// through edgeLabelColorMap below, so the library-drawn line and our DOM label
// share one colour per relationship.
const edgeTypeColorKey = { related: "5", analogy: "6" };

// Colour the library-drawn edge line by relationship, then disable the built-in
// canvas labels (we render collision-aware DOM labels instead).
canvasForViewer.edges.forEach((edge) => {
  const colorKey = edgeTypeColorKey[edge.edge_type];
  if (colorKey) edge.color = colorKey;
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
  attachments: attachmentMap,
  noAttachmentRelocation: true,
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

const applyFileNodeDisplayNames = () => {
  if (!dataManager?.data?.nodeMap) return;

  Object.values(dataManager.data.nodeMap).forEach((nodeEntry) => {
    if (!nodeEntry?.ref || nodeEntry.ref.type !== "file" || typeof nodeEntry.ref.file !== "string") {
      return;
    }

    const displayName = getDisplayFileName(nodeEntry.ref.file);
    if (!displayName) return;

    nodeEntry.fileName = displayName;
  });
};

applyFileNodeDisplayNames();

const focusState = {
  nodeId: null,
  panel: null,
  panAnimationFrame: null,
  history: []
};
const nodeTypeById = new Map(canvasJSON.nodes.map((node) => [node.id, node.type || "text"]));
// O(1) id lookups, reused everywhere instead of repeated O(n) nodes/edges.find scans.
const nodeById = new Map(canvasJSON.nodes.map((node) => [node.id, node]));
const edgeById = new Map(canvasJSON.edges.map((edge) => [edge.id, edge]));
// Reader bridge: hex nodeId <-> frontmatter slug, and a hook to paint reading progress.
const slugByNodeId = new Map();
const nodeIdBySlug = new Map();
let readerStateApply = null; // set once reader-data.json + localStorage state load
// Reader progress as slug sets, shared by the overlay painter (readerStateApply)
// and the outgoing panel (so answered questions can be marked covered). Reassigned
// by recomputeReaderState in the map-bridge IIFE and on cross-tab storage events.
let readerAnsweredSlugs = new Set();
let readerFrontierSlugs = new Set();
// Contextual edge-label controller hooks (assigned near the interaction code):
// setFocus retargets the persistent label set; refresh re-evaluates it (band /
// collapse / resize changes).
let edgeLabelsSetFocus = null;
let edgeLabelsRefresh = null;
let lodKick = null; // set by the LOD controller; wakes the band loop on programmatic zoom
let crossMapOnFocus = null; // set by the cross-map bridge; retargets the jump button on focus
const overlayNodeTypeClasses = ["node-type-text", "node-type-file", "node-type-group", "node-type-link"];
const groupNodes = canvasJSON.nodes.filter((node) => node.type === "group");
const collapsedGroupIds = new Set();
let collapsedHiddenNodeIds = new Set();

const easeInOutCubic = (t) => (t < 0.5)
  ? 4 * t * t * t
  : 1 - ((-2 * t + 2) ** 3) / 2;

const getNodeById = (nodeId) => nodeById.get(nodeId);
const isNodeCollapsed = (nodeId) => collapsedHiddenNodeIds.has(nodeId);

const isNodeInsideGroup = (node, group) => {
  const centerX = node.x + (node.width / 2);
  const centerY = node.y + (node.height / 2);

  return (
    centerX >= group.x
    && centerX <= (group.x + group.width)
    && centerY >= group.y
    && centerY <= (group.y + group.height)
  );
};

const recomputeCollapsedHiddenNodes = () => {
  const hiddenNodeIds = new Set();

  collapsedGroupIds.forEach((groupId) => {
    const groupNode = groupNodes.find((group) => group.id === groupId);
    if (!groupNode) return;

    canvasJSON.nodes.forEach((node) => {
      if (node.type === "group") return;
      if (isNodeInsideGroup(node, groupNode)) {
        hiddenNodeIds.add(node.id);
      }
    });
  });

  collapsedHiddenNodeIds = hiddenNodeIds;
};

const getNodeLabel = (nodeId) => {
  const node = getNodeById(nodeId);
  if (!node) return "Unknown node";
  if (node.type === "group") return node.label || "Group";

  if (node.type === "file" && typeof node.file === "string") {
    // Prefer an explicit title (review-map nodes carry one) over the filename,
    // but only when it's a non-empty string — a blank title must not blank the label.
    const title = typeof node.title === "string" ? node.title.trim() : "";
    return title || getDisplayFileName(node.file) || node.id;
  }

  if (typeof node.text !== "string" || node.text.trim().length === 0) return node.id;

  const firstLine = node.text.split(/\r?\n/).find((line) => line.trim().length > 0) ?? node.id;
  return firstLine.replace(/^#+\s*/, "").trim().slice(0, 80);
};

const MAX_FOCUS_HISTORY = 80;
const canGoBackInFocus = () => focusState.history.length > 0;

const setOverlayNodeTypeClass = (overlay) => {
  if (!(overlay instanceof Element) || !overlay.id) return;

  if (readerStateApply) readerStateApply(overlay);
  ensureLodChip(overlay);

  overlayNodeTypeClasses.forEach((className) => {
    overlay.classList.remove(className);
  });

  const nodeType = nodeTypeById.get(overlay.id);
  if (!nodeType) return;

  overlay.classList.add(`node-type-${nodeType}`);
};

const applyOverlayNodeTypeClasses = () => {
  canvasRoot.querySelectorAll(".JCV-overlay-container").forEach((overlay) => {
    setOverlayNodeTypeClass(overlay);
  });
};

const ensureOutgoingPanel = () => {
  if (focusState.panel) return focusState.panel;

  const panel = document.createElement("aside");
  panel.className = "outgoing-panel";
  panel.innerHTML = `
    <div class="outgoing-header">
      <button type="button" class="outgoing-back" aria-label="Back to previous node">Back</button>
      <div class="outgoing-title">Outgoing Annotations</div>
    </div>
    <div class="outgoing-list"></div>
  `;
  canvasRoot.appendChild(panel);
  focusState.panel = panel;

  // Keep touch/pointer gestures on the panel from triggering canvas pan/zoom.
  const stopPanelPropagation = (event) => {
    event.stopPropagation();
  };
  [
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "click",
    "wheel",
    "touchstart",
    "touchmove",
    "touchend"
  ].forEach((eventName) => {
    panel.addEventListener(eventName, stopPanelPropagation);
  });

  panel.addEventListener("click", (event) => {
    const backButton = event.target instanceof Element ? event.target.closest(".outgoing-back") : null;
    if (backButton) {
      goBackToPreviousFocus();
      return;
    }

    const button = event.target instanceof Element ? event.target.closest(".outgoing-link") : null;
    if (!button) return;

    const toNodeId = button.dataset.toNodeId;
    if (!toNodeId) return;

    smoothPanToNode(toNodeId, { durationMs: 520 });
  });

  return panel;
};

const activateFocusedNode = (nodeId, { recordHistory = true } = {}) => {
  if (!nodeId) {
    setFocusedNode(null);
    return;
  }

  if (recordHistory && focusState.nodeId && focusState.nodeId !== nodeId) {
    const lastHistoryNode = focusState.history[focusState.history.length - 1];
    if (lastHistoryNode !== focusState.nodeId) {
      focusState.history.push(focusState.nodeId);
      if (focusState.history.length > MAX_FOCUS_HISTORY) {
        focusState.history.shift();
      }
    }
  }

  setFocusedNode(nodeId);
};

const goBackToPreviousFocus = () => {
  if (!canGoBackInFocus()) return;

  let previousNodeId = null;

  while (focusState.history.length > 0) {
    const candidate = focusState.history.pop();
    if (!candidate || candidate === focusState.nodeId) continue;
    if (!getNodeById(candidate)) continue;
    previousNodeId = candidate;
    break;
  }

  if (!previousNodeId) {
    renderOutgoingPanel();
    return;
  }

  focusNode(previousNodeId, { recordHistory: false });
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

const getFocusViewportForNode = (node) => {
  const viewportWidth = canvasRoot.clientWidth || window.innerWidth;
  const viewportHeight = canvasRoot.clientHeight || window.innerHeight;
  const viewportCenter = {
    x: viewportWidth / 2,
    y: viewportHeight / 2
  };

  // File/group nodes have a visible title/header above `node.y`; include it in fit bounds.
  const titleBandHeight = (node.type === "file" || node.type === "group") ? 40 : 0;
  const focusBounds = {
    left: node.x,
    top: node.y - titleBandHeight,
    right: node.x + node.width,
    bottom: node.y + node.height
  };
  const focusWidth = Math.max(1, focusBounds.right - focusBounds.left);
  const focusHeight = Math.max(1, focusBounds.bottom - focusBounds.top);
  const centerX = focusBounds.left + (focusWidth / 2);
  const centerY = focusBounds.top + (focusHeight / 2);
  const fitZoom = Math.min(viewportWidth / focusWidth, viewportHeight / focusHeight) * 0.92;
  const scale = Math.max(0.2, Math.min(4, fitZoom));
  const offsetX = viewportCenter.x - (centerX * scale);
  const offsetY = viewportCenter.y - (centerY * scale);

  return { scale, offsetX, offsetY };
};

const snapViewportForCrispText = (viewport) => ({
  scale: Math.round(viewport.scale * 1000) / 1000,
  offsetX: Math.round(viewport.offsetX),
  offsetY: Math.round(viewport.offsetY)
});

const renderOutgoingPanel = () => {
  const panel = ensureOutgoingPanel();
  const list = panel.querySelector(".outgoing-list");
  const backButton = panel.querySelector(".outgoing-back");
  if (!list) return;

  if (backButton instanceof HTMLButtonElement) {
    backButton.disabled = !canGoBackInFocus();
  }

  if (!focusState.nodeId) {
    panel.classList.remove("is-visible");
    list.innerHTML = "";
    return;
  }

  const outgoingEdges = canvasJSON.edges
    .filter((edge) => edge.fromNode === focusState.nodeId && !isNodeCollapsed(edge.toNode))
    .map((edge) => {
      const toSlug = slugByNodeId.get(edge.toNode);
      return {
        id: edge.id,
        toNode: edge.toNode,
        label: (edge.label && edge.label.trim().length > 0) ? edge.label.trim() : `Go to: ${getNodeLabel(edge.toNode)}`,
        // Covered = the question's target bit was answered in the reader; pending =
        // it's sitting on the frontier. Lets the panel show progress per question,
        // not just per node (the map already shows a ✓ on answered nodes).
        covered: !!(toSlug && readerAnsweredSlugs.has(toSlug)),
        pending: !!(toSlug && readerFrontierSlugs.has(toSlug))
      };
    });

  if (outgoingEdges.length === 0 && !canGoBackInFocus()) {
    panel.classList.remove("is-visible");
    list.innerHTML = "";
    return;
  }

  list.innerHTML = "";

  outgoingEdges.forEach((edge) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "outgoing-link" + (edge.covered ? " is-covered" : edge.pending ? " is-pending" : "");
    button.dataset.toNodeId = edge.toNode;
    button.textContent = edge.label;
    if (edge.covered) button.title = "You've already answered this question";
    else if (edge.pending) button.title = "This question is on your frontier";
    list.appendChild(button);
  });

  panel.classList.add("is-visible");
};

const setFocusedNode = (nodeId) => {
  focusState.nodeId = nodeId;
  renderOutgoingPanel();
  crossMapOnFocus?.(nodeId);
  edgeLabelsSetFocus?.(nodeId); // reveal this node's question-edges on the map
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
    focusNode(nodeId, { recordHistory: options.recordHistory !== false });
    return;
  }

  activateFocusedNode(nodeId, { recordHistory: options.recordHistory !== false });
  cancelPanAnimation();
  lodKick?.(); // the pan animates the scale each frame — keep the LOD loop awake for it

  const durationMs = options.durationMs ?? 520;
  const startScale = dataManager.data.scale;
  const startOffsetX = dataManager.data.offsetX;
  const startOffsetY = dataManager.data.offsetY;
  const targetViewport = getFocusViewportForNode(targetNode);
  const finalViewport = snapViewportForCrispText(targetViewport);
  const startedAt = performance.now();

  const step = (now) => {
    const elapsed = now - startedAt;
    const rawT = durationMs <= 0 ? 1 : elapsed / durationMs;
    const t = Math.max(0, Math.min(1, rawT));
    const eased = easeInOutCubic(t);

    dataManager.data.scale = startScale + ((targetViewport.scale - startScale) * eased);
    dataManager.data.offsetX = startOffsetX + ((targetViewport.offsetX - startOffsetX) * eased);
    dataManager.data.offsetY = startOffsetY + ((targetViewport.offsetY - startOffsetY) * eased);

    // The library's Controller runs its own rAF loop that calls refresh()
    // whenever scale/offset change, so refreshing per frame here just doubled
    // the redraw work. The final-frame refresh below still runs.
    if (t < 1) {
      focusState.panAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    dataManager.data.scale = finalViewport.scale;
    dataManager.data.offsetX = finalViewport.offsetX;
    dataManager.data.offsetY = finalViewport.offsetY;
    if (typeof viewer.refresh === "function") {
      viewer.refresh();
    }
    scheduleMathFlush();
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

const setOverlayCollapsedClass = (overlay) => {
  if (!(overlay instanceof Element) || !overlay.id) return;

  const shouldHide = isNodeCollapsed(overlay.id);
  const hasClass = overlay.classList.contains("is-collapsed-hidden");

  if (shouldHide && !hasClass) {
    overlay.classList.add("is-collapsed-hidden");
    return;
  }

  if (!shouldHide && hasClass) {
    overlay.classList.remove("is-collapsed-hidden");
  }
};

const applyCollapsedNodeVisibility = ({ updatePanel = true } = {}) => {
  canvasRoot.querySelectorAll(".JCV-overlay-container").forEach((overlay) => {
    setOverlayNodeTypeClass(overlay);
    setOverlayCollapsedClass(overlay);
  });

  if (focusState.nodeId && isNodeCollapsed(focusState.nodeId)) {
    setFocusedNode(null);
    return;
  }

  if (updatePanel) {
    renderOutgoingPanel();
  }
};

const renderGroupControls = () => {
  if (groupNodes.length === 0) return true;

  const overlaysRoot = canvasRoot.querySelector(".JCV-overlays");
  if (!overlaysRoot) return false;

  let layer = overlaysRoot.querySelector(".group-overlay-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "group-overlay-layer";
    layer.style.position = "absolute";
    layer.style.left = "0";
    layer.style.top = "0";
    layer.style.width = "0";
    layer.style.height = "0";
    layer.style.overflow = "visible";
    layer.style.zIndex = "35";
    layer.style.pointerEvents = "none";
    overlaysRoot.appendChild(layer);
  }

  layer.innerHTML = "";

  groupNodes.forEach((groupNode) => {
    const isCollapsed = collapsedGroupIds.has(groupNode.id);

    if (isCollapsed) {
      const mask = document.createElement("div");
      mask.className = "group-collapse-mask";
      mask.style.left = `${groupNode.x}px`;
      mask.style.top = `${groupNode.y}px`;
      mask.style.width = `${groupNode.width}px`;
      mask.style.height = `${groupNode.height}px`;
      mask.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      layer.appendChild(mask);
    }

    const header = document.createElement("div");
    header.className = "group-header-box";
    header.style.left = `${groupNode.x}px`;
    header.style.top = `${groupNode.y - 36}px`;
    header.style.width = `${groupNode.width}px`;
    header.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "group-toggle-button";
    toggleButton.dataset.groupId = groupNode.id;
    toggleButton.setAttribute("aria-label", isCollapsed ? "Expand group" : "Collapse group");
    toggleButton.textContent = isCollapsed ? "+" : "−";
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();

      if (collapsedGroupIds.has(groupNode.id)) {
        collapsedGroupIds.delete(groupNode.id);
      } else {
        collapsedGroupIds.add(groupNode.id);
      }

      recomputeCollapsedHiddenNodes();
      applyCollapsedNodeVisibility();
      renderGroupControls();
      edgeLabelsRefresh?.(); // drop labels for edges whose endpoint just collapsed

      if (typeof viewer.refresh === "function") {
        viewer.refresh();
      }
    });

    const titleHitbox = document.createElement("button");
    titleHitbox.type = "button";
    titleHitbox.className = "group-title-hitbox";
    titleHitbox.setAttribute("aria-label", `Focus group: ${groupNode.label || "Group"}`);
    titleHitbox.title = groupNode.label || "Group";
    titleHitbox.addEventListener("click", (event) => {
      event.stopPropagation();
      focusNodeFromInteraction(groupNode.id);
    });

    header.appendChild(titleHitbox);
    header.appendChild(toggleButton);
    layer.appendChild(header);
  });

  applyCollapsedNodeVisibility();
  return true;
};

// Hoisted, static state for renderEdgeLabels. Rebuilding these on every call
// (which fires on every resize frame and every group toggle) was pure waste:
// node geometry never changes, so precompute all boxes once and only filter by
// the collapsed set per call; reuse a single measuring canvas context.
const allNodeBoxes = canvasJSON.nodes.map((node) => ({
  id: node.id,
  left: node.x,
  top: node.y,
  right: node.x + node.width,
  bottom: node.y + node.height
}));
const edgeLabelMeasureCtx = (() => {
  const measureCanvas = document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d");
  // Match the rendered .edge-label-box font (index.html) so wrap width is measured
  // at the size labels actually display, not wider (which wrapped text early).
  if (ctx) ctx.font = "14px sans-serif";
  return ctx;
})();

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
      const edge = edgeById.get(edgeId);
      if (!edge) return;

      focusNode(edge.toNode);
    });
  }

  layer.innerHTML = "";

  const nodeMap = nodeById;
  const visibleNodeBoxes = allNodeBoxes.filter((box) => !isNodeCollapsed(box.id));
  const placedLabelBoxes = [];

  const measureCtx = edgeLabelMeasureCtx;
  if (!measureCtx) return false;

  edgeLabels.forEach((edge) => {
    if (isNodeCollapsed(edge.fromNode) || isNodeCollapsed(edge.toNode)) return;

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
    const lineHeight = 17; // 14px font × ~1.2 line-height, matching the rendered box
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

      const overlapsNode = visibleNodeBoxes.some((box) => intersects(rect, box, 2));
      const overlapsLabel = placedLabelBoxes.some((box) => intersects(rect, box, 2));
      const overlapScore = visibleNodeBoxes.reduce((sum, box) => sum + overlapArea(rect, box), 0);
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

    const colors = getEdgeLabelColors(edgeTypeColorKey[edge.edge_type]);
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

const ensureGroupControls = (attempt = 0) => {
  const done = renderGroupControls();
  if (done || attempt >= 30) return;

  window.setTimeout(() => {
    ensureGroupControls(attempt + 1);
  }, 120);
};

const ensureOverlayNodeTypeClasses = (attempt = 0) => {
  const overlays = canvasRoot.querySelectorAll(".JCV-overlay-container");
  if (overlays.length > 0) {
    applyOverlayNodeTypeClasses();
    return;
  }
  if (attempt >= 30) return;

  window.setTimeout(() => {
    ensureOverlayNodeTypeClasses(attempt + 1);
  }, 120);
};

// Edge labels are no longer rendered en masse; the contextual edge-label
// controller (below) reveals them per focused/hovered node.
ensureGroupControls();
ensureOverlayNodeTypeClasses();
// Coalesce bursts of resize events (which fire continuously while dragging a
// window edge) into at most one heavy relayout per animation frame.
let resizeRafId = null;
window.addEventListener("resize", () => {
  if (resizeRafId !== null) return;
  resizeRafId = window.requestAnimationFrame(() => {
    resizeRafId = null;
    applyFileNodeDisplayNames();
    applyOverlayNodeTypeClasses();
    edgeLabelsRefresh?.(); // reposition active labels for the new viewport
    renderOutgoingPanel();
    renderGroupControls();
    lodKick?.(); // a resize can refit the view and cross a LOD threshold
  });
});

const clearNodeActiveState = () => {
  canvasRoot.querySelectorAll(".JCV-overlay-container.JCV-active").forEach((el) => {
    el.classList.remove("JCV-active");
  });
};

const getOverlayNodeIdFromTarget = (target) => {
  if (!(target instanceof Element)) return null;
  if (target.closest(".edge-label-box")) return null;
  if (target.closest(".controls, button, input, textarea, select, a, label, .outgoing-panel, .group-header-box, .group-collapse-mask")) return null;

  const overlay = target.closest(".JCV-overlay-container");
  if (!overlay || !overlay.id) return null;

  return overlay.id;
};

const isInteractiveTarget = (target) => (
  target instanceof Element
  && Boolean(target.closest(".controls, button, input, textarea, select, a, label, .edge-label-box, .outgoing-panel, .group-header-box, .group-collapse-mask"))
);

const nodeClickState = {
  pointerId: null,
  nodeId: null,
  startX: 0,
  startY: 0,
  pointerType: "",
  startedAt: 0
};

const TAP_MAX_MOVE_POINTER = 8;
const TAP_MAX_MOVE_TOUCH = 26;
const TAP_MAX_DURATION_MS = 500;
let lastPointerFocusedNodeId = null;
let lastPointerFocusedAt = 0;

const resetNodeClickState = () => {
  nodeClickState.pointerId = null;
  nodeClickState.nodeId = null;
  nodeClickState.startX = 0;
  nodeClickState.startY = 0;
  nodeClickState.pointerType = "";
  nodeClickState.startedAt = 0;
};

const focusNodeFromInteraction = (nodeId) => {
  focusNode(nodeId);
  lastPointerFocusedNodeId = nodeId;
  lastPointerFocusedAt = performance.now();

  // Prevent sticky active state from interfering with wheel zoom/pinch.
  window.setTimeout(() => {
    clearNodeActiveState();
  }, 0);
};

canvasRoot.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary) return;
  const nodeId = getOverlayNodeIdFromTarget(event.target);

  if (!nodeId) {
    resetNodeClickState();
    return;
  }

  nodeClickState.pointerId = event.pointerId;
  nodeClickState.nodeId = nodeId;
  nodeClickState.startX = event.clientX;
  nodeClickState.startY = event.clientY;
  nodeClickState.pointerType = event.pointerType || "";
  nodeClickState.startedAt = performance.now();
}, true);

canvasRoot.addEventListener("pointerup", (event) => {
  if (!event.isPrimary) return;
  if (nodeClickState.pointerId !== event.pointerId || !nodeClickState.nodeId) return;

  const releasedNodeId = getOverlayNodeIdFromTarget(event.target);
  const endedOnInteractiveTarget = isInteractiveTarget(event.target);
  const dx = event.clientX - nodeClickState.startX;
  const dy = event.clientY - nodeClickState.startY;
  const moved = Math.hypot(dx, dy);
  const isTouch = nodeClickState.pointerType === "touch";
  const movedThreshold = isTouch ? TAP_MAX_MOVE_TOUCH : TAP_MAX_MOVE_POINTER;
  const elapsed = performance.now() - nodeClickState.startedAt;
  const endedOnSameNode = releasedNodeId === nodeClickState.nodeId;
  const touchNearMiss = isTouch && !releasedNodeId && !endedOnInteractiveTarget;
  const isClick = (endedOnSameNode || touchNearMiss) && moved <= movedThreshold && elapsed <= TAP_MAX_DURATION_MS;

  const clickedNodeId = isClick ? nodeClickState.nodeId : null;

  resetNodeClickState();

  if (!clickedNodeId) return;

  focusNodeFromInteraction(clickedNodeId);
}, true);

canvasRoot.addEventListener("pointercancel", () => {
  resetNodeClickState();
}, true);

canvasRoot.addEventListener("lostpointercapture", () => {
  resetNodeClickState();
}, true);

canvasRoot.addEventListener("click", (event) => {
  if (isInteractiveTarget(event.target)) return;

  const nodeId = getOverlayNodeIdFromTarget(event.target);
  if (!nodeId) return;

  const now = performance.now();
  if (lastPointerFocusedNodeId === nodeId && (now - lastPointerFocusedAt) < 700) {
    return;
  }

  focusNodeFromInteraction(nodeId);
}, true);

// ---------------------------------------------------------------------------
// Contextual edge labels (the map's ~415 question-edges).
//
// Rendering every label at once is noise, and on a long edge the mid-edge label
// sits off-screen whenever both endpoints aren't in view. Instead we reveal only
// the questions on edges touching the *focused* node (persistent) or the
// *hovered* node (a transient preview), and place each label in SCREEN space,
// clamped to the visible portion of its edge — so it stays on screen and near
// the node even when the far endpoint is scrolled away. Labels live only at LOD
// band 2 (near); at lower zoom the map is a table of contents and labels are
// noise. This replaces the old render-all-415 collision pass.
// ---------------------------------------------------------------------------
{
  // Incident labelled edges per node id (both directions), built once.
  const edgesByNodeId = new Map();
  canvasJSON.edges.forEach((edge) => {
    if (typeof edge.label !== "string" || edge.label.trim().length === 0) return;
    for (const nid of [edge.fromNode, edge.toNode]) {
      if (!edgesByNodeId.has(nid)) edgesByNodeId.set(nid, []);
      edgesByNodeId.get(nid).push(edge);
    }
  });

  const layer = document.createElement("div");
  layer.className = "edge-label-screen-layer";
  canvasRoot.appendChild(layer);

  let focusNodeId = null;
  let hoverNodeId = null;
  const activeLabelEls = new Map(); // edgeId -> button element
  const LABEL_PAD = 44;             // keep labels off the very viewport edge

  const sideAnchor = (rect, side) => {
    switch (side) {
      case "top":    return { x: rect.left + rect.width / 2, y: rect.top };
      case "bottom": return { x: rect.left + rect.width / 2, y: rect.bottom };
      case "left":   return { x: rect.left, y: rect.top + rect.height / 2 };
      case "right":  return { x: rect.right, y: rect.top + rect.height / 2 };
      default:       return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  };

  // Liang–Barsky: midpoint of the part of segment a→b inside the padded viewport,
  // or null if the segment misses it entirely.
  const visibleMidpoint = (a, b) => {
    const xmin = LABEL_PAD, ymin = LABEL_PAD;
    const xmax = window.innerWidth - LABEL_PAD, ymax = window.innerHeight - LABEL_PAD;
    const dx = b.x - a.x, dy = b.y - a.y;
    const p = [-dx, dx, -dy, dy];
    const q = [a.x - xmin, xmax - a.x, a.y - ymin, ymax - a.y];
    let t0 = 0, t1 = 1;
    for (let i = 0; i < 4; i += 1) {
      if (p[i] === 0) {
        if (q[i] < 0) return null; // parallel and outside this edge
      } else {
        const r = q[i] / p[i];
        if (p[i] < 0) { if (r > t1) return null; if (r > t0) t0 = r; }
        else { if (r < t0) return null; if (r < t1) t1 = r; }
      }
    }
    const tm = (t0 + t1) / 2;
    return { x: a.x + tm * dx, y: a.y + tm * dy };
  };

  const positionLabel = (el, edge) => {
    const aEl = document.getElementById(edge.fromNode);
    const bEl = document.getElementById(edge.toNode);
    if (!aEl || !bEl) { el.style.display = "none"; return; }
    const a = sideAnchor(aEl.getBoundingClientRect(), edge.fromSide);
    const b = sideAnchor(bEl.getBoundingClientRect(), edge.toSide);
    const mid = visibleMidpoint(a, b);
    if (!mid) { el.style.display = "none"; return; }
    el.style.display = "";
    el.style.left = `${Math.round(mid.x)}px`;
    el.style.top = `${Math.round(mid.y)}px`;
  };

  const repositionActiveLabels = () => {
    const placed = [];
    activeLabelEls.forEach((el, edgeId) => {
      const edge = edgeById.get(edgeId);
      if (edge) positionLabel(el, edge);
      if (el.style.display !== "none") placed.push(el);
    });
    // Vertical de-overlap: when several edges clamp to the same side (e.g. a node
    // whose parents are all off-screen left), their labels would stack on top of
    // each other. Nudge each down until it clears the ones already placed.
    placed.sort((a, b) => parseFloat(a.style.top) - parseFloat(b.style.top));
    const boxes = [];
    const GAP = 4;
    for (const el of placed) {
      const r = el.getBoundingClientRect();
      const w = r.width, h = r.height;
      const cx = parseFloat(el.style.left);
      let cy = parseFloat(el.style.top);
      let guard = 0;
      const overlaps = () => boxes.some((b) =>
        Math.abs(b.cx - cx) * 2 < (b.w + w) && Math.abs(b.cy - cy) * 2 < (b.h + h + GAP));
      while (overlaps() && guard < 24) { cy += (h / 2 + GAP); guard += 1; }
      el.style.top = `${Math.round(cy)}px`;
      boxes.push({ cx, cy, w, h });
    }
  };

  const createLabelEl = (edge) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "edge-label-box";
    el.dataset.edgeId = edge.id;
    el.textContent = edge.label.trim();
    el.style.maxWidth = "240px";
    const colors = getEdgeLabelColors(edgeTypeColorKey[edge.edge_type]);
    el.style.backgroundColor = colors.bg;
    el.style.color = colors.text;
    el.style.pointerEvents = "auto";
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      // Navigate to the OTHER end of the edge relative to the node these labels
      // are anchored to. Labels are shown for a node's edges in both directions,
      // so on an incoming edge (current node is `toNode`) we must go to the
      // source, not refocus the current node into a no-op.
      const ref = (edge.fromNode === focusNodeId || edge.toNode === focusNodeId) ? focusNodeId
                : (edge.fromNode === hoverNodeId || edge.toNode === hoverNodeId) ? hoverNodeId
                : null;
      const target = ref === edge.fromNode ? edge.toNode
                   : ref === edge.toNode ? edge.fromNode
                   : edge.toNode;
      focusNode(target);
    });
    return el;
  };

  const refreshActiveSet = () => {
    const wanted = new Set();
    if (lodBand === 2) {
      for (const nid of [focusNodeId, hoverNodeId]) {
        if (!nid || isNodeCollapsed(nid)) continue;
        for (const edge of edgesByNodeId.get(nid) || []) {
          if (isNodeCollapsed(edge.fromNode) || isNodeCollapsed(edge.toNode)) continue;
          wanted.add(edge.id);
        }
      }
    }
    for (const [edgeId, el] of activeLabelEls) {
      if (!wanted.has(edgeId)) { el.remove(); activeLabelEls.delete(edgeId); }
    }
    for (const edgeId of wanted) {
      if (!activeLabelEls.has(edgeId)) {
        const el = createLabelEl(edgeById.get(edgeId));
        layer.appendChild(el);
        activeLabelEls.set(edgeId, el);
      }
    }
    repositionActiveLabels();
    kickLabels();
  };

  // Reposition while the camera is moving (labels are screen-space, so a pan
  // that leaves scale untouched still moves them). Self-stops when the view
  // holds steady, and re-arms on any interaction that can move it.
  let rafId = null;
  let stable = 0;
  let prevSig = "";
  const labelTick = () => {
    repositionActiveLabels();
    const d = dataManager?.data;
    const sig = d ? `${d.scale},${d.offsetX},${d.offsetY}` : String(stable);
    if (sig === prevSig) stable += 1; else { stable = 0; prevSig = sig; }
    if (activeLabelEls.size === 0 || stable >= 20) { rafId = null; return; }
    rafId = window.requestAnimationFrame(labelTick);
  };
  function kickLabels() {
    stable = 0;
    if (rafId === null && activeLabelEls.size > 0) rafId = window.requestAnimationFrame(labelTick);
  }

  // Hover preview (mouse/pen only; touch has no hover and drives labels by tap).
  let hoverRaf = null;
  let pendingTarget = null;
  canvasRoot.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    pendingTarget = event.target;
    if (hoverRaf !== null) return;
    hoverRaf = window.requestAnimationFrame(() => {
      hoverRaf = null;
      // Moving onto a label must not drop the hover that produced it.
      if (pendingTarget instanceof Element && pendingTarget.closest(".edge-label-screen-layer")) return;
      const id = getOverlayNodeIdFromTarget(pendingTarget);
      if (id !== hoverNodeId) { hoverNodeId = id; refreshActiveSet(); }
    });
    kickLabels(); // a moving pointer often means a drag-pan; keep labels tracking
  });
  canvasRoot.addEventListener("pointerleave", () => {
    if (hoverNodeId !== null) { hoverNodeId = null; refreshActiveSet(); }
  });
  canvasRoot.addEventListener("wheel", kickLabels, { passive: true });

  edgeLabelsSetFocus = (nodeId) => { focusNodeId = nodeId; refreshActiveSet(); };
  edgeLabelsRefresh = () => refreshActiveSet();
}

let mathObserver = null;

const observeMathChanges = () => {
  if (!mathObserver) return;
  mathObserver.observe(canvasRoot, {
    childList: true,
    subtree: true
  });
};

// ---------------------------------------------------------------------------
// Lazy per-node MathJax typesetting.
//
// The original approach called typesetPromise([canvasRoot]) — the full tree —
// on every DOM mutation (pan, zoom, click). With 351 math-heavy nodes that
// blocks the main thread for several seconds on load, and again on every
// interaction. Instead we:
//   1. Track which overlay nodes have already been typeset (data-math-done).
//   2. On each scheduled pass, collect only the nodes that are currently
//      visible in the viewport AND not yet typeset, then typeset just those.
//   3. The IntersectionObserver pre-queues nodes that are entering the
//      viewport so panning into new content feels instant.
// ---------------------------------------------------------------------------

// Nodes queued by the IntersectionObserver waiting for the next flush.
const mathPendingNodes = new Set();
let mathFlushScheduled = false;
let mathTypesettingInProgress = false;

const flushMathPending = async () => {
  mathFlushScheduled = false;
  if (mathPendingNodes.size === 0 || mathTypesettingInProgress) return;

  const mathJax = window.MathJax;
  if (!mathJax?.typesetPromise) return;

  const batch = [...mathPendingNodes];
  mathPendingNodes.clear();

  mathTypesettingInProgress = true;
  if (mathObserver) mathObserver.disconnect();

  try {
    if (mathJax.startup?.promise) await mathJax.startup.promise;
    await mathJax.typesetPromise(batch);
  } catch (err) {
    console.warn("MathJax typeset failed:", err);
  } finally {
    mathTypesettingInProgress = false;
    observeMathChanges();
  }
};

const scheduleMathFlush = () => {
  if (!mathFlushScheduled) {
    mathFlushScheduled = true;
    requestAnimationFrame(flushMathPending);
  }
};

// Queue a node for typesetting if it hasn't been done yet.
const enqueueMathNode = (el) => {
  if (el.dataset.mathDone) return;
  el.dataset.mathDone = "1";
  mathPendingNodes.add(el);
  scheduleMathFlush();
};

// IntersectionObserver: pre-load nodes as they approach the viewport.
const mathVisibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mathVisibilityObserver.unobserve(entry.target);
      enqueueMathNode(entry.target);
    }
  });
}, { rootMargin: "200px" });

const observeNodeForMath = (el) => {
  if (!el.dataset.mathDone) mathVisibilityObserver.observe(el);
};

// Watch for overlay nodes added or modified by the library.
mathObserver = new MutationObserver((mutations) => {
  syncCollapsedVisibilityFromMutations(mutations);
  mutations.forEach((m) => {
    m.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      if (node.classList?.contains("JCV-overlay-container")) {
        observeNodeForMath(node);
      }
      node.querySelectorAll?.(".JCV-overlay-container").forEach(observeNodeForMath);
    });
  });
});

observeMathChanges();

// Observe all nodes already present in the DOM.
canvasRoot.querySelectorAll(".JCV-overlay-container").forEach(observeNodeForMath);

function syncCollapsedVisibilityFromMutations(mutations) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((addedNode) => {
      if (!(addedNode instanceof Element)) return;

      if (addedNode.classList.contains("JCV-overlay-container")) {
        setOverlayNodeTypeClass(addedNode);
        setOverlayCollapsedClass(addedNode);
      }

      addedNode.querySelectorAll(".JCV-overlay-container").forEach((overlay) => {
        setOverlayNodeTypeClass(overlay);
        setOverlayCollapsedClass(overlay);
      });
    });
  });
}

function focusNode(nodeId, options = {}) {
  const node = nodeById.get(nodeId);
  if (!node) return;
  activateFocusedNode(nodeId, { recordHistory: options.recordHistory !== false });
  cancelPanAnimation();
  const targetViewport = snapViewportForCrispText(getFocusViewportForNode(node));

  if (dataManager?.data) {
    dataManager.data.scale = targetViewport.scale;
    dataManager.data.offsetX = targetViewport.offsetX;
    dataManager.data.offsetY = targetViewport.offsetY;

    if (typeof viewer.refresh === "function") {
      viewer.refresh();
    }
    lodKick?.(); // this jump can cross a LOD threshold — refresh the band
    return;
  }

  // Fallback: public interaction APIs if internal module lookup fails.
  if (typeof viewer.zoomToScale === "function" && typeof viewer.panToCoords === "function") {
    const viewportWidth = canvasRoot.clientWidth || window.innerWidth;
    const viewportHeight = canvasRoot.clientHeight || window.innerHeight;
    const viewportCenter = {
      x: viewportWidth / 2,
      y: viewportHeight / 2
    };
    viewer.zoomToScale(targetViewport.scale, viewportCenter);
    window.requestAnimationFrame(() => {
      viewer.panToCoords({ x: targetViewport.offsetX, y: targetViewport.offsetY });
    });
    return;
  }

  if (typeof viewer.setViewport === "function") {
    const centerX = node.x + (node.width / 2);
    const centerY = node.y + (node.height / 2);
    viewer.setViewport({ x: centerX, y: centerY, zoom: targetViewport.scale });
  }
}

// ---------------------------------------------------------------------------
// Map bridge: the toggle bar, the cross-map jump between the inquiry and review
// maps, deep-linking (?focus=<id-or-slug>), and painting the reader's progress
// (answered ✓ / open-question glow) onto the inquiry map. All of it degrades
// gracefully — missing data leaves the canvas unchanged.
//
// The two maps are one viewer with different ?canvas=. The bridge between them
// is the function f (a bit's `concludes:` field): an inquiry branch concludes in
// a hierarchy node. Inquiry→review follows f (reader-data `concludes`);
// review→inquiry follows f⁻¹ (hierarchy-data `inquiry_sources`).
// ---------------------------------------------------------------------------
(async () => {
  const isReviewMap = /review/i.test(requestedCanvasPath);

  // Toggle bar (always present). A primary button switches maps; a second,
  // contextual button offers the focused node's cross-map jump.
  const toggle = document.createElement("div");
  toggle.className = "mode-toggle";

  const primaryBtn = document.createElement("button");
  primaryBtn.type = "button";
  if (isReviewMap) {
    primaryBtn.textContent = "🗺 Inquiry map";
    primaryBtn.title = "Back to the inquiry map";
    primaryBtn.addEventListener("click", () => { location.href = new URL("./", location.href).toString(); });
  } else {
    primaryBtn.textContent = "📖 Reader";
    primaryBtn.title = "Open the reading view (starting at the focused bit, if any)";
    primaryBtn.addEventListener("click", () => {
      const url = new URL("./", location.href);
      url.searchParams.set("mode", "reader");
      const slug = focusState.nodeId ? slugByNodeId.get(focusState.nodeId) : null;
      if (slug) url.searchParams.set("start", slug);
      location.href = url.toString();
    });
  }
  toggle.appendChild(primaryBtn);

  const jumpBtn = document.createElement("button");
  jumpBtn.type = "button";
  jumpBtn.className = "cross-map-jump";
  jumpBtn.style.display = "none";
  let jumpTarget = null;
  jumpBtn.addEventListener("click", () => { if (jumpTarget) location.href = jumpTarget; });
  toggle.appendChild(jumpBtn);

  canvasRoot.appendChild(toggle);

  let readerData = { nodes: {}, edges: [] };
  try { readerData = await (await fetch("./reader-data.json")).json(); } catch {}
  let hierData = { nodes: {} };
  try { hierData = await (await fetch("./hierarchy-data.json")).json(); } catch {}

  const base2slug = {};
  Object.entries(readerData.nodes).forEach(([slug, n]) => {
    if (n.file) base2slug[n.file.split("/").pop()] = slug;
  });
  canvasJSON.nodes.forEach((n) => {
    if (n.type !== "file" || typeof n.file !== "string") return;
    const slug = base2slug[n.file.split("/").pop()];
    if (slug) { slugByNodeId.set(n.id, slug); nodeIdBySlug.set(slug, n.id); }
  });

  // Recompute the contextual jump button whenever the focused node changes.
  crossMapOnFocus = (nodeId) => {
    jumpTarget = null;
    jumpBtn.style.display = "none";
    if (!nodeId) return;

    if (isReviewMap) {
      // A review node's id IS its hierarchy id → jump to how it was discovered.
      const src = hierData.nodes?.[nodeId]?.inquiry_sources?.[0];
      if (!src) return;
      const url = new URL("./", location.href);
      url.searchParams.set("focus", src);
      jumpTarget = url.toString();
      jumpBtn.textContent = "🔎 How it's discovered";
      jumpBtn.title = "Jump to the inquiry branch that concludes in this node";
    } else {
      // An inquiry bit → its objective in the review map (via `concludes`).
      const slug = slugByNodeId.get(nodeId);
      const hid = slug && readerData.nodes?.[slug]?.concludes;
      if (!hid) return;
      const title = hierData.nodes?.[hid]?.title;
      const url = new URL("./", location.href);
      url.searchParams.set("canvas", "./MAT102-review.canvas");
      url.searchParams.set("focus", hid);
      jumpTarget = url.toString();
      jumpBtn.textContent = title ? `📚 Review: ${title}` : "📚 Review this";
      jumpBtn.title = "Jump to this idea's objective in the review map";
    }
    jumpBtn.style.display = "";
  };

  // Reader progress, recomputed from localStorage into the module-level slug
  // sets so both the overlay painter and the outgoing panel see the same state.
  const recomputeReaderState = () => {
    let state = {};
    try { state = JSON.parse(localStorage.getItem("reader.v1")) || {}; } catch { state = {}; }
    readerAnsweredSlugs = new Set(
      Object.entries(state.visited || {}).filter(([, v]) => v && v.answered).map(([slug]) => slug)
    );
    readerFrontierSlugs = new Set(
      (state.frontier || []).map((f) => f.toSlug).filter((slug) => !readerAnsweredSlugs.has(slug))
    );
  };
  recomputeReaderState();

  readerStateApply = (overlay) => {
    overlay.classList.remove("rd-answered", "rd-frontier");
    const slug = slugByNodeId.get(overlay.id);
    if (!slug) return;
    if (readerAnsweredSlugs.has(slug)) overlay.classList.add("rd-answered");
    else if (readerFrontierSlugs.has(slug)) overlay.classList.add("rd-frontier");
  };
  applyOverlayNodeTypeClasses(); // re-run now that progress is known

  // Live cross-tab sync: `storage` fires in *other* tabs when the reader writes
  // reader.v1, so answering a bit in a reader tab repaints an open map tab
  // (and refreshes an open outgoing panel) without a reload. No-op for same-tab
  // writes, which the map never makes.
  window.addEventListener("storage", (event) => {
    if (event.key && event.key !== "reader.v1") return;
    recomputeReaderState();
    applyOverlayNodeTypeClasses();
    renderOutgoingPanel();
  });

  // ?focus=<id-or-slug>: focus a canvas node id directly (review map, where the
  // id is the hierarchy id), else map a reader slug → node id (inquiry map).
  const focusParam = new URLSearchParams(location.search).get("focus");
  const focusHex = focusParam && (nodeById.has(focusParam) ? focusParam : nodeIdBySlug.get(focusParam));
  if (focusHex) {
    window.setTimeout(() => {
      try { smoothPanToNode(focusHex, { durationMs: 650 }); }
      catch { focusNode(focusHex); }
    }, 350);
  }
})();

// ---------------------------------------------------------------------------
// Semantic zoom (level-of-detail). The map is far too large to read all at once,
// so what each node shows is keyed to the live zoom (`dataManager.data.scale`):
//
//   band 0 (far):  every node hidden; one big "topic tile" per leaf group — a
//                  scarce, table-of-contents view of the whole curriculum.
//   band 1 (mid):  node bodies collapse to a single title chip — a scannable
//                  grid of labelled cards, no reading required.
//   band 2 (near): full node content, and edge-question labels become visible.
//
// The actual show/hide is pure CSS driven by #canvas-root[data-lod]; this code
// only (a) computes the band with hysteresis so a scale hovering on a threshold
// doesn't strobe, and (b) injects the chip / tile elements once.
// ---------------------------------------------------------------------------
const LOD_T1 = 0.13; // below this scale: topic tiles only (band 0)
const LOD_T2 = 0.42; // at/above this scale: full node content (band 2)
const LOD_HYS = 0.08; // ±8% dead-band around each threshold, kills flicker
let lodBand = -1;

// Chips live inside each overlay; created lazily so we never pay for a node
// that never scrolls into view. Called from setOverlayNodeTypeClass (hoisted so
// it's defined before that first runs).
function ensureLodChip(overlay) {
  if (!(overlay instanceof Element) || !overlay.id) return;
  if (nodeTypeById.get(overlay.id) === "group") return; // groups get tiles, not chips
  if (overlay.querySelector(":scope > .lod-chip")) return;
  const chip = document.createElement("div");
  chip.className = "lod-chip";
  chip.textContent = getNodeLabel(overlay.id);
  overlay.appendChild(chip);
}

// Only switch bands once the scale is clearly past a threshold (start from the
// current band, then step at most one band per side). Handles the initial -1
// state and fast multi-band zooms via the sequential comparisons.
const lodBandForScale = (scale) => {
  let band = lodBand < 0 ? (scale < LOD_T1 ? 0 : scale < LOD_T2 ? 1 : 2) : lodBand;
  if (band === 0 && scale > LOD_T1 * (1 + LOD_HYS)) band = 1;
  if (band === 1 && scale < LOD_T1 * (1 - LOD_HYS)) band = 0;
  if (band === 1 && scale > LOD_T2 * (1 + LOD_HYS)) band = 2;
  if (band === 2 && scale < LOD_T2 * (1 - LOD_HYS)) band = 1;
  return band;
};

const updateLod = () => {
  const scale = dataManager?.data?.scale;
  if (typeof scale !== "number") return;
  const band = lodBandForScale(scale);
  if (band === lodBand) return;
  lodBand = band;
  canvasRoot.dataset.lod = String(band);
  if (band === 0) ensureLodTopicLabels();
  edgeLabelsRefresh?.(); // labels live only at band 2; clear/restore on band change
};

// Leaf topic groups (a group containing no other group) are the tiles — the
// 24 innermost topics, not the 6 parent subject lanes.
const bboxContainsGroup = (outer, inner) => (
  inner !== outer
  && inner.x >= outer.x && inner.y >= outer.y
  && inner.x + inner.width <= outer.x + outer.width
  && inner.y + inner.height <= outer.y + outer.height
);
const leafTopicGroups = groupNodes.filter(
  (group) => !groupNodes.some((other) => bboxContainsGroup(group, other))
);

// One tile per leaf group, positioned in world coordinates inside .JCV-overlays
// so it pans/zooms with the map. Clicking a tile drills into that topic.
const renderLodTopicLabels = () => {
  const overlaysRoot = canvasRoot.querySelector(".JCV-overlays");
  if (!overlaysRoot) return false;

  let layer = overlaysRoot.querySelector(".lod-topic-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "lod-topic-layer";
    layer.style.position = "absolute";
    layer.style.left = "0";
    layer.style.top = "0";
    layer.style.width = "0";
    layer.style.height = "0";
    layer.style.overflow = "visible";
    layer.style.zIndex = "30";
    layer.style.pointerEvents = "none";
    overlaysRoot.appendChild(layer);
  }

  if (layer.childElementCount > 0) return true; // built once; geometry is static

  leafTopicGroups.forEach((group) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "lod-topic-label";
    tile.dataset.groupId = group.id;
    tile.textContent = group.label || "Topic";
    tile.style.left = `${group.x}px`;
    tile.style.top = `${group.y}px`;
    tile.style.width = `${group.width}px`;
    tile.style.height = `${group.height}px`;
    // Font scales with the tile so labels read at any zoom, but a floor + cap
    // keep the 24 topics reading as peers instead of a few giants shouting over
    // the rest (width-bound so long titles don't overflow, height-bound so short
    // wide tiles don't blow up).
    tile.style.fontSize = `${Math.max(150, Math.min(group.width * 0.11, group.height * 0.22, 430))}px`;
    tile.style.pointerEvents = "auto";
    tile.addEventListener("click", (event) => {
      event.stopPropagation();
      focusNodeFromInteraction(group.id);
    });
    layer.appendChild(tile);
  });

  return true;
};

const ensureLodTopicLabels = (attempt = 0) => {
  const done = renderLodTopicLabels();
  if (done || attempt >= 30) return;
  window.setTimeout(() => ensureLodTopicLabels(attempt + 1), 120);
};

// Drive the band off the live scale, but only while the scale is actually
// moving. A perpetual rAF would keep the page ticking (and burning battery) at
// idle; instead the loop self-stops once the zoom holds steady for a few frames
// and `kickLod` re-arms it on any interaction that can change scale (wheel,
// pinch, resize, or a programmatic focus/pan via `lodKick`).
if (dataManager?.data) {
  let lodRafId = null;
  let lodStableFrames = 0;
  let lodPrevScale = NaN;

  const lodTick = () => {
    const scale = dataManager.data.scale;
    updateLod();
    if (scale === lodPrevScale) {
      lodStableFrames += 1;
    } else {
      lodStableFrames = 0;
      lodPrevScale = scale;
    }
    // ~20 frames (~0.3s) of a steady scale covers zoom inertia; then go idle.
    if (lodStableFrames >= 20) { lodRafId = null; return; }
    lodRafId = window.requestAnimationFrame(lodTick);
  };

  const kickLod = () => {
    lodStableFrames = 0;
    if (lodRafId === null) lodRafId = window.requestAnimationFrame(lodTick);
  };
  lodKick = kickLod;

  // Direct user zoom: wheel, and pinch/drag (which begins with a pointerdown).
  canvasRoot.addEventListener("wheel", kickLod, { passive: true });
  canvasRoot.addEventListener("pointerdown", kickLod, true);

  updateLod(); // set the initial band…
  kickLod();   // …then settle to the load-time scale and stop.
}

