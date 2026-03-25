---
id: subgroup-definition
title: "Subgroup definition"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: subgroup-test
    question: "Is there a shortcut for checking whether a subset is a subgroup?"
    edge_type: prerequisite
  - id: ex-center-is-subgroup
    question: ""
    edge_type: prerequisite
  - id: ex-centralizer-is-subgroup
    question: ""
    edge_type: prerequisite
  - id: ex-alternative-subgroup-test
    question: ""
    edge_type: prerequisite
parents:
  - group-order-and-element-order
---

Suppose you have a group $(G, \cdot)$ and a subset $H \subseteq G$. When is $H$ itself a group under the same operation?

**Definition:** We write $H \le G$ (read "$H$ is a subgroup of $G$") if $H \subseteq G$ and $(H, \cdot)$ is a group under the same operation as $G$.

Here's the key: when you restrict the operation to $H$, you must get a group. That means $H$ must satisfy closure (if $a, b \in H$, then $a \cdot b \in H$), associativity (inherited from $G$), identity, and inverses — all with respect to the same operation.

**Example 1:** In $(\mathbb{Z}, +)$, the subset $\mathbb{Z}$ itself is a subgroup. More interestingly, the even integers $2\mathbb{Z} = \{\ldots, -4, -2, 0, 2, 4, \ldots\}$ form a subgroup under addition. The sum of two even integers is even, and the inverse (negation) of an even integer is even.

**Example 2:** In $(\mathbb{Z}_6, +)$, consider $H = \{[0], [2], [4]\}$. Is $H$ a subgroup?
- Closure: $[2] + [2] = [4] \in H$, $[2] + [4] = [6] = [0] \in H$, etc. ✓
- Identity: $[0] \in H$. ✓
- Inverses: $-[0] = [0]$, $-[2] = [4]$, $-[4] = [2]$, all in $H$. ✓

So $H \le \mathbb{Z}_6$.

**Example 3 (Caution):** In $(\mathbb{Z}_6, +)$, suppose we pick $H = \{[1], [5]\}$ and ask: is this a group under multiplication? We have $[1] \cdot [1] = [1]$ and $[1] \cdot [5] = [5]$, but $[5] \cdot [5] = [25] = [1]$. There's an identity ([1]) and some structure. But the issue is: what is the *original* operation on $\mathbb{Z}_6$? It was addition, not multiplication! So $H$ under multiplication is not a subgroup of $(\mathbb{Z}_6, +)$ — the operations don't match.

This warns us: a subgroup must use the *same* operation as the parent group. You can't swap operations midstream.

>[!idea]
> A subgroup $H \le G$ is a subset of $G$ that is itself a group under the same operation as $G$ — closure, identity, and inverses must all hold with the same operation.
