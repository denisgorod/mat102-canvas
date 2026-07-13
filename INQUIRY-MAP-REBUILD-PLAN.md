# Inquiry-Map Rendering — Rebuild & Refine Plan

> A rebuild of the **inquiry map** (`MAT102.canvas`, rendered by `viewer.js`) across three
> dimensions the maintainer chose: **visual/pedagogical**, **engine/performance**, and
> **zoom/navigation UX** — with an explicit decision on the CDN rendering library.
>
> Grounded in a full source audit of `viewer.js`, `reader.js`, `index.html`, the data files,
> `tools/**`, and the actual `json-canvas-viewer@4.3.2` source (npm-packed and read directly).
> Companion docs: `PERFORMANCE-AND-ZOOM-SCAFFOLDING.md` (the original LOD design; still the
> blueprint but partly superseded — see notes) and `READER-PROTOTYPE-SCOPE.md`.

## TL;DR

- **The map already reimplements most of a "viewer."** What it still borrows from
  `json-canvas-viewer` is a culled canvas draw (grid/group boxes/edges), a `pointeract` camera,
  and fit-to-bounds. Everything else — content rendering, edge labels, selection, hit-testing,
  camera animation, LOD — is app code fighting the library's defaults.
- **The #1 structural liability is the private-state reach-in:** pan/focus/LOD all depend on
  `findDataManagerModule` duck-typing the library's internal `DataManager` and mutating its
  private `data.{scale,offsetX,offsetY}`. The library is imported **unpinned**. A patch release
  can silently disable all navigation.
- **Recommended library path: incremental replacement (hybrid), not big-bang, not stay-put.**
  Pin/vendor 4.3.2 now; then own the camera-state, then own overlay virtualization, then
  optionally own the canvas draw — keeping `pointeract` for gestures. Each step is independently
  valuable and de-risks the next.
- **The biggest un-done wins are a build step (there is none today) and consuming `edge_type`.**
  A build step kills the 351-fetch + 351-parse cold start; `edge_type` is already in the data but
  the renderer never reads it, so today every edge label is the same grey.

---

## 1. Hard invariants — regressions here break the review map or the reader

These are contracts the rebuild must keep. They were verified as load-bearing across surfaces.

1. **`?canvas=<path>` and `?focus=<id-or-slug>`** URL contracts. `?focus` resolves as a raw
   canvas id (review map, ids *are* hierarchy ids) **or** a reader slug → hex id (inquiry map).
2. **`getNodeLabel` = `title || displayFileName(file) || id`** (with non-empty-trim guard). This
   single fallback is what lets one renderer serve both maps; review nodes carry `title`, inquiry
   file nodes don't.
3. **The slug↔nodeId join** built from `reader-data.json` basenames (`viewer.js:1585-1593`). It
   powers the cross-map bridge, `?focus=<slug>` deep-links, and reader-progress painting.
4. **Cross-map bridge f / f⁻¹** (`concludes` → review, `inquiry_sources` → inquiry), all fetched
   in try/catch so missing data degrades gracefully (button just hides).
5. **`reader.v1` localStorage shape** — the map reads `visited[slug].answered` and
   `frontier[].toSlug` to paint `rd-answered`/`rd-frontier`. The reader owns this key; keep the
   two fields stable.
6. **Edge-set identity** — `MAT102.canvas` edges ≡ `Bits/*.md` `children` (same pairs, same
   `question`=label, same `edge_type`), enforced by `check-sync.py`. Any edge change must round-trip
   `reconcile-edges.py` → `check-sync.py`.
7. **Layout is regenerable** (ELK tools) — but LOD band thresholds are calibrated to the current
   fit-scale, so re-layout ⇒ recompute band constants.
8. **Collapse wins over LOD** — `is-collapsed-hidden { display:none !important }` must always beat
   a band change.

## 2. The library decision (the requested call)

### Options

