---
id: quant-order
title: "Order of quantifiers"
role: theorem
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "Adjacent quantifiers of the same kind commute, but ∃y ∀x P(x, y) implies ∀x ∃y P(x, y), not conversely: over ℝ, ∀x ∃y, x + y = 0 is true while ∃y ∀x, x + y = 0 is false."
depends_on: [quant-forall, quant-exists]
---
>[!t] Theorem
> Let $P(x,y)$ be a predicate, $x \in S$, $y \in T$.
> 1. $\forall x\,\forall y,\ P(x,y) \equiv \forall y\,\forall x,\ P(x,y)$, and likewise for $\exists\exists$.
> 2. $\exists y\,\forall x,\ P(x,y) \implies \forall x\,\exists y,\ P(x,y)$, but not conversely: over $\mathbb{R}$, $\forall x\,\exists y,\ x+y=0$ is true and $\exists y\,\forall x,\ x+y=0$ false.

>[!p] Proof
> (1) Both sides assert $P(x,y)$ for every (for $\exists\exists$: some) pair $x \in S$, $y \in T$. (2) A $y_0$ with $P(x,y_0)$ for all $x$ is a witness for each $x$. Over $\mathbb{R}$: for each $x$, $y = -x$ works; for each $y$, $x = 1-y$ gives $x+y = 1 \neq 0$. $\square$

>[!info] Note
> Read left to right: in $\forall x\,\exists y$, $y$ may depend on $x$ (here $y = -x$); in $\exists y\,\forall x$ one $y$ must serve every $x$.
