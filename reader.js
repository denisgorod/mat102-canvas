// Reader-first prototype — "read a bit → pick your next question → advance".
// A mode of the same app (?mode=reader[&topic=slug]); the canvas viewer is untouched.
// Tests the inquiry loop on one self-contained topic (default: Modular Arithmetic)
// with Frontier + localStorage coverage/resume. SRS layer is a separate step.

import { parser } from "https://unpkg.com/json-canvas-viewer/dist/chimp.js";

const params = new URLSearchParams(location.search);
const TOPIC = params.get("topic") || "modular-arithmetic";
const STORE_KEY = "reader.v1";

// ---------------------------------------------------------------------------
// Markdown → HTML with Obsidian callouts + preserved LaTeX (same approach as the
// canvas viewer, kept local so the prototype can't destabilise viewer.js).
// ---------------------------------------------------------------------------
const escapeRegex = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const replaceAllLiteral = (t, s, r) => t.split(s).join(r);
const stripFrontmatter = (text) => {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("---")) return text;
  const after = trimmed.slice(3);
  const close = after.search(/^---\s*$/m);
  return close === -1 ? text : after.slice(close + 3).replace(/^\r?\n/, "");
};
const extractMathSegments = (md) => {
  const segments = [];
  let out = "";
  const push = (seg) => { out += `@@MATH_${segments.length}@@`; segments.push(seg); };
  for (let i = 0; i < md.length; i += 1) {
    const c = md[i];
    if (c !== "$" || md[i - 1] === "\\") { out += c; continue; }
    if (md[i + 1] === "$") {
      const end = md.indexOf("$$", i + 2);
      if (end !== -1) { push(md.slice(i, end + 2)); i = end + 1; continue; }
    }
    let inlineEnd = -1;
    for (let j = i + 1; j < md.length; j += 1) {
      if (md[j] === "\n") break;
      if (md[j] === "$" && md[j - 1] !== "\\" && md[j + 1] !== "$") { inlineEnd = j; break; }
    }
    if (inlineEnd !== -1) { push(md.slice(i, inlineEnd + 1)); i = inlineEnd; continue; }
    out += c;
  }
  return { markdown: out, segments };
};
const restoreMathSegments = (html, segs) => {
  let r = html;
  segs.forEach((seg, i) => { r = replaceAllLiteral(r, `@@MATH_${i}@@`, seg); });
  return r;
};
const CALLOUT_TITLES = { d: "Definition", e: "Exercise", s: "Statement", p: "Proof", t: "Theorem", note: "Note", info: "Info", tip: "Tip", warning: "Warning", example: "Example", quote: "Quote", idea: "Idea", question: "Question" };
const CALLOUT_CLASS = { d: "definition", e: "exercise", s: "statement", p: "proof", t: "theorem" };
const mathParser = async (text) => {
  const lines = text.split(/\r?\n/);
  const callouts = [];
  const outLines = [];
  const startRe = /^\s*>\s*\[!([^\]]+)\]\s*(.*)$/;
  const quotedRe = /^\s*>\s?(.*)$/;
  for (let i = 0; i < lines.length; i += 1) {
    const m = startRe.exec(lines[i]);
    if (!m) { outLines.push(lines[i]); continue; }
    const typeKey = m[1].trim().replace(/[+-]$/, "").toLowerCase();
    const title = (m[2] || "").trim();
    const body = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      if (startRe.exec(lines[j])) break;
      const q = quotedRe.exec(lines[j]);
      if (q) { body.push(q[1]); i = j; continue; }
      break;
    }
    callouts.push({ typeKey, title, content: body.join("\n") });
    outLines.push(`@@CALLOUT_${callouts.length - 1}@@`);
  }
  const { markdown, segments } = extractMathSegments(outLines.join("\n"));
  let html = restoreMathSegments(await parser(markdown), segments);
  const rendered = await Promise.all(callouts.map(async (c) => {
    const cls = (CALLOUT_CLASS[c.typeKey] ?? c.typeKey).toLowerCase().replace(/[^a-z0-9_-]/g, "") || "note";
    const titleText = c.title || CALLOUT_TITLES[c.typeKey] || c.typeKey;
    return `<div class="callout callout-${cls}"><div class="callout-title">${titleText}</div><div class="callout-content">${await mathParser(c.content)}</div></div>`;
  }));
  rendered.forEach((h, i) => {
    const tok = `@@CALLOUT_${i}@@`;
    html = html.replace(new RegExp(`<p>\\s*${escapeRegex(tok)}\\s*</p>`, "g"), h).replace(tok, h);
  });
  return html;
};

