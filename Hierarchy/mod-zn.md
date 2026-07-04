---
id: mod-zn
title: "The integers modulo n (ℤₙ)"
role: object
subject: number-theory
topic: modular-arithmetic
statement: "ℤₙ = {[0],…,[n−1]} with well-defined +, × inherited from ℤ; it is a commutative ring with identity."
depends_on: [mod-arithmetic]
drills: []
---
>[!d] Definition
> $\mathbb{Z}_n = \{[0], [1], \dots, [n-1]\}$ is the set of congruence classes modulo $n$, with operations
> $$[a] + [b] = [a+b], \qquad [a]\cdot[b] = [ab].$$
> By the compatibility theorem these operations are **well-defined** — independent of the representatives chosen.

>[!s] Proposition
> $(\mathbb{Z}_n, +, \cdot)$ is a commutative ring with additive identity $[0]$ and multiplicative identity $[1]$.

>[!info] Note
> $\mathbb{Z}_n$ need not be a field: $[a]$ has a multiplicative inverse exactly when $\gcd(a, n) = 1$. Invertibility is taken up in the next node.
