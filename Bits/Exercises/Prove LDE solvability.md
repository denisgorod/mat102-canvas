---
id: ex-prove-lde-solvability
title: "Prove LDE solvability"
role: exercise
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - lde-solvability
---

# Prove LDE solvability

Prove the following theorem: **The linear Diophantine equation $ax + by = c$ has an integer solution if and only if $\gcd(a, b) \mid c$.**

This is the central existence criterion for Diophantine equations. Your proof should establish both directions: first that if a solution exists then $\gcd(a, b)$ must divide $c$, and conversely that divisibility is sufficient.

You may use the extended Euclidean algorithm and Bézout's identity as tools.

>[!question] Exercise
>Show (⟹) by noting that $\gcd(a,b)$ divides both $a$ and $b$, hence any $ax+by$. Show (⟸) by scaling a solution to $ax+by=\gcd(a,b)$.
