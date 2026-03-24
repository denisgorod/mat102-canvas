---
id: maximum-vs-maximal
title: "Maximum vs maximal"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - maximal-and-minimal-elements
---

You've seen that maximal elements need not be unique. But sometimes a poset has one element that *truly* sits at the very top — and it's important to distinguish that from merely being maximal.

>[!d] Definition
> The **maximum** of a poset $(A, \preceq)$ is an element $M$ such that $x \preceq M$ for *all* $x \in A$. A **maximal** element merely has nothing above it — it need not be comparable to everything.

A poset can have multiple maximal elements, but at most one maximum.

Similarly, the **minimum** is an element $m$ with $m \preceq x$ for all $x \in A$.

Let's revisit the divisibility example: $A = \{1, 2, 3, 5, 6, 10, 15\}$ with $a \preceq b$ iff $a \mid b$.

The **minimum is 1** — it divides every element in $A$. But there is **no maximum** — no single element is a multiple of all others. You might think 30 would work, but 30 is not in $A$. Within $A$ itself, no element plays that role. The maximal elements (6, 10, 15) are incomparable to each other.

In contrast, in the poset $\{1, 2, 4, 8\}$ with divisibility, the maximum is 8 (it's a multiple of all others) and the minimum is 1. Here the maximum and the single maximal element coincide — there's no ambiguity.

The key insight: a maximum, if it exists, is automatically maximal. But a maximal element may not be a maximum.

>[!idea]
> A maximum is an element $\preceq$-comparable to everything; a maximal element has nothing strictly above it. Every maximum is maximal, but not every maximal element is a maximum.
