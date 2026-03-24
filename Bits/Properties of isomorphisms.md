---
id: isomorphism-properties
title: "Properties of isomorphisms"
role: bit
group: isomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: cyclic-groups-classification
    question: "Are all cyclic groups of the same order isomorphic?"
    edge_type: prerequisite
  - id: ex-r-not-isomorphic-q
    question: ""
    edge_type: related
  - id: ex-automorphism-group
    question: ""
    edge_type: related
parents:
  - isomorphism-example
---

Because an isomorphism is a perfect relabeling that preserves the group operation, it also preserves every property of the group that can be expressed in terms of structure alone.

>[!s]
> Let $\varphi: G \to H$ be an isomorphism. Then:
>
> 1. $\varphi^{-1}: H \to G$ is also an isomorphism
> 2. $G$ is abelian if and only if $H$ is abelian
> 3. $G$ is cyclic if and only if $H$ is cyclic
> 4. If $K \leq G$, then $\varphi(K) \leq H$ and $K \cong \varphi(K)$
> 5. $|g| = |\varphi(g)|$ for all $g \in G$ (orders are preserved)
> 6. $|G| = |H|$ (the groups have the same size)

Property (3) is striking: if $G$ is cyclic, then $H$ must be cyclic too. They have the same generator structure, the same periodic behavior. Property (5) says that if an element has order 7 in $G$, its image has order 7 in $H$.

**Proof of (2):** Suppose $G$ is abelian. For any $a, b \in H$, choose $g, h \in G$ such that $\varphi(g) = a$ and $\varphi(h) = b$ (possible because $\varphi$ is surjective). Then:
$$ab = \varphi(g) \varphi(h) = \varphi(gh) = \varphi(hg) = \varphi(h) \varphi(g) = ba.$$

So $H$ is abelian. The converse is symmetric.

These properties are your tools for *disproving* isomorphisms. If you suspect two groups are *not* isomorphic, look for a property one has that the other doesn't:
- Different sizes? Not isomorphic.
- One is abelian, the other is not? Not isomorphic.
- One is cyclic, the other is not? Not isomorphic.
- An element has different order in the two groups? Not isomorphic.

For example, $\mathbb{Z}_6$ and $S_3$ both have order 6, but $\mathbb{Z}_6$ is abelian and $S_3$ is not. So they cannot be isomorphic.

>[!idea]
> Isomorphisms preserve all structural properties: abelianness, cyclicity, element orders, and subgroup structure. Different properties are the roadmap to proving non-isomorphism.
