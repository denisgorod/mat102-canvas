---
id: what-is-an-order-relation
title: "What is an order relation?"
role: bit
group: order-relations
curriculum_path: null
learning_objectives: []
concludes: ord-def
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
> A relation $R$ on $A$ is a **weak order** (or **partial order**) if it is reflexive, transitive, and anti-symmetric (like $\leq$). It is a **strong order** if it is irreflexive, transitive, and anti-symmetric (like $<$). A weak or strong order is **total** (or **linear**) if, in addition, every two distinct elements are comparable. *Partial* means comparability is not required, so every weak total order is also a partial order.

The familiar $\leq$ on $\mathbb{Z}$ is a weak total order. Subset inclusion $\subseteq$ on the power set $\mathcal{P}(\{1,2,3\})$ is a weak partial order but not total — some pairs of subsets (like $\{1,2\}$ and $\{2,3\}$) are incomparable.

>[!idea]
> Order relations generalize inequality: weak orders are reflexive, strong orders are irreflexive; both are transitive and anti-symmetric, and may or may not be total.