// ---------------------------------------------------------------------------
// Data + graph
// ---------------------------------------------------------------------------
const data = await (await fetch("./reader-data.json")).json();
const NODES = data.nodes;
const outEdges = {};
data.edges.forEach((e) => { (outEdges[e.from] ||= []).push(e); });

const inTopic = (slug) => NODES[slug] && NODES[slug].group === TOPIC;
const isSpine = (slug) => {
  const n = NODES[slug];
  return n && n.group === TOPIC && (n.curriculum_path === true || (n.curriculum_path == null && n.role === "bit"));
};
const spineSlugs = Object.keys(NODES).filter(isSpine);
// topic entry: a spine bit with no in-topic incoming edge
const inTopicIndeg = {};
spineSlugs.forEach((s) => (inTopicIndeg[s] = 0));
data.edges.forEach((e) => { if (inTopic(e.from) && inTopic(e.to) && isSpine(e.to)) inTopicIndeg[e.to] = (inTopicIndeg[e.to] || 0) + 1; });
const ROOT = spineSlugs.find((s) => !inTopicIndeg[s]) || spineSlugs[0];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const load = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } };
const store = load();
store.visited ||= {};      // slug -> { firstSeen, answered }
store.frontier ||= [];     // [{ fromSlug, toSlug, question }]
store.history ||= [];      // slug stack (for Back)
store.srs ||= {};          // exerciseSlug -> { box, due, reps, lapses, last }
const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(store));

// ?start=<slug> (e.g. arriving from the map) wins over the saved resume point.
const START = params.get("start");
let current = (START && NODES[START]) ? START : (NODES[store.last] ? store.last : ROOT);
let arrivingQuestion = null;
const contentCache = new Map();

// Review session state (a pass over exercises that are due).
let reviewActive = false, reviewQueue = null, reviewPos = 0, preReview = null;

// --- Spaced repetition: a Leitner ladder over exercises (exercises are review-
// only; they never count toward spine coverage). An exercise enters the schedule
// the first time you rate it, then resurfaces when due. Gentle: a badge, not a gate.
const DAY = 86400000;
const SRS_LADDER = [1, 3, 7, 16, 35, 75]; // days between reviews, per box
const isExercise = (slug) => NODES[slug]?.role === "exercise";
const nowMs = () => Date.now();
const dueSlugs = () => Object.entries(store.srs)
  .filter(([, s]) => s.due <= nowMs())
  .sort((a, b) => a[1].due - b[1].due)
  .map(([slug]) => slug);
const dueCount = () => dueSlugs().length;
const fmtDue = (due) => { const d = Math.round((due - nowMs()) / DAY); return d <= 0 ? "now" : d === 1 ? "in 1 day" : `in ${d} days`; };
function rateExercise(slug, gotIt) {
  const s = store.srs[slug] || { box: -1, reps: 0, lapses: 0 };
  if (gotIt) { s.box = Math.min((s.box ?? -1) + 1, SRS_LADDER.length - 1); s.reps = (s.reps || 0) + 1; }
  else { s.box = 0; s.lapses = (s.lapses || 0) + 1; }
  s.last = nowMs();
  s.due = nowMs() + SRS_LADDER[Math.max(0, s.box)] * DAY;
  store.srs[slug] = s;
  save();
}

