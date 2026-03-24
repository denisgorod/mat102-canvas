---
id: bezout-corollaries
title: "Bézout corollaries"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: ex-prove-bezout-corollaries
    question: "Can I prove these corollaries myself?"
    edge_type: prerequisite
  - id: ex-gcd-after-dividing
    question: "What happens to the gcd after dividing out common factors?"
    edge_type: prerequisite
  - id: ex-coprime-modular-inverse
    question: "Can Bézout guarantee the existence of a modular inverse?"
    edge_type: prerequisite
parents:
  - bezouts-identity
---

Bézout's Identity is so rich that extracting just a few logical consequences gives us tools we'll use repeatedly.

>[!s] Proposition: Bézout Corollaries
>
>Let $a, b \in \mathbb{Z}$.
>
>**(Corollary I)** If $c$ is a common divisor of $a$ and $b$, then $c \mid \gcd(a, b)$.
>
>**(Corollary II)** If $d > 0$ is a common divisor of $a$ and $b$, and there exist integers $m, n$ such that $am + bn = d$, then $d = \gcd(a, b)$.

**Corollary I** says something subtle: *every* common divisor divides the gcd. This might seem backwards at first—isn't the gcd supposed to be the largest divisor? It is, but this corollary clarifies the order relationship: the gcd is the "maximal" element in the divisibility poset of common divisors.

**Corollary II** is a practical test: if you can express something as a combination $am + bn$, and that something divides both $a$ and $b$, then it must be the gcd. This often lets us verify Bézout coefficients without computing the Euclidean Algorithm.

Both corollaries follow directly from the proof of Bézout: in that proof we showed that the minimum positive element of $S = \{ax + by\}$ is a common divisor that every common divisor divides. Apply that same logic, and you get these results.

Here's a concrete benefit: if you want to simplify a fraction $\frac{a}{b}$, you divide both by $\gcd(a, b)$. The result is $\frac{a/d}{b/d}$ where $d = \gcd(a, b)$. Then $\gcd(a/d, b/d) = 1$—the fraction is in lowest terms. This is another corollary you can derive from Bézout.

>[!idea]
>
>Bézout's corollaries tell us that the gcd is divisible by every common divisor, and that expressing $d$ as a combination $am + bn$ (where $d$ is a common divisor) proves $d$ is the gcd.
