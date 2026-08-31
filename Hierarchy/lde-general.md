---
id: lde-general
title: "General solution"
role: theorem
subject: number-theory
topic: diophantine-equations
statement: "If (x₀, y₀) is one solution of ax + by = c and d = gcd(a, b), then every solution is x = x₀ + (b/d)t, y = y₀ − (a/d)t for t ∈ ℤ."
depends_on: [lde-solvable]
---
>[!t] Theorem
> Let $a, b$ be nonzero, $d = \gcd(a, b)$, and $(x_0, y_0)$ an integer solution of $ax + by = c$. The integer solutions are exactly
> $$x = x_0 + \frac{b}{d}\,t, \qquad y = y_0 - \frac{a}{d}\,t, \qquad t \in \mathbb{Z}.$$

>[!p] Proof
> Each such pair solves it: the extra terms contribute $a\frac{b}{d}t - b\frac{a}{d}t = 0$. Conversely, take any solution $(x, y)$. Subtracting $ax_0 + by_0 = c$ and dividing by $d$ gives
> $$\tfrac{a}{d}(x - x_0) = -\tfrac{b}{d}(y - y_0).$$
> Now $\frac{b}{d}$ divides the right side, hence the left, and $\gcd\!\left(\frac{a}{d}, \frac{b}{d}\right) = 1$, so $\frac{b}{d} \mid (x - x_0)$: say $x - x_0 = \frac{b}{d}t$. Cancelling $\frac{b}{d} \neq 0$ yields $y - y_0 = -\frac{a}{d}t$. $\square$
