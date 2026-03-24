---
id: ex-induction-wop-equivalence
title: "Induction ↔ Well-Ordering Principle"
role: exercise
group: mathematical-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - principle-of-induction
---

Mathematical induction and the Well-Ordering Principle are logically equivalent. Show both directions:

1. **WOP ⟹ Induction**: Assume the Well-Ordering Principle. Prove that if $P(1)$ is true and $P(k) \Rightarrow P(k+1)$ for all $k \in \mathbb{Z}^+$, then $P(n)$ is true for all $n \in \mathbb{Z}^+$.

2. **Induction ⟹ WOP**: Assume mathematical induction. Prove that every non-empty subset of $\mathbb{Z}^+$ has a least element.

These proofs demonstrate that the two principles are mathematically equivalent — either one can serve as a foundation for the other. Think carefully about what happens if induction fails or if a set has no minimum element.

>[!question] Exercise
>Prove both directions of the equivalence between mathematical induction and the Well-Ordering Principle.
