---
id: ex-alternative-subgroup-test
title: "Alternative subgroup test"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - subgroup-definition
---

You've learned the standard subgroup test: $H$ is a subgroup iff $H \neq \emptyset$, $H$ is closed under the operation, and inverses of elements in $H$ are in $H$.

There's an alternative that combines the last two conditions. If you can verify that $ab^{-1} \in H$ for all $a, b \in H$, then $H$ is automatically a subgroup (given it's nonempty).

Why does this work? If you can always form $ab^{-1}$, then:
- Taking $a = a, b = a$ gives $aa^{-1} = e \in H$, so the identity is in $H$.
- Taking $a = e, b = c$ gives $ec^{-1} = c^{-1} \in H$, so inverses are in $H$.
- Taking $a = x, b = y^{-1}$ gives $x(y^{-1})^{-1} = xy \in H$, so $H$ is closed.

**Proof task:** Formalize this argument. Show that if $H \subseteq G$ is nonempty and $ab^{-1} \in H$ for all $a, b \in H$, then $H \leq G$.

>[!question] Exercise
> Show that if $H \subseteq G$ is nonempty and (i) $ab \in H$ for all $a, b \in H$ and (ii) $c^{-1} \in H$ for all $c \in H$, then $H \leq G$. Alternatively, show the one-step test: if $H$ is nonempty and $ab^{-1} \in H$ for all $a, b \in H$, then $H \leq G$.
