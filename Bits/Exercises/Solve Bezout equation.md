---
id: ex-solve-bezout-equation
title: "Solve Bézout equation"
role: exercise
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children: []
parents:
  - back-substitution
---

Find integers $x$ and $y$ such that
$$1053x + 481y = \gcd(1053, 481)$$

Use the back-substitution technique: first run the Euclidean Algorithm to find $\gcd(1053, 481)$ (see Exercise 3 if you haven't already), then unwind the algorithm by expressing the gcd as a linear combination of the remainders, working backward to express it in terms of the original numbers.

Show all steps of the Euclidean Algorithm and all back-substitutions clearly.

>[!question] Exercise
Once you know the gcd, how do you recover the Bézout coefficients?
