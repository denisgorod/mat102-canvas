---
id: grp-def
title: "Group"
role: definition
subject: group-theory
topic: groups-first-principles
statement: "A group (G, ·) is a set G with an associative binary operator · having an identity e (e·a = a·e = a) and giving each a ∈ G an inverse a⁻¹ ∈ G with a·a⁻¹ = a⁻¹·a = e."
depends_on: [fn-operator-inverse]
---
>[!d] Definition
> A **group** $(G,\cdot)$ is a set $G$ with a binary operator $\cdot$ on $G$ that
> - is **associative**: $a(bc)=(ab)c$ for all $a,b,c\in G$;
> - has an **identity** element $e\in G$;
> - gives each $a\in G$ an **inverse** $a^{-1}\in G$, two-sided: $aa^{-1}=a^{-1}a=e$.
>
> Identity and inverse are meant as in Inverse with respect to an operator.

>[!info] Note (notation)
> Neither commutativity nor finiteness is required. For $n\in\mathbb{Z}^{+}$ write $a^n=a\cdots a$ ($n$ factors), $a^0=e$ and $a^{-n}=(a^{-1})^n$; then $a^ma^n=a^{m+n}$ and $(a^m)^n=a^{mn}$ for all $m,n\in\mathbb{Z}$. Additive notation writes $a+b$, $0$, $-a$, $na$.

>[!e] Worked example
> $(\mathbb{Q}^*,\times)$, where $\mathbb{Q}^*=\mathbb{Q}\setminus\{0\}$, is a group: a product of nonzero rationals is nonzero, $\times$ is associative, $1$ is the identity and $(p/q)^{-1}=q/p\in\mathbb{Q}^*$. $(\mathbb{Q},\times)$ is not, as $0x=1$ has no solution; nor are the odd integers under $+$, since $1+1=2$ is even.
