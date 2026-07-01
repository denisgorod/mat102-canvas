#!/usr/bin/env node
/*
 * relayout-topics.cjs — re-lay-out the concept graph inside each topic of a
 * JSON Canvas using a layered (Sugiyama) algorithm (ELK), so edges run straight
 * and each topic reads as a clear progression.
 *
 * Only node x/y, the topic's group box, and intra-topic edge attach-sides are
 * changed. Cross-topic edges and node content are left untouched. Each topic
 * stays anchored where it currently sits on the canvas, and its group box is
 * refit around the new node block.
 *
 * Usage:
 *   npm install                                  # in this tools/ dir (installs elkjs)
 *   node relayout-topics.cjs --list              # list topic units + stats
 *   node relayout-topics.cjs --topic "Modular Arithmetic"     # dry run (writes *.preview)
 *   node relayout-topics.cjs --topic "Modular Arithmetic" --write
 *   node relayout-topics.cjs --all --write
 *   node relayout-topics.cjs --all --direction RIGHT --write  # horizontal flow
 *
 * Flags: --canvas <path> (default ../MAT102.canvas), --direction DOWN|RIGHT
 *        (default DOWN), --write (mutate the canvas in place; otherwise a
 *        <canvas>.preview file is written), --list, --topic <name> (repeatable),
 *        --all.
 */
const fs = require("fs");
const path = require("path");
const ELK = require("elkjs/lib/elk.bundled.js");
const elk = new ELK();

// ---------- args ----------
const argv = process.argv.slice(2);
const getFlag = (name) => argv.includes(name);
const getOpt = (name, def) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : def; };
const getAll = (name) => argv.reduce((a, v, i) => (argv[i - 1] === name ? [...a, v] : a), []);

const CANVAS = path.resolve(getOpt("--canvas", path.join(__dirname, "..", "MAT102.canvas")));
const DIRECTION = (getOpt("--direction", "DOWN")).toUpperCase(); // DOWN | RIGHT
const WRITE = getFlag("--write");
const LIST = getFlag("--list");
const ALL = getFlag("--all");
const TOPICS = getAll("--topic");

// spacing knobs (canvas units)
const NODE_GAP = 55;           // between siblings in a layer
const LAYER_GAP = 90;          // between layers (the progression axis)
const BOX_PAD = 60;            // padding when refitting the group box
const TOP_PAD = 24;            // gap from group top to first node

// ---------- load ----------
const raw = fs.readFileSync(CANVAS, "utf8");
const canvas = JSON.parse(raw);
const nodes = canvas.nodes, edges = canvas.edges;
const groups = nodes.filter((n) => n.type === "group");
const files = nodes.filter((n) => n.type === "file");

const centerIn = (n, g) => {
  const cx = n.x + n.width / 2, cy = n.y + n.height / 2;
  return g.x <= cx && cx <= g.x + g.width && g.y <= cy && cy <= g.y + g.height;
};
const smallestGroup = (n) => {
  const encl = groups.filter((g) => centerIn(n, g));
  if (!encl.length) return null;
  return encl.reduce((a, b) => (a.width * a.height <= b.width * b.height ? a : b));
};
const node2group = new Map(files.map((n) => [n.id, (smallestGroup(n) || {}).id]));

// A "topic unit" = a group that is the smallest enclosing group for >= 2 files
// (i.e. a leaf group, or a childless subject). These are what we lay out.
const topicNodes = new Map(); // groupId -> [fileNode]
for (const n of files) {
  const gid = node2group.get(n.id);
  if (!gid) continue;
  if (!topicNodes.has(gid)) topicNodes.set(gid, []);
  topicNodes.get(gid).push(n);
}
const topicUnits = [...topicNodes.entries()].filter(([, ns]) => ns.length >= 2).map(([gid]) => gid);
const gById = new Map(groups.map((g) => [g.id, g]));
const label = (gid) => (gById.get(gid) || {}).label || "(?)";

if (LIST) {
  console.log(`${topicUnits.length} topic units:`);
  for (const gid of topicUnits.sort((a, b) => topicNodes.get(b).length - topicNodes.get(a).length)) {
    console.log(`  ${label(gid).padEnd(36)} ${String(topicNodes.get(gid).length).padStart(3)} nodes`);
  }
  process.exit(0);
}