// ---------------------------------------------------------------------------
// DOM + styles
// ---------------------------------------------------------------------------
document.getElementById("loading-overlay")?.remove();
const canvasRoot = document.getElementById("canvas-root");
if (canvasRoot) canvasRoot.style.display = "none";
document.documentElement.style.overflow = "auto";
// index.html paints a dark canvas backdrop; the reader is a light reading surface.
document.documentElement.style.background = "#ffffff";
document.body.style.cssText += ";overflow:auto;background:#ffffff;color:var(--obs-text);min-height:100vh;";

const style = document.createElement("style");
style.textContent = `
  #reader-root { max-width: 1100px; margin: 0 auto; padding: 0 20px 120px; color: var(--obs-text); font-family: var(--obs-font-text); display: grid; grid-template-columns: 1fr 260px; gap: 28px; }
  #reader-main { min-width: 0; }
  .rd-topbar { position: sticky; top: 0; z-index: 5; background: #fff; display: flex; align-items: center; gap: 14px; padding: 14px 0 12px; border-bottom: 1px solid var(--obs-border); }
  .rd-back, .rd-map { border: 1px solid var(--obs-border); background: var(--obs-bg-soft); border-radius: 7px; padding: 6px 12px; font: inherit; cursor: pointer; }
  .rd-back:disabled { opacity: .4; cursor: default; }
  .rd-map { color: var(--obs-text); }
  .rd-map:hover { border-color: var(--obs-accent); }
  .rd-coverage { margin-left: auto; font-size: 13px; color: var(--obs-muted); display: flex; align-items: center; gap: 8px; }
  .rd-bar { width: 120px; height: 6px; border-radius: 999px; background: var(--obs-bg-soft); overflow: hidden; }
  .rd-bar > i { display: block; height: 100%; background: var(--obs-accent); }
  .rd-asked { margin: 18px 0 4px; color: var(--obs-muted); font-size: 14px; }
  .rd-asked b { color: var(--obs-text); font-weight: 600; }
  .rd-title { font-size: 1.5em; font-weight: 700; color: #1f2937; margin: 6px 0 14px; }
  .rd-content { font-size: 16px; line-height: 1.6; transition: opacity .18s ease; }
  .rd-content h1,.rd-content h2,.rd-content h3 { color:#1f2937; line-height:1.3; margin:.6em 0 .4em; }
  .rd-content p,.rd-content li { margin: 0 0 .7em; }
  .rd-content ul,.rd-content ol { margin: .2em 0 .8em 1.35em; padding: 0; }
  .rd-content code { font-family: var(--obs-font-mono); background: rgba(148,163,184,.18); border-radius: 4px; padding: .08em .32em; }
  .rd-content a { color: var(--obs-accent); text-decoration: none; }
  .rd-cards-h { margin: 26px 0 10px; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--obs-muted); font-weight: 700; }
  .rd-card { display: block; width: 100%; text-align: left; border: 1px solid var(--obs-border); background: #fff; border-radius: 10px; padding: 12px 14px; margin: 0 0 10px; cursor: pointer; font: inherit; transition: border-color .12s, background .12s, transform .06s; }
  .rd-card:hover { border-color: var(--obs-accent); background: #f8fafc; }
  .rd-card:active { transform: translateY(1px); }
  .rd-q { display: block; font-size: 15px; color: var(--obs-text); }
  .rd-gloss { display: block; font-size: 12px; color: var(--obs-muted); margin-top: 3px; }
  .rd-card.primary { border-left: 4px solid var(--obs-accent); }
  .rd-card.primary .rd-q { font-weight: 650; }
  .rd-card.practice { border-left: 4px solid #8b5cf6; }
  .rd-card.exit { opacity: .62; border-style: dashed; }
  .rd-frontier { border-left: 1px solid var(--obs-border); padding-left: 20px; }
  .rd-frontier h3 { font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--obs-muted); margin: 16px 0 10px; }
  .rd-fitem { display:block; width:100%; text-align:left; border:1px solid var(--obs-border); background: var(--obs-bg-soft); border-radius:8px; padding:8px 10px; margin:0 0 8px; cursor:pointer; font:inherit; font-size:13px; line-height:1.3; }
  .rd-fitem:hover { border-color: var(--obs-accent); }
  .rd-fitem small { display:block; color: var(--obs-muted); margin-top:2px; }
  .rd-empty { color: var(--obs-muted); font-size: 13px; }
  .rd-review { border:1px solid var(--obs-border); background:var(--obs-bg-soft); border-radius:7px; padding:6px 12px; font:inherit; cursor:pointer; color:var(--obs-text); }
  .rd-review.has-due { border-color:#f59e0b; background:rgba(245,158,11,.14); color:#b45309; font-weight:650; }
  .rd-review:disabled { opacity:.45; cursor:default; }
  .rd-rating { border:1px solid var(--obs-border); background:var(--obs-bg-soft); border-radius:10px; padding:12px 14px; margin:22px 0 4px; }
  .rd-rating-row { display:flex; gap:10px; margin-top:8px; flex-wrap:wrap; }
  .rd-rate { border:1px solid var(--obs-border); border-radius:8px; padding:8px 14px; font:inherit; cursor:pointer; background:#fff; }
  .rd-got { border-color:#10b981; color:#047857; }
  .rd-got:hover { background:rgba(16,185,129,.1); }
  .rd-miss { border-color:#ef4444; color:#b91c1c; }
  .rd-miss:hover { background:rgba(239,68,68,.1); }
  .rd-skip { color:var(--obs-muted); }
  .rd-sched { font-size:12px; color:var(--obs-muted); margin-top:10px; }
  @media (max-width: 820px) { #reader-root { grid-template-columns: 1fr; } .rd-frontier { border-left: none; border-top: 1px solid var(--obs-border); padding-left: 0; } }
`;
document.head.appendChild(style);

