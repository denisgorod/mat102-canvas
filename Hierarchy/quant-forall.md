---
id: quant-forall
title: "Universal quantifier"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "For a set S and predicate P(x), the proposition ∀x ∈ S, P(x) ('for all x in S') is true exactly when P(x) is true for every x ∈ S; one x ∈ S with P(x) false makes it false."
depends_on: [prop-predicate, set-def]
---
>[!d] Definition
> The **universal quantifier** $\forall$ is read "for all". For a set $S$ and a predicate $P(x)$, $\forall x \in S,\ P(x)$ is the proposition that is true exactly when $P(x)$ is true for every $x \in S$. An $x \in S$ with $P(x)$ false is a **counterexample**; one counterexample makes the statement false.

>[!info] Note (bound variables)
> The quantifier binds $x$: $P(x)$ has no truth value until $x$ is fixed, but $\forall x \in S,\ P(x)$ has one, as does the existential statement. A bound variable may be renamed: $\forall t \in S,\ P(t)$ is the same proposition.

>[!e] Worked example
> $\forall x \in \mathbb{Z}^{+},\ x^2 \ge 1$ is true: each positive integer has $x \ge 1 > 0$, so $x^2 \ge x \ge 1$. $\forall x \in \mathbb{Z}^{+},\ x > 10$ is false, with counterexample $x = 1$.
