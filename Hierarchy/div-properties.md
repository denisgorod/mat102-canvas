---
id: div-properties
title: "Basic properties of divisibility"
role: theorem
subject: number-theory
topic: divisibility
statement: "Divisibility is transitive, and if a ∣ b and a ∣ c then a ∣ (bx + cy) for all x, y ∈ ℤ."
depends_on: [div-def]
---
>[!t] Theorem
> Let $a, b, c \in \mathbb{Z}$.
> - **Transitivity:** if $a \mid b$ and $b \mid c$, then $a \mid c$.
> - **Linearity:** if $a \mid b$ and $a \mid c$, then $a \mid (bx + cy)$ for all $x, y \in \mathbb{Z}$.

>[!p] Proof
> Transitivity: write $b = ak$, $c = b\ell$; then $c = a(k\ell)$, so $a \mid c$. Linearity: write $b = ak_1$, $c = ak_2$; then
> $$bx + cy = a(k_1x + k_2y),$$
> so $a \mid (bx + cy)$. $\square$

>[!info] Note
> Linearity is the workhorse behind Bézout's identity and the Euclidean algorithm: any common divisor of $b$ and $c$ divides every combination $bx + cy$, and $\gcd(b, c)$ is one such combination.
