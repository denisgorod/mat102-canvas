---
id: gcd-bezout-cor
title: "Consequences of Bézout"
role: theorem
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "If d ∣ a and d ∣ b then d ∣ gcd(a, b); a and b are coprime iff au + bv = 1 for some u, v; and if gcd(a, b) = 1 with a ∣ bc then a ∣ c."
depends_on: [gcd-bezout, div-properties]
---
>[!t] Corollaries
> Let $a, b, c, d \in \mathbb{Z}$ with $a, b$ not both zero.
> 1. If $d \mid a$ and $d \mid b$, then $d \mid \gcd(a,b)$.
> 2. $\gcd(a,b) = 1$ **iff** $au+bv = 1$ for some $u, v$.
> 3. If $\gcd(a,b) = 1$ and $a \mid bc$, then $a \mid c$.

>[!p] Proof
> (1) $\gcd(a,b) = au+bv$ by Bézout, which $d$ divides. (2) ($\Rightarrow$) is Bézout; ($\Leftarrow$) every common divisor divides $au+bv = 1$, so $\gcd(a,b) = 1$. (3) Multiplying $au+bv = 1$ by $c$: $c = acu+bcv$, and $a$ divides both terms (the second since $a \mid bc$), so $a \mid c$. $\square$

>[!info] Note
> Corollary 1 upgrades "greatest" from size to divisibility. Corollary 3 — *coprime divides product* — is the step that yields Euclid's Lemma for primes, and through it unique factorisation.
