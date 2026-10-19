---
id: quant-exists
title: "Existential quantifier"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "For a set S and predicate P(x), the proposition ∃x ∈ S, P(x) ('there exists x in S such that P(x)') is true exactly when P(x) is true for at least one x ∈ S."
depends_on: [prop-predicate, set-def]
---
>[!d] Definition
> The **existential quantifier** $\exists$ is read "there exists". For a set $S$ and a predicate $P(x)$, $\exists x \in S,\ P(x)$ ("there exists $x$ in $S$ such that $P(x)$") is the proposition that is true exactly when $P(x)$ is true for at least one $x \in S$, called a **witness**.

>[!info] Note (at least one)
> One witness suffices, and it need not be unique: the statement says only that the number of witnesses is not zero. As $\emptyset$ has no elements, $\exists x \in \emptyset,\ P(x)$ is false for every predicate $P(x)$.

>[!e] Worked example
> $\exists x \in \mathbb{Z}^{+},\ x > 10$ is true, with witness $x = 11$ (as are $12, 13, \dots$). $\exists x \in \mathbb{Z}^{+},\ x = -5$ is false: every $x \in \mathbb{Z}^{+}$ has $x \ge 1 > -5$, so there is no witness.
