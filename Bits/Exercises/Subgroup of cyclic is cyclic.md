---
id: ex-subgroup-of-cyclic-is-cyclic
title: "Every subgroup of a cyclic group is cyclic"
role: exercise
group: cyclic-groups
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cyclic-subgroup-is-subgroup
---

Cyclic groups have a special structure: not only are they themselves simple, but all of their subgroups are also cyclic. This is a powerful rigidity property.

**Theorem:** If $G$ is cyclic and $H \leq G$, then $H$ is cyclic.

**Proof strategy:** Assume $G = \langle g \rangle$ is cyclic of order $n$. Since $H$ is a subgroup, it consists of powers of $g$. Define
$$S = \{k \in \mathbb{Z}^+ : g^k \in H\}.$$

Since $H \neq \{e\}$ (except in the trivial case), $S$ is nonempty. By the Well-Ordering Principle, $S$ has a smallest element, say $m$. Now prove that $H = \langle g^m \rangle$:

- First, show $\langle g^m \rangle \subseteq H$ (obvious, since $g^m \in H$).
- Next, show $H \subseteq \langle g^m \rangle$: if $g^k \in H$, use the Division Algorithm to write $k = mq + r$ with $0 \leq r < m$. Then $g^r = g^k / (g^m)^q \in H$. Since $m$ is the smallest positive exponent in $H$, we must have $r = 0$, so $k$ is a multiple of $m$.

This proves $H = \langle g^m \rangle$, which is cyclic.

>[!question] Exercise
> Show that every subgroup of a cyclic group is cyclic. Hint: use the Division Algorithm on the smallest positive exponent in the subgroup.
