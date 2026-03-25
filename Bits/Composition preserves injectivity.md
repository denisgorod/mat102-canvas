---
id: composition-preserves-injectivity
title: "Composition preserves injectivity"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - injective-functions
---

You know that injective functions have a special property: different inputs yield different outputs. What happens when you compose two injective functions?

**Proposition.** If $f: A \to B$ and $g: B \to C$ are both injective, then their composition $g \circ f: A \to C$ is also injective.

Let's prove this. We need to show that if $(g \circ f)(x_1) = (g \circ f)(x_2)$, then $x_1 = x_2$. Here's the argument:

Assume $(g \circ f)(x_1) = (g \circ f)(x_2)$. By definition of composition, this means $g(f(x_1)) = g(f(x_2))$.

Since $g$ is injective, we can conclude from $g(f(x_1)) = g(f(x_2))$ that $f(x_1) = f(x_2)$.

Now $f$ is also injective, so from $f(x_1) = f(x_2)$ we deduce $x_1 = x_2$.

Therefore $g \circ f$ is injective.

This argument reveals the intuition: injectivity chains through composition. When you pass equal outputs from $g \circ f$ back through $g$'s injectivity, you "peel off" $g$ and recover equal outputs from $f$. Then you peel off $f$ and recover equal inputs. The injectivity of each layer ensures you can undo the equation one step at a time.

This is powerful: if you build a function by composing injective pieces, the result is injective.

>[!idea]
> The composition of injective functions is injective. Injectivity is preserved under composition because you can reverse equalities of outputs one layer at a time.
