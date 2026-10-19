---
id: ind-proof-format
title: "Writing a proof by induction"
role: application
subject: induction
topic: mathematical-induction
statement: "To prove P(n) for all n ∈ ℤ⁺, verify P(1), assume P(k) for arbitrary k and derive P(k + 1); e.g. 5 ∣ 6ⁿ − 1, since 6ᵏ − 1 = 5d gives 6ᵏ⁺¹ − 1 = 5(6ᵏ + d)."
depends_on: [ind-principle, div-def]
---
>[!s] Application
> State $P(n)$. **Base case:** verify $P(1)$. **Induction step:** fix an arbitrary $k \in \mathbb{Z}^{+}$, assume $P(k)$ and derive $P(k+1)$, marking where $P(k)$ is used. Induction then gives $P(n)$ for all $n$. Deducing a true statement from $P(k+1)$ proves nothing unless every step reverses.

>[!e] Worked example
> $5 \mid 6^n-1$ for all $n \in \mathbb{Z}^{+}$. Base: $6^1-1 = 5\cdot 1$. Step: assume $6^k-1 = 5d$ with $d \in \mathbb{Z}$. As $6 = 1+5$, the hypothesis gives
> $$6^{k+1}-1 = 5\cdot 6^k + (6^k-1) = 5(6^k+d).$$

>[!info] Note (non-numeric statements)
> $P(n)$ need not be a formula: a $2^n\times 2^n$ board minus any one square is tiled by L-trominoes. For $n=1$ the rest is one L. For $k+1$, quarter the board, put one L at the centre covering a square of each hole-free quadrant, and tile the quadrants by the hypothesis.
