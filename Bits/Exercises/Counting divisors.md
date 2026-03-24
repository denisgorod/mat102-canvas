---
id: ex-count-divisors
title: "Counting divisors"
role: exercise
group: primes
curriculum_path: null
learning_objectives: []
children: []
parents:
  - ex-divisibility-via-prime-factorization
  - fta-uniqueness
---

# Counting divisors

This exercise derives a formula for the number of positive divisors of an integer from its prime factorization.

**Part (a).** Find the number of positive divisors of $360$. (Hint: first factor 360 into primes.)

**Part (b).** In general, suppose $n = p_1^{d_1} p_2^{d_2} \cdots p_k^{d_k}$ where the $p_i$ are distinct primes. Derive a formula for the number of positive divisors of $n$ in terms of the exponents $d_1, \ldots, d_k$.

Hint: A divisor of $n$ must have the form $p_1^{e_1} \cdots p_k^{e_k}$ where $0 \le e_i \le d_i$ for each $i$. How many choices are there for each exponent?

**Part (c).** If $n = p_1^{d_1} \cdots p_k^{d_k}$, determine a necessary and sufficient condition on the exponents $d_i$ for $n$ to be a perfect square (i.e., $n = m^2$ for some integer $m$).

>[!question] Exercise
>Each exponent can independently range from 0 to $d_i$, giving $d_i + 1$ choices. For part (c), when can we write all exponents as $d_i = 2e_i$?
