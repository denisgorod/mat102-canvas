---
id: posets
title: "Partially ordered sets (posets)"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children:
  - id: maximal-and-minimal-elements
    question: "Which elements are 'at the top' of a partial order?"
    edge_type: prerequisite
  - id: upper-and-lower-bounds
    question: "What if I want to bound a subset, not just find extremes?"
    edge_type: prerequisite
parents:
  - what-is-an-order-relation
  - subsets
---

A set $A$ together with a partial order relation $R$ is called a **partially ordered set**, or **poset** for short. We write posets as pairs $(A, R)$.

Example: let $X$ be any set. Define a relation on $\mathcal{P}(X)$ (the power set) by $A\,R\,B$ if $A \subseteq B$. This is reflexive ($A \subseteq A$), anti-symmetric ($A \subseteq B$ and $B \subseteq A$ implies $A = B$), and transitive ($A \subseteq B$ and $B \subseteq C$ implies $A \subseteq C$). But it's not total: $\{1,2\}$ and $\{2,3\}$ satisfy neither inclusion.

Posets generalize the number line's ordering to settings where some elements are simply incomparable.

>[!idea]
> A poset is a set equipped with a partial order—a relation that need not compare every pair of elements.
