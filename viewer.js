import { JSONCanvasViewer, parser } 
  from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";


const response = await fetch("./102_map_no_embeds.canvas");
const canvasJSON = await response.json();

// Custom parser that handles Obsidian callouts and preserves LaTeX for MathJax
const mathParser = async (text) => {
  // Process Obsidian-style callouts: >[!type] Title
  const calloutRegex = /^>\[!(\w+)\]\s*(.*)$/gm;
  
  // Map of callout types to colors and labels
  const calloutStyles = {
    'd': { color: '#3b82f6', label: 'Definition', icon: '📘' },
    'e': { color: '#8b5cf6', label: 'Exercise', icon: '✏️' },
    's': { color: '#10b981', label: 'Statement', icon: '📋' },
    'p': { color: '#f59e0b', label: 'Proof', icon: '✓' },
    't': { color: '#ef4444', label: 'Theorem', icon: '⚡' },
    'note': { color: '#3b82f6', label: 'Note', icon: '📝' },
    'info': { color: '#06b6d4', label: 'Info', icon: 'ℹ️' },
    'tip': { color: '#10b981', label: 'Tip', icon: '💡' },
    'warning': { color: '#f59e0b', label: 'Warning', icon: '⚠️' },
    'example': { color: '#8b5cf6', label: 'Example', icon: '📌' },
    'quote': { color: '#6b7280', label: 'Quote', icon: '💬' }
  };
  
  let processedText = text;
  const callouts = [];
  let match;
  
  // Find all callouts
  while ((match = calloutRegex.exec(text)) !== null) {
    const type = match[1].toLowerCase();
    const title = match[2] || '';
    const startIndex = match.index;
    
    // Find the end of this callout (next non-quoted line or end of text)
    let endIndex = startIndex + match[0].length;
    const lines = text.substring(endIndex).split('\n');
    let calloutContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('>')) {
        calloutContent.push(lines[i].substring(1).trim());
      } else if (lines[i].trim() === '') {
        // Allow empty lines within callout
        calloutContent.push('');
      } else {
        // Non-quoted line found, end of callout
        break;
      }
    }
    
    endIndex += calloutContent.join('\n').length + calloutContent.length;
    
    callouts.push({
      fullMatch: text.substring(startIndex, endIndex),
      type,
      title,
      content: calloutContent.join('\n')
    });
  }
  
  // Replace callouts with placeholder tokens
  callouts.forEach((callout, index) => {
    processedText = processedText.replace(callout.fullMatch, `__CALLOUT_${index}__`);
  });
  
  // Parse the rest with the default parser
  let html = await parser(processedText);
  
  // Replace placeholder tokens with styled callouts
  callouts.forEach((callout, index) => {
    const style = calloutStyles[callout.type] || calloutStyles['note'];
    const contentHtml = callout.content; // Keep content as-is for MathJax
    
    const calloutHtml = `
      <div class="callout callout-${callout.type}" style="
        border-left: 4px solid ${style.color};
        background: ${style.color}15;
        padding: 12px 16px;
        margin: 12px 0;
        border-radius: 4px;
      ">
        <div style="
          font-weight: bold;
          color: ${style.color};
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <span>${style.icon}</span>
          <span>${style.label}${callout.title ? ': ' + callout.title : ''}</span>
        </div>
        <div class="callout-content">${contentHtml}</div>
      </div>
    `;
    
    html = html.replace(`__CALLOUT_${index}__`, calloutHtml);
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

