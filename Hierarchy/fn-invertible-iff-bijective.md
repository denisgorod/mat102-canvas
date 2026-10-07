---
id: fn-invertible-iff-bijective
title: "Invertible iff bijective"
role: theorem
subject: functions
topic: functions-ii
statement: "A function f: A → B is invertible if and only if it is bijective, in which case f⁻¹(t) is the unique s ∈ A with f(s) = t and f⁻¹: B → A is itself a bijection."
depends_on: [fn-inverse-function, fn-bijective]
---
>[!t] Theorem
> A function $f : A \to B$ is invertible if and only if it is bijective. Then $f^{-1}(t)$ is the unique $s \in A$ with $f(s) = t$, and $f^{-1}$ is a bijection.

>[!p] Proof
> ($\Rightarrow$) If $g$ is an inverse, $f(s_1) = f(s_2)$ gives $s_1 = g(f(s_1)) = g(f(s_2)) = s_2$, and each $t \in B$ equals $f(g(t))$. ($\Leftarrow$) Let $g(t)$ be the unique $s$ with $f(s) = t$. Then $f(g(t)) = t$, and $g(f(s)) = s$ by uniqueness; so $g = f^{-1}$, as inverses are unique. Finally, the defining equations are symmetric in $f$ and $f^{-1}$, so $f^{-1}$ is invertible, hence bijective. $\square$

>[!info] Note (one-sided inverses)
> For $A \neq \emptyset$, $f$ has a left inverse ($g \circ f = \mathrm{id}_A$) **iff** it is injective, and a right inverse ($f \circ g = \mathrm{id}_B$) **iff** it is surjective.
