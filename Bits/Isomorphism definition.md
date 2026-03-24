---
id: isomorphism-definition
title: "Isomorphism definition"
role: bit
group: isomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: isomorphism-example
    question: "What does an isomorphism look like concretely?"
    edge_type: prerequisite
  - id: ex-isomorphic-is-equivalence
    question: ""
    edge_type: related
parents:
  - homomorphism-properties
---

You've seen that a homomorphism can squash a group, missing elements or collapsing distinct elements together. What if a homomorphism is *not* a squashing at all — what if it's a perfect relabeling?

An **isomorphism** is a homomorphism that is also a bijection.

>[!d]
> A group homomorphism $\varphi: G \to H$ is an isomorphism if $\varphi$ is bijective (one-to-one and onto).

When an isomorphism exists between $G$ and $H$, we write $G \cong H$ and say the groups are **isomorphic**.

What does this mean intuitively? An isomorphism is a relabeling of the elements of $G$ into $H$ that preserves the group structure *exactly*. No information is lost, no elements are merged, no outputs are missed. If you know the Cayley table (multiplication table) of $G$, you can construct the Cayley table of $H$ by simply replacing each element with its image under $\varphi$.

Because an isomorphism is a bijection, it always has an inverse $\varphi^{-1}: H \to G$. Since $\varphi$ preserves the group operation, so does its inverse (which you can verify by direct calculation). So $\varphi^{-1}$ is also an isomorphism.

This is powerful: if $G \cong H$, then $H \cong G$. Isomorphism is a *symmetric* relationship. In fact, it's an equivalence relation on the class of all groups: reflexive (every group is isomorphic to itself via the identity), symmetric (if $G \cong H$ then $H \cong G$), and transitive (if $G \cong H$ and $H \cong K$ then $G \cong K$).

Two groups that are isomorphic are, for the purposes of group theory, *the same group*. They have the same Cayley table, the same subgroup structure, the same element orders — everything. The only difference is the names and symbols used for the elements.

>[!idea]
> An isomorphism is a bijective homomorphism — a relabeling that preserves the group operation exactly. Isomorphic groups are essentially identical.
