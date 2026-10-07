---
id: fn-composition-preserves
title: "Composites of injections, surjections and bijections"
role: theorem
subject: functions
topic: functions-i
statement: "For f: A → B and g: B → C: if f and g are injective so is g ∘ f, if f and g are surjective so is g ∘ f, so a composite of bijections is a bijection."
depends_on: [fn-composition, fn-bijective]
---
>[!t] Theorem
> If $f : A \to B$ and $g : B \to C$ are both injective (both surjective), so is $g \circ f$. Hence composites of bijections are bijections.

>[!p] Proof
> *Injective.* $g(f(x_1)) = g(f(x_2))$ gives $f(x_1) = f(x_2)$ as $g$ is injective, then $x_1 = x_2$ as $f$ is. *Surjective.* For $c \in C$, pick $b \in B$ with $g(b) = c$ ($g$ is onto) and $a \in A$ with $f(a) = b$ ($f$ is onto); then $(g \circ f)(a) = c$. $\square$

>[!info] Note (partial converses)
> If $g \circ f$ is injective, so is $f$; if $g \circ f$ is surjective, so is $g$. No more follows: for the inclusion $f : \{0\} \to \{0,1\}$ and $g : \{0,1\} \to \{0\}$, $g \circ f = \mathrm{id}_{\{0\}}$ is bijective, yet $f$ is not onto and $g$ not injective.
