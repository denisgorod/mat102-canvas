---
id: fta-uniqueness
title: "FTA uniqueness"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: irrationality-via-fta
    question: "Can unique factorization prove irrationality?"
    edge_type: prerequisite
  - id: infinitely-many-primes
    question: "Are there finitely or infinitely many primes?"
    edge_type: prerequisite
  - id: ex-trailing-zeros-factorial
    question: "Can unique factorization tell me how many times a prime divides n!?"
    edge_type: prerequisite
  - id: ex-divisibility-via-prime-factorization
    question: "Does unique factorization give a complete description of all divisors?"
    edge_type: prerequisite
  - id: ex-count-divisors
    question: "How many divisors does n have in terms of its prime factorization?"
    edge_type: prerequisite
parents:
  - fta-existence
  - prime-divisibility-property
---

You've proven that every integer greater than 1 factors into primes. But is the factorization unique? That is, can the same number be written as a product of primes in two fundamentally different ways?

The answer is no—the factorization is unique (up to reordering). The proof relies on the prime divisibility property. Suppose, for contradiction, that some integer has two distinct prime factorizations:

$$n = p_1 p_2 \cdots p_k = q_1 q_2 \cdots q_m$$

where the primes $p_i$ and $q_j$ are not the same (in some reordering). Since $p_1$ divides the left side, it divides the right side: $p_1 \mid q_1 q_2 \cdots q_m$. By the prime divisibility property, $p_1$ must divide at least one of the $q_j$. Since $q_j$ is also prime, we have $p_1 = q_j$. Reorder so that $p_1 = q_1$, and cancel:

$$p_2 p_3 \cdots p_k = q_2 q_3 \cdots q_m$$

Repeat the argument. We deduce that $p_2 = q_2$, $p_3 = q_3$, and so on. Eventually, all primes match (in some order), so $k = m$ and the factorizations are identical. Contradiction.

This uniqueness is the other half of the Fundamental Theorem of Arithmetic. Together with existence, it makes prime factorization the canonical way to understand integer divisibility.

>[!t] Theorem
>The prime factorization of any positive integer greater than 1 is unique up to reordering.
