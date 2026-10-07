---
id: grp-properties
title: "Basic properties of groups"
role: theorem
subject: group-theory
topic: groups-first-principles
statement: "In a group the identity and each inverse are unique; ab = ac or ba = ca implies b = c; (a⁻¹)⁻¹ = a; and (a₁⋯aₖ)⁻¹ = aₖ⁻¹⋯a₁⁻¹, so (ab)⁻¹ = b⁻¹a⁻¹ and (aⁿ)⁻¹ = (a⁻¹)ⁿ = a⁻ⁿ."
depends_on: [grp-def, ind-principle]
---
>[!t] Theorem
> In a group $G$, for all $a,b,c,a_1,\dots,a_k\in G$ and $n\in\mathbb{Z}^{+}$:
> 1. the identity is unique, and so is the inverse of $a$;
> 2. $ab=ac\implies b=c$, and $ba=ca\implies b=c$;
> 3. $(a^{-1})^{-1}=a$ and $(a_1\cdots a_k)^{-1}=a_k^{-1}\cdots a_1^{-1}$; so $(ab)^{-1}=b^{-1}a^{-1}$ and $(a^n)^{-1}=(a^{-1})^n=a^{-n}$.

>[!p] Proof
> If $e'$ is an identity too, then $e'e=e$ because $e'$ is an identity and $e'e=e'$ because $e$ is one; so $e'=e$. If $ab=ac$, then $b=(a^{-1}a)b=a^{-1}(ab)=a^{-1}(ac)=(a^{-1}a)c=c$; the right-hand case is symmetric. If $r,s$ are inverses of $a$, then $ar=e=as$, so $r=s$ by cancellation. As $a^{-1}a=aa^{-1}=e$, $a$ is the inverse of $a^{-1}$. Induct on $k$ ($k=1$ is trivial): with $x=a_1\cdots a_k$ and $y=a_{k+1}$, $(xy)(y^{-1}x^{-1})=xx^{-1}=e$ and $(y^{-1}x^{-1})(xy)=e$, so by uniqueness and the induction hypothesis $(xy)^{-1}=y^{-1}x^{-1}=a_{k+1}^{-1}a_k^{-1}\cdots a_1^{-1}$. Taking all $a_i=a$ gives $(a^n)^{-1}=(a^{-1})^n$, which is $a^{-n}$ by definition. $\square$

>[!warning] Common error
> $(ab)^{-1}=a^{-1}b^{-1}$ is false in general: the inverses reverse order.
