import {
  JSONCanvasViewer,
  loadCanvas,
  parser
} from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";

// Load the canvas file
const response = await fetch("./my-canvas.canvas");
const canvasJSON = await response.json();

// Create viewer
const viewer = new JSONCanvasViewer({
  container: document.getElementById("canvas-root"),
  canvas: loadCanvas(canvasJSON),
  markdownParser: parser,
});
