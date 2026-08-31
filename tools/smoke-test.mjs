#!/usr/bin/env node
// Browser smoke test for the deployed site. Serves the repository over HTTP and
// drives a real Chromium against it, because the failures that matter here are
// runtime ones the content pipeline cannot see: a module that throws during
// startup, a canvas that renders nothing, a focus deep-link that never opens the
// panel. Those all pass `check-sync` and the artifact diff while the page is
// blank.
//
//   node tools/smoke-test.mjs           # exits non-zero on any failed check
//
// Requires `playwright` (see tools/package.json). Honours PLAYWRIGHT_BROWSERS_PATH.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize, extname } from "node:path";
import { chromium } from "playwright";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.SMOKE_PORT || 8399);
const BASE = `http://127.0.0.1:${PORT}/index.html`;

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".canvas": "application/json; charset=utf-8", ".md": "text/markdown; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "");
    const path = join(ROOT, normalize(rel));
    if (!path.startsWith(ROOT) || !existsSync(path) || statSync(path).isDirectory()) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "content-type": MIME[extname(path)] || "application/octet-stream" });
    res.end(await readFile(path));
  } catch {
    res.writeHead(500).end("error");
  }
});
await new Promise((r) => server.listen(PORT, "127.0.0.1", r));

const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass: !!pass, detail });

