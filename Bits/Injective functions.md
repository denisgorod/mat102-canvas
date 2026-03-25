---
id: injective-functions
title: "Injective (one-to-one) functions"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - domain-codomain-range
---

You've built up the machinery to describe functions and their behavior on sets. Now comes a fundamental question: when does a function have a "one-to-one" relationship between inputs and outputs?

A function $f: A \to B$ is called **injective** (or **one-to-one**) if whenever two inputs produce the same output, those inputs must be equal:
$$\text{If } f(s_1) = f(s_2), \text{ then } s_1 = s_2$$

In other words, different inputs always produce different outputs. No two distinct elements of $A$ map to the same element of $B$.

If you picture a function as a collection of arrows from $A$ to $B$, injectivity means that each element of $B$ has *at most one arrow pointing to it*. Some elements might have no arrow, but no element gets more than one.

Let's check if $f: (0, \infty) \to \mathbb{R}$ defined by $f(x) = x^2$ is injective. Suppose $f(x_1) = f(x_2)$. Then $x_1^2 = x_2^2$, which gives $x_1 = \pm x_2$. But since both $x_1$ and $x_2$ are positive, we must have $x_1 = x_2$. So the function is injective on the positive reals.

Now consider the same rule on the full real line: $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$. This is *not* injective, because $f(2) = 4 = f(-2)$ but $2 \neq -2$. We found two distinct inputs with the same output.

Notice: the rule didn't change, only the domain. This shows that injectivity is not just about the rule — the domain matters.

>[!idea]
> A function $f: A \to B$ is injective if different inputs always produce different outputs: $f(s_1) = f(s_2) \Rightarrow s_1 = s_2$.
