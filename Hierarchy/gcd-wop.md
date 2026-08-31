---
id: gcd-wop
title: "Well-Ordering Principle"
role: theorem
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "Every non-empty set of non-negative integers has a least element."
depends_on: []
---
>[!s] Axiom (Well-Ordering Principle)
> Every non-empty set $S$ of non-negative integers has a **least element**: there is $m \in S$ with $m \le n$ for all $n \in S$.

>[!info] Note
> This is an axiom for $\mathbb{Z}$, not a theorem — it is logically equivalent to the principle of mathematical induction, each derivable from the other. Its hypotheses are sharp: neither $\mathbb{Z}$ nor $\mathbb{Q}^{+}$ is well-ordered, so both non-emptiness and the bound below matter.

>[!e] Use in this topic
> Well-ordering supplies the existence half of both central results here. The Division Algorithm takes $r$ least in $\{a - qb : q \in \mathbb{Z}\}\cap\mathbb{Z}^{\ge 0}$; Bézout takes $d$ least in the positive part of $\{au + bv\}$. In each, minimality forces the conclusion.