const root = document.createElement("div");
root.id = "reader-root";
root.innerHTML = `
  <main id="reader-main">
    <div class="rd-topbar">
      <button class="rd-back" type="button">← Back</button>
      <button class="rd-review" type="button" title="Review exercises that are due"></button>
      <div class="rd-coverage"><span class="rd-cov-text"></span><span class="rd-bar"><i></i></span></div>
      <button class="rd-map" type="button" title="See this bit on the map">🗺 Map</button>
    </div>
    <div class="rd-asked" hidden></div>
    <div class="rd-title"></div>
    <div class="rd-content"></div>
    <div class="rd-cards"></div>
  </main>
  <aside class="rd-frontier"><h3>Your open questions</h3><div class="rd-flist"></div></aside>`;
document.body.appendChild(root);

const $ = (s) => root.querySelector(s);
$(".rd-back").addEventListener("click", goBack);
$(".rd-map").addEventListener("click", () => {
  const u = new URL("./", location.href);
  u.searchParams.set("focus", current);
  location.href = u.toString();
});
$(".rd-review").addEventListener("click", startReview);

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
async function fetchContent(slug) {
  if (contentCache.has(slug)) return contentCache.get(slug);
  const node = NODES[slug];
  let html = "<p><em>(missing content)</em></p>";
  try {
    const text = stripFrontmatter(await (await fetch("./" + node.file)).text());
    html = await mathParser(text);
  } catch (e) { console.warn("reader: content load failed", slug, e); }
  contentCache.set(slug, html);
  return html;
}

