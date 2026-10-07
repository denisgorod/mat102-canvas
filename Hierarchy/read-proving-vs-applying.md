---
id: read-proving-vs-applying
title: "Proving vs applying a theorem"
role: objective
subject: reading-mathematics
topic: reading-mathematics
statement: "To prove a result, assume its hypothesis and derive its conclusion, without asking whether the hypothesis holds for anything; to apply it, first verify its hypothesis for the particular objects at hand, and only then assert the conclusion for them."
depends_on: [read-proof]
---
>[!s] Method
> For a result "if $H$, then $C$":
> - **Proving:** assume $H$ for arbitrary objects and derive $C$; whether anything satisfies $H$ is irrelevant.
> - **Applying:** for given objects, first verify $H$, then assert $C$ for them.
>
> Proving treats $H$ as an assumption; applying establishes it as a fact.

>[!e] Worked example
> Result: if $n$ is an even integer, then $n^2$ is even. *Proving:* assume $n = 2k$ with $k \in \mathbb{Z}$; then $n^2 = 2(2k^2)$ with $2k^2 \in \mathbb{Z}$, so $n^2$ is even. *Applying to $6$:* $6 = 2 \cdot 3$ is even, so $6^2 = 36$ is even.

>[!warning] Common error
> In a proof, asking whether the assumed "$n$ is even" is really true. In an application, asserting $C$ without verifying $H$: the result says nothing about $7^2$, since $7$ is not even.
