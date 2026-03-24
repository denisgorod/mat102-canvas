---
id: supremum-and-infimum
title: "Supremum and infimum"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children:
  - id: well-ordering-principle
    question: "Does every subset of Z⁺ have a least element?"
    edge_type: analogy
parents:
  - upper-and-lower-bounds
---

When a subset has many upper or lower bounds, you might ask: is there a "best" one?

>[!d] Definition
> In a poset $(A, \preceq)$ with $S \subseteq A$: the **supremum** $\sup(S)$ is the **least upper bound** — an upper bound $M$ such that $M \preceq U$ for every other upper bound $U$. The **infimum** $\inf(S)$ is the **greatest lower bound** — a lower bound $m$ such that $\ell \preceq m$ for every other lower bound $\ell$.

A supremum, if it exists, is the "smallest" element that is still above everything in $S$. An infimum is the "largest" element that is still below everything in $S$.

**Back to our example:** In $\mathbb{Z}^+$ with divisibility, let $S = \{8, 12, 36\}$.

The lower bounds are 1, 2, and 4. Of these, 4 is greatest — so $\inf(S) = 4$. This makes sense: 4 is the largest number that divides all three.

The upper bounds are 72, 144, 216, ... Of these, 72 is the least — so $\sup(S) = 72$. This is the smallest number divisible by all three, the least common multiple.

These concepts are *critical* in calculus and analysis. The **least upper bound property** of the real numbers $\mathbb{R}$ — that every non-empty bounded subset has a supremum — is the foundation of all analysis. It's what lets you prove intermediate value theorems, define integrals, and make sense of limits. Without it, the real numbers would lose their distinctive power.

For now, notice that suprema and infima are unique when they exist (because the order is transitive), and they may not exist for every subset.

>[!idea]
> The supremum is the least upper bound and the infimum is the greatest lower bound. These concepts generalize min and max, and they're essential to rigorous analysis.
