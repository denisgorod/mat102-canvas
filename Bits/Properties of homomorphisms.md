---
id: homomorphism-properties
title: "Properties of homomorphisms"
role: bit
group: homomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: isomorphism-definition
    question: "What if a homomorphism is also a bijection?"
    edge_type: prerequisite
  - id: ex-prove-homomorphism-properties
    question: ""
    edge_type: related
  - id: ex-compute-kernels
    question: ""
    edge_type: related
  - id: ex-trivial-kernel-isomorphism
    question: ""
    edge_type: related
  - id: ex-inversion-homomorphism-iff-abelian
    question: ""
    edge_type: related
parents:
  - kernel-and-image-example
---

Homomorphisms have predictable behavior. Here are nine key properties — all follow from the definition $\varphi(x \cdot y) = \varphi(x) \star \varphi(y)$ — that will guide your intuition about how they work.

>[!s]
> Let $\varphi: G \to H$ be a homomorphism. Then:
>
> 1. $\varphi(e_G) = e_H$ (the identity always maps to the identity)
> 2. $\varphi(g^n) = \varphi(g)^n$ for all integers $n$
> 3. $|\varphi(g)|$ divides $|g|$ (image elements have smaller or equal order)
> 4. $\ker(\varphi) \leq G$ and $\text{im}(\varphi) \leq H$ (kernel and image are subgroups)
> 5. If $K \leq G$, then $\varphi(K) \leq H$ (homomorphisms preserve subgroups)
> 6. If $K$ is cyclic, then $\varphi(K)$ is cyclic
> 7. If $K$ is abelian, then $\varphi(K)$ is abelian
> 8. If $L \leq H$, then $\varphi^{-1}(L) \leq G$ (preimages of subgroups are subgroups)
> 9. $\varphi$ is injective if and only if $\ker(\varphi) = \{e_G\}$

Let me prove property (9), which is the most useful: $\varphi$ is injective iff the kernel is trivial.

**Proof of (9):**
- $(\Rightarrow)$ Suppose $\varphi$ is injective. If $g \in \ker(\varphi)$, then $\varphi(g) = e_H = \varphi(e_G)$. By injectivity, $g = e_G$. So $\ker(\varphi) = \{e_G\}$.
- $(\Leftarrow)$ Suppose $\ker(\varphi) = \{e_G\}$. If $\varphi(g) = \varphi(h)$, then $\varphi(g h^{-1}) = \varphi(g) \varphi(h)^{-1} = e_H$, so $g h^{-1} \in \ker(\varphi) = \{e_G\}$. Thus $g = h$, so $\varphi$ is injective. $\square$

Property (4) is equally important: the kernel and image are always subgroups. This means you can apply all subgroup theory to them — they have orders, they generate, they can be cyclic.

These nine properties are the backbone of homomorphism theory. Whenever you encounter a homomorphism in a new setting, check these properties first.

>[!idea]
> Homomorphisms preserve the essential structure of groups: identities, orders of elements, subgroups, and the dichotomy between injectivity and triviality of the kernel.
