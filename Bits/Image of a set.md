---
id: image-of-a-set
title: "Image of a set"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - domain-codomain-range
  - set-builder-notation
---

You know that the range of a function is the set of all outputs from the domain. But what if you only feed a function a *subset* of its domain? What outputs do you get?

This is the idea of the **image of a set** (also called the **image** of a subset).

If $f: A \to B$ is a function and $U \subseteq A$, the image of $U$ under $f$ is the set of all outputs you can produce using inputs from $U$:
$$f(U) = \{f(x) : x \in U\} = \{y \in B : \exists x \in U, f(x) = y\}$$

Both notations mean the same thing: $f(U)$ is a subset of the codomain, containing only the outputs actually produced by elements of $U$.

Let's work through an example. Suppose $f: \mathbb{R} \to \mathbb{R}$ is defined by $f(x) = x^2$. What is $f([-1, 2])$ — the image of the interval $[-1, 2]$?

You might guess $[0, 4]$. Let's check both directions:
- If $x \in [-1, 2]$, then $-1 \le x \le 2$, so $0 \le x^2 \le 4$. Thus $f([-1, 2]) \subseteq [0, 4]$.
- If $y \in [0, 4]$, then $y \ge 0$, so we can write $x = \sqrt{y}$. Since $0 \le y \le 4$, we have $0 \le \sqrt{y} \le 2$, so $x \in [-1, 2]$. Thus $f(x) = y$, showing $[0, 4] \subseteq f([-1, 2])$.

Both directions hold, so $f([-1, 2]) = [0, 4]$.

Note that computing an image often requires careful reasoning — usually by showing that any element of the suspected image can be achieved, and that only elements of the suspected image can be achieved. This "double inclusion" proof is the standard approach.

>[!idea]
The image of a set $U$ under $f$ is $f(U) = \{f(x) : x \in U\}$. It contains exactly the outputs reachable from inputs in $U$.
