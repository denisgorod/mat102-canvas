---
id: ex-order-of-ab-equals-ba
title: "|ab| = |ba|"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - group-order-and-element-order
---

In a nonabelian group, we have $ab \neq ba$ in general. But does the *order* of these two products relate in any way?

Compute this in $D_3$: what is the order of $rs$, and what is the order of $sr$? (You may need to compute powers of each to find the smallest positive integer $n$ with $(rs)^n = e$.)

Now prove it in general: $|ab| = |ba|$ for any $a, b$ in a group $G$.

The hint is useful: first show that $|aba^{-1}| = |b|$. (Why? Because conjugation by $a$ is a symmetry of the group — it's a bijection that preserves the group structure.) Then use this to relate $|ab|$ and $|ba|$.

>[!question] Exercise
> Prove that $|ab| = |ba|$ for all $a, b \in G$. Hint: first show $|aba^{-1}| = |b|$, then conclude.
