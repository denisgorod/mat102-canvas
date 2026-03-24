---
id: homomorphism-well-definedness
title: "Well-definedness of homomorphisms"
role: bit
group: homomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - group-homomorphism-definition
---

When you define a homomorphism on a quotient group like $\mathbb{Z}_n$, you're working with equivalence classes — multiple "names" for the same element. Before you can trust that your function actually works, you must verify that it gives the same output no matter which name you use.

Suppose you define $\varphi: \mathbb{Z}_6 \to \mathbb{Z}_{12}$ by $\varphi([x]_6) = [2x]_{12}$.

To check well-definedness, you ask: if $[a]_6 = [b]_6$, do we always have $\varphi([a]_6) = \varphi([b]_6)$?

Assume $[a]_6 = [b]_6$. This means $a \equiv b \pmod{6}$, so $a = b + 6k$ for some integer $k$. Then:
$$\varphi([a]_6) = [2a]_{12} = [2(b + 6k)]_{12} = [2b + 12k]_{12} = [2b]_{12} = \varphi([b]_6).$$

Since $12k \equiv 0 \pmod{12}$, the output is the same. The homomorphism is well-defined.

Now consider a counterexample: let $\zeta: \mathbb{Z}_6 \to \mathbb{Z}_{12}$ by $\zeta([x]_6) = [3x]_{12}$.

Take $[1]_6 = [7]_6$ (both are valid names for the same element in $\mathbb{Z}_6$). But:
$$\zeta([1]_6) = [3]_{12}, \quad \zeta([7]_6) = [21]_{12} = [9]_{12}.$$

We get different outputs for the same input, so $\zeta$ is **not well-defined**. It's not a valid function on $\mathbb{Z}_6$.

The lesson: whenever you define a function on equivalence classes, check that the definition depends only on the equivalence class, not on the choice of representative.

>[!idea]
> A homomorphism on a quotient group is well-defined if choosing a different representative of the same equivalence class gives the same output.
