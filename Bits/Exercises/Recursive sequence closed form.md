---
id: ex-recursive-sequence-closed-form
title: "Closed form for a recursive sequence"
role: exercise
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fibonacci-sequence
  - strong-induction-principle
---

Consider the recursive sequence $x_1 = 3$, $x_2 = 7$, and $x_k = 5x_{k-1} - 6x_{k-2}$ for $k \geq 3$.

Show that $x_k = 2^k + 3^{k-1}$ by strong induction.

Use two base cases: verify that $x_1 = 2^1 + 3^0 = 3$ and $x_2 = 2^2 + 3^1 = 7$. For the induction step, assume $x_j = 2^j + 3^{j-1}$ for all $1 \leq j \leq n$, then compute $x_{n+1} = 5x_n - 6x_{n-1}$ and simplify using the induction hypothesis.

>[!question] Exercise
>Show by strong induction that $x_k = 2^k + 3^{k-1}$ for the recursion $x_1=3$, $x_2=7$, $x_k = 5x_{k-1} - 6x_{k-2}$.
