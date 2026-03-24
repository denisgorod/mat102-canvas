---
id: gcd-respects-remainders
title: "GCD respects remainders"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: euclidean-algorithm
    question: "What if I apply the gcd-remainder trick repeatedly?"
    edge_type: prerequisite
  - id: ex-gcd-linear-combo
    question: "Can I apply the gcd-invariance principle to more general linear combinations?"
    edge_type: prerequisite
parents:
  - gcd-definition
---

Here's a remarkably useful fact: if you divide $a$ by $b$ to get $a = qb + r$, then $\gcd(a, b) = \gcd(b, r)$. The gcd doesn't change when you replace $a$ with its remainder.

>[!s] Proposition
>
>Let $a, b, q, r \in \mathbb{Z}$ be such that $a = bq + r$. Then
>$$\gcd(a, b) = \gcd(b, r).$$

Why is this true? Write $r = a - qb$. Any divisor of both $a$ and $b$ must divide their linear combination $a - qb = r$ (by our divisibility properties). So the common divisors of $(a, b)$ and the common divisors of $(b, r)$ are the same set—hence they have the same maximum element.

>[!p] Proof
>
>Suppose $d = \gcd(a, b)$. Since $d \mid a$ and $d \mid b$, Proposition 3(ii) gives $d \mid (a - qb) = r$. So $d$ divides both $b$ and $r$.
>
>Conversely, if $c$ is any common divisor of $b$ and $r$, then $c \mid (qb + r) = a$. So $c$ is a common divisor of $a$ and $b$, meaning $c \mid d$. Thus $d \geq |c|$.
>
>This shows $d$ is the greatest common divisor of $b$ and $r$.

The magic here is that we've *replaced a potentially large number $a$ with a much smaller remainder $r$*. As long as $0 \leq r < |b|$, we've made progress toward a gcd that's easier to compute.

>[!idea]
>
>The gcd is invariant under the division operation: $\gcd(a, b) = \gcd(b, r)$ whenever $a = qb + r$, which lets us replace large numbers with smaller remainders.
