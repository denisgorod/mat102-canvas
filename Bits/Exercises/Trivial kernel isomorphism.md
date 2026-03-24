---
id: ex-trivial-kernel-isomorphism
title: "Trivial kernel implies G ≅ φ(G)"
role: exercise
group: homomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - homomorphism-properties
---

You've learned that a homomorphism is injective if and only if its kernel is trivial. Use this to prove a useful consequence.

**Proposition**: Let $\varphi: G \to K$ be a group homomorphism with $\ker(\varphi) = \{e_G\}$. Then $G \cong \varphi(G)$.

This says that if a homomorphism has a trivial kernel, then the domain is isomorphic to its image.

(a) Why is $\varphi$ injective?

(b) Is $\varphi$ necessarily surjective onto $K$? Why or why not?

(c) Consider $\varphi$ as a map from $G$ to $\varphi(G)$ (restricting the codomain to the image). Is it bijective?

(d) Use the definition of isomorphism to conclude that $G \cong \varphi(G)$.

**Application**: In a previous exercise, you showed that $\delta: \mathbb{Z} \to \mathbb{Z}_6$ defined by $\delta(n) = [2n]_6$ is a homomorphism with $\ker(\delta) = 2\mathbb{Z}$ (the even integers). Is $\mathbb{Z} \cong \delta(\mathbb{Z})$? Why or why not? What is $\delta(\mathbb{Z})$?

>[!question] Exercise
> Prove that if $\ker(\varphi) = \{e_G\}$, then $G \cong \varphi(G)$.
