# mat102-canvas

An **inquiry map** for MAT102 (Introduction to Mathematical Proofs, University of Toronto
Mississauga): the course as a graph of small ideas, where **every edge carries the question that
motivates the next idea**.

It is a static site — vanilla JavaScript, no framework, no bundler, no backend, no secrets —
served from GitHub Pages.

---

## The idea in one paragraph

Students arrive with less sustained-reading practice than a textbook presumes, and comprehension
tends to break during the reading, before the mathematics is reached. Simplifying the mathematics
is not available: the rigour is the content. So the lever is **unit size**. Each idea is one short
file (median 248 words; none exceeds 400). Small units alone would fragment the subject, so a
second restriction supplies the connective structure: **an edge may exist only if it carries a
question a student would actually ask at that point.** No question, no edge. That constraint forces
the inquiry on the author at writing time and on the student at reading time — navigating the
course *is* selecting a question.

## Two graphs and a bridge

| | **Inquiry map** | **Review map** |
|---|---|---|
| Question it answers | How is this discovered? | How is this organised? |
| Source | `Bits/*.md` + `MAT102.canvas` | `Hierarchy/*.md` + `MAT102-review.canvas` |
| Size | 351 nodes (166 ideas, 185 exercises), 415 edges | 6 nodes, 5 edges (modular-arithmetic slice) |
| Edges mean | the question motivating the next idea | mathematical dependency (`depends_on`) |

They are joined by a function **f : bits → hierarchy**, encoded as `concludes:` on an inquiry bit
("this inquiry branch concludes in that hierarchy node"). `build-hierarchy.py` inverts it into each
hierarchy node's `inquiry_sources`, so the review map can jump back to "how it was discovered".

Edge relationships are typed: 399 `prerequisite`, 12 `related`, 4 `analogy`. Only the rarer two are
coloured, so genuine cross-links read as highlights instead of drowning in the prerequisite lattice.

## Surfaces

| URL | What it is |
|---|---|
| `index.html` | The inquiry map (default). Pan/zoom canvas with semantic zoom. |
| `index.html?focus=<id-or-slug>` | Opens focused on one node, with its outgoing questions in a panel. |
| `index.html?canvas=<path>` | Renders **any** JSONCanvas file — used by the review map and the talk map. |
| `index.html?mode=reader` | The reader: one bit at a time, choose-a-question navigation, a trail rail, and spaced review of exercises. |