// which topics to process
let targets;
if (ALL) targets = topicUnits;
else if (TOPICS.length) {
  const byLabel = new Map(topicUnits.map((gid) => [label(gid), gid]));
  targets = TOPICS.map((t) => { const gid = byLabel.get(t); if (!gid) { console.error(`No topic unit named "${t}". Use --list.`); process.exit(1); } return gid; });
} else { console.error("Nothing to do. Pass --topic <name>, --all, or --list."); process.exit(1); }

const round = (v) => Math.round(v);
const overlap = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);

(async () => {
  const summary = [];
  for (const gid of targets) {
    const g = gById.get(gid);
    const ns = topicNodes.get(gid);
    const ids = new Set(ns.map((n) => n.id));
    const intra = edges.filter((e) => ids.has(e.fromNode) && ids.has(e.toNode));

    const res = await elk.layout({
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": DIRECTION,
        "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
        "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
        "elk.spacing.nodeNode": String(NODE_GAP),
        "elk.layered.spacing.nodeNodeBetweenLayers": String(LAYER_GAP),
        "elk.layered.spacing.edgeNodeBetweenLayers": "30",
      },
      children: ns.map((n) => ({ id: n.id, width: n.width, height: n.height })),
      edges: intra.map((e) => ({ id: e.id, sources: [e.fromNode], targets: [e.toNode] })),
    });
    const pos = new Map(res.children.map((c) => [c.id, c]));

    // Anchor the new block: keep the topic where it is. Center the block within
    // the current group's x-span (DOWN) / y-span (RIGHT); start just below the
    // group's top edge so the label bar keeps its room.
    const blockW = res.width, blockH = res.height;
    const originX = g.x + Math.max(BOX_PAD, (g.width - blockW) / 2);
    const originY = g.y + TOP_PAD;

    for (const n of ns) {
      const c = pos.get(n.id);
      n.x = round(originX + c.x);
      n.y = round(originY + c.y);
    }
    // Consistent attach sides -> the renderer's bezier collapses to near-straight.
    const [fromSide, toSide] = DIRECTION === "RIGHT" ? ["right", "left"] : ["bottom", "top"];
    for (const e of intra) { e.fromSide = fromSide; e.toSide = toSide; }

    // Refit the group box around the new node block.
    const minX = Math.min(...ns.map((n) => n.x)), minY = Math.min(...ns.map((n) => n.y));
    const maxX = Math.max(...ns.map((n) => n.x + n.width)), maxY = Math.max(...ns.map((n) => n.y + n.height));
    g.x = round(minX - BOX_PAD); g.y = round(minY - BOX_PAD);
    g.width = round((maxX - minX) + 2 * BOX_PAD); g.height = round((maxY - minY) + 2 * BOX_PAD);

    // Warn on collisions with sibling groups (same parent subject).
    const siblings = groups.filter((o) => o.id !== gid && o.type === "group");
    const clashes = siblings.filter((o) => overlap(g, o) &&
      // ignore the parent subject that legitimately contains us
      !(o.x <= g.x && o.y <= g.y && o.x + o.width >= g.x + g.width && o.y + o.height >= g.y + g.height));
    summary.push({ topic: label(gid), nodes: ns.length, edges: intra.length, box: `${g.width}x${g.height}`, clashes: clashes.map((c) => c.label) });
  }

  const outPath = WRITE ? CANVAS : CANVAS + ".preview";
  fs.writeFileSync(outPath, JSON.stringify(canvas, null, "\t"));
  console.log(`${WRITE ? "WROTE" : "PREVIEW"} -> ${outPath}  (direction ${DIRECTION})`);
  for (const s of summary) {
    console.log(`  ${s.topic.padEnd(34)} ${String(s.nodes).padStart(3)}n ${String(s.edges).padStart(3)}e  box ${s.box}` +
      (s.clashes.length ? `  ⚠ overlaps: ${s.clashes.join(", ")}` : ""));
  }
})();
