---
id: infinitely-many-primes
title: "Infinitely many primes"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: ex-primes-of-form-4k3
    question: "Can Euclid's proof be adapted to show infinitely many primes of a specific form?"
    edge_type: prerequisite
parents:
  - fta-uniqueness
---

You've studied the building blocks of arithmetic—the primes. Now a profound question: are there finitely many primes, or infinitely many?

The answer, proven by Euclid over two thousand years ago, is that there are infinitely many. The proof is elegant and uses the Fundamental Theorem of Arithmetic.

**Proof by contradiction:** Suppose there are only finitely many primes, and list them all as $p_1, p_2, \ldots, p_n$. Consider the number:

$$x = p_1 p_2 \cdots p_n + 1$$

This number is larger than any of the primes $p_i$, so it cannot itself be prime. By the Fundamental Theorem of Arithmetic, $x$ must be divisible by at least one prime from our list—say, $p_k$.

But here's the contradiction: we have $p_k \mid p_1 p_2 \cdots p_n$ (since $p_k$ is one of the factors in the product) and $p_k \mid x = p_1 p_2 \cdots p_n + 1$. This means $p_k$ divides their difference:

$$p_k \mid (x - p_1 p_2 \cdots p_n) = 1$$

But no prime divides 1. Contradiction.

Therefore, our assumption was wrong. There cannot be only finitely many primes—there are infinitely many.

Euclid's proof reveals a deep truth: the integers are inexhaustible in their prime structure. No matter how far you go, you'll always find new primes waiting to be discovered.

>[!t] Theorem
>There are infinitely many prime numbers.
