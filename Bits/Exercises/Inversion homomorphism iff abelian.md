---
id: ex-inversion-homomorphism-iff-abelian
title: "Inversion is a homomorphism iff abelian"
role: exercise
group: homomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - homomorphism-properties
  - abelian-groups
---

In any group, you can invert elements. But is inversion a homomorphism? The answer depends on the structure of the group.

Define the **inversion map** $\varphi: G \to G$ by $\varphi(g) = g^{-1}$.

**Theorem**: $\varphi$ is a group homomorphism if and only if $G$ is abelian.

Prove both directions:

(a) **Forward direction** ($\varphi$ homomorphism $\Rightarrow$ $G$ abelian):

Assume $\varphi$ is a homomorphism. Show that for any $g, h \in G$, we have $\varphi(gh) = \varphi(g) \varphi(h)$. Use this to prove that $gh = hg$ for all $g, h \in G$.

(b) **Backward direction** ($G$ abelian $\Rightarrow$ $\varphi$ homomorphism):

Assume $G$ is abelian. Show that for any $g, h \in G$:
$$\varphi(gh) = (gh)^{-1} = h^{-1}g^{-1} = g^{-1}h^{-1} = \varphi(g)\varphi(h)$$

(Justify each equality carefully.)

**Test cases**: Is inversion a homomorphism in $(\mathbb{Z}, +)$? In $(D_3, \circ)$? In $(S_3, \circ)$?

>[!question] Exercise
> Prove that the inversion map is a homomorphism if and only if the group is abelian.
