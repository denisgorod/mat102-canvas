---
id: set-difference-complement
title: "Set difference and complement"
role: definition
subject: sets-and-propositions
topic: sets
statement: "For sets S and T, the difference is S ∖ T = {x ∈ S : x ∉ T}; for a universe of discourse U and A ⊆ U, the complement of A is Aᶜ = U ∖ A."
depends_on: [set-builder, set-subset, prop-connectives]
---
>[!d] Definition
> For sets $S$ and $T$, the **difference** is $S \setminus T = \{x \in S : x \notin T\}$. Given a **universe of discourse** $U$ and $A \subseteq U$, the **complement** of $A$ in $U$ is
> $$A^{c} = U \setminus A = \{x \in U : x \notin A\}.$$
> It is defined only for subsets of $U$.

>[!info] Note
> Difference is not symmetric: $\{1, 2\} \setminus \{2, 3\} = \{1\}$ but $\{2, 3\} \setminus \{1, 2\} = \{3\}$.

>[!e] Worked example
> Take $\mathbb{Z}^{+} \subseteq \mathbb{Z} \subseteq \mathbb{R}$. In $U = \mathbb{Z}$ the complement of $\mathbb{Z}^{+}$ is $\{x \in \mathbb{Z} : x \le 0\}$; in $U = \mathbb{R}$ it is $\mathbb{R} \setminus \mathbb{Z}^{+}$, which also contains $\tfrac12$: the complement depends on $U$. The positive reals have no complement in $\mathbb{Z}$, as $\tfrac12 > 0$ but $\tfrac12 \notin \mathbb{Z}$.