function cardKind(edge) {
  const t = NODES[edge.to];
  if (!t || t.group !== TOPIC) return "exit";
  if (t.role === "exercise") return "practice";
  return "primary";
}
const GLOSS = {
  primary: "the next step",
  practice: "practice what you just read",
  exit: (edge) => `leads to ${NODES[edge.to]?.group || "another topic"}`,
};
const KIND_ORDER = { primary: 0, practice: 1, exit: 2 };

function renderCoverage() {
  const done = spineSlugs.filter((s) => store.visited[s]?.answered).length;
  $(".rd-cov-text").textContent = `${NODES[ROOT] ? TOPIC.replace(/-/g, " ") : ""} ${done}/${spineSlugs.length}`;
  $(".rd-bar > i").style.width = `${Math.round((done / spineSlugs.length) * 100)}%`;
}

function renderFrontier() {
  const list = $(".rd-flist");
  const items = store.frontier.filter((f) => !store.visited[f.toSlug]?.answered);
  if (!items.length) { list.innerHTML = `<p class="rd-empty">Questions you skip will collect here.</p>`; return; }
  list.innerHTML = "";
  items.forEach((f) => {
    const b = document.createElement("button");
    b.className = "rd-fitem"; b.type = "button";
    b.innerHTML = `${f.question}<small>from “${NODES[f.fromSlug]?.title || f.fromSlug}”</small>`;
    b.addEventListener("click", () => goTo(f.toSlug, f.question));
    list.appendChild(b);
  });
}

function makeCard(e) {
  const kind = cardKind(e);
  const gloss = typeof GLOSS[kind] === "function" ? GLOSS[kind](e) : GLOSS[kind];
  const b = document.createElement("button");
  b.className = `rd-card ${kind}`; b.type = "button";
  b.innerHTML = `<span class="rd-q">${e.question || "Go to: " + (NODES[e.to]?.title || e.to)}</span><span class="rd-gloss">${gloss}</span>`;
  b.addEventListener("click", () => chooseCard(e));
  return b;
}

// Self-rating panel for an exercise (adds/updates its spaced-repetition schedule).
function renderRating(box, inReview) {
  const s = store.srs[current];
  const wrap = document.createElement("div");
  wrap.className = "rd-rating";
  wrap.innerHTML = `<div class="rd-cards-h" style="margin-top:0">${inReview ? `Review — ${reviewPos + 1} of ${reviewQueue.length} due` : "Try it, then rate yourself"}</div>
    <div class="rd-rating-row">
      <button class="rd-rate rd-got" type="button">Got it ✓</button>
      <button class="rd-rate rd-miss" type="button">Missed it ✗</button>
      ${inReview ? '<button class="rd-rate rd-skip" type="button">Skip</button>' : ""}
    </div>
    <div class="rd-sched">${s ? `Next review ${fmtDue(s.due)}.` : "Not yet scheduled — rating adds it to your reviews."}</div>`;
  wrap.querySelector(".rd-got").addEventListener("click", () => (inReview ? reviewRate(true) : (rateExercise(current, true), afterRate())));
  wrap.querySelector(".rd-miss").addEventListener("click", () => (inReview ? reviewRate(false) : (rateExercise(current, false), afterRate())));
  if (inReview) wrap.querySelector(".rd-skip").addEventListener("click", reviewAdvance);
  box.appendChild(wrap);
}
function afterRate() { renderReviewBadge(); renderActions(); }

// The bottom section: in review it's the rating; otherwise the question cards
// (with a rating panel first when the current node is an exercise).
function renderActions() {
  const box = $(".rd-cards");
  box.innerHTML = "";
  if (reviewActive) {
    renderRating(box, true);
    const end = document.createElement("button");
    end.className = "rd-rate rd-skip"; end.type = "button"; end.textContent = "End review";
    end.style.marginTop = "10px";
    end.addEventListener("click", exitReview);
    box.appendChild(end);
    return;
  }
  if (isExercise(current)) renderRating(box, false);
  const edges = (outEdges[current] || []).slice().sort((a, b) => KIND_ORDER[cardKind(a)] - KIND_ORDER[cardKind(b)]);
  if (edges.length) {
    const h = document.createElement("div"); h.className = "rd-cards-h";
    h.textContent = isExercise(current) ? "Where next?" : "What do you want to ask next?";
    box.appendChild(h);
    edges.forEach((e) => box.appendChild(makeCard(e)));
  } else if (!isExercise(current)) {
    box.insertAdjacentHTML("beforeend", `<div class="rd-cards-h">End of this thread</div><p class="rd-empty">No further questions branch from here — head back or pick one from your open questions.</p>`);
  }
}

