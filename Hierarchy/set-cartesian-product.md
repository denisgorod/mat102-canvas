---
id: set-cartesian-product
title: "Cartesian product"
role: definition
subject: sets-and-propositions
topic: sets
statement: "For sets A and B, the Cartesian product A × B = {(a, b) : a ∈ A, b ∈ B} consists of ordered pairs, where (a, b) = (c, d) exactly when a = c and b = d."
depends_on: [set-builder]
---
>[!d] Definition
> For sets $A$ and $B$, the **Cartesian product** is the set of **ordered pairs**
> $$A \times B = \{(a, b) : a \in A \text{ and } b \in B\},$$
> where $(a, b) = (c, d)$ exactly when $a = c$ and $b = d$; so $(1, 2) \neq (2, 1)$ although $\{1, 2\} = \{2, 1\}$.

>[!e] Worked example
> $\{a, b\} \times \{1, 2, 3\} = \{(a,1), (a,2), (a,3), (b,1), (b,2), (b,3)\}$. The product $\{1, 2, 3\} \times \{a, b\}$ is a different set: its pair $(1, a)$ is not among these, as $1 \notin \{a, b\}$. Also $A \times \emptyset = \emptyset$.

>[!info] Note
> $\mathbb{R} \times \mathbb{R}$ is the coordinate plane. In general $A \times B \neq B \times A$, so coordinate order matters, as it does for relations, which are subsets of $A \times B$.
