#!/usr/bin/env node
// Bundle every Bits/** and Hierarchy/** markdown file into one JSON keyed by
// basename, so the viewer makes ONE fetch at load instead of ~351. Ships raw
// file text (frontmatter included); consumers strip frontmatter exactly as they
// do for per-file fetches, so the bundle is a faithful mirror of the files.
//
// The basename is the join key the whole app already uses (canvas node.file →
// basename → slug), so this also asserts basename uniqueness — the latent
// collision hazard flagged in the audit becomes a hard build error here.
//
// Regenerate after any content change:  node tools/build-content-bundle.mjs
// Output: content-bundle.json at the repo root (committed, like reader-data.json).

import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["Bits", "Hierarchy"];

const walk = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith(".md")) out.push(p);
  }
  return out;
};

const files = DIRS.flatMap((d) => walk(join(ROOT, d))).sort(); // sorted → deterministic
const bundle = {};
const origin = {};              // basename → first repo-relative path that claimed it
const collisions = [];

for (const path of files) {
  const base = basename(path);
  const rel = relative(ROOT, path);
  if (base in bundle) {
    collisions.push(`${base}: ${origin[base]}  vs  ${rel}`);
    continue;
  }
  origin[base] = rel;
  bundle[base] = readFileSync(path, "utf8");
}

if (collisions.length > 0) {
  console.error("✗ Duplicate basenames — the basename join key must be unique:");
  for (const c of collisions) console.error("  " + c);
  process.exit(1);
}

const outPath = join(ROOT, "content-bundle.json");
const json = JSON.stringify(bundle); // minified: this is a generated perf artifact
writeFileSync(outPath, json);
console.log(`wrote content-bundle.json: ${Object.keys(bundle).length} files, ${(json.length / 1024).toFixed(0)} KB`);
