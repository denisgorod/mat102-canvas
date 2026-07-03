#!/usr/bin/env node
// Build-time validation for parametric drills, using the SAME engine the reader
// uses (drill-engine.js) so there's no divergence. For every drill in
// reader-data.json it samples many instances and asserts: constraints are
// satisfiable, the answer expression never throws, the correct answer grades as
// correct, and an off-by-one (or negated boolean) grades as incorrect.
//
//   node tools/validate-drills.mjs        # exits non-zero on any failure
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { makeInstance, computeAnswer, checkAnswer, formatAnswer } from "../drill-engine.js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(readFileSync(join(ROOT, "reader-data.json"), "utf8"));
const N = 400;

const drills = [];
for (const [slug, node] of Object.entries(data.nodes))
  for (const spec of node.drills || []) drills.push({ slug, spec });

let failures = 0;
for (const { slug, spec } of drills) {
  let ok = 0;
  for (let t = 0; t < N; t++) {
    try {
      const { vars } = makeInstance(spec);
      const ans = computeAnswer(spec, vars);
      const correctStr = formatAnswer(spec, vars);
      if (!checkAnswer(spec, vars, correctStr)) throw new Error("correct answer rejected");
      // a deliberately wrong answer must be rejected
      const wrong = spec.type === "boolean" ? (ans ? "false" : "true")
        : spec.type === "set" ? "" : String(Number(ans) + 1);
      if (spec.type !== "set" && checkAnswer(spec, vars, wrong)) throw new Error("wrong answer accepted");
      ok++;
    } catch (e) {
      if (failures < 10) console.error(`  ✗ ${slug} / ${spec.id}: ${e.message}`);
      failures++;
      break;
    }
  }
  if (ok === N) console.log(`  ✓ ${slug} / ${spec.id} (${spec.type}) — ${N} instances`);
}

console.log(`\n${drills.length} drills, ${failures} failing.`);
process.exit(failures ? 1 : 0);
