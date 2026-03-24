---
id: upper-and-lower-bounds
title: "Upper and lower bounds"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children:
  - id: supremum-and-infimum
    question: "Is there a 'best' upper or lower bound?"
    edge_type: prerequisite
parents:
  - posets
---

Sometimes you want to find an element that relates to *a subset* of your poset, not the entire set. This leads to bounds.

>[!d] Definition
> In a poset $(A, \preceq)$ with $S \subseteq A$: an element $M \in A$ is an **upper bound** of $S$ if $x \preceq M$ for all $x \in S$. An element $m \in A$ is a **lower bound** if $m \preceq x$ for all $x \in S$.

Crucially, bounds need not be in $S$ itself.

**Example.** In $\mathbb{Z}^+$ with the divisibility order, let $S = \{8, 12, 36\}$.

The **lower bounds** of $S$ are all the positive integers dividing every element of $S$. Since $\gcd(8, 12, 36) = 4$, the lower bounds are 1, 2, and 4.

The **upper bounds** of $S$ are all positive integers divisible by every element of $S$. Since $\text{lcm}(8, 12, 36) = 72$, the upper bounds are 72, 144, 216, ...

Now consider a different subset: $T = \{2, 3, 5\}$. These are pairwise coprime, so $\gcd(2, 3, 5) = 1$ — thus 1 is the only lower bound. But there is no upper bound within the divisibility order on $\mathbb{Z}^+$, because no single number is divisible by all three.

Bounds give structure to subsets: they tell you what "contains" or "divides into" an entire subset, without requiring that any single element of the subset be the maximum or minimum.

>[!idea]
> A lower bound divides everything in $S$; an upper bound is divisible by everything in $S$. A subset may have no bounds, one bound, or many bounds.
