---
id: lde-general-solution
title: "LDE general solution"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: lde-non-negative-solutions
    question: "Can I find non-negative solutions?"
    edge_type: prerequisite
  - id: ex-all-lde-solutions
    question: "Can I find all solutions to a specific LDE?"
    edge_type: prerequisite
parents:
  - lde-particular-solution
  - coprime-divides-product
---

You've found one solution to $ax + by = c$, say $(x_0, y_0)$. But is it the only one? Not at all. If $(x_0, y_0)$ is a solution, so is $(x_0 + t, y_0 - \frac{at}{b})$ for any $t$ such that $\frac{at}{b}$ is an integer. The question becomes: what's the pattern?

Suppose $(x, y)$ is another solution. Then $ax + by = c = ax_0 + by_0$, so $a(x - x_0) + b(y - y_0) = 0$. Divide by $d = \gcd(a, b)$:

$$\frac{a}{d}(x - x_0) = -\frac{b}{d}(y - y_0)$$

Here's the key: $\gcd(a/d, b/d) = 1$ (the coefficients are coprime). By the coprime divides product result, since $\frac{a}{d}$ divides the right side and is coprime to $\frac{b}{d}$, it must divide $(y - y_0)$. So $y - y_0 = n\frac{a}{d}$ for some integer $n$, which gives $x - x_0 = -n\frac{b}{d}$.

Therefore, every solution has the form:

$$x = x_0 + n\frac{b}{d}, \quad y = y_0 - n\frac{a}{d}, \quad n \in \mathbb{Z}$$

This parametrization captures all solutions—you just vary the integer parameter $n$.

>[!t] Theorem
>If $(x_0, y_0)$ is a solution to $ax + by = c$ and $d = \gcd(a, b)$, then all solutions are given by $x = x_0 + n\frac{b}{d}$ and $y = y_0 - n\frac{a}{d}$ for $n \in \mathbb{Z}$.
