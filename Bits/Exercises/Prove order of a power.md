---
id: ex-prove-order-of-power
title: "Prove the order-of-a-power formula"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - order-of-a-power
---

You've learned that if an element $g$ has finite order $n$, then raising it to a power changes its order in a predictable way: $|g^k| = \frac{n}{\gcd(n,k)}$.

This is a deep formula, and its proof combines several ideas from number theory.

To prove it, start by figuring out what the smallest positive integer $m$ is such that $(g^k)^m = e$. You need $(g^k)^m = g^{km} = e$, which means $n | km$. Rearrange this to get a condition on $m$ in terms of $n$, $k$, and their gcd. Use the Division Algorithm and properties of the gcd to pin down the smallest such $m$.

This is challenging—don't be discouraged if you need to work through it carefully.

>[!question] Exercise
> If $g$ has order $n$, prove that $|g^k| = \frac{n}{\gcd(n,k)}$ for all $k \in \mathbb{Z}$.
