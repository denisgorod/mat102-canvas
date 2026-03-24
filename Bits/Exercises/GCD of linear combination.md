---
id: ex-gcd-linear-combo
title: "GCD of a linear combination"
role: exercise
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children: []
parents:
  - gcd-respects-remainders
  - basic-divisibility-properties
---

Show that $\gcd(3a + 2b, a + b) = \gcd(a, b)$ for any $a, b \in \mathbb{Z}^*$ (nonzero integers).

**Hint:** Use the fact that $\gcd$ respects remainders (Proposition 10). Repeatedly apply the gcd-remainder principle to replace the linear combinations $3a + 2b$ and $a + b$ with simpler expressions until you reduce to $\gcd(a, b)$.

One approach: compute $(3a + 2b) - 2(a + b)$ and $(a + b) - a$ to see how you can apply the gcd-remainder property.

>[!question] Exercise
Can you transform one pair of numbers into another while preserving their gcd?
