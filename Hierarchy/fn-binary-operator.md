---
id: fn-binary-operator
title: "Binary operator and identity element"
role: definition
subject: functions
topic: functions-ii
statement: "A binary operator on S is a function ∗: S × S → S; an identity element for ∗ is an e ∈ S with e ∗ a = a ∗ e = a for all a ∈ S."
depends_on: [fn-def]
---
>[!d] Definition
> A **binary operator** on a set $S$ is a function $\ast : S \times S \to S$, written $(a, b) \mapsto a \ast b$. An **identity element** for $\ast$ is an $e \in S$ with
> $$e \ast a = a \ast e = a \quad \text{for every } a \in S.$$

>[!info] Note (closure and uniqueness)
> Closure is built in: subtraction is a binary operator on $\mathbb{Z}$ but not on $\mathbb{Z}^{+}$, since $1 - 2 \notin \mathbb{Z}^{+}$. An identity is unique: if $e, e'$ are identities, then $e = e \ast e'$ as $e'$ is one, and $e \ast e' = e'$ as $e$ is.

>[!e] Worked example
> On $\mathbb{R}$, $+$ has identity $0$ and $\times$ identity $1$; subtraction has none, since $a - e = a$ forces $e = 0$, but $0 - 5 \neq 5$.
