---
id: sub-def
title: "Subgroup"
role: definition
subject: group-theory
topic: subgroups-and-order
statement: "A subset H of a group G is a subgroup, written H ≤ G, if H is a group under the operation of G; equivalently, e ∈ H and H is closed under products and inverses."
depends_on: [grp-properties]
---
>[!d] Definition
> A subset $H$ of a group $G$ is a **subgroup**, written $H\le G$, if $H$ is a group under the operation of $G$ restricted to $H$. Equivalently: $e\in H$, and $ab\in H$ and $a^{-1}\in H$ for all $a,b\in H$.

>[!p] Proof (of the equivalence)
> ($\Leftarrow$) The product is a binary operator on $H$, associative as in $G$, with identity $e$ and inverses $a^{-1}$. ($\Rightarrow$) Closure holds by definition. If $e_H$ is the identity of $H$, then $e_He_H=e_H=e_He$ in $G$, so $e_H=e$ by cancellation. If $b\in H$ is the inverse of $a$ in $H$, then $ab=e=aa^{-1}$, so $a^{-1}=b\in H$ by cancellation. $\square$

>[!e] Examples
> $\{e\}\le G$ and $G\le G$; $2\mathbb{Z}\le\mathbb{Z}$, as $0$, $2a+2b$, $-2a$ are even; $\{[0],[2],[4]\}\le\mathbb{Z}_6$. But $\{[1],[5]\}$, a group under multiplication modulo $6$, is not a subgroup of $(\mathbb{Z}_6,+)$: the operation must be that of $G$, and $[1]+[1]=[2]\notin\{[1],[5]\}$.
