---
id: prime-euclid-lemma
title: "Euclid's Lemma"
role: theorem
subject: number-theory
topic: primes
statement: "If p is prime and p ∣ ab, then p ∣ a or p ∣ b."
depends_on: [prime-def, gcd-bezout-cor]
---
>[!t] Theorem (Euclid's Lemma)
> Let $p$ be prime and $a, b \in \mathbb{Z}$. If $p \mid ab$, then $p \mid a$ or $p \mid b$; by induction, if $p \mid a_1 a_2 \cdots a_n$ then $p \mid a_i$ for some $i$. It is this property — not "no proper divisors" — that makes prime factorisation unique, and composites lack it: $6 \mid 4 \cdot 9$, yet $6 \nmid 4$ and $6 \nmid 9$.

>[!p] Proof
> Suppose $p \nmid a$. The positive divisors of $p$ are $1$ and $p$, and $p \nmid a$ rules out $p$, so $\gcd(p, a) = 1$. Now $p \mid ab$ with $p$ coprime to $a$, so the coprime-divides-product corollary gives $p \mid b$. $\square$
