---
id: rec-fibonacci
title: "The Fibonacci sequence"
role: object
subject: induction
topic: recursion-and-structural-induction
statement: "The Fibonacci sequence, x₁ = x₂ = 1 and xₙ = xₙ₋₁ + xₙ₋₂ for n ≥ 3, satisfies xₙ = (αⁿ − βⁿ)/√5 for every n ∈ ℤ⁺, where α = (1 + √5)/2, β = (1 − √5)/2."
depends_on: [rec-recursive-def, sind-principle]
---
>[!d] Definition
> The **Fibonacci sequence** is defined by $x_1 = x_2 = 1$ and $x_n = x_{n-1} + x_{n-2}$ for $n \ge 3$: $1, 1, 2, 3, 5, 8, 13, \dots$ It is a sequence, not a set: $1$ occurs twice, and order matters.

>[!t] Theorem
> For every $n \in \mathbb{Z}^{+}$,
> $$x_n = \frac{\alpha^n - \beta^n}{\sqrt{5}}, \qquad \alpha = \frac{1+\sqrt{5}}{2}, \quad \beta = \frac{1-\sqrt{5}}{2}.$$

>[!p] Proof
> Direct computation gives $\alpha^2 = \frac{3+\sqrt{5}}{2} = \alpha+1$, likewise $\beta^2=\beta+1$, and $\alpha+\beta=1$, $\alpha-\beta=\sqrt{5}$. Base cases: $\frac{\alpha-\beta}{\sqrt{5}} = 1 = x_1$ and $\frac{\alpha^2-\beta^2}{\sqrt{5}} = (\alpha+\beta)\frac{\alpha-\beta}{\sqrt{5}} = 1 = x_2$. Step: let $k\ge 2$ and assume the formula for $x_1, \dots, x_k$. As $k+1\ge 3$ and $k-1\ge 1$, the recurrence and the formulas for $x_k$, $x_{k-1}$ give
> $$x_{k+1} = \frac{\alpha^{k-1}(\alpha+1) - \beta^{k-1}(\beta+1)}{\sqrt{5}} = \frac{\alpha^{k+1} - \beta^{k+1}}{\sqrt{5}}.$$
> Strong induction with $n_0=1$, $n_1=2$ completes the proof. $\square$
