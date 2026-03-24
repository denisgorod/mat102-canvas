---
id: ex-solve-lde-1053-481
title: "Solve LDE 1053x+481y=39"
role: exercise
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - lde-particular-solution
---

# Solve LDE 1053x+481y=39

**Find a single integer solution $(x_0, y_0)$ to the equation $1053x + 481y = 39$.**

Use the extended Euclidean algorithm to find $\gcd(1053, 481)$, verify it divides 39, work backwards to find a solution to $1053x + 481y = \gcd(1053, 481)$, then scale appropriately.

You may either apply the algorithm directly to the original equation, or first divide through by the gcd to reduce the coefficients, then scale the solution.

>[!question] Exercise
>Apply the Euclidean algorithm to 1053 and 481, then work backwards to express $\gcd(1053, 481)$ as a linear combination.
