---
id: iso-invariants
title: "Isomorphism invariants"
role: theorem
subject: group-theory
topic: isomorphisms
statement: "If φ: G → H is an isomorphism, |G| = |H|, |φ(g)| = |g|, K ≅ φ(K) ≤ H for K ≤ G, and G is abelian (cyclic) iff H is; groups differing in any of these are not isomorphic."
depends_on: [iso-def, hom-properties, card-equal]
---
>[!t] Theorem
> Let $\varphi:G\to H$ be an isomorphism. Then $|G|=|H|$; $|\varphi(g)|=|g|$ for all $g\in G$; each $K\le G$ has $\varphi(K)\le H$ and $K\cong\varphi(K)$; and $G$ is abelian (cyclic) iff $H$ is.

>[!p] Proof
> $\varphi$ is a bijection, so $|G|=|H|$ (equal cardinality). For $n\in\mathbb{Z}^{+}$, $\varphi(g)^n=\varphi(g^n)$, which equals $e_H=\varphi(e_G)$ iff $g^n=e_G$ by injectivity; so $g$ and $\varphi(g)$ have equal (possibly infinite) orders. $\varphi(K)\le H$ by the properties of homomorphisms, and $\varphi$ restricts to a bijective homomorphism $K\to\varphi(K)$. If $G$ is abelian or cyclic, so is $H=\varphi(G)$, by the same properties; the converse applies this to $\varphi^{-1}$. $\square$

>[!e] Worked example
> $\mathbb{Z}_6\not\cong S_3$: both have order $6$, but $\mathbb{Z}_6$ is abelian and $S_3$ is not. $\mathbb{Z}_4\not\cong\mathbb{Z}_8^*$: $\mathbb{Z}_4=\langle[1]\rangle$ is cyclic, while every element of $\mathbb{Z}_8^*$ has order at most $2$. $(\mathbb{R},+)\not\cong(\mathbb{Q},+)$: $\mathbb{Q}$ is countable and $\mathbb{R}$ is not, so no bijection exists at all.
