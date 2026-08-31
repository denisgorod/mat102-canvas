---
id: lde-def
title: "Linear Diophantine equations"
role: definition
subject: number-theory
topic: diophantine-equations
statement: "A linear Diophantine equation is ax + by = c with a, b, c ∈ ℤ, to be solved for integers x and y."
depends_on: [div-def]
---
>[!d] Definition
> Let $a, b, c \in \mathbb{Z}$. A **linear Diophantine equation** in two variables is
> $$ax + by = c,$$
> together with the requirement that a solution be a pair $(x, y)$ of **integers**. The equation is **solvable** if at least one such pair exists.

>[!info] Note
> The restriction to $\mathbb{Z}$ is the entire content. Over $\mathbb{Q}$ the equation is trivial: if $a$ and $b$ are not both zero, say $a \neq 0$, then $\left(\frac{c - by}{a},\, y\right)$ is a solution for every rational $y$, so infinitely many exist. Over $\mathbb{Z}$ solvability can fail outright — $2x + 4y = 3$ has no integer solution, since the left side is always even while $3$ is odd.
