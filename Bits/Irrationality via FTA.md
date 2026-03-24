---
id: irrationality-via-fta
title: "Irrationality via FTA"
role: bit
group: primes
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fta-uniqueness
---

You've now mastered the Fundamental Theorem of Arithmetic: every positive integer has a unique prime factorization. This power can reach beyond integers into the realm of irrational numbers. Let's use unique factorization to prove that $\log_{36}(105)$ is irrational.

**Proof by contradiction:** Assume $\log_{36}(105) = p/q$ where $p$ and $q$ are integers with $\gcd(p,q) = 1$. By definition of logarithm, $36^{p/q} = 105$. Raising both sides to the $q$-th power:

$$36^p = 105^q$$

Now factor both sides into primes. We have $36 = 2^2 \cdot 3^2$ and $105 = 3 \cdot 5 \cdot 7$, so:

$$2^{2p} \cdot 3^{2p} = 3^q \cdot 5^q \cdot 7^q$$

By unique factorization, the exponents of each prime must match on both sides. But the left side has a factor of $2^{2p}$ (the prime 2 appears), while the right side has no factor of 2. This is a contradiction.

Therefore, $\log_{36}(105)$ cannot be rational. It is irrational.

This argument works because unique factorization gives you a canonical form for every integer. If two factorizations were equal, every prime's exponent must be identical on both sides—and here they are not.

>[!idea]
>Unique prime factorization can prove irrationality: if assuming $x$ is rational leads to an equation whose two sides have different prime factorizations, we have a contradiction.
