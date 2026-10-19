---
id: sind-postage
title: "Postage with 3¢ and 5¢ stamps"
role: application
subject: induction
topic: strong-induction
statement: "Every integer n ≥ 8 is 3a + 5b with a, b ∈ ℤ*: 8 = 3 + 5, 9 = 3·3, 10 = 2·5, and k + 1 = (k − 2) + 3 for k ≥ 10."
depends_on: [sind-principle]
---
>[!t] Theorem
> Every integer $n \ge 8$ is $3a+5b$ with $a, b \in \mathbb{Z}^{*}$. The bound is sharp: $7 = 3a+5b$ forces $b\le 1$, yet $3 \nmid 7-5b$ for $b \in \{0,1\}$.

>[!p] Proof
> Let $P(n)$ be the claim for $n$. Base cases: $8 = 3+5$, $9 = 3\cdot 3$, $10 = 5\cdot 2$. Step: let $k\ge 10$ and assume $P(8) \wedge \cdots \wedge P(k)$. As $8\le k-2\le k$, $P(k-2)$ gives $k-2 = 3a+5b$, so $k+1 = 3(a+1)+5b$. Strong induction with $n_0=8$, $n_1=10$ gives $P(n)$ for all $n\ge 8$. $\square$

>[!warning] Common error
> The hypothesis is $P(8) \wedge \cdots \wedge P(k)$, not $P(1) \wedge \cdots \wedge P(k)$: $P(1)$, $P(2)$, $P(4)$, $P(7)$ are false. Nor is strong induction necessary: from $k = 3a+5b\ge 8$, take $k+1 = 3(a+2)+5(b-1)$ if $b\ge 1$; if $b = 0$, then $a\ge 3$ and $k+1 = 3(a-3)+5\cdot 2$.
