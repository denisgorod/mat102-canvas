---
id: bezouts-identity
title: "Bézout's Identity"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: bezout-corollaries
    question: "What else follows from Bézout's identity?"
    edge_type: prerequisite
  - id: back-substitution
    question: "How do I actually find the coefficients m and n?"
    edge_type: prerequisite
  - id: coprime-divides-product
    question: "What can Bézout tell us about coprime divisors?"
    edge_type: prerequisite
parents:
  - euclidean-algorithm
---

Here's a surprising theorem: for any two integers $a$ and $b$, you can write their gcd as a combination $am + bn$ for some integers $m$ and $n$. This is called Bézout's Identity, and it's one of the most powerful tools in number theory.

>[!t] Theorem: Bézout's Identity
>
>Let $a, b \in \mathbb{Z}$. There exist integers $m, n$ such that
>$$am + bn = \gcd(a, b).$$

The proof is elegant: consider the set $S = \{ax + by : x, y \in \mathbb{Z}\}$ of all linear combinations of $a$ and $b$. This set is nonempty (it contains $a$, for instance) and contains at least one positive integer (since $a$ or $-a$ is positive). By the Well-Ordering Principle, the set of positive elements has a minimum, call it $d$.

Now we show $d = \gcd(a, b)$. Since $d$ is a linear combination of $a$ and $b$, any common divisor of $a$ and $b$ divides $d$. Also, $d$ must divide both $a$ and $b$ (you can prove this by applying the Division Algorithm and using the fact that $d$ is minimal). Therefore $d$ is a common divisor. Since every common divisor divides $d$, we have $d = \gcd(a, b)$.

Why does this matter? It tells us that the gcd is never "hidden" or inaccessible—you can always express it as a combination of $a$ and $b$. Moreover, the proof doesn't require factoring: it uses only the Well-Ordering Principle and arithmetic. This makes Bézout's Identity work even in settings far beyond the integers.

>[!idea]
>
>Bézout's Identity asserts that the gcd of two integers can always be written as an integer linear combination of them—a guarantee that what divides both is expressible in terms of both.
