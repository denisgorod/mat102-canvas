---
id: ex-element-order-divides-group-order
title: "Element order divides cyclic group order"
role: exercise
group: cyclic-groups
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cyclic-subgroup-is-subgroup
---

In a cyclic group, every element generates a cyclic subgroup. The order of that subgroup is precisely the order of the element.

**Concrete check:** In $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$ under addition, the element $a = 2$ has order 3 (since $3 \cdot 2 = 6 \equiv 0$). The cyclic subgroup $\langle 2 \rangle = \{0, 2, 4\}$ has 3 elements. Notice that $3 | 6$.

**General claim:** If $G$ is a cyclic group of order $n$, then $|a|$ divides $n$ for every $a \in G$.

Prove this as follows: If $G = \langle g \rangle$ is cyclic of order $n$, then every element has the form $g^k$ for some $0 \leq k < n$. The cyclic subgroup $\langle g^k \rangle$ has order $|g^k| = \frac{n}{\gcd(k,n)}$ (you've proven this formula earlier). This order always divides $n$—why?

>[!question] Exercise
> If $G$ is a cyclic group of order $n$, show that $|a|$ divides $n$ for every $a \in G$.
