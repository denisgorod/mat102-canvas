---
id: sub-order-divides
title: "Order divides exponent"
role: theorem
subject: group-theory
topic: subgroups-and-order
statement: "If |g| = n is finite, gᵏ = e iff n ∣ k, and gⁱ = gʲ iff i ≡ j (mod n), so e, g, …, gⁿ⁻¹ are distinct; if |g| = ∞, distinct exponents give distinct powers."
depends_on: [sub-order, mod-congruence-def]
---
>[!t] Theorem
> Let $g\in G$. If $|g|=n$ is finite, then for all $i,j,k\in\mathbb{Z}$,
> $$g^k=e\iff n\mid k, \qquad g^i=g^j\iff i\equiv j \pmod n,$$
> so $e,g,\dots,g^{n-1}$ are distinct. If $|g|=\infty$, then $g^i=g^j$ only when $i=j$.

>[!p] Proof
> By the Division Algorithm, $k=nq+r$ with $0\le r<n$, and $g^k=(g^n)^qg^r=g^r$. If $g^k=e$, then $g^r=e$, and $r>0$ would contradict the minimality of $n$; so $r=0$ and $n\mid k$. If $k=nq$, then $g^k=(g^n)^q=e$. Next, $g^i=g^j\iff g^{i-j}=e$ (multiply by $g^{-j}$) $\iff n\mid i-j$. For $0\le i<j<n$, $0<j-i<n$, so $g^i\ne g^j$. If $|g|=\infty$ and $i\ne j$, say $i>j$, no positive power is $e$, so $g^{i-j}\ne e$ and $g^i\ne g^j$. $\square$

>[!warning] Common error
> The exponents $k$ with $g^k=e$ are the **multiples** of $|g|$, not its divisors. In $\mathbb{Z}_8$, $|[2]|=4$ and $k[2]=[0]$ exactly when $4\mid k$, i.e. $k\in\{\dots,-4,0,4,8,\dots\}$; although $2\mid4$, $2[2]=[4]\ne[0]$.
