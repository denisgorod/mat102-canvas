---
id: sum-sigma
title: "Sigma notation"
role: definition
subject: induction
topic: summation-notation
statement: "For integers n ≤ m, ∑ᵢ₌ₙᵐ rᵢ = rₙ + rₙ₊₁ + ⋯ + rₘ, with dummy index i, bounds n and m, and summand rᵢ; recursively, ∑ᵢ₌ₙⁿ rᵢ = rₙ and ∑ᵢ₌ₙᵐ⁺¹ rᵢ = ∑ᵢ₌ₙᵐ rᵢ + rₘ₊₁."
depends_on: []
---
>[!d] Definition
> For integers $n \le m$,
> $$\sum_{i=n}^{m} r_i = r_n + r_{n+1} + \cdots + r_m .$$
> Here $i$ is the **summation index** (a dummy variable), $n$ and $m$ are the **bounds**, and $r_i$ is the **summand**. Recursively, $\sum_{i=n}^{n} r_i = r_n$ and $\sum_{i=n}^{m+1} r_i = \sum_{i=n}^{m} r_i + r_{m+1}$.

>[!e] Worked example
> $\sum_{i=1}^{5} i^2 = 1 + 4 + 9 + 16 + 25 = 55$. Renaming the index changes nothing: $\sum_{k=1}^{5} k^2 = 55$ as well, and $i$ has no meaning outside the sum.

>[!info] Note (loop reading and empty sums)
> The sum is a for-loop: start with $s = 0$ and, for $i = n, n+1, \dots, m$ in turn, replace $s$ by $s + r_i$. If $m < n$ the loop never runs, so by convention this **empty sum** equals $0$.
