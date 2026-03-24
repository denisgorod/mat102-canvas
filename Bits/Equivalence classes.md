---
id: equivalence-classes
title: "Equivalence classes"
role: bit
group: equivalence-relations
curriculum_path: null
learning_objectives: []
children:
  - id: equivalence-relations-partition-a-set
    question: "Can two different equivalence classes overlap?"
    edge_type: prerequisite
  - id: congruence-classes-and-zn
    question: "What do the equivalence classes look like for modular congruence?"
    edge_type: analogy
  - id: ex-construct-rationals
    question: "Can equivalence classes construct new number systems?"
    edge_type: prerequisite
parents:
  - what-is-an-equivalence-relation
---

>[!d] Definition
> Given an equivalence relation $\cong$ on a set $A$, the **equivalence class** of an element $a \in A$ is the set
> $$[a] = \{x \in A : x \cong a\}.$$
> The set of all equivalence classes is the **quotient** $A/{\cong}$.

Example: for $\sim$ defined by $b - a = 2\pi k$ on $\mathbb{R}$:
$$[0] = \{x \in \mathbb{R} : x = 2\pi k,\, k \in \mathbb{Z}\} = \{\ldots, -2\pi, 0, 2\pi, 4\pi, \ldots\}$$
$$[1.5] = \{x \in \mathbb{R} : x = 1.5 + 2\pi k,\, k \in \mathbb{Z}\}$$

Each class collects all real numbers that are multiples of $2\pi$ apart.

>[!idea]
> An equivalence class groups all elements equivalent to a chosen representative; the quotient is the set of all such classes.