// Resolve a browser. In CI `npx playwright install chromium` puts the matching
// build where playwright expects it; on a machine with a pre-installed browser
// (PLAYWRIGHT_BROWSERS_PATH) the pinned build may differ, so fall back to any
// Chromium present rather than failing on a version mismatch.
function resolveBrowser() {
  if (process.env.SMOKE_CHROME) return process.env.SMOKE_CHROME;
  try {
    const p = chromium.executablePath();
    if (existsSync(p)) return undefined; // playwright's own default is fine
  } catch { /* fall through to the scan below */ }
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (root && existsSync(root)) {
    for (const dir of readdirSync(root).filter((d) => d.startsWith("chromium-")).sort().reverse()) {
      for (const rel of ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium"]) {
        const candidate = join(root, dir, rel);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return undefined;
}

const executablePath = resolveBrowser();
if (executablePath) console.log(`using browser: ${executablePath}`);
const browser = await chromium.launch({ args: ["--no-sandbox"], ...(executablePath ? { executablePath } : {}) });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

// Page-level JS errors are failures wherever they happen.
const pageErrors = [];
ctx.on("page", (p) => p.on("pageerror", (e) => pageErrors.push(e.message)));

const overlayState = (page) => page.evaluate(() => {
  const ov = document.getElementById("loading-overlay");
  return {
    present: !!ov,
    isError: ov ? ov.classList.contains("is-error") : false,
    opacity: ov ? getComputedStyle(ov).opacity : null,
    message: document.getElementById("loading-error-msg")?.textContent || null,
  };
});

async function open(url, { waitPanel = false } = {}) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  if (waitPanel) {
    await page.waitForSelector(".outgoing-panel.is-visible", { timeout: 20000 }).catch(() => {});
  }
  await page.waitForFunction(() => {
    const ov = document.getElementById("loading-overlay");
    return !ov || ov.classList.contains("is-error") || getComputedStyle(ov).opacity === "0";
  }, null, { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(400);
  return page;
}

try {
  // --- 1. the inquiry map renders ---------------------------------------
  let page = await open(BASE);
  let ov = await overlayState(page);
  // Success means the overlay is gone (or fully faded) AND not showing an error.
  // Asserting `!present || !isError` would pass on a stuck spinner, which is the
  // one thing this check exists to catch.
  const dismissed = (o) => (!o.present || o.opacity === "0") && !o.isError;
  check("inquiry map: startup completes (overlay dismissed)", dismissed(ov), JSON.stringify(ov));
  const nodeCount = await page.locator(".JCV-overlay-container").count();
  check("inquiry map: nodes render", nodeCount > 300, `rendered ${nodeCount}`);
  const edgeCanvas = await page.locator("canvas").count();
  check("inquiry map: canvas layer present", edgeCanvas > 0, `${edgeCanvas} canvas element(s)`);
  await page.close();

  // --- 2. focus deep-link opens the panel with its questions ------------
  page = await open(`${BASE}?focus=what-is-a-definition`, { waitPanel: true });
  const panel = await page.locator(".outgoing-panel.is-visible").count();
  check("focus deep-link: outgoing panel opens", panel === 1);
  const links = await page.locator(".outgoing-link").count();
  check("focus deep-link: outgoing questions listed", links >= 1, `${links} question(s)`);
  const ask = await page.isVisible(".outgoing-ask").catch(() => false);
  check("focus deep-link: ask-a-question control present", ask);
  await page.close();

  // --- 3. an alternate canvas loads (?canvas=) --------------------------
  page = await open(`${BASE}?canvas=Talk.canvas&focus=forced-inquiry`, { waitPanel: true });
  check("alternate canvas: Talk.canvas focuses", await page.locator(".outgoing-panel.is-visible").count() === 1);
  check("alternate canvas: overlay dismissed", dismissed(await overlayState(page)));
  await page.close();

  // --- 4. the reader boots ---------------------------------------------
  page = await open(`${BASE}?mode=reader`);
  const readerRoot = await page.locator("#reader-root").count();
  check("reader: boots and renders its root", readerRoot === 1);
  check("reader: overlay dismissed", dismissed(await overlayState(page)));
  const readerLandmarks = await page.evaluate(() => ({
    mains: [...document.querySelectorAll("main")].filter((m) => m.offsetParent !== null || m === document.body).length,
    skipLinks: document.querySelectorAll("a.skip-link").length,
  }));
  check("reader: exactly one main landmark, no map-only skip link",
    readerLandmarks.mains === 1 && readerLandmarks.skipLinks === 0, JSON.stringify(readerLandmarks));
  await page.close();

  // --- 5. a missing canvas explains itself instead of spinning forever --
  page = await open(`${BASE}?canvas=__does_not_exist__.canvas`);
  ov = await overlayState(page);
  check("missing canvas: failure is surfaced, not a hung spinner",
    ov.present && ov.isError && /404/.test(ov.message || ""), JSON.stringify(ov));
  await page.close();

  // --- 6. accessibility guarantees -------------------------------------
  // The map draws to a canvas and hides node overlays with display:none below
  // the content band, so the outline is the only thing assistive technology can
  // reach. These assertions exist because that was measured at zero.
  page = await open(BASE);
  const a11y = await page.evaluate(() => {
    const nav = document.getElementById("course-outline");
    const links = nav ? [...nav.querySelectorAll("a")] : [];
    return {
      hasMain: !!document.querySelector("main"),
      hasH1: !!document.querySelector("h1"),
      title: document.title,
      outlineExists: !!nav,
      // display:none would remove it from the accessibility tree — the whole bug.
      outlineDisplay: nav ? getComputedStyle(nav).display : null,
      outlineHidden: nav ? nav.hidden : null,
      linkCount: links.length,
      emptyLinkLabels: links.filter((a) => !a.textContent.trim()).length,
      liveRegion: !!document.querySelector('[aria-live="polite"]'),
      skipLink: !!document.querySelector("a.skip-link"),
      // A role conveys no accessible NAME, so checking for it would let the
      // label be deleted while the assertion still passed. Require a name.
      unlabelledCanvas: [...document.querySelectorAll("canvas")]
        .filter((c) => !c.getAttribute("aria-label") && !c.getAttribute("aria-labelledby")).length,
      panelLabelled: (() => {
        const p = document.querySelector(".outgoing-panel");
        return !p || !!(p.getAttribute("aria-label") || p.getAttribute("aria-labelledby"));
      })(),
    };
  });
  const canvasFileNodes = JSON.parse(
    await readFile(join(ROOT, "MAT102.canvas"), "utf8")).nodes.filter((n) => n.type === "file").length;

  check("a11y: page has a main landmark and an h1", a11y.hasMain && a11y.hasH1, JSON.stringify(a11y));
  check("a11y: document title names the map", /MAT102/i.test(a11y.title), a11y.title);
  check("a11y: skip link present", a11y.skipLink);
  check("a11y: outline is in the accessibility tree (not display:none)",
    a11y.outlineExists && a11y.outlineHidden === false && a11y.outlineDisplay !== "none",
    JSON.stringify(a11y));
  check("a11y: every canvas node is reachable in the outline",
    a11y.linkCount === canvasFileNodes, `outline ${a11y.linkCount} vs canvas ${canvasFileNodes}`);
  check("a11y: no outline link is unlabelled", a11y.emptyLinkLabels === 0, `${a11y.emptyLinkLabels} empty`);
  check("a11y: live region present for focus announcements", a11y.liveRegion);
  check("a11y: drawing canvas is labelled", a11y.unlabelledCanvas === 0, `${a11y.unlabelledCanvas} unlabelled`);

  // Activating an outline entry must drive the real map, not just be a link.
  await page.evaluate(() => document.querySelector("#course-outline a")?.click());
  await page.waitForTimeout(1500);
  const drove = await page.evaluate(() => ({
    panel: document.querySelectorAll(".outgoing-panel.is-visible").length,
    announced: (document.getElementById("focus-announcer")?.textContent || "").trim(),
  }));
  check("a11y: outline entry focuses the node and announces it",
    drove.panel === 1 && drove.announced.length > 0, JSON.stringify(drove));
  check("a11y: outgoing panel is labelled", a11y.panelLabelled);

  // A tabbable link inside a clipped container is an invisible focus stop.
  // Tab past the skip link and confirm the outline actually reveals itself.
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const revealed = await page.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return { focused: (a.textContent || "").trim().slice(0, 40), onScreen: hit === a || a.contains(hit) };
  });
  check("a11y: focused outline link is actually visible, not a clipped tab stop",
    revealed.onScreen, JSON.stringify(revealed));
  await page.close();

  // --- 7. the review map ------------------------------------------------
  // A second shipped surface, generated by tools/layout-hierarchy.cjs. Its
  // defining property is that it mirrors the inquiry map's reading order, so
  // that is what gets asserted, not merely that it renders.
  page = await open(`${BASE}?canvas=MAT102-review.canvas`);
  const reviewNodes = await page.locator(".JCV-overlay-container").count();
  const reviewCanvas = JSON.parse(await readFile(join(ROOT, "MAT102-review.canvas"), "utf8"));
  const hierarchy = JSON.parse(await readFile(join(ROOT, "hierarchy-data.json"), "utf8"));
  check("review map: every hierarchy node renders",
    reviewNodes === Object.keys(hierarchy.nodes).length,
    `rendered ${reviewNodes} of ${Object.keys(hierarchy.nodes).length}`);
  check("review map: overlay dismissed", dismissed(await overlayState(page)));
  await page.close();

  // Topic order must follow the inquiry map's own left-to-right order.
  const inquiryCanvas = JSON.parse(await readFile(join(ROOT, "MAT102.canvas"), "utf8"));
  const slugify = (l) => String(l || "").toLowerCase()
    .replace(/[\u2010-\u2015]/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const iGroups = inquiryCanvas.nodes.filter((n) => n.type === "group");
  const contains = (o, i) => {
    const cx = +i.x + +i.width / 2, cy = +i.y + +i.height / 2;
    return cx >= +o.x && cx <= +o.x + +o.width && cy >= +o.y && cy <= +o.y + +o.height;
  };
  // smallest owning group of each inquiry file node = its topic, ordered by x
  const seen = new Map();
  for (const f of inquiryCanvas.nodes.filter((n) => n.type === "file")) {
    const owners = iGroups.filter((g) => contains(g, f))
      .sort((a, b) => (+a.width * +a.height) - (+b.width * +b.height));
    if (owners.length) seen.set(slugify(owners[0].label), +owners[0].x);
  }
  const reviewTopics = reviewCanvas.nodes
    .filter((n) => n.type === "group" && n.id.startsWith("topic-"))
    .sort((a, b) => a.x - b.x)
    .map((n) => n.id.replace(/^topic-/, ""));
  const expected = reviewTopics.slice().sort((a, b) => (seen.get(a) ?? 1e9) - (seen.get(b) ?? 1e9));
  check("review map: topic order mirrors the inquiry map",
    JSON.stringify(reviewTopics) === JSON.stringify(expected),
    `got ${reviewTopics.join(" > ")}`);

  // The cross-map bridge only exists where a bit declares `concludes:`.
  page = await open(`${BASE}?canvas=MAT102-review.canvas&focus=gcd-bezout`, { waitPanel: true });
  const bridge = await page.evaluate(() =>
    [...document.querySelectorAll("button, a")].some((el) => /how it.s discovered/i.test(el.textContent || "")));
  check("review map: cross-map bridge to the inquiry map is present", bridge);
  await page.close();

  check("no uncaught page errors", pageErrors.length === 0, pageErrors.join(" | "));
} finally {
  await browser.close();
  server.close();
}

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? "  ✓" : "  ✗"} ${r.name}${r.pass || !r.detail ? "" : `  << ${r.detail}`}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
