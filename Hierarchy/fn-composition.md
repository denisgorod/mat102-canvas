---
id: fn-composition
title: "Function composition and identity functions"
role: definition
subject: functions
topic: functions-i
statement: "For f: A → B and g: B → C, (g ∘ f)(x) = g(f(x)) defines g ∘ f: A → C; composition is associative, and id_A(x) = x satisfies f ∘ id_A = f = id_B ∘ f."
depends_on: [fn-equality]
---
>[!d] Definition
> For $f : A \to B$ and $g : B \to C$, the **composite** $g \circ f : A \to C$ is $(g \circ f)(x) = g(f(x))$; the **identity function** $\mathrm{id}_A : A \to A$ is $x \mapsto x$. Order matters: with $f(x) = x + 1$, $g(x) = x^2$ on $\mathbb{R}$, $(g \circ f)(1) = 4 \neq 2 = (f \circ g)(1)$.

>[!t] Theorem
> For $f : A \to B$, $g : B \to C$ and $h : C \to D$: $h \circ (g \circ f) = (h \circ g) \circ f$, and $f \circ \mathrm{id}_A = f = \mathrm{id}_B \circ f$.

>[!p] Proof
> Both sides of each equation have domain $A$ and equal codomains, and agree at each $x \in A$: at $h(g(f(x)))$, respectively at $f(\mathrm{id}_A(x)) = f(x) = \mathrm{id}_B(f(x))$. By equality of functions they are equal. $\square$
