---
id: ex-automorphism-group
title: "Aut(G) is a group"
role: exercise
group: isomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: ex-conjugation-and-inner-automorphisms
    question: "Are conjugation maps automorphisms?"
    edge_type: prerequisite
  - id: ex-rational-multiplication-automorphism
    question: "Can I find a family of automorphisms for a specific group?"
    edge_type: related
parents:
  - isomorphism-properties
---

You've seen that isomorphism is an equivalence relation on groups. But what about isomorphisms of a group with itself? The set of all such isomorphisms forms its own group.

An **automorphism** of a group $G$ is an isomorphism $\varphi: G \to G$.

Let $\text{Aut}(G)$ denote the set of all automorphisms of $G$. Define a binary operation on $\text{Aut}(G)$ by **function composition**: for $\varphi, \psi \in \text{Aut}(G)$, define $(\varphi \circ \psi)(g) = \varphi(\psi(g))$.

**Theorem**: $(\text{Aut}(G), \circ)$ is a group.

Prove each axiom:

(a) **Closure**: If $\varphi, \psi \in \text{Aut}(G)$, is $\varphi \circ \psi$ also an automorphism? Show that it is a homomorphism, and that it is bijective.

(b) **Associativity**: Function composition is associative. (You may use this fact without proof.)

(c) **Identity**: What is the identity automorphism? Show that it is indeed in $\text{Aut}(G)$.

(d) **Inverses**: If $\varphi \in \text{Aut}(G)$, why does $\varphi$ have an inverse in $\text{Aut}(G)$? (Hint: isomorphisms are bijective.)

Conclude: $\text{Aut}(G)$ is a group under composition.

**Reflection**: Why is it essential that automorphisms are *bijective* for this group structure to work?

>[!question] Exercise
> Prove that the set of all automorphisms of a group $G$, under function composition, forms a group.
