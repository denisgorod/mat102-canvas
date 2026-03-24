---
id: ex-product-inverse-general
title: "(a₁⋯aₙ)^{−1} = aₙ^{−1}⋯a₁^{−1}"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children: []
parents:
  - basic-group-properties
---

You know the "shoe-sock" rule: $(ab)^{-1} = b^{-1}a^{-1}$. This is because when you undo two things, you undo them in reverse order.

What happens with three elements? Compute $(abc)^{-1}$ by first writing it as $((ab)c)^{-1}$. Apply the two-element formula, then apply it again to $(ab)^{-1}$.

Now extend this pattern. Prove that for any $a_1, a_2, \ldots, a_n \in G$,
$$(a_1 a_2 \cdots a_n)^{-1} = a_n^{-1} \cdots a_2^{-1} a_1^{-1}.$$

Use induction on $n$. The base case $n = 1$ is trivial. For the inductive step, write $a_1 \cdots a_n = (a_1 \cdots a_{n-1}) \cdot a_n$ and apply the two-element formula plus the induction hypothesis.

>[!question] Exercise
> Prove that $(a_1 a_2 \cdots a_n)^{-1} = a_n^{-1} a_{n-1}^{-1} \cdots a_1^{-1}$ for all $n$ and all elements $a_1, \ldots, a_n \in G$.
