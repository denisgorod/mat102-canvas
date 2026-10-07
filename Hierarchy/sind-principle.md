---
id: sind-principle
title: "Principle of Strong Induction"
role: theorem
subject: induction
topic: strong-induction
statement: "For integers n₀ ≤ n₁: if P(n₀), …, P(n₁) hold and P(n₀) ∧ ⋯ ∧ P(k) ⟹ P(k + 1) for all k ≥ n₁, then P(n) holds for all n ≥ n₀; it is equivalent to ordinary induction."
depends_on: [sind-generalized]
---
>[!t] Theorem
> Let $n_0 \le n_1$ be integers. If $P(n_0), \dots, P(n_1)$ are true and, for every integer $k\ge n_1$,
> $$P(n_0) \wedge \cdots \wedge P(k) \implies P(k+1),$$
> then $P(n)$ is true for every integer $n \ge n_0$.

>[!p] Proof
> For $n\ge n_1$ let $Q(n)$ be $P(n_0) \wedge \cdots \wedge P(n)$. The base cases give $Q(n_1)$. If $Q(k)$ holds with $k\ge n_1$, the hypothesis gives $P(k+1)$, hence $Q(k+1)$. By induction from base $n_1$, $Q(n)$ holds for all $n \ge n_1$; and for $n\ge n_0$, $P(n)$ is a conjunct of $Q(\max(n,n_1))$. $\square$

>[!info] Note
> Conversely, ordinary induction is the case $n_1 = n_0$ whose step uses only $P(k)$, so the two principles are logically equivalent. Strong induction suits steps reaching back past $k$, e.g. $k+1 = ab$ with $1 < a, b < k+1$. A step using $P(k+1-r)$ needs $r$ base cases.
