---
id: iso-def
title: "Isomorphism"
role: definition
subject: group-theory
topic: isomorphisms
statement: "An isomorphism is a bijective homomorphism; G ≅ H if one G → H exists. Identities, inverses and composites of isomorphisms are isomorphisms, so ≅ is reflexive, symmetric and transitive, and automorphisms of G form a group Aut(G) under composition."
depends_on: [hom-def, fn-composition-preserves, fn-invertible-iff-bijective, eqv-def]
---
>[!d] Definition
> An **isomorphism** is a bijective homomorphism $\varphi:G\to H$; then $G$ and $H$ are **isomorphic**, $G\cong H$. An **automorphism** of $G$ is an isomorphism $G\to G$. Identity maps, inverses and composites of isomorphisms are isomorphisms; hence $\cong$ is reflexive, symmetric and transitive (not a relation on a set: groups form no set), and the automorphisms of $G$ form a group $\operatorname{Aut}(G)$ under composition.

>[!p] Proof
> $\mathrm{id}_G$ is a bijective homomorphism. Let $\varphi:G\to H$, $\psi:H\to K$ be isomorphisms. $\varphi^{-1}$ is a bijection (Invertible iff bijective); writing $a,b\in H$ as $a=\varphi(x)$, $b=\varphi(y)$, $\varphi^{-1}(ab)=\varphi^{-1}(\varphi(xy))=xy=\varphi^{-1}(a)\varphi^{-1}(b)$. $\psi\circ\varphi$ is a bijection and $\psi(\varphi(xy))=\psi(\varphi(x)\varphi(y))=\psi(\varphi(x))\psi(\varphi(y))$. As composition is associative, $\operatorname{Aut}(G)$ is a group. $\square$

>[!e] Worked example
> $[0]\mapsto[1]_6$, $[1]\mapsto[5]_6$ is an isomorphism from $\mathbb{Z}_2$ to $\{[1]_6,[5]_6\}$ under multiplication: it is bijective, and each of the four sums maps to the matching product, e.g. $[1]+[1]=[0]\mapsto[1]_6=[25]_6=[5]_6[5]_6$.
