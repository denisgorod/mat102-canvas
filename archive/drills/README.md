# Archived: parametric drills

Auto-graded, parameterised practice questions. Removed from the live site; kept here
intact and runnable so the work is recoverable and the design is on record.

## Why it was archived

Drills were a second, largely independent product living inside the map: an expression
evaluator, an answer-grading layer, a practice/session UI, and a CI validation step —
all serving 7 authored questions on 6 hierarchy nodes. The map's own concern is the
inquiry structure (nodes and the questions on the edges). Carrying a grading engine
alongside it made the prototype harder to reason about and to present without
clarifying what the map is for.

Spaced repetition **was not removed**. The reader still schedules and reviews
*exercises* on a Leitner ladder (`store.srs`); only the auto-graded drill items are
gone, so a Review pass now contains exercises only.

## What is here

| File | Purpose |
|---|---|
| `drill-engine.js` | The engine: variable sampling under constraints, a small safe expression evaluator, answer checking and formatting. No dependencies. |
| `specs.json` | The 7 authored drill specs, keyed by hierarchy node id, lifted verbatim out of `Hierarchy/*.md` frontmatter. |
| `validate-drills.mjs` | Property test: samples 400 instances per spec and asserts constraints are satisfiable, nothing throws, the correct answer grades correct and a wrong one is rejected. Also exercises 4 built-in specs covering every answer type. |

It still runs, standalone, with no build step:

```bash
node archive/drills/validate-drills.mjs      # 11 drills, 0 failing
```

That command is the check that this archive is still coherent. It is deliberately not
in CI — nothing ships from this directory.

## Answer types the engine supported

`number` (with `tol`), `integer`, `boolean`, `fraction` (`num`/`den`, reduced),
`mc` (multiple choice, `options` + index), and `predicate` — the interesting one: the
student supplies values for named `inputs` and the answer is any assignment satisfying
a condition, checked by evaluating `answer` (e.g. Bézout coefficients, where
`a*m + b*n == gcd(a,b)` has many valid answers). `witness` gives the validator one
known-good assignment per input so it can construct a correct answer to test with.

## Restoring

1. Merge each entry of `specs.json` back into the matching `Hierarchy/<id>.md` frontmatter
   under `drills:`.
2. Move `drill-engine.js` back to the repository root and `validate-drills.mjs` to `tools/`,
   reverting the two import/path edits made when they were archived (the engine import
   becomes `../drill-engine.js`; specs come from `reader-data.json` rather than `specs.json`).
3. Re-add the drill inheritance in `tools/build-reader-data.py` (hierarchy `id → drills`,
   surfaced onto bits through `concludes:`) and the `drills` key in `tools/build-hierarchy.py`.
4. Restore the reader's drill path in `reader.js`: the `DRILLS` registry, `renderDrillScreen`,
   the practice card, `startPractice`, the drill branch in `enterItem`/`renderBit`, and the
   `.rd-drill-*` / `.rd-mc*` CSS.
5. Re-add the validation step to `.github/workflows/ci.yml`.

The commit that archived this contains the exact reverse of every step above.
