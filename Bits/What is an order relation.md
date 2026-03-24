---
id: what-is-an-order-relation
title: "What is an order relation?"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
children:
  - id: posets
    question: "What is a set equipped with a partial order called?"
    edge_type: prerequisite
parents:
  - relation-properties-reflexive-symmetric
  - relation-properties-transitive-total
---

Having generalized equality (equivalence relations), we now generalize inequality.

>[!d] Definition
> A relation $R$ on $A$ is a **weak order** if it is reflexive, transitive, and anti-symmetric (like $\leq$). It is a **strong order** if it is irreflexive, transitive, and anti-symmetric (like $<$). A weak or strong order is **total** (or **linear**) if every pair of elements is comparable, and **partial** otherwise.

The familiar $\leq$ on $\mathbb{Z}$ is a weak total order. Subset inclusion $\subseteq$ on the power set $\mathcal{P}(X)$ is a weak partial order — some pairs of subsets (like $\{1,2\}$ and $\{2,3\}$) are incomparable.

>[!idea]
> Order relations generalize inequality: weak orders are reflexive, strong orders are irreflexive; both are transitive and anti-symmetric, and may be total or partial.
