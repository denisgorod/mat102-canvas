---
id: what-is-an-equivalence-relation
title: "What is an equivalence relation?"
role: bit
group: equivalence-relations
curriculum_path: null
learning_objectives: []
children:
  - id: congruence-is-equivalence-relation
    question: "Can we build an equivalence relation from divisibility?"
    edge_type: analogy
parents:
  - relation-properties-reflexive-symmetric
  - relation-properties-transitive-total
  - set-equality-via-double-inclusion
---

>[!d] Definition
> A relation $R$ on a set $A$ is an **equivalence relation** if it is reflexive, transitive, and symmetric.

Equivalence relations capture the idea of two things being "morally equal" even when they aren't literally the same object. Equality itself is the prototypical example.

Example: define $a \sim b$ on $\mathbb{R}$ if $b - a = 2\pi k$ for some $k \in \mathbb{Z}$.

**Reflexive**: $a - a = 0 = 2\pi \cdot 0$, so $a \sim a$.

**Symmetric**: if $b - a = 2\pi k$, then $a - b = 2\pi(-k)$, so $b \sim a \Longrightarrow a \sim b$.

**Transitive**: if $b - a = 2\pi k_1$ and $c - b = 2\pi k_2$, then $c - a = 2\pi(k_1 + k_2)$, so $a \sim c$.

This relation identifies angles that differ by a full rotation — perfect for trigonometry.

>[!idea]
> An equivalence relation is a generalization of equality: it is reflexive, symmetric, and transitive.
