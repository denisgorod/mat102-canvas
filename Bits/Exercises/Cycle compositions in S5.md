---
id: ex-cycle-composition
title: "Compute cycle compositions in S_5"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children: []
parents:
  - symmetric-group
---

In the symmetric group $S_n$, we use *cycle notation* to represent permutations compactly. A cycle $(a_1 \, a_2 \, \cdots a_k)$ means: $a_1 \mapsto a_2 \mapsto \cdots \mapsto a_k \mapsto a_1$, and all other elements stay fixed.

When we compose permutations, we apply them *right-to-left*, just like function composition.

Compute the following products of cycles in $S_5$. Write your answer in cycle notation (or as the identity, if that's the result).

**(a)** $(1 \, 3 \, 4) \circ (2 \, 3)$

**(b)** $(1 \, 2) \circ (3 \, 4 \, 5) \circ (1 \, 5)$

**(c)** $(1 \, 4 \, 5) \circ (2 \, 5) \circ (1 \, 2)$

For each one, trace where each element goes: start with the rightmost cycle, follow 1, then apply the next cycle to the right, and so on.

>[!question] Exercise
> Compute the three cycle compositions above in $S_5$. Apply cycles right-to-left and express the result in cycle notation.