| Path | What it means | Pro | Con |
|---|---|---|---|
| **A. Pin & refine** | Vendor `json-canvas-viewer@4.3.2`, keep the architecture, fix defects on top | Lowest effort/risk; ships fast | Keeps the private-state DFS, the eager-unculled-overlay problem, and the selection conflict **forever** |
| **B. Own the renderer** | Drop the library; purpose-built canvas+overlay engine, camera state first-class | Highest ceiling; removes every liability; LOD/virtualization native | Big-bang risk; must re-earn `pointeract`-quality touch |
| **C. Incremental replacement (hybrid)** | Pin now → own camera-state → own overlay virtualization → own canvas draw; keep `pointeract` | Each step independently valuable; no big-bang; can stop when good enough | Spans several phases; transient two-worlds state |

### Recommendation: **C (incremental replacement).**

Rationale, from the audit:
- The app **already** owns content rendering, edge labels, hit-testing, focus/history, camera
  animation, and LOD. The library's remaining contribution is small and portable: ~150 lines of
  canvas drawing (grid + group boxes + bezier edges), the `pointeract` camera (a **standalone
  npm dep** we can use directly), and `resetView` fit-to-bounds.
- The two things that make the current design fragile — the **DFS into private `data.*`** and the
  **eager 351-overlay build the library won't let us skip** — are exactly what B/C remove and A
  cannot. Owning an explicit **camera-state object** is the single highest-leverage change and is
  independently shippable *before* touching the draw layer.
- A pure rewrite (B) throws away good, working code (the outgoing-panel inquiry loop, the collision
  edge-label placer, the tap-vs-pan detector, the cross-map bridge). C keeps them and swaps the
  foundation underneath.

**Do first, regardless of path:** pin/vendor `4.3.2`. The unpinned unpkg import is a live supply-chain
risk for zero benefit.

## 3. Foundation: a build step + CI (prerequisite for the perf goal)

There is **no build step and no `.github/workflows` today** — the site ships raw source, and first
paint blocks on 351 markdown fetches (concurrency 8) + 351 eager markdown parses behind the loading
overlay. This is the single biggest un-addressed item and it gates the engine work.

- **Bundle `Bits/**` into one JSON** at build time → one fetch instead of 351 (kills A1).
- **Pre-parse markdown→HTML** at build (kills A2/A3 — the client never parses). Callout + math-token
  protection moves to build; ship HTML with `$…$` still intact for MathJax.
- **Evaluate KaTeX** (synchronous, ~1/4 the size) to drop the ~1 MB MathJax cold-start (A5), or
  pre-render math at build. Decision needed (§9).
- **Content-hash query strings** for cache-busting; vendor MathJax/library for reproducible hosting.
- **CI gate**: run `check-sync.py` + `validate-drills.mjs` + the new build on every push. The repo
  already has these validators; they just aren't wired to CI.
- Keep the ELK layout tools as-is (layout stays regenerable, offline).

## 4. Rendering engine (the new core, phased in)

1. **Camera-state module** — one object `{scale, offsetX, offsetY}`, an explicit read/write API,
   and a rAF loop that redraws on change. Replaces `findDataManagerModule`. Everything (pan, focus,
   smooth-pan, LOD) routes through it. *This is Phase 1 and removes the #1 liability by itself.*
2. **Canvas layer** (port/own): grid, group boxes + label bars, bezier edges + arrowheads,
   viewport-culled. **New:** also draw cheap content-node placeholders/outlines at low LOD — the
   audit found the library draws *nothing* for content nodes (they were converted to text nodes),
   so band-0/1 currently has no canvas fallback. Owning this lets low zoom show lightweight boxes
   instead of relying entirely on hide/tiles.
3. **Overlay layer** — a single world-space container under the camera transform, **virtualized**:
   mount + parse only nodes within viewport+margin; unmount far ones. This *frees memory*, not just
   paint (LOD `display:none` today does neither the parse nor the memory). `content-visibility`
   stays as belt-and-suspenders.
4. **Port the good app code unchanged, decoupled from library internals:** outgoing question panel
   + Back "un-ask" history, tap-vs-pan detector, collision edge-label placer, group collapse,
   reader-progress painting, cross-map bridge.

## 5. Semantic zoom & navigation (finish what the doc specified)

- **Gate the edge-label *compute*, not just its CSS.** Today `renderEdgeLabels` (~1.7M geometric
  ops) still runs on every resize frame and every group toggle even when labels are hidden. Skip the
  invocation below the content band; spatially index node boxes (uniform grid) + early-exit on the
  first clean slot to kill C1. Fix the **18px-measure vs 14px-render font mismatch** (labels wrap
  early).
