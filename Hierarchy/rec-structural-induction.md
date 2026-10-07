---
id: rec-structural-induction
title: "Principle of Structural Induction"
role: theorem
subject: induction
topic: recursion-and-structural-induction
statement: "Let S be recursively defined; if P(b) holds for every basis element b and, for each constructor, P holds for the output whenever it holds for all inputs, then P(s) holds for every s ∈ S."
depends_on: [rec-recursive-def, sind-principle]
---
>[!t] Theorem
> Let $S$ be recursively defined. If $P$ holds for every basis element, and each constructor's output satisfies $P$ whenever all its inputs do, then $P(s)$ holds for every $s \in S$.

>[!p] Proof
> Strong induction on the number $n$ of constructor applications building an element. For $n=0$ it is a basis element, so $P$ holds. For $n=k+1$, the last application acts on inputs built with at most $k$ applications, which satisfy $P$ by the induction hypothesis; so the output does. Each $s \in S$ has some $n$. $\square$

>[!e] Worked example
> Take basis $3$ and constructor $a,b \in S \implies a+b \in S$. Then $P(s)$: $s \in 3\mathbb{Z}^{+}$ holds for $3$, and $3m+3m'=3(m+m')$. This proves only $S \subseteq 3\mathbb{Z}^{+}$. The reverse inclusion needs its own induction on $m$: $3\in S$, and $3m\in S \implies 3m+3\in S$. Hence $S = 3\mathbb{Z}^{+}$.
