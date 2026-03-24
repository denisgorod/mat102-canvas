---
id: ex-center-is-subgroup
title: "Center Z(G) is a subgroup"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - subgroup-definition
---

In a nonabelian group, some elements commute with everything, while others don't. The set of all elements that commute with *every* other element is called the *center* of the group.

**Definition:** The center of $G$ is
$$Z(G) = \{a \in G : ab = ba \text{ for all } b \in G\}.$$

In an abelian group, $Z(G) = G$. In a nonabelian group, $Z(G)$ is usually much smaller.

**Example:** In the dihedral group $D_3$, the center is $Z(D_3) = \{e\}$ (only the identity commutes with all elements). Verify this by checking that no nontrivial rotation or reflection commutes with all of $D_3$.

**Proof task:** Show that $Z(G)$ is a subgroup of $G$ for any group $G$. Use the subgroup test: verify that $Z(G)$ is nonempty (the identity is always in it), closed under the group operation, and inverses of elements in $Z(G)$ are also in $Z(G)$.

>[!question] Exercise
> Define $Z(G) = \{a \in G : ab = ba \text{ for all } b \in G\}$. Show that $Z(G) \leq G$.
