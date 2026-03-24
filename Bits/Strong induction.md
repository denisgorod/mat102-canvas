---
id: strong-induction-principle
title: "Strong induction"
role: bit
group: strong-induction
curriculum_path: null
learning_objectives: []
parents:
  - generalized-induction
children:
  - id: strong-induction-equivalence
    question: "Is strong induction actually stronger than regular induction?"
    edge_type: prerequisite
  - id: strong-induction-postage-stamps
    question: "What does a strong induction proof look like?"
    edge_type: prerequisite
  - id: ex-recursive-sequence-closed-form
    question: "Can strong induction prove a closed-form identity for a recursion?"
    edge_type: prerequisite
  - id: ex-fibonacci-closed-form
    question: "Can strong induction verify a closed-form for a two-term recurrence?"
    edge_type: prerequisite
---

Sometimes you need more than just $P(k)$ to prove $P(k+1)$. You might need to know that $P(1)$, $P(2)$, ..., $P(k)$ are all true. That's *strong induction*.

**Principle of Strong Induction:** Let $P$ be a predicate. If:
1. $P(1)$ is true, and
2. For any positive integer $k$, if $P(1) \land P(2) \land \cdots \land P(k)$ is true (the induction hypothesis), then $P(k+1)$ is true,

then $P(n)$ is true for all positive integers $n$.

The induction hypothesis is now much stronger: it assumes all previous cases, not just the immediately preceding one.

**Why is this useful?** In regular induction, you prove $P(k) \Rightarrow P(k+1)$—you connect each domino to the next. In strong induction, you prove that knowing *all dominos up to $k$ have fallen* implies the $(k+1)$-th domino falls. This gives you more ammunition for the induction step.

**Example scenario:** Suppose you're proving something about factorizations, and the argument goes: "Since $k+1$ might factor as a product of two smaller numbers, and I've already proven the result for all numbers smaller than $k$, I can use those results to prove it for $k+1$." That's exactly when strong induction shines.

The beauty is that strong induction is *logically equivalent* to regular induction—in principle, anything you can prove with strong induction you could prove with regular induction (though it might require more work). But strong induction often makes the proof simpler and more natural.

>[!idea] Strong induction allows you to assume all previous cases $P(1) \land \cdots \land P(k)$ when proving $P(k+1)$, giving more power when you need to appeal to earlier results.
