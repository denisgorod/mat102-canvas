---
id: generality-in-proofs
title: "Generality in proofs"
role: bit
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children:
  - id: ex-restate-product-proposition
    question: "Can I strengthen a result by weakening its hypothesis?"
    edge_type: prerequisite
parents:
  - anatomy-of-a-proof
---

In the proof of "the product of two even integers is even," we let $a$ and $b$ be *arbitrary* even integers. We didn't pick specific numbers like $a = 4$ and $b = 6$. Instead, we worked with unspecified objects: we said $a = 2k$ and $b = 2l$ for *some* integers $k$ and $l$, and then we proceeded algebraically. This is the power of generality.

Why is this powerful? Because the argument doesn't depend on *which* even integers we chose. We only used the fact that they were even — that they could be written as $2k$ and $2l$. So our single argument covers infinitely many pairs of even integers simultaneously. If we had picked specific numbers, we'd need to write out a separate proof for each pair. By working with arbitrary objects, we prove infinitely many cases at once.

Also observe something subtle in the proof: we showed that $ab = 2(kl(k+l))$, which is even. But this argument only required that *one* of $a$ or $b$ be even. We didn't need the other to be even. A careful reader would notice that the proof is more powerful than the original statement. The proposition claimed the product of two evens is even, but the proof actually shows something stronger: the product of an even integer and *any* integer is even.

This is a useful pattern: a careful proof can sometimes reveal that the original hypothesis was unnecessarily restrictive. You might prove the theorem as stated, but the proof's generality hints at a stronger result lurking underneath. Good mathematicians are alert to this — they ask: "Did I really need all the hypotheses, or could I strengthen the conclusion?"

>[!idea]
> Proofs work by assuming the hypothesis is true for arbitrary objects, not for specific values. This generality lets one argument cover infinitely many cases, and it often reveals that a result is stronger than originally stated.
