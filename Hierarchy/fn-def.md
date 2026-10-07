---
id: fn-def
title: "Function"
role: definition
subject: functions
topic: functions-i
statement: "A function f: A → B is a left-total, functional relation between A and B, so each a ∈ A is related to exactly one element f(a) ∈ B; its graph is Γ(f) = {(a, f(a)) : a ∈ A}."
depends_on: [rel-left-total-functional]
---
>[!d] Definition
> A **function** $f : A \to B$ is a relation between sets $A$ and $B$ that is **left-total** and **functional**: each $a \in A$ is related to exactly one element of $B$, written $f(a)$. Its **rule** is $a \mapsto f(a)$ and its **graph** is
> $$\Gamma(f) = \{(a, f(a)) : a \in A\} \subseteq A \times B.$$

>[!info] Note
> A function consists of its **domain** $A$, its **codomain** $B$ and its rule. For $f : \mathbb{R} \to \mathbb{R}$ the two conditions form the vertical line test: each line $x = a$ meets the graph exactly once.

>[!e] Worked example
> For $A = \{1, 2, 3\}$ and $B = \{x, y, z\}$, $\{(1,x), (2,y), (3,z)\}$ is a function $A \to B$, but $\{(1,x), (1,y), (2,z)\}$ is not: $1$ has two partners (not functional) and $3$ has none (not left-total).
