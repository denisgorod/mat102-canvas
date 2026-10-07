---
id: iso-cyclic
title: "Classification of cyclic groups"
role: theorem
subject: group-theory
topic: isomorphisms
statement: "If G = ⟨g⟩ is infinite, k ↦ gᵏ is an isomorphism ℤ → G; if |G| = n, [k]ₙ ↦ gᵏ is one ℤₙ → G. So every cyclic group is isomorphic to ℤ or to exactly one ℤₙ."
depends_on: [iso-invariants, grp-zn]
---
>[!t] Theorem (Classification of cyclic groups)
> Let $G=\langle g\rangle$. If $G$ is infinite, $k\mapsto g^k$ is an isomorphism $(\mathbb{Z},+)\to G$; if $|G|=n$, $[k]_n\mapsto g^k$ is an isomorphism $(\mathbb{Z}_n,+)\to G$. Hence every cyclic group is isomorphic to $\mathbb{Z}$ or to exactly one $\mathbb{Z}_n$.

>[!p] Proof
> As $|g|=|\langle g\rangle|=|G|$, Order divides exponent gives $g^k=g^j\iff k\equiv j\pmod n$ if $|G|=n$, and $g^k=g^j\iff k=j$ if $G$ is infinite. Direction ($\Leftarrow$) makes $[k]_n\mapsto g^k$ well defined; ($\Rightarrow$) makes either map injective. Both are onto, as $G=\{g^k:k\in\mathbb{Z}\}$, and homomorphisms, as $g^{k+j}=g^kg^j$ and $[k]_n+[j]_n=[k+j]_n$. If $G\cong\mathbb{Z}_m$ and $G\cong\mathbb{Z}_n$, then $\mathbb{Z}_m\cong\mathbb{Z}_n$, so $m=n$ by equality of orders; and the infinite $\mathbb{Z}$ is isomorphic to no $\mathbb{Z}_n$. $\square$

>[!info] Note
> In $D_3$, $|r|=3$, so $[k]_3\mapsto r^k$ is an isomorphism $\mathbb{Z}_3\to\langle r\rangle=\{e,r,r^2\}$. Yet $D_3\not\cong\mathbb{Z}_6$, although both have order $6$: $D_3$ is non-abelian, hence not cyclic.