function renderReviewBadge() {
  const n = dueCount();
  const btn = $(".rd-review");
  btn.textContent = n > 0 ? `✦ Review ${n}` : "Review";
  btn.classList.toggle("has-due", n > 0);
  btn.disabled = n === 0 && !reviewActive;
}

function startReview() {
  const due = dueSlugs();
  if (!due.length) return;
  preReview = current; reviewQueue = due; reviewPos = 0; reviewActive = true;
  current = reviewQueue[0]; arrivingQuestion = null; renderBit();
}
function reviewRate(gotIt) { rateExercise(current, gotIt); reviewAdvance(); }
function reviewAdvance() {
  reviewPos += 1;
  if (reviewQueue && reviewPos < reviewQueue.length) { current = reviewQueue[reviewPos]; arrivingQuestion = null; renderBit(); }
  else exitReview();
}
function exitReview() {
  reviewActive = false; reviewQueue = null; reviewPos = 0;
  if (preReview) current = preReview;
  arrivingQuestion = null; renderBit();
}

async function renderBit() {
  const node = NODES[current];
  store.visited[current] = store.visited[current] || { firstSeen: true };
  store.last = current; save();

  const asked = $(".rd-asked");
  if (arrivingQuestion) { asked.hidden = false; asked.innerHTML = `You asked: <b>${arrivingQuestion}</b> — here's the answer.`; }
  else asked.hidden = true;
  $(".rd-title").textContent = node?.title || current;
  $(".rd-back").disabled = store.history.length === 0;

  const contentEl = $(".rd-content");
  contentEl.style.opacity = "0";
  const html = await fetchContent(current);
  contentEl.innerHTML = html;
  if (window.MathJax?.typesetPromise) {
    try { if (window.MathJax.startup?.promise) await window.MathJax.startup.promise; await window.MathJax.typesetPromise([contentEl]); }
    catch (e) { console.warn("MathJax:", e); }
  }
  requestAnimationFrame(() => { contentEl.style.opacity = "1"; });

  renderReviewBadge();
  renderActions();
  renderCoverage();
  renderFrontier();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
function chooseCard(edge) {
  // finishing a bit = read AND chose a question (the click is the evidence)
  store.visited[current] = { firstSeen: true, answered: true };
  // unpicked siblings that lead somewhere unvisited → Frontier
  (outEdges[current] || []).forEach((oe) => {
    if (oe === edge) return;
    if (store.visited[oe.to]?.answered) return;
    if (store.frontier.some((f) => f.fromSlug === current && f.toSlug === oe.to)) return;
    store.frontier.push({ fromSlug: current, toSlug: oe.to, question: oe.question });
  });
  goTo(edge.to, edge.question);
}

// Navigate to a node, pushing the view we're leaving onto the history stack so
// Back always returns to where you just were (card advance or Frontier jump alike).
function goTo(slug, question) {
  if (!NODES[slug] || slug === current) return;
  store.history.push(current);
  store.frontier = store.frontier.filter((f) => f.toSlug !== slug);
  current = slug;
  arrivingQuestion = question || null;
  save();
  renderBit();
}

function goBack() {
  if (reviewActive) { exitReview(); return; }
  if (!store.history.length) return;
  current = store.history.pop();
  arrivingQuestion = null;
  save();
  renderBit();
}

renderBit();
