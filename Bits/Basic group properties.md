---
id: basic-group-properties
title: "Basic group properties"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: group-order-and-element-order
    question: "Can we measure the 'size' of a group or an element?"
    edge_type: prerequisite
  - id: ex-finish-group-properties-proof
    question: ""
    edge_type: prerequisite
  - id: ex-product-inverse-general
    question: ""
    edge_type: prerequisite
parents:
  - group-definition
---

Now that you have the definition of a group, you can prove things that are *true in every group*, just from the axioms. Here are four key properties.

**Proposition (Uniqueness of identity):** The identity element $e$ is unique. If $e'$ also satisfies $e' \cdot a = a \cdot e' = a$ for all $a \in G$, then $e' = e$.

*Proof:* Apply the definition with $a = e$: $e' \cdot e = e'$. But also $e' \cdot e = e$ (because $e$ is the identity). So $e' = e$.

**Proposition (Cancellation):** If $a \cdot b = a \cdot c$, then $b = c$ (left cancellation). Similarly, $b \cdot a = c \cdot a$ implies $b = c$ (right cancellation).

*Proof:* Multiply both sides on the left by $a^{-1}$:
$$a^{-1} \cdot (a \cdot b) = a^{-1} \cdot (a \cdot c) \implies (a^{-1} \cdot a) \cdot b = (a^{-1} \cdot a) \cdot c \implies e \cdot b = e \cdot c \implies b = c.$$

**Proposition (Uniqueness of inverses):** For each $a \in G$, the inverse $a^{-1}$ is unique. If $a \cdot r = e$ and $a \cdot s = e$, then $r = s$.

*Proof:* We have $a \cdot r = e = a \cdot s$. By cancellation, $r = s$.

**Proposition (Inverse of a product):** For any $a, b \in G$, we have $(a \cdot b)^{-1} = b^{-1} \cdot a^{-1}$.

*Proof:* Check that $(a \cdot b) \cdot (b^{-1} \cdot a^{-1}) = e$:
$$(a \cdot b) \cdot (b^{-1} \cdot a^{-1}) = a \cdot (b \cdot b^{-1}) \cdot a^{-1} = a \cdot e \cdot a^{-1} = a \cdot a^{-1} = e.$$

Notice: the inverses come out in *reverse order*. This is not a coincidence — it reflects the sequential nature of the group operation.

These four facts hold in *every* group. Once you move beyond the three axioms, any theorem you prove using only these properties applies universally.

>[!idea]
> In any group, the identity is unique, cancellation works, every element has a unique inverse, and inverses of products reverse their order — $(ab)^{-1} = b^{-1}a^{-1}$.
