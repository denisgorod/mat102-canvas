---
id: impl-iff
title: "If and only if"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "P ⟺ Q ('P if and only if Q') means (P ⟹ Q) ∧ (Q ⟹ P); it is true exactly when P and Q have the same truth value, so proving it requires proving both directions."
depends_on: [impl-converse]
---
>[!d] Definition
> For propositions $P$ and $Q$, the **biconditional** $P \iff Q$ ("$P$ if and only if $Q$", "$P$ iff $Q$") is $(P \implies Q) \wedge (Q \implies P)$. By the definition of implication its conjuncts fail only when $(P,Q)$ is $(\mathrm{T},\mathrm{F})$ and $(\mathrm{F},\mathrm{T})$ respectively, so $P \iff Q$ is true exactly when $P$ and $Q$ have the same truth value.

>[!info] Note
> A proof of $P \iff Q$ has two parts: ($\Rightarrow$) $P \implies Q$; ($\Leftarrow$) $Q \implies P$. Propositions $A$, $B$ are logically equivalent exactly when $A \iff B$ is true in every row of their truth table.

>[!e] Worked example
> For $n \in \mathbb{Z}$: $n$ is even $\iff n/2 \in \mathbb{Z}$. ($\Rightarrow$) $n = 2m$ with $m \in \mathbb{Z}$ gives $n/2 = m \in \mathbb{Z}$. ($\Leftarrow$) $n/2 = m \in \mathbb{Z}$ gives $n = 2m$, so $n$ is even.
