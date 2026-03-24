---
id: lde-non-negative-solutions
title: "LDE non-negative solutions"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: ex-lde-four-equations
    question: "Can I apply the full LDE solution technique to new equations?"
    edge_type: prerequisite
parents:
  - lde-general-solution
---

You now have a complete parametrization of all solutions to $ax + by = c$. But in many practical problems—counting objects, measuring quantities—you care only about non-negative solutions. The question is: given the general solution, how many non-negative pairs $(x, y)$ actually exist?

Suppose the general solution is $x = x_0 + nk_1$ and $y = y_0 - nk_2$ (where $k_1 = b/d$ and $k_2 = a/d$). For both to be non-negative, you need:

$$x_0 + nk_1 \geq 0 \quad \text{and} \quad y_0 - nk_2 \geq 0$$

Rearranging:

$$n \geq -\frac{x_0}{k_1} \quad \text{and} \quad n \leq \frac{y_0}{k_2}$$

If the interval $[-x_0/k_1, y_0/k_2]$ contains integers, you have finitely many non-negative solutions. If the interval is empty or contains no integers, there are no non-negative solutions.

**Example:** For $504x + 1155y = 42$ with general solution $x = -32 + 55n$ and $y = 14 - 24n$, you need $-32 + 55n \geq 0$ and $14 - 24n \geq 0$. This gives $32/55 < n < 14/24 \approx 0.58 < 0.58$, an empty interval. So there are no non-negative solutions.

>[!idea]
>To find non-negative solutions to an LDE: constrain the general solution parameter $n$ so that both $x$ and $y$ are non-negative, then count integers in the resulting interval.
