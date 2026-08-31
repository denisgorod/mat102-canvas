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
  check("inquiry map: startup completes (no stuck overlay)", !ov.present || !ov.isError, JSON.stringify(ov));
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
  await page.close();

  // --- 4. the reader boots ---------------------------------------------
  page = await open(`${BASE}?mode=reader`);
  const readerRoot = await page.locator("#reader-root").count();
  check("reader: boots and renders its root", readerRoot === 1);
  await page.close();

  // --- 5. a missing canvas explains itself instead of spinning forever --
  page = await open(`${BASE}?canvas=__does_not_exist__.canvas`);
  ov = await overlayState(page);
  check("missing canvas: failure is surfaced, not a hung spinner",
    ov.present && ov.isError && /404/.test(ov.message || ""), JSON.stringify(ov));
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
