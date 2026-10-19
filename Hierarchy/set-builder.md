---
id: set-builder
title: "Set-builder notation"
role: definition
subject: sets-and-propositions
topic: sets
statement: "For a set U and predicate P(x), {x ∈ U : P(x)} is the set of x ∈ U with P(x) true; generally, {expression : conditions} is the set of values the expression takes as its variables satisfy the conditions."
depends_on: [set-def, prop-predicate]
---
>[!d] Definition
> For a set $U$ and a predicate $P(x)$ on its elements,
> $$\{x \in U : P(x)\}$$
> is the set of those $x \in U$ for which $P(x)$ is true; the colon, or a bar $\mid$, reads "such that". More generally, $\{\text{expression} : \text{conditions}\}$ is the set of values the expression takes when its variables satisfy the conditions.

>[!info] Note
> The condition must be well-defined, and an omitted ambient set, as in $\{x : 0 < x < 1\}$, must be clear from context (here $\mathbb{R}$).

>[!e] Worked example
> $\{n \in \mathbb{Z} : n^2 < 10\} = \{-3, -2, -1, 0, 1, 2, 3\}$, since $n^2 \le 9$ for $|n| \le 3$ and $n^2 \ge 16$ for $|n| \ge 4$. The set $\{2k : k \in \mathbb{Z}\}$ is the set of even integers.
