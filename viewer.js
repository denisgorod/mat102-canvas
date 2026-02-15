import { JSONCanvasViewer } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";

const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

// Create viewer
const viewer = new JSONCanvasViewer({
  container: document.getElementById("canvas-root"),
  canvas: canvasJSON
});

// Wait for viewer DOM to render
setTimeout(() => {
  document.querySelectorAll(".jcv-edge-label").forEach(el => {
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

