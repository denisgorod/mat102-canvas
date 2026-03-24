---
id: ex-gauss-sum
title: "Sum 1+2+⋯+n"
role: exercise
group: summation-notation
curriculum_path: null
learning_objectives: []
children: []
parents:
  - sigma-notation
---

Show that $$\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$$ for all $n \in \mathbb{Z}^+$ by induction.

Verify the base case $n=1$: both sides equal 1. For the induction step, assume $\sum_{k=1}^{m} k = \frac{m(m+1)}{2}$. Then compute:
$$\sum_{k=1}^{m+1} k = \sum_{k=1}^{m} k + (m+1) = \frac{m(m+1)}{2} + (m+1)$$

Simplify the right side to show it equals $\frac{(m+1)(m+2)}{2}$.

>[!question] Exercise
>Prove by induction that $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$.
