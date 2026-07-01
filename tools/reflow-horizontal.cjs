#!/usr/bin/env node
/*
 * reflow-horizontal.cjs — full-map horizontal re-flow of MAT102.canvas.
 *
 * Transposes the whole canvas into a consistent left→right reading model:
 *   - each SUBJECT becomes a horizontal lane, lanes stacked top→bottom in
 *     course order (their current left→right x order);
 *   - within a lane, the subject's TOPICS are placed left→right in reading
 *     order (their current top→bottom y order);
 *   - within a topic, the concept graph is laid out left→right with ELK's
 *     layered (Sugiyama) algorithm, so edges run straight and each topic reads
 *     as a progression.
 *
 * Rewrites node x/y, every group box (topics + subjects), and intra-topic edge
 * attach-sides (right→left). Cross-topic edges and all node content are left
 * untouched. Deterministic; fully reversible via git.
 *
 * Usage (from tools/):
 *   npm install
 *   node reflow-horizontal.cjs            # dry run -> ../MAT102.canvas.preview
 *   node reflow-horizontal.cjs --write    # overwrite ../MAT102.canvas
 *   node reflow-horizontal.cjs --canvas <path> [--write]
 */
const fs = require("fs");
const path = require("path");
const ELK = require("elkjs/lib/elk.bundled.js");
const elk = new ELK();

const argv = process.argv.slice(2);
const getOpt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const WRITE = argv.includes("--write");
const CANVAS = path.resolve(getOpt("--canvas", path.join(__dirname, "..", "MAT102.canvas")));

// spacing (canvas units)
const NODE_GAP = 55;            // siblings within a layer
const LAYER_GAP = 130;          // between layers (the left→right progression axis)
const TOPIC_PAD = 55;           // padding inside a topic box, around its nodes
const TOPIC_GAP = 320;          // horizontal gap between topics in a lane
const SUBJECT_PAD_X = 140;      // left/right padding inside a subject lane
const SUBJECT_LABEL_H = 90;     // headroom under the subject label bar
const SUBJECT_PAD_BOT = 90;     // padding under the topics inside a subject lane
const LANE_GAP = 520;           // vertical gap between subject lanes
const MARGIN = 200;             // top-left margin of the whole canvas

const canvas = JSON.parse(fs.readFileSync(CANVAS, "utf8"));
const nodes = canvas.nodes, edges = canvas.edges;
const groups = nodes.filter((n) => n.type === "group");
const files = nodes.filter((n) => n.type === "file");

const bboxContains = (o, g) =>
  o.id !== g.id && o.x <= g.x + 2 && o.y <= g.y + 2 &&
  o.x + o.width >= g.x + g.width - 2 && o.y + o.height >= g.y + g.height - 2;
const subjects = groups.filter((g) => !groups.some((o) => bboxContains(o, g)))
  .sort((a, b) => a.x - b.x); // course order, left→right → top→bottom lanes
const subtopics = groups.filter((g) => groups.some((o) => bboxContains(o, g)));

const centerIn = (n, g) => {
  const cx = n.x + n.width / 2, cy = n.y + n.height / 2;
  return g.x <= cx && cx <= g.x + g.width && g.y <= cy && cy <= g.y + g.height;
};
const smallestGroup = (n) => {
  const encl = groups.filter((g) => centerIn(n, g));
  return encl.length ? encl.reduce((a, b) => (a.width * a.height <= b.width * b.height ? a : b)) : null;
};
const node2group = new Map(files.map((n) => [n.id, (smallestGroup(n) || {}).id]));
const filesOf = (gid) => files.filter((n) => node2group.get(n.id) === gid);

// subject -> ordered list of topic groups (sub-topics with files, by reading order;
// or the subject itself when it is childless / holds files directly).
function topicsOf(subject) {
  const subs = subtopics
    .filter((g) => bboxContains(subject, g) && filesOf(g.id).length > 0)
    .sort((a, b) => a.y - b.y);
  return subs.length ? subs : [subject];
}

const round = (v) => Math.round(v);

