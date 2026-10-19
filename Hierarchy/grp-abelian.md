---
id: grp-abelian
title: "Abelian groups"
role: definition
subject: group-theory
topic: groups-first-principles
statement: "A group G is abelian (commutative) if ab = ba for all a, b ∈ G; equivalently, (ab)⁻¹ = a⁻¹b⁻¹ for all a, b ∈ G."
depends_on: [grp-properties]
---
>[!d] Definition
> A group $G$ is **abelian** (commutative) if $ab=ba$ for all $a,b\in G$, and **non-abelian** otherwise. Equivalently, $(ab)^{-1}=a^{-1}b^{-1}$ for all $a,b\in G$.

>[!p] Proof (of the equivalence)
> By the basic properties of groups, $(ab)^{-1}=b^{-1}a^{-1}$. If $G$ is abelian, $b^{-1}a^{-1}=a^{-1}b^{-1}$. Conversely, suppose $(xy)^{-1}=x^{-1}y^{-1}$ for all $x,y\in G$, and let $a,b\in G$. Taking $x=a^{-1}$, $y=b^{-1}$ and using $(a^{-1})^{-1}=a$:
> $$ba=(b^{-1})^{-1}(a^{-1})^{-1}=(a^{-1}b^{-1})^{-1}=(a^{-1})^{-1}(b^{-1})^{-1}=ab. \qquad \square$$

>[!e] Examples
> $(\mathbb{Z},+)$, $(\mathbb{R},+)$ and $(\mathbb{Q}^*,\times)$ are abelian; for instance $\frac{p}{q}\cdot\frac{r}{s}=\frac{pr}{qs}=\frac{rp}{sq}=\frac{r}{s}\cdot\frac{p}{q}$. Composition of bijections need not commute: on $\{1,2,3\}$ let $f$ swap $1,2$ and $g$ swap $2,3$; then $(f\circ g)(1)=f(1)=2$ but $(g\circ f)(1)=g(2)=3$.
