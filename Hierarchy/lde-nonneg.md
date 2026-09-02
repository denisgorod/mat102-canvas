---
id: lde-nonneg
title: "Non-negative solutions"
role: application
subject: number-theory
topic: diophantine-equations
statement: "Requiring x, y ≥ 0 restricts the parameter t to an interval, so a solvable equation may still have no, finitely many, or infinitely many non-negative solutions."
depends_on: [lde-general]
---
>[!s] Application
> Each sign condition bounds $t$ on one side. For $a, b > 0$,
> $$x \ge 0 \iff t \ge -\frac{x_0 d}{b}, \qquad y \ge 0 \iff t \le \frac{y_0 d}{a},$$
> so the non-negative solutions are the integers in $\left[-\frac{x_0 d}{b},\, \frac{y_0 d}{a}\right]$ — non-empty exactly when $c \ge 0$, and then of length $\frac{cd}{ab}$, which may still contain no integer. With $a, b$ of opposite signs both conditions bound $t$ on the same side, leaving infinitely many.

>[!e] Worked example
> $5x + 3y = 47$ has $d = 1$ and solution $(1, 14)$, so $x = 1 + 3t$, $y = 14 - 5t$. Then $-\tfrac{1}{3} \le t \le \tfrac{14}{5}$, so $t \in \{0, 1, 2\}$, giving $(1, 14)$, $(4, 9)$, $(7, 4)$.
