import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

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

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const calloutMatch = /^>\[!([^\]]+)\]\s*(.*)$/.exec(line);

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

      if (nextLine.startsWith(">")) {
        contentLines.push(nextLine.replace(/^>\s?/, ""));
        i = j;
        continue;
      }

      if (nextLine.trim() === "") {
        contentLines.push("");
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

    outputLines.push(`<!--CALLOUT_${callouts.length - 1}-->`);
  }

  let html = await parser(outputLines.join("\n"));

  const renderedCallouts = await Promise.all(
    callouts.map(async (callout) => {
      const defaultTitle = calloutTitles[callout.typeKey] ?? callout.typeKey;
      const classKey = calloutClassMap[callout.typeKey] ?? callout.typeKey;
      const displayTitle = callout.title || defaultTitle;
      const contentHtml = await parser(callout.content);

      return `
        <div class="callout callout-${classKey}">
          <div class="callout-title">${displayTitle}</div>
          <div class="callout-content">${contentHtml}</div>
        </div>
      `;
    })
  );

  renderedCallouts.forEach((calloutHtml, index) => {
    html = html.replace(`<!--CALLOUT_${index}-->`, calloutHtml);
  });

  return html;
};

// Create viewer
const viewer = new JSONCanvasViewer({
  container: document.getElementById("canvas-root"),
  canvas: canvasJSON,
  markdownParser: mathParser,
  noShadow: true  // Disable shadow DOM so MathJax can access content
});

const canvasRoot = document.getElementById("canvas-root");

// Wait for viewer to render, then typeset math
setTimeout(() => {
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([canvasRoot]).catch(err => {
      console.warn("MathJax typeset failed:", err);
    });
  }
  
  // Re-typeset when content changes (e.g., zoom, node selection)
  const observer = new MutationObserver(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([canvasRoot]).catch(() => {});
    }
  });
  
  observer.observe(canvasRoot, {
    childList: true,
    subtree: true
  });
}, 500);

// Wait for viewer to render, then setup edge label click handlers
setTimeout(() => {
  canvasRoot.querySelectorAll(".jcv-edge-label").forEach(el => {
    el.style.cursor = "pointer";

    el.addEventListener("click", () => {
      // Each label has dataset linking to edge id
      const edgeId = el.dataset.id;

      const edge = canvasJSON.edges.find(e => e.id === edgeId);
      if (!edge) return;

      const targetNode = edge.toNode;

      focusNode(targetNode);
    });
  });
}, 300);

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

