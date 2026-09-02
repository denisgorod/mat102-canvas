---
id: gcd-bezout
title: "Bézout's Identity"
role: theorem
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "For a, b not both zero there exist u, v ∈ ℤ with au + bv = gcd(a, b); indeed gcd(a, b) is the least positive integer of that form."
depends_on: [gcd-wop, gcd-def]
---
>[!t] Theorem
> Let $a, b \in \mathbb{Z}$, not both zero. There exist $u, v \in \mathbb{Z}$ with
> $$au + bv = \gcd(a,b),$$
> and $\gcd(a,b)$ is the **least positive** integer of this form.

>[!p] Proof
> Let $S = \{au+bv : u,v \in \mathbb{Z}\} \cap \mathbb{Z}^{+}$. As $a^2+b^2 = a\cdot a + b\cdot b$ is positive, $S \neq \emptyset$, and well-ordering gives a least element $d = au+bv$. Divide: $a = qd + r$ with $0 \le r < d$. Then $r = a-qd = a(1-qu)+b(-qv)$ again has the form $au'+bv'$, so $r < d$ forces $r = 0$ by minimality; thus $d \mid a$, and likewise $d \mid b$. Any common divisor $c$ divides $au+bv = d$, so $c \le d$. Hence $d = \gcd(a,b)$. $\square$
