# Talk notes

~20 minutes, math educators, live demo. The deck **is** `Talk.canvas`, rendered by the same viewer
as the course map. No slides.

Open with: `index.html?canvas=Talk.canvas&focus=reading-load`

**Division of labour:** the nodes carry claims and evidence only. The narration is yours — the
connective argument, the examples, the emphasis. Nothing on screen is meant to be read aloud.

Navigate by clicking the question on an outgoing edge. **Back** un-asks.

---

## The argument

Students cannot be given less mathematics, so they are given it in smaller units. Once the units
are small, two restrictions — a size bound, and no edge without a question — are what make the
course teachable, transferable, machine-readable, and contributable.

## Running order

| # | Node | ~min | Narration should supply |
|---|---|---|---|
| 1 | `reading-load` | 2 | Your own observation of the cohort. One concrete case of a student who "read it three times." The claim that this is load, not effort, needs your authority behind it. |
| 2 | `dont-simplify` | 2 | Why simplifying is a real temptation and what it costs. Then let the table do the work — read the numbers, don't paraphrase them. |
| 3 | `forced-inquiry` | 3 | **The centre of the talk.** Say the instructor-side effect in your own words: the experience of failing to write a question and discovering you didn't know why the order was the order. |
| 4 | `student-method` | 2 | The self-explanation correspondence is the strongest point available. Say it slowly — the third prompt *is* the edge label. |
| 5 | `ai-alignment` | 2 | An example of an AI answering at the wrong altitude in your course. This lands better as anecdote than as claim. |
| 6 | `question-reuse` | 3 | Board fatigue: the same question every term. Start the live demo here. |
| 7 | `student-agency` | 3 | Who the next 415 questions should come from, and why it isn't us. |
| 8 | `how-to-start` | 2 | Make the afternoon-sized version sound genuinely small. The costs callout is there so you can be straight about the price. |
| 9 | `this-talk` | 1 | The reveal. Let the map do it — zoom out and pause before saying anything. |

## Deep links (fallback if a click misfires)

Prefix with `index.html?canvas=Talk.canvas&focus=`

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

Show the panel and let the room choose the order. State plainly that the next section is theirs to
order — the forcing function is the argument, and this is the one moment they experience it rather
than hear it. **Back** returns to the hub after the first two.

⚠️ **`question-reuse` must come last** of the three — it chains onward to `student-agency` →
`how-to-start` → `this-talk`. If the room picks it first, take it and return for the others.

## Beats 6–7 — the live demo

Runs against the **real MAT102 map**, not this one. The automation resolves nodes by scanning
`Bits/**`, so the pipeline only works for course nodes. Don't click Ask on a `Talk/` node — the
issue would be unresolvable. (One-line fix if wanted later: add `Talk/` to the scan roots.)

**Start at beat 6, land it at beat 9** — Action plus Pages deploy takes ~2–4 min, leaving ~10
minutes of slack.

1. Second tab, course map, focused on a well-known node.
2. Take a question from the room → **Ask a question about this node**.
3. The Issue Form opens with the node pre-filled. Paste, submit.
4. Apply the **`approved`** label. Note aloud that label permission is restricted to write access,
   so approval and authorization are the same act.
5. At beat 9, refresh: the question is in the map.

**Fallbacks, in order:** pre-stage an issue so only the label needs applying → screen recording of
the loop → show a merged PR from the repository's history.

## Objections to have ready (deliberately not nodes)

- **"Isn't this a concept map?"** Three differences: edges carry questions rather than
  relation-names; it is the delivery surface, not a diagram about the course; it is maintained
  under CI. A concept map is looked at once; this is read *in*.
- **"Doesn't chunking fragment the subject?"** That is what the edge questions are for.
  Fragmentation is the failure mode the second restriction was introduced to prevent.
- **"415 questions is a lot of work."** Yes. It is the same work as accounting for why your own
  syllabus is in its order — most of it already done implicitly, now written down.
- **"Won't AI write the questions?"** It can draft; it should not decide. The question is the
  pedagogical claim, which is the part warranting an instructor's judgement.
- **"How do you know it works?"** No outcome data yet. What exists is a course that cannot silently
  drift, and a channel converting confusion into curriculum.

## Rendering notes

- Edge labels are drawn over the node in focus mode and can sit on top of a line of text. Harmless,
  but don't be surprised by it.
- The nodes are sized to their content with ~60–80px of slack; nothing scrolls or clips.

## Pre-flight

- [ ] Serve locally or use the Pages URL — decide and test on the room's network
- [ ] Two tabs: talk map + course map
- [ ] Signed into GitHub in the demo browser; `approved` label exists
- [ ] Pre-staged issue ready; screen recording on disk
- [ ] Browser at 100% zoom; focus panel is top-right — check it clears any bezel
