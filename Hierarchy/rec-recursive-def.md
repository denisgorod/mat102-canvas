---
id: rec-recursive-def
title: "Recursive definitions"
role: definition
subject: induction
topic: recursion-and-structural-induction
statement: "A recursive definition of a set S gives basis elements and constructors; S consists exactly of the elements obtained from the basis by finitely many constructor applications. A recursive sequence fixes initial terms and defines later terms from earlier ones."
depends_on: []
---
>[!d] Definition
> A **recursive definition** of a set $S$ gives a **basis** (given elements of $S$) and **constructors** (rules producing new elements from existing ones). Implicitly, **nothing else** lies in $S$: $s \in S$ exactly when $s$ arises from the basis by finitely many constructor applications.

>[!e] Worked example
> $E$, with basis $0$ and constructors $e\mapsto -e$, $e\mapsto e+2$, is the set of even integers. From $0$, $m$ applications of $e\mapsto e+2$ give $2m$; then $e\mapsto -e$ gives $-2m$. Conversely, $0$ is even and both constructors preserve evenness, so each element, built in finitely many steps, is even.

>[!info] Note (recursive sequences)
> A **recursive sequence** fixes initial terms and gives later terms from earlier ones by a **recurrence**: $x_1=1$, $x_n = 2x_{n-1}+1$ ($n\ge 2$) give $1, 3, 7, 15, \dots$ Unlike a set, a sequence records order and repetition.