- **Band-gate MathJax** — the doc's recommendation that was never implemented (`enqueueMathNode` has
  no band check). Early-return below the content band; flush deferred nodes on entering it.
- **Table of contents**: decide (§9) whether to restore the doc's **2-tier subject→sub-topic**
  drill-down (bbox-derived; handle the 2 childless subjects — *Reading Mathematics*, *Quantifiers
  and Implications* — which are currently mixed in as topic tiles) or keep the flat 24-tile model but
  fix the subject/topic granularity mix.
- **Phase-3 polish**: snap-to-band on wheel-idle, `prefers-reduced-motion`, `?lod=off` A/B toggle,
  set band+viewport *before* first paint on deep-link.

## 6. Visual & pedagogical layer (the "read better" goal)

- **Encode `edge_type`** — the headline visual win. The data already carries
  `{prerequisite 399, related 12, analogy 4}`; the renderer ignores it and paints every label grey.
  Map `edge_type` → color/line-style so the graph's relationships become legible.
- **Encode role** — `bit` vs `exercise` (the canvas even has `color:"3"` on all 185 exercises).
  Distinct tint/silhouette so practice spurs read differently from the spine.
- **Course-spine payoff** — aggregate the ~33 cross-subject edges into subject-pair links between
  TOC tiles at band 0 (the "course about connections" encoding the doc points at but nobody built).
- **Live progress sync** — reader-progress is read once at load today; add a `storage` event listener
  so answering in a reader tab updates an open map tab.
- **a11y** — parallel DOM TOC list (overlays are `display:none` at low bands → invisible to
  screen readers / find-in-page), tile `role`/keyboard/focus ring, MathJax MathML/`assistiveMml`.
- The deferred "atlas" language (color-temperature arc, spine ribbon, edge-bundling) is a **stretch**
  — scope it explicitly rather than drift into it.

## 7. Suggested phasing

- **Phase 0 — De-risk & quick wins (low risk, no engine rewrite):** pin/vendor the library; add the
  build step + CI (bundle + pre-parse); **consume `edge_type` for edge colors**; fix the font
  mismatch; add live `storage` sync. Big perf + visual payoff immediately.
- **Phase 1 — Own the camera-state:** replace `findDataManagerModule`; route pan/focus/LOD through
  an owned camera object. Removes the #1 coupling; still sits on the library's canvas/overlay.
- **Phase 2 — Own the overlay layer:** virtualized mount/parse/unmount; frees memory; ends the
  eager-overlay problem.
- **Phase 3 — Own the canvas draw + gestures:** port the ~150-line canvas renderer, add low-LOD
  content placeholders, drive gestures via `pointeract` directly. Full independence from
  `json-canvas-viewer`.
- **Phase 4 — Finish LOD + visual/pedagogical + a11y:** compute-gated edge labels, band-gated
  MathJax, 2-tier TOC (if chosen), cross-subject spine, role/edge encodings, TOC list + tile a11y,
  snap-to-band.

Phases 0–1 are shippable independently and deliver most of the perf + "reads better" value before
any risky engine surgery.

## 8. Risks & watch-items

- **Basename-uniqueness landmine** — the whole id↔slug join keys on filename basename, unique today
  but unenforced. Add a build-time assertion.
- **Re-layout reshapes band constants** — treat `LOD_T1/T2` as derived from measured fit-scale.
- **Reader coupling** — `reader.v1` shape is a hard contract; the reader also carries a near-duplicate
  markdown pipeline (consider extracting a shared module during the build-step work).
- **No test harness exists** — add at least a smoke/verify path (drive the real map, assert bands +
  focus + a label render) before the engine swaps.

## 9. Decisions needed before Phase 0

1. **Library:** confirm the incremental-replacement recommendation (§2C), or prefer pin-&-refine only.
2. **Build tooling:** the repo mixes Python + Node — pick one for the new bundler/pre-parser
   (leaning Node, to reuse `marked`/the layout stack).
3. **Math:** keep MathJax, or switch to KaTeX / build-time pre-render (affects cold-start budget).
4. **Table of contents:** restore the 2-tier subject→sub-topic drill-down, or keep the flat tiles.
5. **Visual scope:** how far into the deferred "atlas" language to go in this pass.
