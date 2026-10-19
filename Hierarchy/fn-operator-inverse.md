---
id: fn-operator-inverse
title: "Inverse with respect to an operator"
role: definition
subject: functions
topic: functions-ii
statement: "For a binary operator ∗ on S with identity e, an inverse of a ∈ S is b ∈ S with a ∗ b = b ∗ a = e, written a⁻¹; 0 has none under × on ℝ."
depends_on: [fn-binary-operator]
---
>[!d] Definition
> Let $\ast$ be a binary operator on $S$ with identity $e$. An **inverse** of $a \in S$ is a $b \in S$ with
> $$a \ast b = b \ast a = e.$$
> Then $a$ is **invertible** and $b$ is written $a^{-1}$ (notation, not a power).

>[!e] Worked example
> Under $+$ on $\mathbb{R}$ the inverse of $2$ is $-2$; under $\times$ the inverse of $\frac34$ is $\frac43$, while $0$ has none: $0 \cdot b = 0 \neq 1$ for every $b$.

>[!info] Note (two-sided)
> Both equations are needed: under composition of functions $\mathbb{Z} \to \mathbb{Z}$, $f(n) = \lfloor n/2 \rfloor$ and $g(n) = 2n$ give $f \circ g = \mathrm{id}_{\mathbb{Z}}$ but $g(f(1)) = 0$. For associative $\ast$, inverses $b, b'$ of $a$ coincide: $b = b \ast (a \ast b') = (b \ast a) \ast b' = b'$.
