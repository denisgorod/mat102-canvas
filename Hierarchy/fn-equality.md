---
id: fn-equality
title: "Equality of functions"
role: definition
subject: functions
topic: functions-i
statement: "Functions f: A → B and g: C → D are equal if and only if A = C, B = D and f(a) = g(a) for every a ∈ A, so changing only the codomain gives a different function."
depends_on: [fn-def]
---
>[!d] Definition
> Functions $f : A \to B$ and $g : C \to D$ are **equal**, $f = g$, if and only if
> $$A = C, \qquad B = D, \qquad f(a) = g(a) \text{ for all } a \in A.$$
> Changing only the codomain therefore gives a different function, although the graph is unchanged.

>[!info] Note (why the codomain is data)
> Surjectivity asks whether every element of the codomain is an output. If the codomain were always the set of actual outputs, the answer would trivially be yes.

>[!e] Worked example
> $f : \{0,1\} \to \mathbb{R}$, $x \mapsto x$ and $g : \{0,1\} \to \mathbb{R}$, $x \mapsto x^2$ are equal, as $0^2 = 0$ and $1^2 = 1$: different formulas, same function. But $h : \{0,1\} \to \{0,1\}$, $x \mapsto x$ differs from $f$ in its codomain.
