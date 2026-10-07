---
id: grp-symmetric
title: "The symmetric group Sₙ"
role: object
subject: group-theory
topic: groups-first-principles
statement: "For a set X, the bijections X → X form a group S_X under composition, with identity id_X and inverses the inverse functions; Sₙ = S_X for X = {1, …, n} is abelian iff n ≤ 2."
depends_on: [grp-abelian, fn-composition-preserves, fn-invertible-iff-bijective]
---
>[!t] Theorem
> For a set $X$, the bijections $X\to X$ form a group $S_X$ under composition, with identity $\mathrm{id}_X$ and inverses the inverse functions. The group $S_n=S_{\{1,\dots,n\}}$ ($n\in\mathbb{Z}^{+}$) is abelian iff $n\le2$.

>[!p] Proof
> A composite of bijections is a bijection, so $\circ$ is a binary operator on $S_X$; composition is associative with $f\circ\mathrm{id}_X=f=\mathrm{id}_X\circ f$. By Invertible iff bijective, each $f\in S_X$ has an inverse $f^{-1}\in S_X$ with $f\circ f^{-1}=f^{-1}\circ f=\mathrm{id}_X$. $S_1$ and $S_2$ are abelian, since each has at most one element other than $\mathrm{id}$. For $n\ge3$, let $f$ swap $1,2$ and $g$ swap $2,3$, fixing all else: $(f\circ g)(1)=f(1)=2$ but $(g\circ f)(1)=g(2)=3$. $\square$

>[!e] Worked example (cycle notation)
> $(a_1\,a_2\,\cdots\,a_k)$ sends $a_1\mapsto a_2\mapsto\cdots\mapsto a_k\mapsto a_1$ and fixes the rest; products compose right to left, like functions. In $S_5$, $(1\,3\,4)\circ(2\,3)$ sends $1\mapsto1\mapsto3$, $3\mapsto2\mapsto2$, $2\mapsto3\mapsto4$, $4\mapsto4\mapsto1$, fixing $5$; so it equals $(1\,3\,2\,4)$.
