---
id: kernel-and-image
title: "Kernel and image"
role: bit
group: homomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: kernel-and-image-example
    question: "What do the kernel and image look like for a concrete homomorphism?"
    edge_type: prerequisite
parents:
  - group-homomorphism-definition
---

For any homomorphism $\varphi: G \to H$, there are two special subsets that measure how "far" the homomorphism is from being a bijection.

The **kernel** of $\varphi$ is the set of elements in $G$ that map to the identity in $H$:

>[!d]
> $\ker(\varphi) = \{g \in G : \varphi(g) = e_H\}$

The **image** of $\varphi$ is the set of all outputs:

>[!d]
> $\text{im}(\varphi) = \{\varphi(g) : g \in G\}$

The kernel measures *injectivity*: if $\varphi$ is injective, then only the identity maps to the identity, so $\ker(\varphi) = \{e_G\}$. Conversely, if $\ker(\varphi) = \{e_G\}$, then $\varphi$ is injective.

The image measures *surjectivity*: if $\varphi$ is surjective, then every element of $H$ is an output, so $\text{im}(\varphi) = H$. The smaller the image, the more elements of $H$ are "missed."

Here's an intuitive picture: imagine $\varphi$ as a "collapse" that squashes $G$ down to a subset of $H$. The kernel is the set of all elements that get squashed to zero. The image is the region that survives the squashing.

For example, the determinant $\det: \text{GL}_n(\mathbb{R}) \to \mathbb{R}^*$ (the group of invertible $n \times n$ matrices to nonzero reals) is a homomorphism. Its kernel is $\text{SL}_n(\mathbb{R})$ (matrices with determinant 1) and its image is $\mathbb{R}^*$ (all nonzero reals).

>[!idea]
> The kernel is where a homomorphism "collapses" to the identity; the image is what survives. Together they tell you how much $\varphi$ compresses $G$ into $H$.
