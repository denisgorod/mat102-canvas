---
id: invertibility-requires-bijectivity
title: "Invertibility requires bijectivity"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - inverse-functions
  - bijective-functions
---

When does a function $f: A \to B$ have an inverse? The answer is elegant: if and only if $f$ is **bijective** (both injective and surjective).

>[!p] Proof (← direction)
>Suppose $f$ is bijective. We construct an inverse $g: B \to A$ as follows. For each $y \in B$, since $f$ is surjective, the preimage set $f^{-1}(\{y\})$ is non-empty. Since $f$ is injective, this preimage contains exactly one element — call it $x_y$. Define $g(y) = x_y$.
>
>We verify that $g$ is indeed the inverse. For any $y \in B$, we have $f(g(y)) = f(x_y) = y$ by construction (since $x_y \in f^{-1}(\{y\})$). For any $x \in A$, we have $g(f(x)) = g(y')$ where $y' = f(x)$. Then $g(y') = x_{y'}$, but by the injectivity of $f$, $x_{y'} = x$ (the unique element whose image is $y'$). So $g(f(x)) = x$.

Why is bijectivity necessary?

If $f$ is **not surjective**, some element $y_0 \in B$ has no preimage. Any inverse $g$ would need to satisfy $f(g(y_0)) = y_0$, but there is no $x \in A$ with $f(x) = y_0$, so $g(y_0)$ cannot exist.

If $f$ is **not injective**, two different elements $x_1, x_2 \in A$ satisfy $f(x_1) = f(x_2)$. Any inverse $g$ would need both $g(f(x_1)) = x_1$ and $g(f(x_2)) = x_2$, but $f(x_1) = f(x_2)$, so $g$ cannot be well-defined at that point.

Thus, a function is invertible if and only if it is bijective.

>[!idea]
>A function $f: A \to B$ is invertible if and only if it is bijective. Non-surjectivity prevents defining the inverse on part of the codomain; non-injectivity makes the inverse not well-defined.
