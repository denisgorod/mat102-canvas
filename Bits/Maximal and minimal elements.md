---
id: maximal-and-minimal-elements
title: "Maximal and minimal elements"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children:
  - id: maximum-vs-maximal
    question: "Is a maximal element the same as the maximum?"
    edge_type: prerequisite
parents:
  - posets
---

When you order a collection of things, some elements stand out as "tops" and "bottoms" — but not always in the way you might expect.

>[!d] Definition
> In a poset $(A, \preceq)$, an element $a$ is **maximal** if $a \preceq x$ implies $a = x$ (nothing is above $a$). An element $a$ is **minimal** if $x \preceq a$ implies $x = a$ (nothing is below $a$).

Let's look at an example. Suppose $A = \{1, 2, 3, 5, 6, 10, 15\}$ and we order by divisibility: $a \preceq b$ iff $a \mid b$.

The maximal elements are **6, 10, and 15**. Why? Because no other element in $A$ is a multiple of any of these. For instance, 6 is maximal because nothing larger divides into it evenly, and nothing in $A$ that 6 divides (besides 6 itself) exists. Similarly, 10 is maximal, as is 15.

The minimal element is **1**, because 1 divides everything, so $1 \preceq x$ for all $x \in A$, and the only element that $x \preceq 1$ for is $x = 1$ itself.

Notice something crucial: a poset can have *multiple* maximal elements. There need not be a single "greatest" element sitting at the top. The elements 6, 10, and 15 are all maximal, but none of them is bigger than the others — they're just incomparable.

>[!idea]
> A maximal element has nothing strictly above it, but a poset may have many maximal elements (or none at all).
