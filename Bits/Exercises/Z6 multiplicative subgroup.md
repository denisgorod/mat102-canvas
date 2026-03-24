---
id: ex-z6-multiplicative-subgroup
title: "{[1]_6,[5]_6} is a group under multiplication mod 6"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children: []
parents:
  - zn-is-a-group
---

You know that $\mathbb{Z}_n$ under addition is always a group. But multiplication in $\mathbb{Z}_n$ is more delicate. Not all elements have multiplicative inverses, and not all subsets closed under multiplication form a group.

Let $G = \{[1]_6, [5]_6\}$. This is a subset of $\mathbb{Z}_6$ with two elements. Check whether it has the structure of a group under multiplication modulo 6.

First, verify that $G$ is closed under multiplication: compute $[1]_6 \times [1]_6$, $[1]_6 \times [5]_6$, and $[5]_6 \times [5]_6$ modulo 6.

Next, verify the three group axioms. Is there an identity in $G$? Does every element have an inverse in $G$?

>[!question] Exercise
> Determine whether $G = \{[1]_6, [5]_6\}$ is a group under multiplication modulo 6. Check closure and all three group axioms.
