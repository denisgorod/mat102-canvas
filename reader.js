// Reader-first prototype — "read a bit → pick your next question → advance".
// A mode of the same app (?mode=reader[&topic=slug]); the canvas viewer is untouched.
// Tests the inquiry loop on one self-contained topic (default: Modular Arithmetic)
// with Frontier + localStorage coverage/resume. SRS layer is a separate step.

import { parser } from "./vendor/json-canvas-viewer-4.3.2/chimp.js";
import { makeInstance, checkAnswer, formatAnswer } from "./drill-engine.js";

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

// Parametric drills authored in bit frontmatter -> registry keyed drill:<bit>:<id>.
const DRILLS = {};
for (const [slug, n] of Object.entries(NODES)) for (const sp of (n.drills || [])) DRILLS[`drill:${slug}:${sp.id}`] = { bitSlug: slug, spec: sp };
const bitDrillKeys = (slug) => (NODES[slug]?.drills || []).map((sp) => `drill:${slug}:${sp.id}`);

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

// Session state: a Practice run over one bit's drills, or a Review pass over due
// items (drills auto-graded; exercises self-rated).
let session = null;   // { items:[{kind:'drill',key}|{kind:'exercise',slug}], pos, review, inst }
let preSession = null;
const currentItem = () => (session ? session.items[session.pos] : null);

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
  .rd-card.practice-drill { border-left:4px solid #0ea5e9; }
  .rd-drill-progress { font-size:13px; color:var(--obs-muted); margin-bottom:16px; }
  .rd-muted { color:var(--obs-muted); }
  .rd-drill-prompt { font-size:22px; line-height:1.5; color:#1f2937; margin:8px 0 4px; }
  .rd-drill-form { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:8px; }
  .rd-drill-input { font:inherit; font-size:16px; padding:8px 12px; border:1px solid var(--obs-border); border-radius:8px; min-width:180px; }
  .rd-drill-input:focus { outline:none; border-color:var(--obs-accent); }
  .rd-check, .rd-next { border-color:var(--obs-accent); color:var(--obs-accent); font-weight:600; }
  .rd-mc { display:flex; flex-direction:column; gap:10px; margin:8px 0 12px; max-width:560px; }
  .rd-mc-opt { text-align:left; border:1px solid var(--obs-border); background:#fff; border-radius:10px; padding:11px 14px; font:inherit; font-size:15px; cursor:pointer; }
  .rd-mc-opt:hover:not(:disabled) { border-color:var(--obs-accent); background:#f8fafc; }
  .rd-mc-opt.ok { border-color:#10b981; background:rgba(16,185,129,.1); color:#047857; font-weight:600; }
  .rd-mc-opt.no { border-color:#ef4444; background:rgba(239,68,68,.08); color:#b91c1c; }
  .rd-mc-opt:disabled { cursor:default; }
  .rd-drill-feedback { flex-basis:100%; margin-top:8px; font-size:15px; }
  .rd-drill-feedback.ok { color:#047857; font-weight:600; }
  .rd-drill-feedback.no { color:#b91c1c; font-weight:600; }
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

function makePracticeCard(slug) {
  const n = bitDrillKeys(slug).length;
  const b = document.createElement("button");
  b.className = "rd-card practice-drill"; b.type = "button";
  b.innerHTML = `<span class="rd-q">✎ Practice — ${n} drill${n > 1 ? "s" : ""}</span><span class="rd-gloss">auto-graded questions with fresh numbers each time</span>`;
  b.addEventListener("click", () => startPractice(slug));
  return b;
}

// Self-rating panel for an exercise. inSession = shown inside a Review pass
// (rating advances the session rather than just rescheduling).
function renderRating(box, inSession) {
  const s = store.srs[current];
  const wrap = document.createElement("div");
  wrap.className = "rd-rating";
  wrap.innerHTML = `<div class="rd-cards-h" style="margin-top:0">${inSession ? `Review — ${session.pos + 1} of ${session.items.length}` : "Try it, then rate yourself"}</div>
    <div class="rd-rating-row">
      <button class="rd-rate rd-got" type="button">Got it ✓</button>
      <button class="rd-rate rd-miss" type="button">Missed it ✗</button>
      ${inSession ? '<button class="rd-rate rd-skip" type="button">Skip</button>' : ""}
    </div>
    <div class="rd-sched">${s ? `Next review ${fmtDue(s.due)}.` : "Not yet scheduled — rating adds it to your reviews."}</div>`;
  wrap.querySelector(".rd-got").addEventListener("click", () => (inSession ? reviewRate(true) : (rateExercise(current, true), afterRate())));
  wrap.querySelector(".rd-miss").addEventListener("click", () => (inSession ? reviewRate(false) : (rateExercise(current, false), afterRate())));
  if (inSession) wrap.querySelector(".rd-skip").addEventListener("click", sessionAdvance);
  box.appendChild(wrap);
}
function afterRate() { renderReviewBadge(); renderActions(); }

function appendEndSession(box) {
  const end = document.createElement("button");
  end.className = "rd-rate rd-skip"; end.type = "button";
  end.textContent = `End ${session.review ? "review" : "practice"}`;
  end.style.marginTop = "10px";
  end.addEventListener("click", endSession);
  box.appendChild(end);
}

// Bottom section for a normal bit/exercise (drill items use renderDrillScreen).
function renderActions() {
  const box = $(".rd-cards");
  box.innerHTML = "";
  if (session) { renderRating(box, true); appendEndSession(box); return; } // exercise item in a Review pass
  if (isExercise(current)) renderRating(box, false);
  if (!isExercise(current) && bitDrillKeys(current).length) box.appendChild(makePracticeCard(current));
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

const typesetMath = (el) => { if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([el]).catch(() => {}); };

// Auto-graded drill screen (drill items, in Practice or Review). Text-entry for
// numeric/boolean/predicate/fraction types; clickable options for multiple choice.
function renderDrillScreen() {
  const it = currentItem();
  const inst = session.inst;
  const spec = inst.spec;
  const bit = NODES[DRILLS[it.key].bitSlug];
  $(".rd-asked").hidden = true;
  $(".rd-title").textContent = session.review ? "Review" : "Practice";
  $(".rd-back").disabled = false;
  const content = $(".rd-content");
  content.style.opacity = "1";
  content.innerHTML = `<div class="rd-drill-progress">${session.review ? "Review" : "Practice"} — ${session.pos + 1} of ${session.items.length} · <span class="rd-muted">${bit?.title || ""}</span></div><div class="rd-drill-prompt"></div>`;
  const promptEl = content.querySelector(".rd-drill-prompt");
  promptEl.textContent = inst.prompt;
  typesetMath(promptEl);

  const box = $(".rd-cards");
  box.innerHTML = "";
  const fb = document.createElement("div");
  fb.className = "rd-drill-feedback";
  const nextBtn = document.createElement("button");
  nextBtn.className = "rd-rate rd-next"; nextBtn.type = "button";
  nextBtn.textContent = session.pos < session.items.length - 1 ? "Next →" : "Finish";
  nextBtn.style.display = "none";
  nextBtn.addEventListener("click", sessionAdvance);

  let checked = false;
  const grade = (answer) => {
    if (checked) return;
    checked = true;
    const correct = checkAnswer(inst, answer);
    rateExercise(it.key, correct);
    fb.className = "rd-drill-feedback " + (correct ? "ok" : "no");
    // Build feedback via the DOM (never innerHTML) — drill content is authored,
    // but this keeps content strictly text. MathJax still typesets $...$.
    fb.textContent = correct ? "✓ Correct" : "✗ Not quite — answer: ";
    if (!correct) { const b = document.createElement("b"); b.textContent = formatAnswer(inst); fb.appendChild(b); typesetMath(fb); }
    nextBtn.style.display = "";
    renderReviewBadge();
  };

  if (spec.type === "mc") {
    const mc = document.createElement("div");
    mc.className = "rd-mc";
    inst.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "rd-mc-opt"; b.type = "button"; b.textContent = opt; // textContent, not innerHTML; MathJax typesets the LaTeX
      b.addEventListener("click", () => {
        if (checked) return;
        grade(i);
        mc.querySelectorAll(".rd-mc-opt").forEach((el, j) => { el.disabled = true; if (j === inst.correct) el.classList.add("ok"); else if (j === i) el.classList.add("no"); });
      });
      mc.appendChild(b);
    });
    box.appendChild(mc);
    typesetMath(mc);
  } else {
    const ph = spec.type === "boolean" ? "true / false"
      : spec.type === "set" ? "e.g. 1, 3, 5"
      : spec.type === "predicate" ? spec.inputs.join(", ")
      : spec.type === "fraction" ? "e.g. 3/4" : "Your answer";
    const form = document.createElement("div");
    form.className = "rd-drill-form";
    const input = document.createElement("input");
    input.className = "rd-drill-input"; input.type = "text"; input.autocomplete = "off"; input.placeholder = ph;
    const checkBtn = document.createElement("button");
    checkBtn.className = "rd-rate rd-check"; checkBtn.type = "button"; checkBtn.textContent = "Check";
    const submit = () => { grade(input.value); input.disabled = true; checkBtn.style.display = "none"; };
    checkBtn.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); checked ? sessionAdvance() : submit(); } });
    form.append(input, checkBtn);
    box.appendChild(form);
    setTimeout(() => input.focus(), 0);
  }

  const endBtn = document.createElement("button");
  endBtn.className = "rd-rate rd-skip"; endBtn.type = "button";
  endBtn.textContent = `End ${session.review ? "review" : "practice"}`;
  endBtn.style.marginLeft = "8px";
  endBtn.addEventListener("click", endSession);
  box.append(nextBtn, endBtn, fb);
}

function renderReviewBadge() {
  const n = dueCount();
  const btn = $(".rd-review");
  btn.textContent = n > 0 ? `✦ Review ${n}` : "Review";
  btn.classList.toggle("has-due", n > 0);
  btn.disabled = Boolean(session) || n === 0; // never start a new review over an active session
}

function startPractice(slug) {
  const items = bitDrillKeys(slug).map((key) => ({ kind: "drill", key }));
  if (!items.length) return;
  preSession = current; session = { items, pos: 0, review: false, inst: null };
  enterItem();
}
function startReview() {
  if (session) return; // don't clobber an in-progress session
  const due = dueSlugs();
  if (!due.length) return;
  const items = due.map((k) => (DRILLS[k] ? { kind: "drill", key: k } : { kind: "exercise", slug: k }));
  preSession = current; session = { items, pos: 0, review: true, inst: null };
  enterItem();
}
function enterItem() {
  const it = currentItem();
  if (it.kind === "drill") { session.inst = makeInstance(DRILLS[it.key].spec); current = DRILLS[it.key].bitSlug; }
  else { session.inst = null; current = it.slug; }
  arrivingQuestion = null;
  renderBit();
}
function reviewRate(gotIt) { rateExercise(current, gotIt); sessionAdvance(); }
function sessionAdvance() {
  session.pos += 1;
  if (session.pos < session.items.length) enterItem();
  else endSession();
}
function endSession() {
  session = null;
  if (preSession) current = preSession;
  arrivingQuestion = null;
  renderBit();
}

async function renderBit() {
  if (session && currentItem().kind === "drill") {
    renderDrillScreen(); renderReviewBadge(); renderCoverage(); renderFrontier();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
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
  if (session) { endSession(); return; }
  if (!store.history.length) return;
  current = store.history.pop();
  arrivingQuestion = null;
  save();
  renderBit();
}

renderBit();
