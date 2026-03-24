---
id: ex-centralizer-is-subgroup
title: "Centralizer C(H) is a subgroup"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - subgroup-definition
---

The center $Z(G)$ captures elements that commute with *all* of $G$. Sometimes we want to look at elements that commute with a specific subset $H$.

**Definition:** If $H \subseteq G$, the *centralizer* of $H$ is
$$C(H) = \{g \in G : gh = hg \text{ for all } h \in H\}.$$

Note that $Z(G) = C(G)$ — the center is the centralizer of the entire group.

**Example:** In $D_3$, let $H = \{e, r, r^2\}$ be the cyclic subgroup of rotations. What is $C(H)$? An element commutes with all rotations if it commutes with $r$. Since $sr \neq rs$, the reflection $s$ is not in $C(H)$. In fact, $C(H) = H$ in this case.

**Proof task:** Show that $C(H)$ is a subgroup of $G$ for any subgroup $H \leq G$. Use the subgroup test.

>[!question] Exercise
> If $H \leq G$, define $C(H) = \{g \in G : gh = hg \text{ for all } h \in H\}$. Show that $C(H) \leq G$.
