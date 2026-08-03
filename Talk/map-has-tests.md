---
title: "The map has a test suite"
role: beat
---

A curriculum that anyone can edit needs to be checkable, or it rots.

The map is a git repository, so it gets the tools software gets:

- **`check-sync.py`** — the canvas you *edit* and the data the *site reads* must agree on all
  **415 edges**. Disagreement fails the build.
- **CI on every push** — regenerate every derived file, then fail if the result differs from what
  was committed. Stale artifacts can't ship.
- **Every change is a pull request** — including the ones a student's question triggers.

>[!idea]
The point isn't rigour for its own sake. It's that **the map cannot quietly become wrong** —
which is the thing that kills every hand-maintained concept map eventually.
