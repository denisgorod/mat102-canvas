---
id: fta-existence
title: "FTA existence"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: fta-uniqueness
    question: "Is the prime factorization unique?"
    edge_type: prerequisite
parents:
  - well-ordering-principle
  - prime-definition
---

You've seen that primes are the building blocks of arithmetic. Now a fundamental question: can every positive integer be built from primes? More precisely, can every integer greater than 1 be expressed as a product of primes?

The answer is yes, and the proof uses the Well-Ordering Principle. Suppose, for contradiction, that some integers cannot be written as products of primes. Let $S$ be the set of all such counterexamples—positive integers greater than 1 that cannot be factored into primes. If $S$ is nonempty, it has a smallest element, call it $k$.

Now, $k$ cannot be prime (by definition of $S$). So $k$ must be composite: $k = rs$ for some $1 < r, s < k$. But since $k$ is the minimal element of $S$, both $r$ and $s$ must be factorizable into primes. Therefore, their product $k = rs$ is also a product of primes—contradicting the assumption that $k \in S$.

This contradiction shows $S$ must be empty. Every positive integer greater than 1 can be expressed as a product of primes. The proof is elegant: it uses only the Well-Ordering Principle and the definition of prime, without needing any sophisticated machinery.

>[!t] Theorem
>Every positive integer greater than 1 can be expressed as a product of primes.
