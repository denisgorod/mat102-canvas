---
id: hom-def
title: "Group homomorphism"
role: definition
subject: group-theory
topic: homomorphisms
statement: "For groups (G, ·) and (H, ⋆), a function φ: G → H is a homomorphism if φ(x·y) = φ(x) ⋆ φ(y) for all x, y ∈ G."
depends_on: [grp-def]
---
>[!d] Definition
> For groups $(G,\cdot)$ and $(H,\star)$, a function $\varphi:G\to H$ is a **homomorphism** if
> $$\varphi(x\cdot y)=\varphi(x)\star\varphi(y)\quad\text{for all } x,y\in G.$$
> It need be neither injective nor surjective.

>[!e] Examples
> $n\mapsto[n]_6$ from $\mathbb{Z}$ to $\mathbb{Z}_6$, as $[m+n]_6=[m]_6+[n]_6$; $[x]_4\mapsto[2x]_8$ from $\mathbb{Z}_4$ to $\mathbb{Z}_8$, as $[2(x+y)]_8=[2x]_8+[2y]_8$ (well defined by the criterion below); $\det$ from invertible real $n\times n$ matrices under multiplication to $(\mathbb{R}^*,\times)$, as $\det(AB)=\det A\det B$. Inversion $g\mapsto g^{-1}$ on $G$ is one iff $(xy)^{-1}=x^{-1}y^{-1}$ for all $x,y$, that is, iff $G$ is abelian.

>[!warning] Common error
> A formula on representatives must first be well defined. $[x]_6\mapsto[2x]_{12}$ is: $[2(x+6t)]_{12}=[2x+12t]_{12}=[2x]_{12}$. But $[x]_6\mapsto[3x]_{12}$ is not a function, since $[1]_6=[7]_6$ while $[3]_{12}\ne[21]_{12}=[9]_{12}$. In general $[x]_n\mapsto[kx]_m$ is well defined iff $[k(x+nt)]_m=[kx]_m$ for all $t$, i.e. iff $m\mid kn$.
