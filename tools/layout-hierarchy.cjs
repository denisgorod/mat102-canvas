#!/usr/bin/env node
/*
 * layout-hierarchy.cjs — generate MAT102-review.canvas from hierarchy-data.json.
 *
 * The review map is not hand-drawn: its structure IS its source. This lays the
 * hierarchy nodes out top-down with a layered (Sugiyama) algorithm (ELK) so the
 * logical DAG (depends_on) reads as a clear prerequisite-to-consequence
 * progression, wraps each topic (and its subject) in a group box, and colours
 * each node by role. The same viewer.js renders it via ?canvas=./MAT102-review.canvas.
 *
 * Usage:
 *   python tools/build-hierarchy.py      # first, to (re)build hierarchy-data.json
 *   node tools/layout-hierarchy.cjs
 */
const fs = require("fs");
const path = require("path");
const ELK = require("elkjs/lib/elk.bundled.js");
const elk = new ELK();

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "hierarchy-data.json");
const OUT = path.join(ROOT, "MAT102-review.canvas");

const NODE_W = 540, NODE_H = 360;
const NODE_GAP = 60, LAYER_GAP = 110;
const TOPIC_PAD = 70, TOPIC_TOP = 48;   // room for the topic label bar
const SUBJECT_PAD = 120, SUBJECT_TOP = 60;

// JSON Canvas node colours (1..6) keyed by role, so definitions/theorems/
// objectives are visually distinct at a glance on the review map.
const ROLE_COLOR = { definition: "5", theorem: "1", objective: "4", object: "6", application: "2" };
const titleCase = (slug) => String(slug || "").split("-").map((w) => w ? w[0].toUpperCase() + w.slice(1) : w).join(" ");

(async () => {
  const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const ids = Object.keys(data.nodes);
  if (!ids.length) { console.error("no hierarchy nodes; run build-hierarchy.py first"); process.exit(1); }

  // This generator lays out ONE topic within ONE subject. Fail fast rather than
  // silently lump multiple topics into a single mislabeled group box. Per-topic
  // grouping (a box per topic, subjects around their topics — which needs
  // per-topic ELK sub-layouts arranged in lanes) is the next generator step.
  const topics = [...new Set(ids.map((id) => data.nodes[id].topic))];
  const subjects = [...new Set(ids.map((id) => data.nodes[id].subject))];
  if (topics.length > 1 || subjects.length > 1) {
    console.error(`layout-hierarchy: handles one topic/subject, but found topics [${topics.join(", ")}] subjects [${subjects.join(", ")}]. Implement multi-topic grouping before authoring a second topic.`);
    process.exit(1);
  }

  const res = await elk.layout({
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
      "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
      "elk.spacing.nodeNode": String(NODE_GAP),
      "elk.layered.spacing.nodeNodeBetweenLayers": String(LAYER_GAP),
    },
    children: ids.map((id) => ({ id, width: NODE_W, height: NODE_H })),
    edges: data.edges.map((e, i) => ({ id: `e${i}`, sources: [e.from], targets: [e.to] })),
  });
  const pos = new Map(res.children.map((c) => [c.id, c]));

  // Offset so the block sits clear of the origin, inside its group boxes.
  const OX = SUBJECT_PAD + TOPIC_PAD;
  const OY = SUBJECT_TOP + SUBJECT_PAD + TOPIC_TOP;

  const nodes = [];
  for (const id of ids) {
    const c = pos.get(id), n = data.nodes[id];
    nodes.push({
      id, type: "file", file: n.file, title: n.title, // title → chip/tile/panel label
      x: Math.round(OX + c.x), y: Math.round(OY + c.y),
      width: NODE_W, height: NODE_H,
      ...(ROLE_COLOR[n.role] ? { color: ROLE_COLOR[n.role] } : {}),
    });
  }

  // Topic group tight around the nodes; subject group around the topic. One of
  // each in this slice; generalises to many once more topics are authored.
  const minX = Math.min(...nodes.map((n) => n.x)), minY = Math.min(...nodes.map((n) => n.y));
  const maxX = Math.max(...nodes.map((n) => n.x + n.width)), maxY = Math.max(...nodes.map((n) => n.y + n.height));
  const anyNode = data.nodes[ids[0]];

  const topicGroup = {
    id: `topic-${anyNode.topic}`, type: "group", label: titleCase(anyNode.topic),
    x: Math.round(minX - TOPIC_PAD), y: Math.round(minY - TOPIC_TOP),
    width: Math.round((maxX - minX) + 2 * TOPIC_PAD),
    height: Math.round((maxY - minY) + TOPIC_TOP + TOPIC_PAD),
  };
  const subjectGroup = {
    id: `subject-${anyNode.subject}`, type: "group", label: titleCase(anyNode.subject),
    x: Math.round(topicGroup.x - SUBJECT_PAD), y: Math.round(topicGroup.y - SUBJECT_TOP),
    width: Math.round(topicGroup.width + 2 * SUBJECT_PAD),
    height: Math.round(topicGroup.height + SUBJECT_TOP + SUBJECT_PAD),
  };

  const edges = data.edges.map((e, i) => ({
    id: `dep-${i}`, fromNode: e.from, fromSide: "bottom", toNode: e.to, toSide: "top",
    edge_type: "depends_on",
  }));

  // Groups first so they render behind the file nodes.
  const canvas = { nodes: [subjectGroup, topicGroup, ...nodes], edges };
  fs.writeFileSync(OUT, JSON.stringify(canvas, null, "\t"));
  console.log(`wrote ${path.relative(ROOT, OUT)}: `
    + `${nodes.length} nodes, ${edges.length} edges, groups [${subjectGroup.label} › ${topicGroup.label}]`);
})();
