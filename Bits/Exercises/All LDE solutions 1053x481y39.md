---
id: ex-all-lde-solutions
title: "All solutions to LDE 1053x+481y=39"
role: exercise
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - lde-general-solution
---

# All solutions to LDE 1053x+481y=39

**Find the general solution to $1053x + 481y = 39$.**

First, find one particular solution $(x_0, y_0)$ using the extended Euclidean algorithm (if you solved the previous exercise, you may reuse that result).

Then use the general solution formula: if $d = \gcd(a, b)$ and $(x_0, y_0)$ is a particular solution to $ax + by = c$, the complete family of solutions is
$$x = x_0 + n \cdot \frac{b}{d}, \quad y = y_0 - n \cdot \frac{a}{d} \quad \text{for all } n \in \mathbb{Z}.$$

>[!question] Exercise
>Identify $d = \gcd(1053, 481)$, plug in your particular solution and the formula, and express the general solution.
