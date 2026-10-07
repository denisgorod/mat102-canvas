---
id: fn-injective
title: "Injective function"
role: definition
subject: functions
topic: functions-i
statement: "A function f: A → B is injective (one-to-one) if f(s₁) = f(s₂) implies s₁ = s₂ for all s₁, s₂ ∈ A; it fails to be injective exactly when some s₁ ≠ s₂ in A have f(s₁) = f(s₂)."
depends_on: [fn-def]
---
>[!d] Definition
> A function $f : A \to B$ is **injective** (**one-to-one**) if for all $s_1, s_2 \in A$,
> $$f(s_1) = f(s_2) \implies s_1 = s_2:$$
> distinct inputs have distinct outputs. It is **not** injective exactly when $f(s_1) = f(s_2)$ for some $s_1 \neq s_2$ in $A$.

>[!s] Method
> To prove it, let $s_1, s_2 \in A$, assume $f(s_1) = f(s_2)$ and derive $s_1 = s_2$. To disprove it, exhibit one pair $s_1 \neq s_2$ with $f(s_1) = f(s_2)$.

>[!e] Worked example
> $x \mapsto 2x + 3$ is injective on $\mathbb{R}$: $2s_1 + 3 = 2s_2 + 3$ gives $s_1 = s_2$. $x \mapsto x^2$ is not injective on $\mathbb{R}$, as $2^2 = (-2)^2$, but it is on $(0, \infty)$: $s_1^2 = s_2^2$ gives $(s_1 - s_2)(s_1 + s_2) = 0$ with $s_1 + s_2 > 0$. The domain matters.
