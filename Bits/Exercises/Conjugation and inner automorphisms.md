---
id: ex-conjugation-and-inner-automorphisms
title: "Conjugation and inner automorphisms"
role: exercise
group: isomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - ex-automorphism-group
---

The most natural automorphisms of a group come from conjugation: conjugating by a fixed group element. These "inner" automorphisms reveal the internal symmetries of the group.

For any $g \in G$, define **conjugation by $g$** as the map $c_g: G \to G$ by:
$$c_g(h) = ghg^{-1}$$

In other words, $c_g$ conjugates every element of $G$ by $g$.

**Part (a)**: Show that $c_g$ is an automorphism for all $g \in G$.

You must verify: (i) $c_g$ is a homomorphism, (ii) $c_g$ is bijective.

For bijection, you may either show injectivity and surjectivity, or exhibit an inverse map. (Hint: what is $c_{g^{-1}}$?)

**Part (b)**: Define $\text{Inn}(G) = \{c_g : g \in G\}$, the set of all inner automorphisms of $G$.

Show that $\text{Inn}(G)$ is a group under function composition.

You must verify closure: if $c_g, c_h \in \text{Inn}(G)$, is $c_g \circ c_h$ also an inner automorphism? Find the element $k \in G$ such that $c_g \circ c_h = c_k$. What is $k$?

**Part (c)**: Conclude that $\text{Inn}(G) \leq \text{Aut}(G)$.

That is, every inner automorphism is an automorphism, and the set of inner automorphisms is a subgroup of all automorphisms.

**Question for reflection**: Are there automorphisms that are *not* inner? (This is a yes/no question — you don't need to prove your answer, just think about it.)

>[!question] Exercise
> Prove that conjugation maps are automorphisms, and that the set of all inner automorphisms forms a subgroup of $\text{Aut}(G)$.
