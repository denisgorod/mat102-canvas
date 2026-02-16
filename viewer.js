import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

// Custom parser that preserves LaTeX for MathJax
const mathParser = async (text) => {
  const html = await parser(text);
  // MathJax will process the LaTeX in the rendered HTML
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

