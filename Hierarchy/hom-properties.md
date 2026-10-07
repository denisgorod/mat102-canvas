---
id: hom-properties
title: "Properties of homomorphisms"
role: theorem
subject: group-theory
topic: homomorphisms
statement: "For a homomorphism φ: G → H, φ(e_G) = e_H, φ(gⁿ) = φ(g)ⁿ (n ∈ ℤ), |φ(g)| divides |g| if finite, φ(K) ≤ H for K ≤ G, cyclic (abelian) if K is; φ⁻¹(L) ≤ G for L ≤ H."
depends_on: [hom-def, cyc-def, fn-image, fn-preimage]
---
>[!t] Theorem
> Let $\varphi:G\to H$ be a homomorphism, $g\in G$, $K\le G$ and $L\le H$.
> 1. $\varphi(e_G)=e_H$ and $\varphi(g^n)=\varphi(g)^n$ for all $n\in\mathbb{Z}$.
> 2. If $|g|$ is finite, $|\varphi(g)|$ divides $|g|$.
> 3. $\varphi(K)\le H$ and $\varphi^{-1}(L)\le G$.
> 4. If $K$ is cyclic (abelian), so is $\varphi(K)$.

>[!p] Proof
> (1) $\varphi(e_G)\varphi(e_G)=\varphi(e_G)=\varphi(e_G)e_H$; cancel. By induction from $\varphi(g^0)=e_H$, $\varphi(g^{n+1})=\varphi(g^n)\varphi(g)=\varphi(g)^{n+1}$ for $n\ge0$. As $\varphi(g)\varphi(g^{-1})=\varphi(e_G)=e_H=\varphi(g^{-1})\varphi(g)$, $\varphi(g^{-1})=\varphi(g)^{-1}$, so $\varphi(g^{-n})=\varphi(g^{-1})^n=\varphi(g)^{-n}$. (2) $\varphi(g)^{|g|}=\varphi(g^{|g|})=\varphi(e_G)=e_H$; apply Order divides exponent. (3) Both sets contain the identity, and $\varphi(ab^{-1})=\varphi(a)\varphi(b)^{-1}$ lies in $\varphi(K)$ if $a,b\in K$, and in $L$ if $\varphi(a),\varphi(b)\in L$; apply the subgroup test. (4) $\varphi(\langle g\rangle)=\{\varphi(g)^k:k\in\mathbb{Z}\}=\langle\varphi(g)\rangle$, and $\varphi(a)\varphi(b)=\varphi(ab)=\varphi(ba)=\varphi(b)\varphi(a)$ for $a,b$ in an abelian $K$. $\square$

>[!warning] Common error
> A map with $\varphi(e_G)\ne e_H$, such as $[n]\mapsto[n+1]$ on $\mathbb{Z}_4$, is not a homomorphism.
