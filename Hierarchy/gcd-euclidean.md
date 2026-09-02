---
id: gcd-euclidean
title: "Euclidean Algorithm"
role: application
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "gcd(a, b) = gcd(b, a mod b); iterating the division algorithm terminates at the last non-zero remainder, which is gcd(a, b)."
depends_on: [gcd-division-algorithm, gcd-def]
---
>[!t] Lemma (invariance)
> If $a = qb + r$ then $\gcd(a,b) = \gcd(b,r)$. Indeed $r = a-qb$ and $a = qb+r$, so by linearity $(a,b)$ and $(b,r)$ have exactly the same common divisors, hence the same greatest one.

>[!s] Application
> With $b > 0$, replace $(a,b)$ by $(b, a \bmod b)$ and repeat. The remainders satisfy $b > r_1 > r_2 > \cdots \ge 0$, and by well-ordering such a strictly decreasing sequence must reach $r_{n+1} = 0$. Then $\gcd(a,b) = \gcd(r_n, 0) = r_n$, the last non-zero remainder.

>[!e] Worked example
> $616 = 1\cdot 427 + 189$, $427 = 2\cdot 189 + 49$, $189 = 3\cdot 49 + 42$, $49 = 1\cdot 42 + 7$, $42 = 6\cdot 7 + 0$. So $\gcd(616,427) = 7$.
