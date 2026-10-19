---
id: sum-induction
title: "Proving summation identities by induction"
role: application
subject: induction
topic: summation-notation
statement: "To prove ∑ₖ₌₁ⁿ aₖ = F(n) for all n ∈ ℤ⁺, check a₁ = F(1) and, peeling off the last term, show F(k) + aₖ₊₁ = F(k + 1); for example ∑ₖ₌₁ⁿ 1/(k(k + 1)) = n/(n + 1)."
depends_on: [ind-principle, sum-sigma]
---
>[!s] Application
> To prove $\sum_{j=1}^{n} a_j = F(n)$ for all $n \in \mathbb{Z}^{+}$, check $a_1 = F(1)$. In the step, peel off the last term and apply the induction hypothesis to the rest:
> $$\sum_{j=1}^{k+1} a_j = \sum_{j=1}^{k} a_j + a_{k+1} = F(k) + a_{k+1}.$$
> It remains to verify the algebraic identity $F(k) + a_{k+1} = F(k+1)$.

>[!e] Worked example
> $\sum_{j=1}^{n} \frac{1}{j(j+1)} = \frac{n}{n+1}$. Base: $\frac{1}{1 \cdot 2} = \frac{1}{2}$. Step: by the hypothesis, the sum to $k + 1$ is
> $$\frac{k}{k+1} + \frac{1}{(k+1)(k+2)} = \frac{k(k+2) + 1}{(k+1)(k+2)} = \frac{(k+1)^2}{(k+1)(k+2)} = \frac{k+1}{k+2}.$$

>[!info] Note (standard sums)
> The same scheme proves $\sum_{j=1}^{n} j = \frac{n(n+1)}{2}$, as $\frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k+2)}{2}$, and $\sum_{j=1}^{n} j^2 = \frac{n(n+1)(2n+1)}{6}$, as $\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \frac{(k+1)(k+2)(2k+3)}{6}$.
