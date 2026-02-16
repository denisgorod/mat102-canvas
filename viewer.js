import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

// Create viewer
const viewer = new JSONCanvasViewer({
  container: document.getElementById("canvas-root"),
  canvas: canvasJSON,
  markdownParser: parser
});

const canvasRoot = document.getElementById("canvas-root");
const mathRoot = canvasRoot.shadowRoot ?? canvasRoot;
let pendingMathTypeset = false;

function scheduleMathTypeset() {
  if (!window.MathJax || pendingMathTypeset) return;
  if (typeof window.MathJax.typesetPromise !== "function") {
    setTimeout(scheduleMathTypeset, 50);
    return;
  }
  pendingMathTypeset = true;

  requestAnimationFrame(() => {
    pendingMathTypeset = false;
    window.MathJax.typesetPromise([mathRoot]).catch(() => {
      // Fail silently if MathJax is not ready or typeset fails.
    });
  });
}

// Typeset once after initial render.
setTimeout(scheduleMathTypeset, 0);

// Re-typeset when the canvas DOM changes (labels/nodes updated).
const mathObserver = new MutationObserver(() => {
  scheduleMathTypeset();
});

mathObserver.observe(mathRoot, {
  childList: true,
  subtree: true,
  characterData: true
});

// Wait for viewer DOM to render
setTimeout(() => {
  mathRoot.querySelectorAll(".jcv-edge-label").forEach(el => {
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

