---
id: domain-codomain-range
title: "Domain, codomain, and range"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - function-notation
---

When you specify a function $f: A \to B$, the sets $A$ and $B$ have special names, but they mean different things.

The **domain** of $f$ is the set $A$ — the place where all inputs live. Left-totality requires that $f$ is defined for every element of its domain.

The **codomain** of $f$ is the set $B$ — it tells you where outputs are *allowed* to live. The codomain is part of the function's definition. If you change the codomain, you change the function itself.

But there's a third set you should know about: the **range** (or **image**) of $f$, which is the set of all outputs that $f$ actually produces:
$$\text{range}(f) = \{f(a) : a \in A\}$$

This is often called the image of the entire domain.

Here's the key insight: **the codomain and the range are not the same thing in general**.

Consider $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$. The codomain is $\mathbb{R}$ — all real numbers. But the range is $[0, \infty)$ — only non-negative numbers actually appear as outputs. Negative numbers are in the codomain but not in the range.

The codomain is *where you're allowed to land*. The range is *where you actually land*.

Why does this distinction matter? It matters because some important properties of functions — like surjectivity, which we'll encounter soon — depend on the relationship between the range and the codomain. A function might "hit all of its codomain" or only part of it. And that turns out to be a meaningful question.

>[!idea]
The domain is where inputs come from; the codomain is where outputs are allowed to go; the range is where they actually go. Codomain and range need not be equal.
