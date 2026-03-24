---
id: relations-on-a-set
title: "Relations on a set"
role: bit
group: binary-relations
curriculum_path: null
learning_objectives: []
children:
  - id: relation-properties-reflexive-symmetric
    question: "How do I tell different types of relations apart?"
    edge_type: prerequisite
parents:
  - what-is-a-binary-relation
---

When $B = A$, a relation is a subset of $A \times A$. This is the most common case — we're comparing elements *within* the same set.

For example, if $A = \{2, 4, 6\}$, some familiar relations include:

- **Equals** "=": the subset $\{(2,2), (4,4), (6,6)\}$.
- **Less than** "<": the subset $\{(2,4), (2,6), (4,6)\}$.
- **Less than or equal** "≤": the subset $\{(2,2), (2,4), (2,6), (4,4), (4,6), (6,6)\}$.

On larger sets we can't list all pairs explicitly. For $A = \mathbb{Z}$ with "<", we write $S_R = \{(a,b) \in \mathbb{Z} \times \mathbb{Z} : a < b\}$. Here $(-2, 5) \in S_R$ since $-2 < 5$, but $(15, 14) \notin S_R$ since $15 \not< 14$.

The key insight is that a relation is simply a choice of which pairs belong to our set. Two different relations on the same set can have completely different pairs — there's no universal notion of "the" relation, only relations we define and study.

>[!idea]
> A relation on a set $A$ is a subset of $A \times A$ — we're pairing elements from the same set and deciding which pairs belong.
