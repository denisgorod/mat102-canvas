---
id: function-composition
title: "Function composition"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children:
  - id: symmetric-group
    question: "Does the set of all bijections under composition have special structure?"
    edge_type: prerequisite
parents:
  - inverse-with-respect-to-operator
---

When you have two functions $f: B \to C$ and $g: A \to B$, you can *combine* them into a single function by feeding the output of one into the input of the other. This combination is called **function composition**, written $f \circ g$.

The definition is straightforward:

$$(f \circ g)(x) = f(g(x))$$

You read this as "$f$ of $g$ of $x$": apply $g$ to $x$ first, then apply $f$ to the result. The composed function $f \circ g$ takes inputs from $A$ and produces outputs in $C$.

Here's the key insight: function composition itself is a binary operator. If $f, g: A \to A$ are functions on the same set, then $f \circ g$ is another function $A \to A$. So composition is an operation taking two functions and producing one function.

What is the identity element for this operation? It should be a function $\text{id}: A \to A$ such that for any function $f: A \to A$:

$$f \circ \text{id} = f \quad \text{and} \quad \text{id} \circ f = f$$

The identity function is simply the function that does nothing:

$$\text{id}(x) = x$$

You can verify: $(f \circ \text{id})(x) = f(\text{id}(x)) = f(x)$. Indeed, composing any function with the identity on the right (or left) leaves it unchanged.

Now that you know composition is a binary operator with an identity, you can ask the natural next question: if composition is an operation on functions, what does it mean for one function to be the *inverse* of another under this operation?

>[!idea]
>Function composition $(f \circ g)(x) = f(g(x))$ is a binary operator on functions. The identity function $\text{id}(x) = x$ is the identity element for composition.
