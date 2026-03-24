---
id: ex-sum-of-squares
title: "Sum of squares formula"
role: exercise
group: summation-notation
curriculum_path: null
learning_objectives: []
children: []
parents:
  - sigma-notation
---

Show that $$\sum_{n=1}^{k} n^2 = \frac{k(k+1)(2k+1)}{6}$$ for all $k \in \mathbb{Z}^+$ by induction.

Verify the formula for $k=1$. For the induction step, assume the formula holds for some $k$ and compute:
$$\sum_{n=1}^{k+1} n^2 = \sum_{n=1}^{k} n^2 + (k+1)^2$$

Substitute the induction hypothesis and simplify the right side to show it equals $\frac{(k+1)(k+2)(2k+3)}{6}$.

>[!question] Exercise
>Prove by induction that $\sum_{n=1}^{k} n^2 = \frac{k(k+1)(2k+1)}{6}$.
