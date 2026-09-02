---
id: lde-solvable
title: "Solvability criterion"
role: theorem
subject: number-theory
topic: diophantine-equations
statement: "ax + by = c has an integer solution if and only if gcd(a, b) divides c."
depends_on: [lde-def, gcd-bezout-cor]
---
>[!t] Theorem
> Let $a, b, c \in \mathbb{Z}$ with $a, b$ not both zero, and put $d = \gcd(a, b)$. Then
> $$ax + by = c \ \text{ has a solution } (x, y) \in \mathbb{Z}^2 \iff d \mid c.$$

>[!p] Proof
> ($\Rightarrow$) If $ax_0 + by_0 = c$ with $x_0, y_0 \in \mathbb{Z}$, then $d \mid a$ and $d \mid b$ force $d \mid (ax_0 + by_0) = c$.
>
> ($\Leftarrow$) Suppose $d \mid c$, say $c = kd$ with $k \in \mathbb{Z}$. By Bézout's identity there are $u, v \in \mathbb{Z}$ with $au + bv = d$. Scaling by $k$,
> $$a(ku) + b(kv) = kd = c,$$
> so $(ku, kv)$ is an integer solution. $\square$
