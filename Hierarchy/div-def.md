---
id: div-def
title: "Divisibility"
role: definition
subject: number-theory
topic: divisibility
statement: "For a, b ∈ ℤ, a ∣ b means there is k ∈ ℤ with b = ak; a is then a divisor of b."
depends_on: []
---
>[!d] Definition
> Let $a, b \in \mathbb{Z}$. We say $a$ **divides** $b$, written $a \mid b$, if there exists $k \in \mathbb{Z}$ with
> $$b = ak.$$
> Then $a$ is a **divisor** of $b$ and $b$ a **multiple** of $a$; write $a \nmid b$ otherwise.

>[!info] Note (signs and zero)
> Positivity is not assumed: $-3 \mid 12$, since $12 = (-3)(-4)$. Every integer divides $0$, because $0 = a \cdot 0$; but $0 \mid b$ forces $b = 0$, so $0$ divides only $0$. The definition uses multiplication only — nothing is divided.

>[!e] Worked example
> $4 \mid 12$ since $12 = 4 \cdot 3$, whereas $5 \nmid 12$. Beware: $a \mid b$ is a **statement**, true or false — not a number, and never the quotient $b/a$.
