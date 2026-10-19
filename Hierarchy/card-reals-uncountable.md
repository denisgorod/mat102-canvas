---
id: card-reals-uncountable
title: "ℝ is uncountable"
role: theorem
subject: functions
topic: functions-ii
statement: "ℝ is uncountable (|ℕ| < |ℝ|): for r₁, r₂, … in [0, 1] with fixed decimal expansions, s = 0.s₁s₂… with sᵢ = 2 if rᵢ has i-th digit 1, else 1, lies in [0, 1] but is no rᵢ."
depends_on: [card-countable]
---
>[!t] Theorem (Cantor)
> $\mathbb{R}$ is uncountable. Hence, with $\mathbb{N} = \{0,1,2,\dots\} \subseteq \mathbb{R}$, $|\mathbb{N}| < |\mathbb{R}|$.

>[!p] Proof
> Otherwise its subset $[0,1]$ is countable and non-empty, hence the range of a sequence $r_1, r_2, \dots$. Fix one decimal expansion $r_i = 0.d_{i1} d_{i2} d_{i3} \dots$ of each $r_i$ (for $1 = 0.999\dots$). Put $s_i = 2$ if $d_{ii} = 1$, $s_i = 1$ otherwise, and $s = 0.s_1 s_2 s_3 \dots \in [0,1]$. Its digits are all $1$ or $2$, so $s$ has no other decimal expansion (only expansions ending in repeated $0$s or $9$s have a twin); as $s_i \neq d_{ii}$, $s \neq r_i$ for every $i$ — a contradiction. $\square$

>[!warning] Common error
> Listing $\mathbb{Q} \cap [0,1]$ and running the same construction does not show $\mathbb{Q}$ uncountable: it shows only that $s$ is irrational.
