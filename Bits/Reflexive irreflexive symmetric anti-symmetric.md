---
id: relation-properties-reflexive-symmetric
title: "Reflexive, irreflexive, symmetric, anti-symmetric"
role: bit
group: binary-relations
curriculum_path: null
learning_objectives: []
children:
  - id: relation-properties-transitive-total
    question: "Are there more properties a relation can have?"
    edge_type: prerequisite
  - id: what-is-an-equivalence-relation
    question: "Which combination of properties captures 'sameness'?"
    edge_type: prerequisite
  - id: what-is-an-order-relation
    question: "Which combination of properties captures 'ordering'?"
    edge_type: prerequisite
parents:
  - relations-on-a-set
---

To classify relations, we check which properties they satisfy.

>[!d] Definition
> A relation $R$ on a set $A$ is:
> - **Reflexive** if for all $a \in A$, $a\,R\,a$.
> - **Irreflexive** if for all $a \in A$, $a \not R\, a$.
> - **Symmetric** if for all $a, b \in A$, $a\,R\,b$ implies $b\,R\,a$.
> - **Anti-symmetric** if for all $a, b \in A$, $a\,R\,b$ and $b\,R\,a$ implies $a = b$.

Let's check these against our examples:

- Equals ($=$) is reflexive ($a = a$) and symmetric ($a = b \Longrightarrow b = a$).
- Less than ($<$) is irreflexive ($a \not< a$) and not symmetric ($2 < 4$ but $4 \not< 2$).
- Less than or equal ($\leq$) is reflexive ($a \leq a$) and anti-symmetric ($a \leq b$ and $b \leq a$ implies $a = b$).

Note: symmetric and anti-symmetric are *not* negations of each other — a relation can be both (only equality), neither, or one but not the other.

>[!idea]
> Properties like reflexivity, symmetry, and anti-symmetry let us classify relations by their structure.
