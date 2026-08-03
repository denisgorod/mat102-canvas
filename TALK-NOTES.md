# Talk notes — "The talk is a map"

~20 minutes, math educators, live demo. The deck **is** `Talk.canvas`, rendered by the same viewer
as the course map. There are no slides.

Open with: `index.html?canvas=Talk.canvas&focus=incoherent`

Navigate by **clicking the question on an outgoing edge** in the focus panel. The **Back** button
un-asks (returns along your path) — that's how you come back from each branch.

---

## The nine beats

| # | Node | ~min | The point |
|---|---|---|---|
| 1 | `incoherent` | 2 | Passing students still call the course a list of tricks. That's structural, not study skills. |
| 2 | `syllabus-is-a-list` | 2 | A syllabus is a storage format. Flattening loses the *reason* one idea follows another. |
| 3 | `questions-on-edges` | 3 | **The claim:** nodes are ideas, edges are the question that makes the next idea necessary. |
| 4 | `worked-example` | 2 | MAT102: 351 nodes, 415 edges. Four questions from "textbooks look weird" to "what a proof is for." |
| 5 | `students-decide` | 4 | The intake loop. **Live demo runs here.** |
| 6 | `map-has-tests` | 2 | `check-sync.py` + CI. The map cannot quietly become wrong. |
| 7 | `whats-different` | 2 | Honest comparison to concept maps, including 399/12/4. |
| 8 | `how-to-start` | 2 | One week, 8–10 nodes, write the questions. An afternoon. |
| 9 | `this-talk` | 1 | The reveal. |

## Deep links (fallback if a click misfires)

Prefix every one with `index.html?canvas=Talk.canvas&focus=`

```
incoherent
syllabus-is-a-list
questions-on-edges
worked-example
students-decide
map-has-tests
whats-different
how-to-start
this-talk
```

## Beat 3 — the audience-picks moment

`questions-on-edges` fans out to four questions:

- *What does that actually look like?* → `worked-example`
- *Who decides which questions matter?* → `students-decide`
- *How do you keep a map like this honest?* → `map-has-tests`
- *Isn't this just a concept map with extra steps?* → `whats-different`

**Show the panel and let the room choose the order.** You'll cover all four; they choose the
traversal. Say so out loud — "there is no slide 4, you're picking it" — because that's the argument.
Use **Back** after each branch to return to the hub.

Only `whats-different` must come last of the four: it's the one that leads onward to
`how-to-start` → `this-talk`.

## Beat 5 — the live demo

Runs against the **real MAT102 map**, not this one. Deliberate: the automation resolves nodes by
scanning `Bits/**`, so the pipeline only works for course nodes. (Don't click Ask on a `Talk/` node
— the issue would be unresolvable. One-line fix later if we want it: add `Talk/` to the script's
scan roots.)

1. Open the course map in a second tab, focused on a well-known node.
2. Take a question from the room. Click **Ask a question about this node**.
3. The GitHub Issue Form opens with the node pre-filled. Paste the question, submit.
4. Add the **`approved`** label. Narrate: *only people with write access can do this — the label
   is the authorization.*
5. Leave it running. **Come back at beat 9** and refresh: their question is in the map.

**Timing:** Action + Pages deploy ≈ 2–4 min. Start it at beat 5, land it at beat 9 — that's ~10
minutes of slack.

**Fallbacks, in order:**
- Pre-stage an issue before the talk so you only have to add the label.
- Have a screen recording of the full loop ready.
- Worst case, show a merged PR from the repo's history — the pipeline is real either way.

## Beat 9 — the reveal

Zoom out to the whole map (Escape / fit-to-view). Everything they just walked through was an
inquiry map: nine nodes, eight questions, same viewer, same repo, same pull-request pipeline.

Land on: **if it can carry a talk about itself, it can carry your course.**

Then point at the Ask button on `this-talk` and hand the Q&A to the map — *"put it in the map
instead; it'll be an issue before you leave the room."*

## Pre-flight

- [ ] `python3 -m http.server 8137`, or the live Pages URL — decide which and test it on the room's network
- [ ] Both tabs open: talk map + course map
- [ ] Logged into GitHub in the demo browser; `approved` label exists
- [ ] Pre-staged issue ready
- [ ] Screen recording of the loop on disk
- [ ] Browser zoom at 100%; the focus panel is top-right — check it's not under a bezel
