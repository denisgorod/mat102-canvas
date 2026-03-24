---
id: inverse-functions
title: "Inverse functions"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - function-composition
---

Now you can ask: given a function $f: A \to B$, when does it have an inverse under composition?

Using what you know about inverses and operations, the inverse of $f$ should be a function $g: B \to A$ such that composing them (in both orders) gives the identity:

$$f \circ g = \text{id}_B \quad \text{and} \quad g \circ f = \text{id}_A$$

Here, $\text{id}_A$ and $\text{id}_B$ are the identity functions on their respective sets. Written in terms of outputs:

$$f(g(y)) = y \quad \text{for all } y \in B$$
$$g(f(x)) = x \quad \text{for all } x \in A$$

When such a function $g$ exists, we say that $f$ is **invertible**, and we often write $g = f^{-1}$.

But not every function has an inverse. For example, consider $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$. Suppose an inverse $g$ existed. Then for any $y > 0$, we would need $f(g(y)) = y$, so $g(y)^2 = y$. But we also need $g(f(2)) = 2$, which gives $g(4) = 2$. And we need $g(f(-2)) = -2$, which gives $g(4) = -2$. This is a contradiction: $g(4)$ cannot be both 2 and $-2$. So $f$ has no inverse.

The question naturally arises: what property of a function *forces* it to have an inverse? What went wrong with $f(x) = x^2$? And what properties guarantee that an inverse exists?

>[!idea]
>A function $f: A \to B$ is invertible if there exists $g: B \to A$ such that $f \circ g = \text{id}_B$ and $g \circ f = \text{id}_A$. Not every function is invertible.
