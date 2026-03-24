---
id: ex-binary-representation
title: "Binary representation of positive integers"
role: exercise
group: strong-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - strong-induction-postage-stamps
---

Show that every positive integer can be uniquely written as a sum of distinct powers of 2. That is, for each $n \in \mathbb{Z}^+$, there exist distinct non-negative integers $a_1, a_2, \ldots, a_k$ such that $n = 2^{a_1} + 2^{a_2} + \cdots + 2^{a_k}$.

Use strong induction. For the base case, verify that $1 = 2^0$. For the induction step, assume every positive integer up to $k$ has a binary representation. For $k+1$: if $k+1$ is even, write $k+1 = 2m$; if odd, write $k+1 = 2m+1$. Use the induction hypothesis on $m$ to build the representation for $k+1$.

>[!question] Exercise
>Prove by strong induction that every positive integer has a unique binary representation.
