---
id: ex-domino-tiling-count
title: "Domino tilings of a 2×n grid"
role: exercise
group: mathematical-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - induction-example-l-tiling
---

A domino is a $2 \times 1$ tile. How many ways can you tile a $2 \times n$ grid with dominoes? Find a formula and prove it by induction.

**Hint**: Let $f(n)$ be the number of tilings. Consider the rightmost column(s) of the grid. The rightmost $2 \times 1$ section can be covered by either a single vertical domino (leaving a $2 \times (n-1)$ grid to tile) or two horizontal dominoes stacked (leaving a $2 \times (n-2)$ grid). This gives a recurrence: $f(n) = f(n-1) + f(n-2)$ with $f(1) = 1$ and $f(2) = 2$. Compute the first few values, find the pattern, then prove by induction.

>[!question] Exercise
>Determine the number of domino tilings of a $2 \times n$ grid and prove your formula by induction.
