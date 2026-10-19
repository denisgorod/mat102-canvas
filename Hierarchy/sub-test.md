---
id: sub-test
title: "Subgroup test"
role: theorem
subject: group-theory
topic: subgroups-and-order
statement: "A nonempty subset H of a group G is a subgroup if and only if ab⁻¹ ∈ H for all a, b ∈ H, and also if and only if H is closed under products and inverses."
depends_on: [sub-def]
---
>[!t] Theorem (Subgroup test)
> For a nonempty subset $H$ of a group $G$, the following are equivalent:
> (i) $H\le G$; (ii) $ab^{-1}\in H$ for all $a,b\in H$; (iii) $ab\in H$ and $a^{-1}\in H$ for all $a,b\in H$.

>[!p] Proof
> (i)$\implies$(iii) by the definition of subgroup. (iii)$\implies$(ii): $b^{-1}\in H$, so $ab^{-1}\in H$. (ii)$\implies$(i): pick $h\in H$; then $e=hh^{-1}\in H$, so $b^{-1}=eb^{-1}\in H$ for $b\in H$, and $ab=a(b^{-1})^{-1}\in H$. Thus $e\in H$ and $H$ is closed under products and inverses, so $H\le G$. $\square$

>[!e] Worked example
> For $g\in G$, the **centralizer** $C_G(g)=\{h\in G: hg=gh\}$ contains $e$. If $a,b\in C_G(g)$, multiplying $bg=gb$ by $b^{-1}$ on the left and on the right gives $gb^{-1}=b^{-1}g$, so
> $$(ab^{-1})g=agb^{-1}=gab^{-1},$$
> and $C_G(g)\le G$. Applied to all $g$ at once, this shows that the **center** $Z(G)=\{h\in G: hg=gh \text{ for all } g\in G\}$ is a subgroup.
