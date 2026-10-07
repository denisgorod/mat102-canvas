---
id: quant-negation
title: "Negating quantifiers"
role: theorem
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "For a set S and predicate P(x), ¬(∀x ∈ S, P(x)) is equivalent to ∃x ∈ S, ¬P(x), and ¬(∃x ∈ S, P(x)) to ∀x ∈ S, ¬P(x); nested quantifiers are negated one by one, left to right, keeping domains."
depends_on: [quant-forall, quant-exists, prop-connectives]
---
>[!t] Theorem
> For a set $S$ and predicate $P(x)$,
> $$\neg(\forall x\in S,\ P(x)) \equiv \exists x\in S,\ \neg P(x), \qquad \neg(\exists x\in S,\ P(x)) \equiv \forall x\in S,\ \neg P(x).$$
> Nested quantifiers are negated one at a time from the left, domains unchanged: $\neg(\forall x\in S\,\exists y\in T,\ P(x,y)) \equiv \exists x\in S\,\forall y\in T,\ \neg P(x,y)$.

>[!p] Proof
> By the definitions of $\forall$, $\exists$, $\neg$: $\forall x\in S,\ P(x)$ fails exactly when some $x\in S$ has $\neg P(x)$ true, and $\exists x\in S,\ P(x)$ fails exactly when every $x\in S$ has $\neg P(x)$ true. Nested quantifiers: apply this outermost first. $\square$

>[!e] Worked example
> $\neg(\forall x\in\mathbb{R},\ x<x^2)$ is $\exists x\in\mathbb{R},\ x\ge x^2$, true at $x = \tfrac12$. With $G$ the glittering things, "all that glisters is not gold" means $\neg(\forall x\in G,\ \mathrm{gold}(x))$, not $\forall x\in G,\ \neg\,\mathrm{gold}(x)$.
