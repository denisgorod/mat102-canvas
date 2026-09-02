---
id: gcd-def
title: "Greatest common divisor and coprimality"
role: definition
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "gcd(a, b) is the largest integer dividing both a and b (not both zero); a and b are coprime when gcd(a, b) = 1."
depends_on: [div-def]
---
>[!d] Definition
> Let $a, b \in \mathbb{Z}$, **not both zero**. The **greatest common divisor** of $a$ and $b$ is
> $$\gcd(a,b) = \max\{d \in \mathbb{Z} : d \mid a \text{ and } d \mid b\}.$$
> $a$ and $b$ are **coprime** (relatively prime) when $\gcd(a,b) = 1$.

>[!info] Why "not both zero"
> The set of common divisors contains $1$, and if $a \neq 0$ no divisor of $a$ exceeds $|a|$, so it is bounded above and the maximum exists. For $a = b = 0$ every integer divides both, so no maximum exists; by convention $\gcd(0,0) = 0$. Note $\gcd(a,0) = |a|$.

>[!e] Examples
> $\gcd(12,18) = 6$ and $\gcd(17,4) = 1$. Coprimality is not primality: $\gcd(6,25) = 1$ although both are composite.
