#!/usr/bin/env node
/*
 * layout-hierarchy.cjs — generate MAT102-review.canvas from hierarchy-data.json.
 *
 * The review map is not hand-drawn: its structure IS its source. This lays it out
 * in the SAME reading model as the inquiry map (see reflow-horizontal.cjs), so a
 * student meets the same geography in both:
 *
 *   - each SUBJECT is a horizontal lane, lanes stacked top→bottom;
 *   - within a lane, its TOPICS run left→right;
 *   - within a topic, the depends_on DAG is laid out left→right with ELK's
 *     layered (Sugiyama) algorithm, so prerequisites precede consequences.
 *
 * Subject and topic ORDER are read from the inquiry map (MAT102.canvas): lanes
 * follow its subject groups top→bottom, topics follow its topic groups
 * left→right. That is what keeps the two maps aligned rather than merely
 * similar. Anything the inquiry map does not name falls to the end, alphabetically.
 *
 * Nodes are coloured by role. Cross-topic dependencies are drawn too — they are
 * what makes the review map a single graph rather than a row of islands.
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
const INQUIRY = path.join(ROOT, "MAT102.canvas");
const OUT = path.join(ROOT, "MAT102-review.canvas");

const NODE_W = 540, NODE_H = 360;
const NODE_GAP = 55;             // siblings within a layer
const LAYER_GAP = 130;           // between layers (the left→right progression axis)
const TOPIC_PAD = 55;            // padding inside a topic box, around its nodes
const TOPIC_TOP = 48;            // room for the topic label bar
const TOPIC_GAP = 320;           // horizontal gap between topics in a lane
const SUBJECT_PAD_X = 140;       // left/right padding inside a subject lane
const SUBJECT_LABEL_H = 90;      // headroom under the subject label bar
const SUBJECT_PAD_BOT = 90;      // padding under the topics inside a lane
const LANE_GAP = 520;            // vertical gap between subject lanes
const MARGIN = 200;              // top-left margin of the whole canvas

// JSON Canvas node colours (1..6) keyed by role, so definitions/theorems/
// objectives are visually distinct at a glance on the review map.
const ROLE_COLOR = { definition: "5", theorem: "1", objective: "4", object: "6", application: "2" };

// Prefer the inquiry map's own wording ("GCD and Euclidean Algorithm"), so the two
// maps label the same thing identically; title-casing the slug is only a fallback
// and would render that as "Gcd And Euclidean Algorithm".
const titleCase = (slug) => String(slug || "")
  .split("-").map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
let LABELS = new Map();
const labelFor = (slug) => LABELS.get(slug) || titleCase(slug);

// Match the slug form the content uses for `subject:` / `topic:` so inquiry-map
// group labels ("GCD and Euclidean Algorithm") line up with hierarchy slugs.
const slugify = (label) => String(label || "")
  .toLowerCase()
  .replace(/[‐-―]/g, " ")     // dashes of every width
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

// ---------------------------------------------------------------------------
// Reading order, taken from the inquiry map so the two maps stay aligned.
// Returns { subjects: [slug...], topicsBySubject: { slug: [slug...] } }.
// Absent or unreadable inquiry map → empty ordering, and everything falls back
// to alphabetical. The review map must still generate on its own.
// ---------------------------------------------------------------------------
function inquiryOrder() {
  try {
    const canvas = JSON.parse(fs.readFileSync(INQUIRY, "utf8"));
    const groups = canvas.nodes.filter((n) => n.type === "group");
    const files = canvas.nodes.filter((n) => n.type === "file");
    const area = (g) => Number(g.width) * Number(g.height);
    const contains = (outer, inner) => {
      const cx = Number(inner.x) + Number(inner.width) / 2;
      const cy = Number(inner.y) + Number(inner.height) / 2;
      return cx >= Number(outer.x) && cx <= Number(outer.x) + Number(outer.width)
        && cy >= Number(outer.y) && cy <= Number(outer.y) + Number(outer.height);
    };

    // Read subject/topic the same way the a11y outline does: a node's LARGEST
    // owning group is its subject, its SMALLEST is its topic. Deliberately not
    // "top-level group = subject" — on this canvas only four groups are
    // top-level, so that rule silently loses Number Theory, Functions and the
    // rest, and the order falls back to alphabetical.
    const labels = new Map();                 // slug -> the inquiry map's own label text
    const subjectGroups = new Map();          // slug -> group
    const topicsBySubjectGroups = new Map();  // slug -> Map(slug -> group)
    for (const f of files) {
      const owners = groups.filter((g) => contains(g, f)).sort((a, b) => area(a) - area(b));
      if (!owners.length) continue;
      const sg = owners[owners.length - 1];
      const tg = owners[0];
      const sSlug = slugify(sg.label);
      subjectGroups.set(sSlug, sg);
      labels.set(sSlug, String(sg.label || "").trim());
      if (!topicsBySubjectGroups.has(sSlug)) topicsBySubjectGroups.set(sSlug, new Map());
      topicsBySubjectGroups.get(sSlug).set(slugify(tg.label), tg);
      labels.set(slugify(tg.label), String(tg.label || "").trim());
    }

    const subjects = [...subjectGroups.entries()]
      .sort((a, b) => Number(a[1].y) - Number(b[1].y) || Number(a[1].x) - Number(b[1].x))
      .map(([slug]) => slug);

    const topicsBySubject = {};
    for (const [sSlug, tMap] of topicsBySubjectGroups) {
      topicsBySubject[sSlug] = [...tMap.entries()]
        .sort((a, b) => Number(a[1].x) - Number(b[1].x) || Number(a[1].y) - Number(b[1].y))
        .map(([slug]) => slug);
    }
    return { subjects, topicsBySubject, labels };
  } catch {
    return { subjects: [], topicsBySubject: {}, labels: new Map() };
  }
}

// Order `values` by `reference`, appending anything unlisted alphabetically.
function ordered(values, reference) {
  const rank = new Map(reference.map((v, i) => [v, i]));
  return [...values].sort((a, b) => {
    const ra = rank.has(a) ? rank.get(a) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b) ? rank.get(b) : Number.MAX_SAFE_INTEGER;
    return ra - rb || String(a).localeCompare(String(b));
  });
}

(async () => {
  const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const ids = Object.keys(data.nodes);
  if (!ids.length) {
    console.error("no hierarchy nodes; run build-hierarchy.py first");
    process.exit(1);
  }

  const order = inquiryOrder();
  LABELS = order.labels || new Map();

  // Bucket nodes by subject → topic.
  const bySubject = new Map();
  for (const id of ids) {
    const n = data.nodes[id];
    const s = n.subject || "unsorted";
    const t = n.topic || "unsorted";
    if (!bySubject.has(s)) bySubject.set(s, new Map());
    const topics = bySubject.get(s);
    if (!topics.has(t)) topics.set(t, []);
    topics.get(t).push(id);
  }

  const edgeIndex = data.edges.map((e, i) => ({ ...e, i }));
  const topicOf = (id) => data.nodes[id]?.topic;

  // --- lay each topic out on its own, left→right ---------------------------
  async function layoutTopic(topicIds) {
    const inside = new Set(topicIds);
    const intra = edgeIndex.filter((e) => inside.has(e.from) && inside.has(e.to));
    const res = await elk.layout({
      id: "t",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
        "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
        "elk.spacing.nodeNode": String(NODE_GAP),
        "elk.layered.spacing.nodeNodeBetweenLayers": String(LAYER_GAP),
      },
      children: topicIds.map((id) => ({ id, width: NODE_W, height: NODE_H })),
      edges: intra.map((e) => ({ id: `e${e.i}`, sources: [e.from], targets: [e.to] })),
    });
    const pos = new Map(res.children.map((c) => [c.id, c]));
    return { pos, width: res.width || NODE_W, height: res.height || NODE_H };
  }

  const nodes = [];
  const groups = [];
  const placed = new Map();   // id -> {x, y}
  let yCursor = MARGIN;

  for (const subject of ordered([...bySubject.keys()], order.subjects)) {
    const topics = bySubject.get(subject);
    const topicOrder = ordered([...topics.keys()], order.topicsBySubject[subject] || []);

    // Lay each topic out first so the lane can be sized from real footprints.
    const laid = [];
    for (const topic of topicOrder) laid.push({ topic, ids: topics.get(topic), ...(await layoutTopic(topics.get(topic))) });

    const laneTop = yCursor;
    const topicsTop = laneTop + SUBJECT_LABEL_H;
    let xCursor = MARGIN + SUBJECT_PAD_X;
    let laneBottom = topicsTop;

    for (const t of laid) {
      const boxX = xCursor;
      const boxY = topicsTop;
      const nodesX = boxX + TOPIC_PAD;
      const nodesY = boxY + TOPIC_TOP;

      for (const id of t.ids) {
        const c = t.pos.get(id);
        const n = data.nodes[id];
        const x = Math.round(nodesX + (c?.x || 0));
        const y = Math.round(nodesY + (c?.y || 0));
        placed.set(id, { x, y });
        nodes.push({
          id, type: "file", file: n.file, title: n.title,   // title → chip/tile/panel label
          x, y, width: NODE_W, height: NODE_H,
          ...(ROLE_COLOR[n.role] ? { color: ROLE_COLOR[n.role] } : {}),
        });
      }

      const boxW = Math.round(t.width + 2 * TOPIC_PAD);
      const boxH = Math.round(t.height + TOPIC_TOP + TOPIC_PAD);
      groups.push({
        id: `topic-${t.topic}`, type: "group", label: labelFor(t.topic),
        x: Math.round(boxX), y: Math.round(boxY), width: boxW, height: boxH,
      });
      laneBottom = Math.max(laneBottom, boxY + boxH);
      xCursor = boxX + boxW + TOPIC_GAP;
    }

    const laneW = Math.round((xCursor - TOPIC_GAP) - MARGIN + SUBJECT_PAD_X);
    const laneH = Math.round((laneBottom - laneTop) + SUBJECT_PAD_BOT);
    groups.push({
      id: `subject-${subject}`, type: "group", label: labelFor(subject),
      x: MARGIN, y: laneTop, width: laneW, height: laneH,
    });
    yCursor = laneTop + laneH + LANE_GAP;
  }

  // Intra-topic edges read left→right; cross-topic edges connect lanes/columns,
  // so attach them vertically to keep them clear of the in-topic progression.
  const edges = edgeIndex.map((e) => {
    const sameTopic = topicOf(e.from) && topicOf(e.from) === topicOf(e.to);
    return {
      id: `dep-${e.i}`,
      fromNode: e.from, fromSide: sameTopic ? "right" : "bottom",
      toNode: e.to, toSide: sameTopic ? "left" : "top",
      edge_type: "depends_on",
    };
  });

  // Groups first so they render behind the file nodes; subjects before topics so
  // a topic box is never painted under its own lane.
  const subjectBoxes = groups.filter((g) => g.id.startsWith("subject-"));
  const topicBoxes = groups.filter((g) => g.id.startsWith("topic-"));
  const canvas = { nodes: [...subjectBoxes, ...topicBoxes, ...nodes], edges };
  fs.writeFileSync(OUT, JSON.stringify(canvas, null, "\t") + "\n");

  const crossTopic = edges.filter((e) => e.fromSide === "bottom").length;
  console.log(`wrote ${path.relative(ROOT, OUT)}: ${nodes.length} nodes, ${edges.length} edges `
    + `(${crossTopic} cross-topic), ${subjectBoxes.length} subjects, ${topicBoxes.length} topics`);
})();
