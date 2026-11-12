---
id: ex-generated-by-power-equals-gcd
title: "⟨a^k⟩ = ⟨a^{gcd(k,n)}⟩"
role: exercise
group: cyclic-groups
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cyclic-subgroup-is-subgroup
---

When you raise an element to a power and generate a cyclic subgroup, the subgroup you get depends on the gcd of the exponent and the element's order.

**Concrete example:** In $\mathbb{Z}_{12}$, written additively so that the power $a^k$ is $ka$, let $a = 1$, which has order 12, and take $k = 8$. Then $\langle 8 \cdot 1 \rangle = \langle 8 \rangle = \{0, 8, 4\}$, the multiples of 8 modulo 12. Since $\gcd(8, 12) = 4$, the formula predicts $\langle 8 \rangle = \langle 4 \rangle$; indeed $\langle 4 \rangle = \{0, 4, 8\}$, the same subgroup, of order $12/4 = 3$.

**General statement:** If $a$ has order $n$, then $\langle a^k \rangle = \langle a^{\gcd(k,n)} \rangle$.

Prove this by showing two-way inclusion. First show $\langle a^k \rangle \subseteq \langle a^{d} \rangle$ where $d = \gcd(k, n)$ (use Bézout's identity). Then show $\langle a^d \rangle \subseteq \langle a^k \rangle$.

>[!question] Exercise
> Let $G$ be a group, $a \in G$ with $|a| = n$, and $k \in \mathbb{Z}^+$. Show that $\langle a^k \rangle = \langle a^{\gcd(k,n)} \rangle$.
