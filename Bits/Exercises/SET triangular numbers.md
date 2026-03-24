---
id: ex-set-triangular-numbers
title: "SET on a triangular-number proof"
role: exercise
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children: []
parents:
  - self-explanation-training
---

For a positive whole number $n$, the $n$th triangular number is
$$T_n = 1 + 2 + 3 + \cdots + n.$$

Apply self-explanation training to the following proof.

>[!s] Proposition
> For any positive whole number $n \geq 2$, $T_{n-1} + T_n = n^2$.

>[!p] Proof
> Fix a positive whole number $n$. Write out the two sums aligned so corresponding terms add up:
> $$\begin{aligned} T_{n-1} + T_n &= \bigl((n-1) + (n-2) + \cdots + 2 + 1\bigr) \\&\quad + \bigl(1 + 2 + \cdots + (n-2) + (n-1) + n\bigr) \\&= n + n + \cdots + n \\ &= n^2. \end{aligned}$$

>[!question] Exercise
> Apply self-explanation training to each step of the proof above. In particular, explain the "clever" alignment and why each column sums to $n$.