`?focus=` accepts either a raw canvas node id or a reader slug (a bit's frontmatter `id`).

## Repository layout

```
Bits/*.md              166 ideas + 185 exercises. Frontmatter holds the graph.
Hierarchy/*.md         Canonical reference statements for the review map.
Talk/*.md              A 9-node talk about the methodology (see TALK-NOTES.md).
MAT102.canvas          Obsidian canvas: the inquiry map's node positions + edges.
MAT102-review.canvas   Obsidian canvas: the review map.
Talk.canvas            Obsidian canvas: the talk map.

index.html             Shell: styles, loading overlay, failure handler, module router.
viewer.js              The map: rendering, camera, focus, semantic zoom, panels.
reader.js              The reader prototype (?mode=reader).
vendor/                Pinned json-canvas-viewer 4.3.2 (vendored, not fetched at runtime).

reader-data.json       ┐
hierarchy-data.json    ├ Generated. Committed. CI fails if stale.
content-bundle.json    ┘

tools/                 Build, validation and layout scripts (never shipped).
archive/               Removed features, kept intact and runnable. See archive/drills/.
```

## The data model

A bit's frontmatter *is* the graph. `MAT102.canvas` mirrors it for visual editing in Obsidian.

```yaml
---
id: theorems-and-friends
title: "Theorems and friends"
role: bit                      # bit | exercise
group: reading-mathematics
children:
  - id: mathematical-results-are-infallible
    question: "How reliable are these results?"   # the edge label — required
    edge_type: prerequisite                       # prerequisite | related | analogy
parents: [what-is-a-definition]
concludes: mod-arithmetic      # optional: f, into the review map
student_questions:             # optional: instructor-reviewed student questions
  - question: "..."
    status: pending            # pending | accepted | dismissed
    source_issue: 42
    submitted: 2026-07-14
---
```

Two invariants matter:

1. **Edge-set identity.** The edges in `MAT102.canvas` and the `children:` blocks must describe the
   same graph — same pairs, same `question`, same `edge_type`. `tools/check-sync.py` enforces it.
2. **Basename ↔ slug join.** The map joins canvas nodes to reader slugs by markdown *basename*.
   Basenames must stay unique.

`student_questions` is deliberately *not* an edge: it is an annotation, invisible to `check-sync.py`
and to the canvas, so accumulated questions never clutter the graph.

## Working on it

Requirements: Python 3.12 with `pyyaml`, Node 20.

```bash
python3 -m http.server 8137     # then open http://localhost:8137/index.html
```

A plain `file://` open will not work — the page fetches its canvas and content, which browsers
block on `file://`.

### Editing content

1. Edit `Bits/*.md`, or drag edges in Obsidian on `MAT102.canvas`.
2. If you edited the canvas, write the change back to frontmatter:
   `python3 tools/reconcile-edges.py`
3. Verify the two agree: `python3 tools/check-sync.py` → *IN SYNC — 415 edges*.
4. Regenerate the artifacts and commit them:

```bash
python3 tools/build-reader-data.py
python3 tools/build-hierarchy.py
node tools/build-content-bundle.mjs
```

### Checks

```bash
python3 tools/check-sync.py        # canvas ⇄ frontmatter edge parity
cd tools && npm install            # once, for the browser test
node tools/smoke-test.mjs          # drives real Chromium against the real page
```

The smoke test starts its own HTTP server and asserts what the content pipeline cannot see: the map
renders its nodes, a `?focus=` deep-link opens the panel, an alternate `?canvas=` loads, the reader
boots, no uncaught page errors — and that a **missing canvas shows an error rather than hanging on
the loading spinner**.

### Tools

| Script | Purpose |
|---|---|
| `check-sync.py` | Fails on any canvas ⇄ frontmatter edge divergence. |
| `reconcile-edges.py` | Writes canvas-only edges back into frontmatter. |
| `build-reader-data.py` | → `reader-data.json` (nodes, edges, student questions). |
| `build-hierarchy.py` | → `hierarchy-data.json`, inverting `concludes:` into `inquiry_sources`. |
| `build-content-bundle.mjs` | → `content-bundle.json`; one fetch instead of 351 at load. |
| `smoke-test.mjs` | Browser smoke test (above). |
| `apply-student-question.py` | Folds an approved student question into a bit (used by CI). |
| `reflow-horizontal.cjs`, `relayout-topics.cjs`, `layout-hierarchy.cjs` | ELK-based canvas layout. |

## Student questions → curriculum

Every node in the map carries **Ask a question about this node**. The loop behind it:

1. The button opens a prefilled [GitHub Issue Form](.github/ISSUE_TEMPLATE/student-question.yml)
   carrying the node's slug, basename and title.
2. The issue is auto-labelled `student-question`.
3. An instructor adds the **`approved`** label. Only users with write access can apply labels, so
   the label *is* the authorization — there is no command parsing and no trust in issue text.
4. [`student-question-accept.yml`](.github/workflows/student-question-accept.yml) runs
   `apply-student-question.py`, which appends one `student_questions` entry to the target bit,
   regenerates the artifacts, and opens a pull request.
5. The instructor reviews the one-entry diff, edits the wording, optionally sets
   `status: accepted`, and merges. Merging redeploys the site.

The pull request is the human-in-the-loop step. The script writes **only** from the Issue Form's
parsed structured fields, never from free issue prose — that is the injection boundary.

> Requires the repository setting *Settings → Actions → General → Allow GitHub Actions to create
> and approve pull requests*.

**Known limitation:** submitting requires a GitHub account. The intake is a plain deep link with no
backend, so it can later be replaced — behind the same button — by a `fetch()` POST to a small
serverless proxy holding a fine-grained token, with the Issue Form kept as the no-JS fallback.

## Continuous integration

[`ci.yml`](.github/workflows/ci.yml) runs on every push and pull request:

1. **Canvas ⇄ frontmatter edge sync** — `check-sync.py`.
2. **Regenerate all derived artifacts**, then fail if the working tree differs. Stale generated
   data cannot ship.
3. **Browser smoke test** — the real page in real Chromium.

## Deployment

GitHub Pages serves `main` directly; `.nojekyll` disables Jekyll processing. There is no build step
at deploy time — the generated JSON is committed, which is why CI guards its freshness. Merging to
`main` publishes.

## Runtime behaviour worth knowing

- **State is local.** The reader keeps everything under the `reader.v1` localStorage key
  (`visited`, `frontier`, `trail`, `srs`). Nothing is sent anywhere; there is no account and no
  server. Clearing site data resets progress.
- **Startup failures are visible.** The loading overlay is removed only on success, so an uncaught
  startup error (missing canvas, malformed JSON, failed preload) is rendered *into* the overlay
  with the underlying message rather than leaving a spinner. Covered by the smoke test.
- **Degradation.** `reader-data.json` and `hierarchy-data.json` are fetched in `try`/`catch` by the
  map; if absent, reader-progress painting and the cross-map bridge switch off and the map still
  works. `content-bundle.json` is an optimisation — without it the map falls back to per-file
  fetches.
- **Math** renders through MathJax loaded `async` from a CDN; a slow or blocked CDN delays
  typesetting but never blocks the map.

## Archive

`archive/` holds features removed from the live site but kept intact, runnable and documented.
Currently `archive/drills/` — parametric auto-graded practice questions, with their engine, the 7
authored specs, a property test, and restoration instructions. Spaced repetition itself was **not**
removed: the reader still schedules and reviews exercises.

## Talk

`Talk.canvas` + `Talk/*.md` are a nine-node presentation about this methodology, rendered by the
same viewer (`index.html?canvas=Talk.canvas&focus=reading-load`). Running order, per-beat narration
cues and the live-demo runbook are in [`TALK-NOTES.md`](TALK-NOTES.md).

## Design documents

- [`INQUIRY-MAP-REBUILD-PLAN.md`](INQUIRY-MAP-REBUILD-PLAN.md) — rendering-engine audit and the
  phased plan for owning the camera, overlay virtualisation and canvas draw.
- [`PERFORMANCE-AND-ZOOM-SCAFFOLDING.md`](PERFORMANCE-AND-ZOOM-SCAFFOLDING.md) — the level-of-detail
  design.
- [`READER-PROTOTYPE-SCOPE.md`](READER-PROTOTYPE-SCOPE.md) — what the reader is and is not.

## Status

A working prototype in real use, not a finished product. Known gaps: student intake needs a GitHub
account; the review map covers only the modular-arithmetic slice; 96% of edges are still
`prerequisite`, so the inquiry framing is real in the edge *labels* and aspirational in the
*topology*; the map is not yet keyboard- or screen-reader-navigable.