async function layoutTopic(topicGroup) {
  const ns = filesOf(topicGroup.id);
  const ids = new Set(ns.map((n) => n.id));
  const intra = edges.filter((e) => ids.has(e.fromNode) && ids.has(e.toNode));
  const res = await elk.layout({
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
      "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
      "elk.spacing.nodeNode": String(NODE_GAP),
      "elk.layered.spacing.nodeNodeBetweenLayers": String(LAYER_GAP),
      "elk.layered.spacing.edgeNodeBetweenLayers": "30",
    },
    children: ns.map((n) => ({ id: n.id, width: n.width, height: n.height })),
    edges: intra.map((e) => ({ id: e.id, sources: [e.fromNode], targets: [e.toNode] })),
  });
  const local = new Map(res.children.map((c) => [c.id, c]));
  return { group: topicGroup, ns, intra, local, w: res.width, h: res.height };
}

const refit = (g, ns, pad) => {
  const minX = Math.min(...ns.map((n) => n.x)), minY = Math.min(...ns.map((n) => n.y));
  const maxX = Math.max(...ns.map((n) => n.x + n.width)), maxY = Math.max(...ns.map((n) => n.y + n.height));
  g.x = round(minX - pad); g.y = round(minY - pad);
  g.width = round(maxX - minX + 2 * pad); g.height = round(maxY - minY + 2 * pad);
};

(async () => {
  let yCursor = MARGIN;
  const rows = [];
  for (const subject of subjects) {
    const topicGroups = topicsOf(subject);
    const childless = topicGroups.length === 1 && topicGroups[0].id === subject.id;
    const laid = [];
    for (const tg of topicGroups) laid.push(await layoutTopic(tg));

    const subjectTop = yCursor;
    const topicsTop = subjectTop + (childless ? 0 : SUBJECT_LABEL_H);
    let xCursor = MARGIN + (childless ? 0 : SUBJECT_PAD_X);
    let laneMaxH = 0;

    for (const t of laid) {
      const originX = xCursor + TOPIC_PAD;
      const originY = topicsTop + TOPIC_PAD;
      for (const n of t.ns) {
        const c = t.local.get(n.id);
        n.x = round(originX + c.x);
        n.y = round(originY + c.y);
      }
      for (const e of t.intra) { e.fromSide = "right"; e.toSide = "left"; }
      refit(t.group, t.ns, TOPIC_PAD); // topic box (== subject box when childless)
      xCursor = t.group.x + t.group.width + TOPIC_GAP;
      laneMaxH = Math.max(laneMaxH, t.group.y + t.group.height - topicsTop);
    }

    if (!childless) {
      // subject box wraps all its topic boxes
      const boxes = laid.map((t) => t.group);
      subject.x = round(MARGIN);
      subject.y = round(subjectTop);
      subject.width = round(Math.max(...boxes.map((b) => b.x + b.width)) - MARGIN + SUBJECT_PAD_X);
      subject.height = round((topicsTop + laneMaxH + SUBJECT_PAD_BOT) - subjectTop);
    }
    const laneBottom = (childless ? subject.y + subject.height : subject.y + subject.height);
    rows.push({ label: subject.label, topics: laid.length, y: subject.y, h: laneBottom - subject.y });
    yCursor = laneBottom + LANE_GAP;
  }

  // canvas extent + lane-overlap sanity
  const allB = groups.map((g) => ({ x: g.x, y: g.y, w: g.width, h: g.height }));
  const W = Math.max(...allB.map((b) => b.x + b.w)), H = Math.max(...allB.map((b) => b.y + b.h));

  const out = WRITE ? CANVAS : CANVAS + ".preview";
  fs.writeFileSync(out, JSON.stringify(canvas, null, "\t"));
  console.log(`${WRITE ? "WROTE" : "PREVIEW"} -> ${out}`);
  console.log(`canvas extent: ${W} x ${H}`);
  for (const r of rows) console.log(`  ${r.label.padEnd(30)} ${String(r.topics).padStart(2)} topics   y ${String(r.y).padStart(6)}  h ${String(r.h).padStart(6)}`);
})();
