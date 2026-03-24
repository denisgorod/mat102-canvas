---
id: ex-divisibility-via-prime-factorization
title: "Divisibility via prime factorization"
role: exercise
group: primes
curriculum_path: null
learning_objectives: []
children:
  - id: ex-count-divisors
    question: "How many divisors does n have?"
    edge_type: prerequisite
parents:
  - fta-uniqueness
---

# Divisibility via prime factorization

This three-part exercise shows how prime factorization captures all divisibility information.

**Part (a).** Suppose $a = p_1^{a_1} p_2^{a_2} \cdots p_n^{a_n}$ where the $p_i$ are distinct primes. Show that $b \mid a$ if and only if $b$ has prime factorization $b = p_1^{d_1} p_2^{d_2} \cdots p_n^{d_n}$ where $0 \le d_i \le a_i$ for all $i$.

**Part (b).** For any integers $a, b$ with factorizations $a = p_1^{a_1} \cdots p_n^{a_n}$ and $b = p_1^{b_1} \cdots p_n^{b_n}$ (using a common set of primes, allowing exponents to be 0), show that
$$\gcd(a, b) = p_1^{\min(a_1, b_1)} p_2^{\min(a_2, b_2)} \cdots p_n^{\min(a_n, b_n)}.$$

**Part (c).** Compute $\gcd(9^4 \cdot 10^2, 12^3)$ using the formula from part (b).

>[!question] Exercise
>For (a), use the contrapositive and the Fundamental Theorem. For (b), verify that the product of min-exponents divides both $a$ and $b$ and is maximal.
