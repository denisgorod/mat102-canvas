# Reader-first prototype — scope

A tightly-bounded prototype to test the core inquiry hypothesis **before** investing
in whole-graph layout, the atlas, or authored learning-objectives.

## Hypothesis being tested

> "Read a bit → pick the question you want to ask next → advance" **feels like inquiry**,
> and lightweight **coverage + spaced-repetition** milestones make progress legible and motivating —
> on a real topic, with real content, in a real browser.

If the loop feels right on ~19 nodes, the model is validated and worth scaling. If it feels
like clicking through slides, we learn that cheaply.

## Vehicle: the "Modular Arithmetic" topic

Chosen because it is the most self-contained topic with a walkable spine:

- **19 nodes**: 9 bits + 10 exercises.
- **Single root**: `congruence-mod-n` (clean entry point).
- **18 intra-topic edges, all `prerequisite`**; only **1 edge leaves the topic** and 7 enter it (ignored by the prototype — it starts at the root).
- Natural shape: the **9 bits form the spine** (read in prerequisite order); the **10 exercises hang off bits** as practice spurs and become the **spaced-repetition review items**.

No new content is written. The prototype reads the existing bit markdown and the now-reconciled
edge data (every edge carries a question + `edge_type`).

## The reader loop (the whole UX)

A single centered **reader column** (canvas hidden in this mode). For the current bit:

1. **Loop-closer** pinned at top: *"You asked: «the question you clicked to get here». Here's the answer."* (the incoming edge's label).
2. **Bit content** rendered exactly as today (existing parser + MathJax; frontmatter stripped).
3. **`[!idea]` recap** — already present in the bits.
4. **Self-check gate** (for bits that have exercise children): a 30-second retrieval prompt that must be *attempted* (not graded) to reveal the next cards — a desirable difficulty.
5. **Question cards** — the bit's outgoing edges as full-width, first-person cards:
   - **spine bits** → bold "primary path" cards ("What if the modulus divides the difference?");
   - **exercises** → lighter "practice this" cards (feed the SRS);
   - the **1 topic-exit edge** → a dimmed "this leads out of Modular Arithmetic" door.
   - Each card carries a one-line gloss derived from `edge_type`.
6. **Pick a card → cross-fade** to the next bit (no canvas pan). The cards you *didn't* pick drop into the **Frontier rail**.

**Frontier rail** (left edge): your dangling unasked questions, each tagged with the bit it came
from; click one to jump there. Your save-game; persists across sessions.

**Back** = "un-ask": pop to the previous bit (reuse the existing focus history stack).

## Learner state (localStorage) — the "milestones"

Keyed by frontmatter slug. This is the spaced-repetition + coverage spine of the design (achievements deferred).

```
reader.v1 = {
  visited:   { <slug>: { firstSeen, answered } },      // answered = read AND a card chosen
  srs:       { <slug>: { due, intervalDays, ease, reps, lapses } },  // per exercise/self-check
  frontier:  [ { edgeId, fromSlug, toSlug, question } ],
  coverage:  { spineDone, spineTotal },                // computed from curriculum_path
  last:      { slug }                                   // resume point
}
```

- **Coverage**: fraction of the topic's spine bits answered; shown as a small "Modular Arithmetic 4/9" readout and a filling bar. (Whole-course LO coverage is deferred until LOs are authored.)
- **Spaced repetition**: each answered bit's self-check / its exercises enter a Leitner/SM-2-lite schedule (`1d → 3d → 7d → 16d …`, shortened on lapse). A **"Review (N due)"** button surfaces due items as retrieval prompts; success advances the interval.
- **Milestones**: spine-topic completed; review streak. (Badges/merits later.)

## Reuse vs. new

**Reuse (already in the app):** the content pipeline (`preloadFileContents`, the markdown/MathJax parser,
`stripFrontmatter`), the outgoing-edge logic behind `renderOutgoingPanel`, the focus **history stack**
(`focusState.history` → Back/un-ask), the canvas edge data now carrying `question` + `edge_type`, and URL params.

**New (the prototype):**
- a **reader view** (bit content + loop-closer + `[!idea]` + self-check + question cards) that reuses the parsed content but presents it as a column, not a canvas overlay;
- a **question-card renderer** that types/sorts cards (spine bold, practice lighter, exit dimmed);
- the **Frontier rail**;
- a small **SRS + coverage module** over `localStorage`;
- an entry point: `?mode=reader&topic=modular-arithmetic` (default canvas mode untouched).

**Recommended architecture:** add reader as a **mode inside the existing app** (canvas hidden) rather than a
separate page — it reuses the whole data/parse/MathJax pipeline, and later "zoom out → atlas" just re-reveals the canvas. Alternative (separate lightweight page) is cleaner but duplicates the content pipeline.

## Data prep needed (small, deterministic)

- **Mark the topic's spine**: set `curriculum_path` = true on the 9 bits, false on the 10 exercises (a
  one-topic pass; extends the reconcile-tool pattern, or a tiny `topic-config` JSON if we don't want to
  touch frontmatter yet). This is the only new metadata the prototype needs.
- **Incoming question per bit** for the loop-closer = the label of the edge the student traversed (already
  known at navigation time; no prep).
- LOs are **not** needed for the prototype (coverage is measured against the spine).

## Explicitly out of scope (deferred)

Atlas visual encodings (color-temperature arc, role silhouettes, spine ribbon, edge-bundling); whole-graph;
whole-course LO progress; generalization-gated "abstraction doors" (no generalization edges exist in this
topic yet); accounts / cross-device sync; achievements/merits; mobile polish beyond "column works on a phone."

## Build breakdown (rough)

1. **Reader mode shell** — `?mode=reader`, hide canvas, center column, load the topic's bit content. *(S)*
2. **Reader bit view** — loop-closer + content + `[!idea]` + typed question cards; card-click cross-fade + history. *(M)*
3. **Frontier rail** — accumulate unpicked cards, jump, persist. *(S)*
4. **State module** — localStorage schema, visited/answered, coverage readout, resume. *(S)*
5. **Self-check + SRS** — attempt-gate, Leitner schedule, "Review (N due)" surface. *(M)*
6. **Spine data pass** — mark `curriculum_path` for the 19 nodes. *(S)*

Estimated ~1 focused build for a clickable version (steps 1–4), +1 for SRS (step 5).

## Acceptance criteria (what "validated" means)

- You can read the topic root-to-leaf entirely by **picking question cards**, never touching the canvas.
- Unpicked questions land in the Frontier and can be resumed; **Back un-asks** correctly.
- Coverage readout fills as you answer bits; **closing and reopening the tab resumes** where you left off.
- At least one exercise enters the SRS and reappears in **"Review"** with an expanding interval.
- Subjective: finishing a bit and asking the next question feels like **one continuous gesture**, not slide-clicking.

## Open questions for you

1. **Reader as a mode of the existing app, or a separate page?** (Recommend: a mode — maximal reuse, atlas comes free later.)
2. **Do exercises count as "answered" bits** (coverage), or only as SRS review items? (Recommend: SRS only; coverage = the 9 spine bits.)
3. **How assertive should SRS be** — surface due reviews proactively on load, or only when the student opens "Review"? (Recommend: gentle — a badge count, not an interruption.)
