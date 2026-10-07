---
id: ind-principle
title: "Principle of Mathematical Induction"
role: theorem
subject: induction
topic: mathematical-induction
statement: "If P(n) is a predicate on ℤ⁺ such that P(1) is true and P(k) ⟹ P(k + 1) for every k ∈ ℤ⁺, then P(n) is true for every n ∈ ℤ⁺."
depends_on: [gcd-wop]
---
>[!t] Theorem
> Let $P(n)$ be a predicate on $\mathbb{Z}^{+}$. If $P(1)$ is true (the **base case**) and $P(k) \implies P(k+1)$ for every $k \in \mathbb{Z}^{+}$ (the **induction step**; $P(k)$ is the **induction hypothesis**), then $P(n)$ is true for every $n \in \mathbb{Z}^{+}$.

>[!p] Proof
> Suppose not. By the Well-Ordering Principle the non-empty set of $n \in \mathbb{Z}^{+}$ with $P(n)$ false has a least element $m$. As $P(1)$ is true, $m \ge 2$, and $P(m-1)$ is true by minimality. The step with $k = m - 1$ makes $P(m)$ true, a contradiction. $\square$

>[!warning] Common error
> Both parts are needed. For $P(n)$: "$n = n + 1$" the step holds, since $k = k + 1$ gives $k + 1 = k + 2$; yet every $P(n)$ is false. Within the step $P(k)$ is assumed, never proved.
