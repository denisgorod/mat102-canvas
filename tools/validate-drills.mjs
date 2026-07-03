#!/usr/bin/env node
// Build-time validation for parametric drills, using the SAME engine the reader
// uses (drill-engine.js). For every authored drill (from reader-data.json) plus
// a set of built-in self-tests covering each answer type, it samples many
// instances and asserts: constraints are satisfiable, nothing throws, the
// correct answer grades as correct, and a deliberately wrong answer is rejected.
//
//   node tools/validate-drills.mjs        # exits non-zero on any failure
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { makeInstance, checkAnswer, formatAnswer, evalExpr } from "../drill-engine.js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(readFileSync(join(ROOT, "reader-data.json"), "utf8"));
const N = 400;

// Built-in specs so every answer type is exercised even when not yet authored.
const BUILTIN = [
  { label: "(builtin) number/tol", spec: { id: "sqrt", prompt: "$\\sqrt{%a%}$?", vars: { a: { int: [2, 90] } }, answer: "sqrt(a)", tol: 0.01, type: "number" } },
  { label: "(builtin) fraction", spec: { id: "frac", prompt: "reduce", vars: { a: { int: [2, 40] }, b: { int: [2, 40] } }, num: "a", den: "b", type: "fraction" } },
  { label: "(builtin) mc", spec: { id: "mc", prompt: "pick", options: ["A", "B", "C", "D"], answer: 2, type: "mc" } },
  { label: "(builtin) predicate/bezout", spec: { id: "bez", prompt: "bezout", vars: { a: { int: [3, 40] }, b: { int: [3, 40] } }, inputs: ["m", "n"], answer: "a*m + b*n == gcd(a,b)", witness: { m: "bezx(a,b)", n: "bezy(a,b)" }, type: "predicate" } },
];

const drills = [
  ...Object.entries(data.nodes).flatMap(([slug, node]) => (node.drills || []).map((spec) => ({ label: `${slug}/${spec.id}`, spec }))),
  ...BUILTIN,
];

function correctInputFor(inst) {
  const { spec } = inst;
  if (spec.type === "mc") return inst.correct;
  if (spec.type === "predicate") {
    if (!spec.witness) throw new Error(`predicate drill "${spec.id}" needs a \`witness\` (an expression per input) so validation can construct a correct answer`);
    return spec.inputs.map((k) => evalExpr(spec.witness[k], inst.vars)).join(",");
  }
  return formatAnswer(inst);
}
function wrongInputFor(inst, correctInput) {
  const { spec } = inst;
  if (spec.type === "mc") return (inst.correct + 1) % inst.options.length;
  if (spec.type === "boolean") return formatAnswer(inst) === "True" ? "false" : "true";
  if (spec.type === "predicate") return spec.inputs.map((k, i) => evalExpr(spec.witness[k], inst.vars) + (i === 0 ? 1 : 0)).join(",");
  if (spec.type === "integer" || spec.type === "mod" || spec.type === "number") return String(Number(correctInput) + 1 + (spec.tol || 0));
  return null; // set / fraction: skip the wrong-answer check
}

let failures = 0;
for (const { label, spec } of drills) {
  try {
    for (let t = 0; t < N; t++) {
      const inst = makeInstance(spec);
      const correct = correctInputFor(inst);
      if (!checkAnswer(inst, correct)) throw new Error(`correct answer rejected (vars=${JSON.stringify(inst.vars)}, input=${correct})`);
      const wrong = wrongInputFor(inst, correct);
      if (wrong !== null && checkAnswer(inst, wrong)) throw new Error(`wrong answer accepted (input=${wrong})`);
    }
    console.log(`  ✓ ${label} (${spec.type}) — ${N} instances`);
  } catch (e) {
    console.error(`  ✗ ${label}: ${e.message}`);
    failures++;
  }
}

console.log(`\n${drills.length} drills, ${failures} failing.`);
process.exit(failures ? 1 : 0);
