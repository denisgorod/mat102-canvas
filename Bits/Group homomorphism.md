---
id: group-homomorphism-definition
title: "Group homomorphism"
role: bit
group: homomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: homomorphism-well-definedness
    question: "How do I check a homomorphism is well-defined on equivalence classes?"
    edge_type: prerequisite
  - id: kernel-and-image
    question: "What elements does a homomorphism send to the identity?"
    edge_type: prerequisite
  - id: ex-check-homomorphisms
    question: ""
    edge_type: related
parents:
  - cyclic-subgroup-is-subgroup
---

You have seen that groups with the same structure can look very different. A group homomorphism is a function between two groups that *preserves* their structure — the group operation itself.

Suppose you have two groups, $(G, \cdot)$ and $(H, \star)$, and a function $\varphi: G \to H$ between them. The function is a **homomorphism** if it respects the group operation:

>[!d]
> $\varphi(x \cdot y) = \varphi(x) \star \varphi(y)$ for all $x, y \in G$.

In other words, it doesn't matter whether you multiply first and then apply $\varphi$, or apply $\varphi$ first and then multiply in $H$ — you get the same result.

Here's a concrete example: let $G = \mathbb{Z}$ (under addition) and $H = \mathbb{Z}_6$ (under addition mod 6). Define $\varphi: \mathbb{Z} \to \mathbb{Z}_6$ by $\varphi(n) = [n]_6$. Then $\varphi$ is a homomorphism because:
$$\varphi(m + n) = [m+n]_6 = [m]_6 + [n]_6 = \varphi(m) + \varphi(n).$$

Another example: let $G = \mathbb{Z}_4$ and $H = \mathbb{Z}_8$, both under addition mod $n$. Define $\varphi([x]_4) = [2x]_8$. This is also a homomorphism:
$$\varphi([a]_4 + [b]_4) = \varphi([a+b]_4) = [2(a+b)]_8 = [2a]_8 + [2b]_8 = \varphi([a]_4) + \varphi([b]_4).$$

A homomorphism need not be bijective — it can "squash" or "embed" one group into another. But the key property is that the function respects the group operation. This makes homomorphisms natural to study: they are the structure-preserving maps between groups.

>[!idea]
> A homomorphism is a function between groups that respects the group operation: $\varphi(x \cdot y) = \varphi(x) \star \varphi(y)$.
