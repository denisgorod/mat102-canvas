---
id: proving-injectivity
title: "Proving and disproving injectivity"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - injective-functions
---

You've learned that a function $f: A \to B$ is injective when different inputs always give different outputs. But how do you actually prove this? And how do you show that a function *isn't* injective?

**Proving injectivity** relies on the logical definition: $f$ is injective if and only if whenever $f(s_1) = f(s_2)$, you must have $s_1 = s_2$. So your proof strategy is to *assume the outputs are equal and deduce the inputs are equal*.

Here's the form: let $s_1, s_2 \in A$ and assume $f(s_1) = f(s_2)$. Then manipulate this equation using properties of $f$ until you conclude $s_1 = s_2$. For instance, if $f(x) = 2x + 3$, you'd assume $f(x_1) = f(x_2)$, which gives $2x_1 + 3 = 2x_2 + 3$, subtract 3, divide by 2, and out pops $x_1 = x_2$. Done.

**Disproving injectivity** is simpler: find a concrete counterexample. Find two *different* inputs $s_1 \ne s_2$ with $f(s_1) = f(s_2)$. For $f(x) = x^2$ on all of $\mathbb{R}$, you can use $f(2) = 4 = f(-2)$ — two different inputs, same output. Not injective.

A subtle but crucial point: whether a function is injective depends on its *domain*. The function $f(x) = x^2$ is **not** injective on $\mathbb{R}$ (as shown above), but it **is** injective on $(0, \infty)$ — there you can't find two different positive numbers squaring to the same value. Same formula, different domain, different answer.

When proving, be explicit about your domain. When disproving, always give the counterexample clearly: "Let $s_1 = \ldots$ and $s_2 = \ldots$. Then $f(s_1) = \ldots = f(s_2)$, but $s_1 \ne s_2$."

>[!idea]
> To prove $f$ injective: assume $f(s_1) = f(s_2)$ and derive $s_1 = s_2$. To disprove: give two different inputs with the same output. Always verify your domain.
