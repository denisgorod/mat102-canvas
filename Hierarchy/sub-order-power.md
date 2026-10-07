---
id: sub-order-power
title: "Order of a power"
role: theorem
subject: group-theory
topic: subgroups-and-order
statement: "If g ∈ G has finite order n and k ∈ ℤ, then |gᵏ| = n / gcd(n, k); in particular |gᵏ| divides n, and gᵏ has order n if and only if gcd(n, k) = 1."
depends_on: [sub-order-divides, gcd-bezout-cor]
---
>[!t] Theorem
> If $|g|=n$ is finite and $k\in\mathbb{Z}$, then
> $$|g^k|=\frac{n}{\gcd(n,k)}.$$
> In particular $|g^k|$ divides $n$, and $|g^k|=n$ iff $\gcd(n,k)=1$.

>[!p] Proof
> Let $d=\gcd(n,k)\ge1$ (as $n\ne0$) and write $n=da$, $k=db$. A common divisor $c$ of $a,b$ gives $cd\mid n$ and $cd\mid k$, hence $cd\mid d$ by the Consequences of Bézout, so $c=\pm1$ and $\gcd(a,b)=1$. For $m\in\mathbb{Z}^{+}$, by Order divides exponent,
> $$(g^k)^m=e\iff n\mid km\iff da\mid dbm\iff a\mid bm\iff a\mid m,$$
> the last step since $\gcd(a,b)=1$ (coprime divides product). The least such $m$ is $a=n/d$, and $n=d\,|g^k|$ gives the rest. $\square$

>[!e] Worked example
> In $\mathbb{Z}_{12}$, $|[1]|=12$ and $[k]=k[1]$. Thus $|[8]|=12/\gcd(12,8)=3$ (multiples $[8],[4],[0]$), $|[9]|=12/3=4$, and $|[k]|=12$ exactly for $k\in\{1,5,7,11\}$, the $k$ coprime to $12$.
