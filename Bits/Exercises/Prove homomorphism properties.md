---
id: ex-prove-homomorphism-properties
title: "Prove homomorphism properties"
role: exercise
group: homomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - homomorphism-properties
---

You've seen that homomorphisms preserve the group operation. Now prove the remaining properties from Proposition 5.

For a homomorphism $\varphi: G \to H$, show each of the following:

(a) $\varphi(e_G) = e_H$ (homomorphisms map identity to identity)

(b) $\varphi(g^n) = \varphi(g)^n$ for all $n \in \mathbb{Z}$ (homomorphisms preserve powers)

(c) The order of $\varphi(g)$ divides the order of $g$: if $|g| = n$, then $|\varphi(g)|$ divides $n$

(d) $\ker(\varphi) \leq G$ (the kernel is a subgroup of $G$)

(e) $\text{im}(\varphi) \leq H$ (the image is a subgroup of $H$)

(f) If $S \leq G$ is cyclic, then $\varphi(S)$ is cyclic. If $S \leq G$ is abelian, then $\varphi(S)$ is abelian.

(g) For any $L \leq H$, we have $\varphi^{-1}(L) \leq G$

(h) $\varphi$ is injective if and only if $\ker(\varphi) = \{e_G\}$

Which of these follow immediately from the definition of homomorphism? Which require you to use the subgroup criterion? Which rely on properties you proved earlier?

>[!question] Exercise
> Prove all eight properties, identifying which rely on the subgroup criterion and which follow directly from the operation-preserving property of homomorphisms.
