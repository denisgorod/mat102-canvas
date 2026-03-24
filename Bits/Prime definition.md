---
id: prime-definition
title: "Prime definition"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: prime-divisibility-property
    question: "Can we characterize primes in terms of divisibility?"
    edge_type: prerequisite
  - id: fta-existence
    question: "Can every number be built from primes?"
    edge_type: prerequisite
parents:
  - gcd-definition
---

You've studied greatest common divisors and learned that some pairs of numbers are coprime. Now a natural question emerges: what about a single number—when does it have no nontrivial divisors at all?

A *prime number* is a positive integer greater than 1 that cannot be written as a product of two smaller positive integers. Equivalently, its only positive divisors are 1 and itself.

This is the classical definition. It avoids subtle issues by excluding 1 (not prime) and requiring positivity. For example, 2 is prime: you cannot write $2 = a \cdot b$ with $1 < a, b < 2$. Similarly, 5 is prime. But 6 is not prime, since $6 = 2 \cdot 3$.

Primes are the "atoms" of arithmetic. Every positive integer is built by multiplying primes together. But before you can use them, you need to understand their properties. The classical definition is intuitive, but it turns out there's a more powerful way to think about primes—one based on divisibility rather than factorization. That deeper characterization will unlock proofs and insights that are harder to reach from the elementary definition alone.

>[!d] Definition
>A prime number is a positive integer $p > 1$ that cannot be expressed as $p = ab$ where $1 < a, b < p$.
