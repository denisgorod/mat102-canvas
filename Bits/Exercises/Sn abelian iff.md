---
id: ex-sn-abelian-iff
title: "S_n is abelian iff n ∈ {1,2}"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children: []
parents:
  - symmetric-group
---

You've seen that the symmetric group $S_n$ is the group of all permutations of $\{1, 2, \ldots, n\}$ under composition. For small $n$, this group has special properties.

**Base case:** $S_1$ and $S_2$ are abelian. Verify this directly. ($S_1$ is trivial; for $S_2$, there are only two permutations.)

**The nonabelian case:** For $n \geq 3$, show that $S_n$ is nonabelian by finding two permutations that don't commute.

A concrete approach: consider the three-cycles $(1 \, 2)$ and $(1 \, 2 \, 3)$. Compose them in both orders and show the results differ. (You can use cycle notation or write out the permutation explicitly.)

Then argue: since $S_n$ contains $S_3$ as a subgroup (just act on elements $\{1, 2, 3\}$ and fix the rest), and $S_3$ is nonabelian, so is $S_n$ for all $n \geq 3$.

>[!question] Exercise
> Show that $S_n$ is abelian if and only if $n \in \{1, 2\}$. For $n \geq 3$, find explicit permutations that do not commute.
