---
id: ex-structural-induction-pairs
title: "Structural induction on pairs"
role: exercise
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - structural-induction-example-divisibility
---

Define a set $S \subseteq \mathbb{Z}^* \times \mathbb{Z}^*$ recursively:
- **Basis**: $(0, 0) \in S$
- **Constructors**: If $(a, b) \in S$, then $(a, b+1), (a+1, b+1), (a+2, b+1) \in S$

Show by structural induction that $a \leq 2b$ for all $(a, b) \in S$.

Verify the base case: $0 \leq 2 \cdot 0 = 0$. For the inductive step, assume $(a, b) \in S$ and $a \leq 2b$. Show that the constraint holds for each of the three constructed pairs $(a, b+1)$, $(a+1, b+1)$, and $(a+2, b+1)$.

>[!question] Exercise
>Prove by structural induction that every element $(a, b) \in S$ satisfies $a \leq 2b$.
