---
id: ord-max
title: "Maximal elements and the maximum"
role: definition
subject: relations
topic: order-relations
statement: "In a poset, a is maximal if a ⪯ x ⟹ x = a, minimal if x ⪯ a ⟹ x = a, the maximum if x ⪯ a ∀x (dually, minimum); a maximum is unique and maximal, not conversely."
depends_on: [ord-def]
---
>[!d] Definition
> In a poset $(A, \preceq)$, $a$ is **maximal** if $a \preceq x \implies x = a$, and **minimal** if $x \preceq a \implies x = a$, for all $x \in A$. $M$ is the **maximum** if $x \preceq M$ for all $x \in A$; the **minimum** is dual.

>[!info] Note
> By anti-symmetry, a maximum $M$ is maximal ($M \preceq x \preceq M$ forces $x = M$) and unique (maxima satisfy $M \preceq M' \preceq M$). Comparability alone does not suffice: $(\mathbb{Z}, \le)$ has no maximal element, as $n \le n+1 \neq n$.

>[!e] Worked example
> In $(\{1,2,3,5,6,10,15\}, \mid)$ the maximal elements are $6, 10, 15$, the only elements dividing no other. A maximum would be maximal, yet $10 \nmid 6$, $6 \nmid 10$, $6 \nmid 15$: there is none. The minimum is $1$. In $(\{1,2,4,8\}, \mid)$ the maximum is $8$.
