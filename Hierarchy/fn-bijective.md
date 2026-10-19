---
id: fn-bijective
title: "Bijective function"
role: definition
subject: functions
topic: functions-i
statement: "A function f: A → B is bijective (a bijection) if it is both injective and surjective, i.e. every t ∈ B equals f(s) for exactly one s ∈ A."
depends_on: [fn-injective, fn-surjective]
---
>[!d] Definition
> A function $f : A \to B$ is **bijective** (a **bijection**) if it is both injective and surjective. Equivalently, every $t \in B$ equals $f(s)$ for **exactly one** $s \in A$: surjectivity gives at least one such $s$, injectivity at most one. In the arrow picture, each element of $B$ receives exactly one arrow.

>[!info] Note (independence)
> Neither property implies the other. $x \mapsto \lfloor x \rfloor$ from $\mathbb{R}$ to $\mathbb{Z}$ is surjective, as $\lfloor n \rfloor = n$, but not injective, as $\lfloor 0 \rfloor = \lfloor \tfrac12 \rfloor$. $x \mapsto (x, 0)$ from $\mathbb{R}$ to $\mathbb{R}^2$ is injective but not surjective: it misses $(0, 1)$.

>[!e] Worked example
> $f(x) = 2x + 3$ on $\mathbb{R}$ is a bijection: for each $t \in \mathbb{R}$, $f(s) = t \iff s = \frac{t-3}{2}$, so $t$ has exactly one preimage.
