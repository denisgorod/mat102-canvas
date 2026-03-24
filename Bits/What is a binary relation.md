---
id: what-is-a-binary-relation
title: "What is a binary relation?"
role: bit
group: binary-relations
curriculum_path: null
learning_objectives: []
children:
  - id: relations-on-a-set
    question: "What if the two sets are the same?"
    edge_type: prerequisite
parents:
  - cartesian-product
---

Given a set $S$, a **relation** on $S$ is a way of comparing two elements — specifying their relationship. Equality ($=$), less-than ($<$), and divisibility ($\mid$) are all relations.

>[!d] Definition
> If $A$ and $B$ are sets, a **binary relation** $R$ between $A$ and $B$ is a subset $S_R \subseteq A \times B$. We say $a$ is related to $b$, written $a\,R\,b$, when $(a,b) \in S_R$. $A$ is the **domain** and $B$ is the **codomain** of the relation.

For example, if $A = \{2,4,6\}$ and $B = \{\diamondsuit, \spadesuit\}$, we could define $R$ by the subset $\{(2, \diamondsuit), (4, \diamondsuit), (6, \spadesuit)\}$. Then $2\,R\,\diamondsuit$ and $6\,R\,\spadesuit$, but $4 \not R \spadesuit$.

Relations generalize the idea of comparison beyond numbers. Any subset of a Cartesian product is a relation — the definition is that minimal. What we call "properties" of relations (below: reflexivity, transitivity, etc.) are extra structure that turns a bare subset into something with recognizable behavior.

>[!idea]
> A binary relation is simply a subset of the Cartesian product — a way to formally capture "which pairs are related."
