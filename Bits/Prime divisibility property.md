---
id: prime-divisibility-property
title: "Prime divisibility property"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: fta-uniqueness
    question: "How does the prime divisibility property ensure uniqueness?"
    edge_type: prerequisite
  - id: ex-write-prime-property-logic
    question: "Can I express the prime property in formal logic?"
    edge_type: prerequisite
  - id: ex-primality-necessary
    question: "Does the divisibility property fail for composite numbers?"
    edge_type: prerequisite
  - id: ex-prime-divides-iff-square
    question: "What does prime divisibility say about squares?"
    edge_type: prerequisite
  - id: ex-squares-mod-prime
    question: "How does the prime divisibility property apply to modular squares?"
    edge_type: prerequisite
parents:
  - prime-definition
  - coprime-divides-product
---

You know primes from their factorization: they can't be broken into smaller factors. But there's another way to think about primes, more powerful for proofs. It focuses on divisibility of products.

**Claim:** A positive integer $p > 1$ is prime if and only if: whenever $p$ divides a product $ab$, then $p$ divides $a$ or $p$ divides $b$.

Why is this true? Suppose $p$ is prime and $p \mid ab$. If $p \nmid a$, then $\gcd(a, p) = 1$ (since the only divisors of $p$ are 1 and $p$ itself). By the coprime divides product result, $p \mid b$. Conversely, if $p$ is not prime, then $p = rs$ for some $1 < r, s < p$. Then $p \mid rs$, but $p$ divides neither $r$ nor $s$. So the property fails for composite numbers.

This characterization is **more useful in proofs** than the factorization definition. It captures the essence of primality: if a prime divides a product, it must divide one of the factors. This property extends naturally: if $p$ is prime and $p \mid a_1 a_2 \cdots a_n$, then $p$ divides at least one $a_i$.

In advanced mathematics, this divisibility property **is** the definition of prime. It's more flexible and works in more general contexts than the factorization idea.

>[!t] Theorem
>A positive integer $p > 1$ is prime if and only if: for all $a, b \in \mathbb{Z}$, if $p \mid ab$ then $p \mid a$ or $p \mid b$.
