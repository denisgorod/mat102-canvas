---
id: cyc-subgroups
title: "Subgroups of cyclic groups are cyclic"
role: theorem
subject: group-theory
topic: cyclic-groups
statement: "Every subgroup H ≠ {e} of G = ⟨g⟩ is ⟨gᵐ⟩ for the least m ∈ ℤ⁺ with gᵐ ∈ H, so subgroups of cyclic groups are cyclic; if |g| = n, ⟨gᵏ⟩ = ⟨gᵈ⟩ with d = gcd(k, n)."
depends_on: [cyc-def, gcd-bezout]
---
>[!t] Theorem
> Let $G=\langle g\rangle$ and $H\le G$ with $H\ne\{e\}$. Then $H=\langle g^m\rangle$, where $m$ is the least positive integer with $g^m\in H$. If $|g|=n$ and $k\in\mathbb{Z}$, then $\langle g^k\rangle=\langle g^d\rangle$ for $d=\gcd(k,n)$.

>[!p] Proof
> ($\{e\}=\langle e\rangle$ is cyclic too.) $H$ contains some $g^k\ne e$, so $k\ne0$, and also $g^{-k}$; so some positive exponent occurs and well-ordering gives $m$. $\langle g^m\rangle\subseteq H$ as $H$ is a subgroup containing $g^m$. If $g^k\in H$, write $k=mq+r$ with $0\le r<m$; then $g^r=g^k(g^m)^{-q}\in H$, so $r=0$ by minimality and $g^k=(g^m)^q$. Next, Bézout gives $d=ku+nv$, so $g^d=(g^k)^u(g^n)^v=(g^k)^u\in\langle g^k\rangle$; and $d\mid k$ gives $g^k=(g^d)^{k/d}\in\langle g^d\rangle$. Each side is the smallest subgroup containing its generator, so they are equal. $\square$

>[!e] Worked example
> In $\mathbb{Z}_{12}=\langle[1]\rangle$, $\langle[8]\rangle=\langle[4]\rangle=\{[0],[4],[8]\}$ as $\gcd(8,12)=4$. Hence every subgroup of $\mathbb{Z}_{12}$ is $\langle[d]\rangle$ for some $d\mid12$; these have $12/d$ elements each, so $\mathbb{Z}_{12}$ has exactly six subgroups.
