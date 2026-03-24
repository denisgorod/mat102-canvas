---
id: ex-binary-string-reversal
title: "Binary string reversal"
role: exercise
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - structural-induction-example-divisibility
---

Let $s, t$ be finite binary strings (sequences of 0s and 1s). Denote the concatenation of $s$ and $t$ as $st$, and the reversal of a string $s$ as $s^R$.

Prove that $$(st)^R = t^R s^R$$ for all finite binary strings $s$ and $t$ by induction on the length of $t$.

**Base case**: When $t$ is the empty string $\lambda$, show $(s\lambda)^R = \lambda^R s^R$. Both sides equal $s^R$.

**Induction step**: Assume the formula holds for strings $t$ of length $k$. For a string $t'$ of length $k+1$, write $t' = t \cdot b$ where $b$ is a single character (0 or 1). Show that $(s \cdot (t \cdot b))^R = (t \cdot b)^R s^R$.

>[!question] Exercise
>Prove by induction on the length of $t$ that $(st)^R = t^R s^R$ for binary strings.
