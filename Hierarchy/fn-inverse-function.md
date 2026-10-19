---
id: fn-inverse-function
title: "Inverse function"
role: definition
subject: functions
topic: functions-ii
statement: "f: A → B is invertible if some g: B → A has g ∘ f = id_A and f ∘ g = id_B; such g is unique, written f⁻¹, and for A = B is f's inverse under composition."
depends_on: [fn-composition, fn-operator-inverse]
---
>[!d] Definition
> A function $f : A \to B$ is **invertible** if there is $g : B \to A$ with
> $$g \circ f = \mathrm{id}_A \quad \text{and} \quad f \circ g = \mathrm{id}_B.$$
> Such $g$ is unique; it is **the inverse** $f^{-1}$ of $f$. For $A = B$, $f^{-1}$ is exactly the inverse of $f$ for composition, an associative binary operator on the functions $A \to A$ with identity $\mathrm{id}_A$.

>[!p] Proof (uniqueness)
> If $g$ and $h$ both qualify, associativity and the identity laws give
> $$g = g \circ \mathrm{id}_B = g \circ (f \circ h) = (g \circ f) \circ h = \mathrm{id}_A \circ h = h. \qquad \square$$

>[!e] Worked example
> $f(x) = x^2$ on $\mathbb{R}$ is not invertible: an inverse $g$ would need $g(4) = g(f(2)) = 2$ and $g(4) = g(f(-2)) = -2$.
