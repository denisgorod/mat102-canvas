---
id: gcd-definition
title: "GCD definition and coprimality"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: gcd-respects-remainders
    question: "Can the Division Algorithm simplify computing gcds?"
    edge_type: prerequisite
  - id: prime-definition
    question: "What special role do numbers with no nontrivial divisors play?"
    edge_type: prerequisite
  - id: ex-compute-gcd-1053-481
    question: "Can I compute a gcd by hand?"
    edge_type: prerequisite
parents:
  - division-algorithm
---

When two numbers share a common divisor, we often care about the *largest* one they share. For instance, 12 and 18 are both divisible by 1, 2, 3, and 6—but 6 is the biggest. This is their greatest common divisor.

>[!d] Definition
>
>Let $a, b \in \mathbb{Z}$. The **greatest common divisor** of $a$ and $b$, written $\gcd(a, b)$, is the largest positive integer that divides both $a$ and $b$:
>$$\gcd(a, b) = \max\{d \in \mathbb{Z}^+ : d \mid a \text{ and } d \mid b\}.$$
>
>By convention, $\gcd(0, 0) = 0$. Two integers $a$ and $b$ are **coprime** or **relatively prime** if $\gcd(a, b) = 1$.

Some examples:
- $\gcd(4, 6) = 2$ (common divisors: 1, 2)
- $\gcd(15, 25) = 5$ (common divisors: 1, 5)
- $\gcd(17, 4) = 1$ (only common divisor: 1, so coprime)

A useful observation: since *every* integer divides 0, we have $\gcd(a, 0) = |a|$. In particular, $\gcd(a, a) = |a|$.

Coprimality is a symmetric idea that doesn't depend on either number being prime. For example, 6 and 25 are coprime even though 6 = 2 · 3 and 25 = 5² are both composite. Their prime factors simply don't overlap.

>[!idea]
>
>The gcd is the largest common divisor, and two numbers are coprime if their gcd equals 1—a notion that generalizes primality to pairs of numbers.
