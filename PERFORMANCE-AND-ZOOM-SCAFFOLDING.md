# MAT102 Canvas Viewer — Performance Report & Zoom-Scaffolding Design

> Analysis of `viewer.js` / `index.html` against the `json-canvas-viewer` v4.3.2 library,
> plus a design for the "zoom in/out to scaffold a huge graph into a table of contents" feature.
> Findings below were produced by direct source inspection of both the app **and** the library
> kernel, then adversarially re-verified (6 confirmed / 2 corrected of the 8 highest-severity claims; 0 refuted).

## TL;DR

The single most important insight is that **the scaffolding feature and the performance fix are the same lever.**

- The map is a **44,860 × 40,991** coordinate space (fitting the whole thing on a 1080p screen means zooming to **~0.026×**, where 16px text is ~0.4px tall — illegible). So the "too big to see at once" problem is real and structural.
- The library draws nodes on **two layers**: a cheap `<canvas>` that **is** viewport-culled, and an HTML **overlay layer that builds a heavy DOM subtree for all 351 content nodes with no culling and never removes them.** That overlay layer is both the perf bottleneck *and* the thing you want to hide when zoomed out.
- Therefore: **gate the overlays by zoom level using the group hierarchy already in the data** (8 subjects → 22 sub-topics → 351 nodes). Zoomed out, you render 8 tiles and a culled canvas outline — fast *and* a clean table of contents. Zoomed in, you reveal detail for the region in view. One mechanism, both goals.

## The subject at hand

| Fact | Value |
|---|---|
| Nodes | **381** = 30 group nodes + 351 file (content) nodes |
| Edges | **415** — every edge carries a text label |
| Coordinate space | **44,860 × 40,991** units (~1.84 B sq units) |
| Whole-map fit scale | **~0.026×** @ 1920×1080, **~0.019×** @ 1366×768 |
| Unique markdown files | **351** (166 in `Bits/`, 185 in `Bits/Exercises/`) — **434 KB** total |
| Math / callouts in corpus | ~5,300 inline math spans, 178 display blocks, 438 callouts |
| Group hierarchy | **8 top-level subjects → 22 sub-topic groups → file nodes** |
| Library modules loaded | **none** (built-in `Minimap`, `Controls`, `DebugPanel` are all unused) |

**Library architecture (verified from unminified source):**

- **`Renderer.js` (canvas layer)** — draws node outlines, group label bars, file titles, and edges+labels to a `<canvas>`, and **culls to the viewport** (`if (isOutside(box, viewport)) return;` in `redraw`). Cheap and self-contained; nothing here reads overlay state.
- **`OverlayManager.js` (HTML layer)** — `renderOverlays()` iterates the **entire** `nodeMap` and creates a `.JCV-overlay-container` (with parsed-markdown innerHTML) for **every content node, with zero viewport culling**. Overlays are only ever removed on full `restart()`/`dispose()`. `updateOverlays()` (runs every frame) only sets a CSS `transform` on the single parent layer.
- Because the canvas draws each node's outline/label independently, **hiding an overlay never blanks the node** — the outline still comes from the culled canvas. The app already proves this with its `is-collapsed-hidden { display:none }` collapse feature. This is what makes zoom-gated overlay hiding safe.

---

## Performance issues (ranked)

Severities: **Critical** = seconds of stall or blocks the stated goal · **High** = clear jank on core interactions · **Medium/Low** = additive overhead.

### A. Startup path

