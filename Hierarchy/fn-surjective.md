---
id: fn-surjective
title: "Surjective function"
role: definition
subject: functions
topic: functions-i
statement: "A function f: A → B is surjective (onto) if every t ∈ B is f(s) for some s ∈ A, i.e. f(A) = B; otherwise some t ∈ B is f(s) for no s ∈ A."
depends_on: [fn-image]
---
>[!d] Definition
> A function $f : A \to B$ is **surjective** (**onto**) if
> $$\forall t \in B\ \exists s \in A,\ f(s) = t,$$
> i.e. $f(A) = B$. It is **not** surjective exactly when some $t \in B$ has $f(s) \neq t$ for all $s \in A$. Surjectivity depends on the codomain.

>[!s] Method
> To prove it, fix an arbitrary $t \in B$, construct $s \in A$ (depending on $t$) and verify $f(s) = t$. To disprove it, exhibit one such missed $t$.

>[!e] Worked example
> $x \mapsto 2x + 3$ is onto $\mathbb{R}$: given $t$, $s = \frac{t-3}{2}$ gives $f(s) = (t-3) + 3 = t$. $x \mapsto x^2$ is not onto $\mathbb{R}$, since $s^2 \ge 0 > -1$ for all $s$; as a function $\mathbb{R} \to [0, \infty)$ it is onto, with $s = \sqrt{t}$.
