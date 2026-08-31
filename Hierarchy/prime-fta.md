---
id: prime-fta
title: "Fundamental Theorem of Arithmetic"
role: theorem
subject: number-theory
topic: primes
statement: "Every integer n > 1 is a product of primes, and that factorisation is unique up to the order of the factors."
depends_on: [prime-euclid-lemma, gcd-wop]
---
>[!t] Theorem
> Every integer $n > 1$ is a product of primes,
> $$n = p_1 \cdots p_k,$$
> and the factorisation is unique up to order.

>[!p] Proof
> *Existence.* By well-ordering, let $n > 1$ be least with no prime factorisation. It is not prime, so $n = ab$ with $1 < a, b < n$; by minimality $a$ and $b$ are products of primes, hence so is $n$ — contradiction. *Uniqueness.* If $p_1 \cdots p_k = q_1 \cdots q_m$, then $p_1 \mid q_1 \cdots q_m$, and Euclid's Lemma gives $p_1 = q_j$; cancel and induct. $\square$

>[!e] Worked example ($\sqrt{2}$ is irrational)
> If $\sqrt{2} = n/m$ with $n, m$ positive integers, then $n^2 = 2m^2$. The exponent of $2$ is even in $n^2$, odd in $2m^2$ — impossible.
