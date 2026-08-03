---
title: "The students decide which questions matter"
role: beat
---

We wrote the first 415 questions. We are not the right authors for the next 415 — we've forgotten
what's confusing.

So every node has an **Ask a question** button, and it runs a real pipeline:

```
student clicks Ask
   ▼
GitHub issue (node pre-filled)
   ▼
instructor adds the `approved` label      ← the only human gate
   ▼
Action rewrites the node, opens a pull request
   ▼
instructor reviews the one-line diff and merges
   ▼
the map redeploys
```

>[!idea]
Automated end to end, with **one deliberate human step**: nothing enters the map without an
instructor reading it. The label *is* the authorization — only people with write access can apply it.

**Live now:** someone give me a question about a real node.
