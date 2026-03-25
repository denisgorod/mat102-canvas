---
id: bijective-functions
title: "Bijective functions"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children:
  - id: symmetric-group
    question: "Do the bijections on a set form a group under composition?"
    edge_type: prerequisite
parents:
  - injective-functions
  - surjective-functions
---

You've learned two independent properties: a function is injective if different inputs give different outputs, and surjective if every codomain element is hit. What if a function is *both*?

When $f: A \to B$ is both injective and surjective, we call it **bijective** (or a "bijection"). Bijective functions are the most well-behaved: they set up a perfect one-to-one correspondence between $A$ and $B$.

Visualize it with arrows again. Each element in $A$ has exactly one arrow leaving (that's what "function" means). For injectivity, at most one arrow enters each element in $B$. For surjectivity, at least one arrow enters each element in $B$. Combining these: *exactly one arrow enters each element in $B$*. This is a perfect pairing—every element in $A$ pairs with a unique element in $B$, and vice versa.

Because bijections are one-to-one and onto, they are precisely the functions that are invertible. If $f: A \to B$ is bijective, you can define $f^{-1}: B \to A$ by the rule: $f^{-1}(t)$ is the unique $s$ such that $f(s) = t$. This unique $s$ exists (by surjectivity) and is unique (by injectivity).

Composing bijections gives another bijection. If $f: A \to B$ and $g: B \to C$ are both bijective, then $g \circ f: A \to C$ is also bijective. The reason: bijections preserve the structure of "perfect pairing," so chaining them together preserves it.

>[!idea]
> A bijection is both injective and surjective: a perfect one-to-one correspondence. Bijections are exactly the invertible functions, and composing bijections yields a bijection.