**A1 — [Critical] First paint is blocked on 351 markdown fetches behind a full-screen overlay.**
`preloadFileContents()` is `await`-ed at module top level (`viewer.js:320`) *before* the viewer is constructed, behind the dark `#loading-overlay` that only fades at `viewer.js:342`. It fetches all **351** unique files at concurrency **8** (`withConcurrency(8, …)`), i.e. ~44 serial round-trip waves on a cold cache — several seconds of black screen before a single node is drawn, even though only a handful of nodes are ever on screen.
*Fix:* don't gate first paint on all content. Render the structure immediately and load each file's body lazily as its node approaches the viewport (the library's `loading:'lazy'` option and the app's own `IntersectionObserver` already provide the hooks). If pre-embedding stays, at minimum concatenate `Bits/**` into **one** JSON bundle at build time (single fetch) and draw the canvas before fetching.
*Verified nuance:* the 4-candidate fallback in `fetchFirstReachable` does **not** add round-trips here — the first candidate (the node's own path) always resolves, so it's 1 RTT/file. The problem is the count × concurrency behind a blocking overlay, not retries.

**A2 — [Critical] All 351 overlays + markdown parses are built eagerly on load with no culling.** *(`OverlayManager.renderOverlays`)*
For each of the 351 nodes the app converts to text, `renderOverlays` runs `await this.parse(text)` (the app's `mathParser`) and injects a ~5-element DOM subtree carrying the fully-parsed markdown. None are viewport-culled; none are ever removed for the session. With only a few nodes visible at any zoom, ~100% of this is off-screen work that permanently inflates the DOM and keeps pan/zoom compos+hit-test heavy.
*Fix:* this is exactly what the zoom-LOD design (below) neutralizes — at low zoom, don't build/paint the 351 overlays at all. Short of that, `content-visibility` (B1) removes their *render* cost but not their construction cost.

**A3 — [High] `mathParser` runs 351× at load, re-parsing every callout recursively.** *(`viewer.js:206–307`)*
Each call scans the markdown char-by-char for `$…$` (an inner forward-scan per `$`, O(n²)-prone on math-dense files), `await`s the library markdown parser, then for **every callout** recursively calls `mathParser` again on the callout body (**438** extra nested parses across the corpus). Nothing is cached, so the many files embedded more than once are parsed repeatedly.
*Fix:* only parse mounted/visible nodes (ties into LOD); **cache parse output by file basename**; consider pre-parsing markdown→HTML at build time (see F).

**A4 — [Medium] `structuredClone` of the whole canvas + full node rebuild on the main thread.** *(`viewer.js:309, 329–336`)* A deep clone of 381 nodes / 415 edges (~300 KB of embedded text) plus a `.map()` that reallocates all 351 nodes, synchronously right before the (already expensive) viewer construction. *Fix:* shallow-clone and mutate in place, or skip the file→text conversion entirely and load lazily.

**A5 — [Medium] MathJax `tex-chtml` (~1 MB) is on the cold-start critical path.** *(`index.html:506–521)`* Fine that `startup.typeset:false`, but the first visible typeset `await`s the full MathJax bootstrap while it races the 351 file fetches and font download. *Fix:* self-host + `<link rel=preload>`, or evaluate **KaTeX** (synchronous, far smaller — see F), or pre-render math at build time.

### B. Rendering / memory

**B1 — [High] No `content-visibility` on overlays — the browser lays out & paints all 351 every frame.** There is currently **no** `content-visibility`/`contain` anywhere. Adding `content-visibility:auto; contain-intrinsic-size: …` to `.JCV-overlay-container` is **near-free virtualization**: the browser skips layout/paint/hit-test for off-screen overlays while preserving box geometry (the library already sets exact inline `width`/`height`, so the intrinsic size is known). *Caveat (verified):* this cuts **per-frame render** cost only — it does **not** free DOM memory or the A2/A3 startup parse.

**B2 — [Low] Built-in `Minimap`/`Controls` are dead code — but don't naively enable `Minimap`.** Passing no modules means no cost today. `Controls` (zoom buttons/slider) is a cheap, worthwhile add. `Minimap`, however, draws **all 381 nodes/edges once and never reflects collapse/LOD state**, so it would mislead as a "table of contents." Prefer an app-drawn TOC.

### C. Steady-state interaction

**C1 — [Critical] `renderEdgeLabels` is a ~1.9M-operation collision pass that reruns on every resize and every group toggle.** *(`viewer.js:1044–1173`)*
For each of 415 labeled edges × 12 candidate positions, `visibleNodeBoxes.reduce(…)` scans **all 381 node boxes with no short-circuit** → **1,897,380** `overlapArea` calls per invocation (exact), plus up to ~1.9M `intersects` calls. It fires on **every** `resize` event (unthrottled, `viewer.js:1213`) and **every** group toggle (`viewer.js:1018`) — i.e. directly on the collapse/expand interaction that scaffolding depends on.
*Fix:* debounce resize; cull to edges near the viewport; spatially index node boxes (grid/quadtree); early-exit once a non-overlapping slot is found; and **hide edge labels entirely below a zoom threshold** so this cost vanishes when zoomed out.

**C2 — [High] `renderEdgeLabels` rebuilds throwaway state every call.** *(`viewer.js:1076–1091`)* A fresh 381-entry `Map`, a fresh 381-box array, and a **new `<canvas>` + 2D context** are allocated each call, with `measureText` per word for all 415 labels. All static. *Fix:* hoist the node map, box array, and measuring canvas to module scope; memoize per-label line-wrapping.

**C3 — [High] A single group toggle chains two full 351-overlay scans + a 30-header DOM rebuild + the C1 relayout.** *(`viewer.js:1006–1023`)* `recomputeCollapsedHiddenNodes` → `applyCollapsedNodeVisibility` (`querySelectorAll` over all overlays) → `renderGroupControls` (`innerHTML=''` + rebuild 30 headers with fresh listeners, **and calls `applyCollapsedNodeVisibility` a second time**) → `renderEdgeLabels` → `refresh`. The core LOD interaction is the most expensive one. *Fix:* update only the toggled group's header in place; call visibility once; maintain an `id→overlay` map instead of re-`querySelectorAll`; precompute a `group→nodeIds` index so `recomputeCollapsedHiddenNodes` is O(hidden) not O(groups×nodes).

**C4 — [Medium] `smoothPanToNode` calls `viewer.refresh()` every animation frame.** *(`viewer.js:854–883`)* ~31 full canvas redraws per click-to-navigate — and the library's `Controller` already auto-refreshes when `scale`/`offset` change, so the manual per-frame `refresh()` is largely redundant. *Fix:* mutate `dataManager.data.*` and let the built-in rAF loop redraw; keep one final `refresh()`.

**C5 — [Medium] The `MutationObserver` re-scans subtrees on every label/header rebuild.** *(`viewer.js:1341–1456`)* *Verified correction:* it watches `childList`/`subtree` only, so **pan/zoom (a CSS transform) does NOT trigger it** — this is a toggle/resize cost, not a pan cost. Each toggle/resize appends hundreds of label/header nodes inside the observed root, triggering `querySelectorAll('.JCV-overlay-container')` per added node. *Fix:* append the edge-label and group layers **outside** the observed subtree, or filter added nodes by class first.

**C6 — [Low] O(n) linear scans on every click/focus/back.** `getNodeById`/`focusNode` do `nodes.find` over 381; the edge-label click handler does `edges.find` over 415; `renderOutgoingPanel` filters all 415 edges + a per-edge node scan on every focus. *Fix:* build `id→node`/`id→edge` maps once (the library already exposes `dataManager.data.nodeMap`/`edgeMap`) and an outgoing-edges-by-`fromNode` index.

### What's already done well
- MathJax typesetting is **already lazy per-node** via an `IntersectionObserver` (`rootMargin:200px`) with a `data-math-done` guard — it is **not** run for all nodes at startup. (So the startup cost in A3 is *markdown parsing*, not typesetting.)
- Fetch concurrency is capped (avoids CDN rate-limit storms), HTML error pages are rejected, and content is de-duplicated by basename.
- The collapse feature already demonstrates the safe "hide overlay, keep canvas outline" pattern the LOD design builds on.

---

## Recommended design: scale-banded semantic zoom (level-of-detail)

**Approach:** a small LOD controller subscribes to `viewer.onRefresh` (the per-frame hook the library itself uses), reads `dataManager.data.scale`, classifies it into a band, and writes a single `data-lod="0|1|2|3"` attribute on `#canvas-root`. **CSS keyed off `[data-lod]` decides what paints** — no per-node JS toggling in the hot path. The group hierarchy already in the data is the scaffold; the library's culled canvas provides the outline "for free" at every zoom.

### Zoom → detail bands

Calibrated from the real geometry (whole-map fit ≈ 0.026×; 16px body text becomes legible around ~0.5×). Tune the constants against measured viewport sizes.

| Band | Scale | What's shown | Overlays |
|---|---|---|---|
| **0 — Table of contents** | `< 0.09` | 8 subject tiles only (+ culled canvas outline) | all hidden (`display:none`) |
| **1 — Subjects + sub-topics** | `0.09–0.30` | 8 subject + 22 sub-topic tiles with titles | all hidden |
| **2 — Titles** | `0.30–0.55` | one title chip per node | body `content-visibility:hidden` |
| **3 — Full content** | `≥ 0.55` | full markdown + MathJax | visible |

- **Hysteresis (~10%)** around each boundary + "only do DOM work when the integer band changes" keeps `updateLod` O(1) per frame (critical — it runs every frame; no layout reads / `getBoundingClientRect` allowed in it).
- **TOC/sub-topic tiles** live in a `.lod-tile-layer` *inside* `.JCV-overlays`, so they inherit the existing `translate(offset) scale(scale)` transform (no extra transform math). Clicking a tile reuses `getFocusViewportForNode(group)` + the existing `smoothPanToNode` rAF animation to "enter" that group; rising scale then pushes the band up and reveals detail.
- **MathJax gated to Band 3:** early-return in `enqueueMathNode` when `band < 3`; flush deferred nodes when the band reaches 3 and at the end of focus animations.

### Why this is also the performance fix
At Band 0/1 the 351 heavy overlays are `display:none` — removed from layout **and** paint — so zooming out (the exact moment you want the TOC) renders only 8 tiles + the already-culled canvas. C1's edge-label pass is gated off below Band 2. The feature the user asked for and the fix for A2/B1/C1 are literally the same class toggle.

### Implementation notes / caveats (verified against source)
- **Derive the hierarchy with bounding-box containment, not the app's center-point `isNodeInsideGroup`.** The center test misclassifies nested groups where a parent and its first child overlap at the top edge (it reports only 3 top-level groups; bbox-containment correctly reports **8 subjects + 22 sub-topics**). Use center-in-box for *files*, bbox-containment for *group→group*.
- **Two subjects have no sub-groups** (`Reading Mathematics`, `Quantifiers and Implications`) — at Band 1, show the subject tile and drill straight to file chips; handle the empty-children case explicitly.
- **Composition with collapse:** keep `is-collapsed-hidden { display:none !important }` winning so a band change never un-hides a manually collapsed group.
- **Tile clicks must not also focus a node:** add `.lod-tile` to the `closest(...)` exclusion lists in `getOverlayNodeIdFromTarget`/`isInteractiveTarget` (same way `.group-header-box` is already excluded); give tiles `pointer-events:auto`.
- **Tile-layer persistence:** re-append `.lod-tile-layer` after any library `refresh()`/re-render and mark its nodes so the `MutationObserver` ignores them.

### Alternatives considered
- **Multi-map drill-down** (`viewer.load({canvas})` to swap in a per-subject sub-canvas): solves perf hardest (5×–44× fewer live overlays) and `load()` does correct teardown, but (a) it **drops the 33 cross-subject edges** from detail views — pedagogically lossy for a course about connections; (b) it needs a risky refactor of ~10 functions that close over module-level `canvasJSON`/`groupNodes`/`edgeLabels`; (c) discrete swaps feel like page loads, not continuous zoom. **Keep as a Phase-3 escape hatch** if startup DOM cost proves fatal on low-end devices.
- **Enable built-in `Minimap` + `Controls`, collapse-all-by-default:** smallest change, but it is **click-driven, not zoom-driven** (not the requested feature), the `Minimap` ignores collapse state, and it leaves the A2/A3 startup cost fully intact. **Graft its two good ideas** (the `Controls` module + `content-visibility`) into the main plan; skip the rest.

---

## Phased rollout

**Phase 1 — Perf wins, shippable now (no behavior change).**
1. Add `content-visibility:auto` + per-node `contain-intrinsic-size` to `.JCV-overlay-container` (mirror the inline `width`/`height` the library sets). **Verify MathJax still typesets on scroll-in** (an off-screen content-hidden node reports zero size; the 200px `rootMargin` should still trigger it — test).
2. Debounce the `resize` handler; hoist `renderEdgeLabels`' throwaway state (C2); drop the redundant per-frame `refresh()` in `smoothPanToNode` (C4).
3. Optionally add the built-in **`Controls`** module: `new JSONCanvasViewer(options, [Controls])`. Skip `Minimap`.

**Phase 2 — Core semantic zoom (the main work).**
4. LOD controller on `viewer.onRefresh` → `data-lod` bands with hysteresis (O(1) per frame).
5. `[data-lod]` CSS gates (Band 0/1 hide overlays; Band 2 hide body, show title chip; Band 3 full).
6. `.lod-tile-layer` for 8 subjects + 22 sub-topics (bbox-derived); tile-click → zoom-into-group via existing focus animation.
7. Gate edge labels (C1) and MathJax to their bands; compose with collapse.

**Phase 3 — Polish.**
8. Snap-to-band on wheel-idle; aggregate the 33 cross-subject edges into subject-pair links between TOC tiles (the "course spine" payoff); `prefers-reduced-motion` + a "force full map"/`?lod=off` toggle.
9. Only if measurement demands it: introduce `viewer.load`-based subject slicing for the residual startup DOM cost.

---

## Cross-cutting gaps to address (from the completeness review)

- **Accessibility:** the LOD tiles need `role=button`/`tabindex`/keyboard handlers and a focus ring; hiding overlays removes them from the a11y tree and find-in-page, so expose a **parallel DOM TOC list** of the 8 subjects as the screen-reader fallback; enable MathJax MathML/`assistiveMml` (free if pre-rendering).
- **Mobile/touch:** pinch produces rapid continuous scale changes → validate hysteresis doesn't thrash; verify `contain-intrinsic-size` mismatches (heights 220–1477) don't cause scroll-jump; measure **peak memory on a real phone** (LOD hides but doesn't free the 351 overlays — this is the trigger to adopt Phase-3 slicing).
- **Startup is only half-fixed by LOD.** LOD gates *rendering* and *typesetting*, but the **markdown parse still runs per node** (A2/A3). The highest-leverage remaining win is a **build step**: (a) bundle `Bits/**` into one JSON (kills 351 fetches), and/or (b) **pre-parse markdown→HTML and pre-render math (KaTeX SSR or MathJax CLI)** at deploy time, shipping static HTML with zero client parse/typeset. There is no `.github/workflows` today, so this means introducing CI.
- **CDN/caching:** `viewer.js` and `.canvas` are third-party-CDN + Pages-cached; add content-hash/version query strings for cache-busting, and consider vendoring MathJax + the library locally for reproducible, offline-capable hosting.
- **Measurement:** capture **baseline vs. LOD** numbers (first paint, scripting ms/pan-frame, live overlay count, peak JS heap) on one mid + one low device with explicit pass thresholds; add `?lod=off` to A/B on the same build; derive band constants from measured fit-scale rather than hardcoded guesses.
- **Zoom-design edge cases:** on deep-link/hash focus, set the band + viewport **before** first paint; restore band from scale on history `back`; render only one group-depth per band (nested tiles overlap spatially); suppress intra-subject edge labels (not just the 33 cross-subject) at low bands; confirm `Controls`' zoom writes go through the same `dataManager.data.scale` the LOD controller reads.
