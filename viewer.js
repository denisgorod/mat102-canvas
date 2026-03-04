import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

  let html = await parser(outputLines.join("\n"));

  const renderedCallouts = await Promise.all(
    callouts.map(async (callout) => {
      const defaultTitle = calloutTitles[callout.typeKey] ?? callout.typeKey;
      const classKey = calloutClassMap[callout.typeKey] ?? callout.typeKey;
      const safeClassKey = classKey.toLowerCase().replace(/[^a-z0-9_-]/g, "") || "note";
      const displayTitle = callout.title || defaultTitle;
      const contentHtml = await parser(callout.content);

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

// Create viewer
const viewer = new JSONCanvasViewer({
  container: document.getElementById("canvas-root"),
  canvas: canvasJSON,
  parser: mathParser,
  shadowed: false // Keep content in light DOM so MathJax can access content
});

const canvasRoot = document.getElementById("canvas-root");

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

// Delegated click handler to support re-rendered edge labels.
canvasRoot.addEventListener("click", (event) => {
  const clickedElement = event.target instanceof Element ? event.target : null;
  if (!clickedElement) return;

  const edgeLabel = clickedElement.closest(".jcv-edge-label");
  if (!edgeLabel || !canvasRoot.contains(edgeLabel)) return;

  const edgeId = edgeLabel.dataset.id;
  const edge = canvasJSON.edges.find(e => e.id === edgeId);
  if (!edge) return;

  focusNode(edge.toNode);
});

function focusNode(nodeId) {
  const node = canvasJSON.nodes.find(n => n.id === nodeId);
  if (!node) return;

  // viewer exposes a camera / viewport API
  viewer.setViewport({
    x: node.x,
    y: node.y,
    zoom: 1.2
  });
}
