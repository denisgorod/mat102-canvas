---
id: set-union-intersection
title: "Union and intersection"
role: definition
subject: sets-and-propositions
topic: sets
statement: "For sets S and T, the union S ∪ T = {x : x ∈ S or x ∈ T}, with inclusive or, and the intersection S ∩ T = {x : x ∈ S and x ∈ T}."
depends_on: [set-builder, prop-connectives]
---
>[!d] Definition
> For sets $S$ and $T$, the **union** and **intersection** are
> $$S \cup T = \{x : x \in S \text{ or } x \in T\}, \qquad S \cap T = \{x : x \in S \text{ and } x \in T\}.$$
> Like $\vee$ and $\wedge$, both are symmetric in $S$ and $T$, and "or" is inclusive: elements of both sets lie in $S \cup T$. $S$ and $T$ are **disjoint** if $S \cap T = \emptyset$; a collection of sets is **pairwise disjoint** if any two distinct members are disjoint.

>[!e] Worked example
> For $S = \{a, b, c, d\}$ and $T = \{a, b, 1, 2, 3\}$: $S \cup T = \{a, b, c, d, 1, 2, 3\}$ and $S \cap T = \{a, b\}$. The sets $\{c, d\}$ and $\{1, 2, 3\}$ are disjoint.
