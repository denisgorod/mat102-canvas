# Talk notes — "The talk is a map"

~20 minutes, math educators, live demo. The deck **is** `Talk.canvas`, rendered by the same viewer
as the course map. There are no slides.

Open with: `index.html?canvas=Talk.canvas&focus=reading-load`

Navigate by **clicking the question on an outgoing edge**. **Back** un-asks (returns along your
path) — that's how you come back from each branch.

---

## The argument in one line

Students can't be handed less mathematics, so they're handed it in smaller pieces — and once the
pieces are small, **the map's two restrictions** (a size cap, and no edge without a question) are
what make the course teachable, transferable, machine-readable, and contributable.

## The nine beats

| # | Node | ~min | The point |
|---|---|---|---|
| 1 | `reading-load` | 2 | Less reading practice, less academic experience. The wall is hit *before* the mathematics. It's a load problem, not a motivation problem. |
| 2 | `dont-simplify` | 2 | Softening the content is off the table. Size is the only honest lever. **166 bits, median 248 words, nothing over 400, ~1 min each.** |
| 3 | `forced-inquiry` | 3 | **The hub.** No question, no edge. Forces inquiry on the instructor (can't author by feel) *and* the student (moving = choosing a question). |
| 4 | `student-method` | 2 | Self-explanation's 3rd prompt is *"What question does this raise?"* The map is that strategy made structural. They keep the move, not the map. |
| 5 | `ai-alignment` | 2 | AI knows the content, not the learning logic — so it answers at the wrong altitude. The map says *where the student is*. |
| 6 | `question-reuse` | 3 | A board is a stream: anchored to a date, answered once, asked again next term. A node anchors a question to a **place in the learning**. |
| 7 | `student-agency` | 3 | Ask → issue → review → PR → merge. One human gate. Their question joins the map the next cohort reads. **Live demo lands here.** |
| 8 | `how-to-start` | 2 | One week, 8–10 pieces, write the question between each. Plus the honest costs. |
| 9 | `this-talk` | 1 | The reveal. |

## Deep links (fallback if a click misfires)

Prefix each with `index.html?canvas=Talk.canvas&focus=`

```
reading-load  dont-simplify  forced-inquiry
student-method  ai-alignment  question-reuse
student-agency  how-to-start  this-talk
```

## Beat 3 — the audience-picks moment

The hub fans out to three:

- *What does the student take away besides the content?* → `student-method`
- *Who else can read an explicit inquiry structure?* → `ai-alignment`
- *Where do student questions go today?* → `question-reuse`

**Show the panel and let the room choose the order.** Say it out loud — *"there is no slide 4;
you're picking it"* — because the forcing function **is** the argument, and this is the one moment
they feel it rather than hear it. Use **Back** after the first two to return to the hub.

⚠️ **`question-reuse` must come last** of the three — it chains onward to `student-agency` →
`how-to-start` → `this-talk`. If the room picks it first, take it and come back for the others.

## Beats 6–7 — the live demo

Runs against the **real MAT102 map**, not this one. Deliberate: the automation resolves nodes by
scanning `Bits/**`, so the pipeline only works for course nodes. (Don't click Ask on a `Talk/` node
— the issue would be unresolvable. One-line fix later: add `Talk/` to the scan roots.)

**Start it at beat 6, land it at beat 9** — the Action + Pages deploy takes ~2–4 min, so you have
roughly ten minutes of slack.

1. Second tab, course map, focused on a well-known node.
2. Take a question from the room → **Ask a question about this node**.
3. Issue Form opens with the node pre-filled. Paste, submit.
4. Add the **`approved`** label. Narrate: *only people with write access can do this — the label
   is the authorization.*
5. At beat 9, refresh: their question is in the map.

**Fallbacks, in order:** pre-stage an issue so only the label needs adding → screen recording of
the loop → show a merged PR from the repo's history.

## Beat 9 — the reveal

Zoom out to the whole map. Nine nodes, eight questions, same viewer, same repo, same pipeline —
and it obeyed its own rules: no node longer than a bit, no edge without a question.

Land on: **if the constraints can carry a talk to a room of colleagues, they can carry a week of
your course.**

Then point at the Ask button and hand the Q&A to the map.

## Objections to have ready (deliberately not beats)

- **"Isn't this just a concept map?"** Three differences: the edges carry *questions*, not
  relation-names; it's the **delivery surface**, not a diagram about the course; and it's
  maintained under CI. Concept maps are looked at once; this is read *in*.
- **"Doesn't chunking fragment the subject?"** That's what the edge questions are for — they're the
  connective tissue the chunking would otherwise lose. Fragmentation is the failure mode we
  designed against, not one we ignored.
- **"415 questions is a lot of work."** Yes — that's the price of the forcing function, and it's
  the same work as understanding why your own syllabus is in its order. Most of it you've already
  done implicitly.
- **"Won't AI just write the questions?"** It can draft; it shouldn't decide. The question is the
  pedagogical claim — that's the part worth an instructor's judgement.
- **"How do you know it works?"** Be straight: we don't have outcome data yet. What we have is a
  course that can't silently drift, and a channel that turns confusion into curriculum.

## Pre-flight

- [ ] Serve locally or use the Pages URL — decide and test on the room's network
- [ ] Two tabs open: talk map + course map
- [ ] Logged into GitHub in the demo browser; `approved` label exists
- [ ] Pre-staged issue ready; screen recording on disk
- [ ] Browser at 100% zoom; focus panel is top-right — check it clears any bezel
