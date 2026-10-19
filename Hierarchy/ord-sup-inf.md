---
id: ord-sup-inf
title: "Bounds, supremum and infimum"
role: definition
subject: relations
topic: order-relations
statement: "In a poset (A, ⪯), U is an upper bound of S ⊆ A if x ⪯ U ∀x ∈ S; a supremum is an upper bound ⪯ all others, and is unique; lower bounds and infima are dual."
depends_on: [ord-def]
---
>[!d] Definition
> In a poset $(A, \preceq)$, $U \in A$ is an **upper bound** of $S \subseteq A$ if $x \preceq U$ for all $x \in S$; the **supremum** $\sup S$ is an upper bound $s$ with $s \preceq U$ for every upper bound $U$. **Lower bounds** and the **infimum** $\inf S$ are dual.

>[!info] Note
> Bounds need not lie in $S$ or exist. Two suprema satisfy $s \preceq s' \preceq s$, so $s = s'$ by anti-symmetry; likewise infima.

>[!e] Worked example
> In $(\mathbb{Z}^{+}, \mid)$, $S = \{8,12,36\}$ has lower bounds $1, 2, 4$ and $\inf S = 4$. Any upper bound $n$ has $8 \mid n$ and $9 \mid 36 \mid n$, so $72 \mid n$ as $\gcd(8,9) = 1$; and $72 = 8 \cdot 9 = 12 \cdot 6 = 36 \cdot 2$ is one: $\sup S = 72$.
