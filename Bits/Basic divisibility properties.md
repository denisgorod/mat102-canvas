---
id: basic-divisibility-properties
title: "Basic divisibility properties"
role: bit
group: divisibility
curriculum_path: null
learning_objectives: []
children:
  - id: well-ordering-principle
    question: "What foundational property of Z⁺ helps prove deeper results?"
    edge_type: prerequisite
  - id: ex-prove-divisibility-iii-v
    question: "Can I prove the remaining properties myself?"
    edge_type: prerequisite
  - id: ex-divisibility-cancel-product
    question: "Can I prove divisibility identities involving products and cancellation?"
    edge_type: prerequisite
  - id: ex-gcd-linear-combo
    question: "Can I apply divisibility properties to simplify a gcd expression?"
    edge_type: prerequisite
parents:
  - divisibility-definition
---

Now that we have the definition of divisibility, let's explore what happens when we combine it with other divisibility facts. These properties are the building blocks for everything that follows.

>[!s] Proposition
>
>Suppose that $a, b, c$ are integers.
>
>i. **(Transitivity)** If $a \mid b$ and $b \mid c$, then $a \mid c$.
>
>ii. **(Linear combination)** If $a \mid b$ and $a \mid c$, then for any $m, n \in \mathbb{Z}$ we have $a \mid (mb + nc)$.
>
>iii. **(Subtraction)** If $a \mid b$ and $a \mid (b+c)$, then $a \mid c$.
>
>iv. **(Antisymmetry)** If $a \mid b$ and $b \mid a$, then $a = \pm b$.
>
>v. **(Size bound)** If $b$ is nonzero and $a \mid b$, then $|a| \leq |b|$.

Let's prove (i) and (ii); the others are yours to work through.

>[!p] Proof (i)
>
>Given that $a \mid b$ and $b \mid c$, we know there exist integers $m, n$ such that $b = ma$ and $c = nb$. Thus:
>$$c = nb = n(ma) = (nm)a$$
>Since $nm$ is an integer, we have $a \mid c$.

>[!p] Proof (ii)
>
>Since $a \mid b$ and $a \mid c$, let $k_1, k_2 \in \mathbb{Z}$ such that $b = k_1 a$ and $c = k_2 a$. For any integers $m, n$:
>$$mb + nc = m(k_1 a) + n(k_2 a) = (mk_1 + nk_2)a$$
>Since $mk_1 + nk_2$ is an integer, we have $a \mid (mb + nc)$.

Property (ii) is especially powerful: if $a$ divides two numbers, then it divides any "linear combination" of them. This will be crucial later when we study the greatest common divisor.

>[!idea]
>
>These five properties show that divisibility is transitive, plays nicely with linear combinations, and obeys an antisymmetry rule—they make divisibility a partial order on the positive integers.
