---
id: ord-def
title: "Partial and total orders (posets)"
role: definition
subject: relations
topic: order-relations
statement: "⪯ on A is a (weak) partial order if reflexive, anti-symmetric and transitive, a strong order if irreflexive, anti-symmetric and transitive, and total (linear) if any two distinct elements are comparable; a set with a partial order is a poset."
depends_on: [rel-properties]
---
>[!d] Definition
> A relation $\preceq$ on $A$ is a **(weak) partial order** (like $\le$) if reflexive, anti-symmetric and transitive, and a **strong order** (like $<$) if irreflexive, anti-symmetric and transitive. It is **total** (linear) if any distinct $a, b$ are **comparable**: $a \preceq b$ or $b \preceq a$. A set with a partial order is a **poset** $(A, \preceq)$.

>[!info] Note
> "Partial" means comparability is not required: a **total order** is a total partial order, so every totally ordered set is a poset.

>[!e] Worked example
> $(\mathcal{P}(\{1,2,3\}), \subseteq)$ is a poset, not total: $\{1,2\}$, $\{2,3\}$ are incomparable. Divisibility is a partial order on $\mathbb{Z}^{+}$ — anti-symmetric, as $b = ak$, $a = b\ell$ give $k\ell = 1$ with $k, \ell \in \mathbb{Z}^{+}$, so $k = 1$ — but not on $\mathbb{Z}$: $2 \mid -2$ and $-2 \mid 2$.
