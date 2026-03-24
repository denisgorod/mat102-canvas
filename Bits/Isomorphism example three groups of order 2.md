---
id: isomorphism-example
title: "Isomorphism example: three groups of order 2"
role: bit
group: isomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: isomorphism-properties
    question: "What properties are preserved by isomorphisms?"
    edge_type: prerequisite
  - id: ex-complete-isomorphism-example
    question: ""
    edge_type: related
  - id: ex-rotation-subgroup-isomorphic-z3
    question: ""
    edge_type: related
parents:
  - isomorphism-definition
---

Three different-looking groups all turn out to be isomorphic. This shows how the same abstract structure can appear in many guises.

Consider these three groups:
- $G_1 = \mathbb{Z}_2 = \{[0], [1]\}$ under addition mod 2
- $G_2 = U = \{[1]_6, [5]_6\}$ under multiplication mod 6
- $G_3 = \langle [2]_4 \rangle = \{[0], [2]\}$ under addition mod 4

All three have order 2. Let's write their Cayley tables.

For $G_1$: addition mod 2 gives identity $[0]$, and $[1] + [1] = [0]$.

For $G_2$: multiplication mod 6 with $[1]_6 \cdot [1]_6 = [1]_6$ and $[5]_6 \cdot [5]_6 = [25]_6 = [1]_6$. Identity is $[1]_6$.

For $G_3$: addition mod 4 with $[0]$ as identity and $[2] + [2] = [0]$.

The structure is the same: pick any non-identity element, square it, and you get the identity. The Cayley tables are identical up to relabeling.

**Proof that $G_1 \cong G_2$:**

Define $\varphi: \mathbb{Z}_2 \to U$ by $\varphi([0]) = [1]_6$ and $\varphi([1]) = [5]_6$.

- **Homomorphism:** Check that $\varphi([a] + [b]) = \varphi([a]) \cdot \varphi([b])$. There are four cases:
  - $\varphi([0] + [0]) = \varphi([0]) = [1]_6 = [1]_6 \cdot [1]_6 = \varphi([0]) \cdot \varphi([0])$ ✓
  - $\varphi([0] + [1]) = \varphi([1]) = [5]_6 = [1]_6 \cdot [5]_6 = \varphi([0]) \cdot \varphi([1])$ ✓
  - $\varphi([1] + [0]) = \varphi([1]) = [5]_6 = [5]_6 \cdot [1]_6 = \varphi([1]) \cdot \varphi([0])$ ✓
  - $\varphi([1] + [1]) = \varphi([0]) = [1]_6 = [5]_6 \cdot [5]_6 = \varphi([1]) \cdot \varphi([1])$ ✓

- **Bijection:** $\varphi$ is clearly one-to-one and onto $U$.

So $\mathbb{Z}_2 \cong U$. By the same method, you can show all three groups are isomorphic to each other.

This is profound: despite different definitions, different operations, and different element notation, these three groups *are* the same structure. Any property that depends only on the group structure (like subgroup lattice, element orders, conjugacy classes) is identical in all three.

>[!idea]
> Different groups can have the same Cayley table structure; when they do, they are isomorphic — they are the same group with different labels.
