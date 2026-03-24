---
id: ex-order-disjoint-cycles
title: "Order of disjoint cycle product"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - order-divides-exponent
---

The order of a permutation $\sigma$ is the smallest positive integer $m$ such that $\sigma^m = \text{id}$. When $\sigma$ is a single cycle, its order is the length of the cycle.

But what if $\sigma$ is a product of disjoint cycles? Disjoint cycles commute with each other (they act on different elements), so the behavior is nicer than you might expect.

**Example:** $(1 \, 2 \, 3) \circ (4 \, 5)$ has order $\text{lcm}(3, 2) = 6$. Verify this by computing the powers: $\sigma^1, \sigma^2, \ldots, \sigma^6$.

**General claim:** If $\sigma$ is a product of disjoint cycles of lengths $k_1, k_2, \ldots, k_r$, then $|\sigma| = \text{lcm}(k_1, k_2, \ldots, k_r)$.

Prove this by observing that each cycle in the product can be powered independently. Use the fact that the least common multiple is the smallest number that all cycle lengths divide evenly.

>[!question] Exercise
> If $\sigma \in S_n$ is a product of disjoint cycles of lengths $k_1, k_2, \ldots, k_r$, prove that $|\sigma| = \text{lcm}(k_1, k_2, \ldots, k_r)$.
