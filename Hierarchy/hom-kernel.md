---
id: hom-kernel
title: "Kernel and image"
role: definition
subject: group-theory
topic: homomorphisms
statement: "For a homomorphism φ: G → H, ker φ = {g ∈ G : φ(g) = e_H} is a subgroup of G, im φ = φ(G) is a subgroup of H, and φ is injective iff ker φ = {e_G}."
depends_on: [hom-properties, fn-injective]
---
>[!d] Definition
> For a homomorphism $\varphi:G\to H$, the **kernel** is $\ker\varphi=\{g\in G:\varphi(g)=e_H\}$ and the **image** is $\operatorname{im}\varphi=\{\varphi(g):g\in G\}$. Then $\ker\varphi\le G$, $\operatorname{im}\varphi\le H$, and $\varphi$ is injective iff $\ker\varphi=\{e_G\}$.

>[!p] Proof
> $\ker\varphi=\varphi^{-1}(\{e_H\})$ and $\operatorname{im}\varphi=\varphi(G)$ are subgroups by the properties of homomorphisms. If $\varphi$ is injective and $g\in\ker\varphi$, then $\varphi(g)=e_H=\varphi(e_G)$, so $g=e_G$. If $\ker\varphi=\{e_G\}$ and $\varphi(g)=\varphi(h)$, then $\varphi(gh^{-1})=\varphi(g)\varphi(h)^{-1}=e_H$, so $gh^{-1}=e_G$ and $g=h$. In that case $\varphi$, viewed as a map $G\to\operatorname{im}\varphi$, is a bijective homomorphism. $\square$

>[!e] Worked example
> $\varphi:\mathbb{Z}_{12}\to\mathbb{Z}_6$, $[x]_{12}\mapsto[2x]_6$, is a well-defined homomorphism ($6\mid2\cdot12$). Its values on $[0],\dots,[11]$ are $[0],[2],[4]$ repeating, so $\ker\varphi=\{[0],[3],[6],[9]\}$ and $\operatorname{im}\varphi=\{[0],[2],[4]\}$: $\varphi$ is neither injective nor surjective. Similarly $n\mapsto[2n]_6$ on $\mathbb{Z}$ has kernel $3\mathbb{Z}$, since $6\mid2n\iff3\mid n$.
