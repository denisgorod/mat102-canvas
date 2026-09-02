---
id: prime-def
title: "Prime and composite integers"
role: definition
subject: number-theory
topic: primes
statement: "An integer p > 1 is prime when its only positive divisors are 1 and p; an integer n > 1 that is not prime is composite."
depends_on: [div-def]
---
>[!d] Definition
> An integer $p > 1$ is **prime** if its only positive divisors are $1$ and $p$. An integer $n > 1$ that is not prime is **composite**; equivalently, $n = ab$ for some integers with $1 < a, b < n$. The primes begin $2, 3, 5, 7, 11, \dots$, and $2$ is the only even one.

>[!info] Note (why $1$ is excluded)
> Every integer $n \le 1$ is neither prime nor composite. Barring it is not fussiness: since $1 \cdot m = m$, admitting $1$ would destroy uniqueness of factorisation, as
> $$12 = 2^2 \cdot 3 = 1 \cdot 2^2 \cdot 3 = 1^2 \cdot 2^2 \cdot 3 = \cdots$$
> would all count as prime factorisations of $12$.
