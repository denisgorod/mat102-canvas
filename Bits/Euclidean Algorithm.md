---
id: euclidean-algorithm
title: "Euclidean Algorithm"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: bezouts-identity
    question: "Can I unwind the algorithm to express gcd as a combination of a and b?"
    edge_type: prerequisite
  - id: ex-compute-gcds
    question: "Can I practice computing gcds with the Euclidean Algorithm?"
    edge_type: prerequisite
parents:
  - gcd-respects-remainders
---

We now know that the gcd is unchanged by remainder operations. So here's an idea: repeatedly apply the Division Algorithm, each time replacing the pair $(a, b)$ with $(b, r)$ where $r$ is the remainder. Eventually the remainder must reach zero (since remainders form a strictly decreasing sequence of nonnegative integers), and that's where the gcd is hiding.

>[!t] Theorem: Euclidean Algorithm
>
>Let $a, b \in \mathbb{Z}$ with $b \neq 0$ and suppose $b \nmid a$. Perform the following steps:
>$$\begin{align}
>a &= q_1 b + r_1 \quad &0 < r_1 < |b| \\
>b &= q_2 r_1 + r_2 \quad &0 < r_2 < r_1 \\
>r_1 &= q_3 r_2 + r_3 \quad &0 < r_3 < r_2 \\
>&\vdots \\
>r_{n-1} &= q_{n+1} r_n + 0 &
>\end{align}$$
>
>This algorithm terminates in finitely many steps, and $\gcd(a, b) = r_n$ (the last nonzero remainder).

The proof is immediate: remainders form a strictly decreasing sequence of nonnegative integers, so they must reach zero. By repeatedly applying the invariant $\gcd(a, b) = \gcd(b, r)$, we get
$$\gcd(a, b) = \gcd(b, r_1) = \gcd(r_1, r_2) = \cdots = \gcd(r_{n-1}, r_n) = \gcd(r_n, 0) = r_n.$$

Let's compute $\gcd(616, 427)$:
$$\begin{align}
616 &= 427 \cdot 1 + 189 \\
427 &= 189 \cdot 2 + 49 \\
189 &= 49 \cdot 3 + 42 \\
49 &= 42 \cdot 1 + 7 \\
42 &= 7 \cdot 6 + 0
\end{align}$$

So $\gcd(616, 427) = 7$. Instead of finding all divisors and comparing, we've reduced the problem to a sequence of divisions.

>[!idea]
>
>The Euclidean Algorithm repeatedly applies the Division Algorithm to shrink the numbers, using the gcd-invariance to show that the last nonzero remainder is the gcd.
