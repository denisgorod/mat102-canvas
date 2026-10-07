---
id: sub-order
title: "Order of a group and of an element"
role: definition
subject: group-theory
topic: subgroups-and-order
statement: "The order |G| of a group is its number of elements; the order |g| of g ∈ G is the least n ∈ ℤ⁺ with gⁿ = e, or |g| = ∞ if no positive power of g equals e."
depends_on: [grp-def]
---
>[!d] Definition
> The **order** $|G|$ of a group $G$ is its number of elements, finite or infinite. The **order** $|g|$ of $g\in G$ is the least $n\in\mathbb{Z}^{+}$ with $g^n=e$ (additively, $ng=0$); if no such $n$ exists, $|g|=\infty$.

>[!e] Worked example
> In $(\mathbb{Z}_8,+)$ the multiples of $[3]$ are $[3],[6],[1],[4],[7],[2],[5],[0]$, so $|[3]|=8$; those of $[2]$ are $[2],[4],[6],[0]$, so $|[2]|=4$. In $D_3$, $|r|=3$ and $|s|=2$. In $(\mathbb{Z},+)$, $nm=0$ with $n\ge1$ forces $m=0$, so every nonzero integer has infinite order.

>[!info] Note
> $|g|=1$ iff $g=e$. Since $(g^{-1})^n=(g^n)^{-1}$, and $(aba^{-1})^n=ab^na^{-1}$ (the inner factors $a^{-1}a$ cancel) equals $e$ iff $b^n=e$, the same exponents $n$ give $e$ in each pair; so $|g^{-1}|=|g|$ and $|aba^{-1}|=|b|$. With $b$ replaced by $ba$, $a(ba)a^{-1}=ab$ gives $|ab|=|ba|$.
