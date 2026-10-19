---
id: impl-def
title: "Implication"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "For propositions P and Q, the implication P ⟹ Q ('if P then Q', with hypothesis P and conclusion Q) is false when P is true and Q is false, and true in the other three cases."
depends_on: [read-hypothesis-conclusion, prop-truth-tables]
---
>[!d] Definition
> For propositions $P$ and $Q$, the **implication** $P \implies Q$, read "if $P$ then $Q$" or "$P$ implies $Q$", has hypothesis $P$, conclusion $Q$ and truth table
> $$\begin{array}{cc|c} P & Q & P \implies Q \\ \hline \mathrm{T}&\mathrm{T}&\mathrm{T} \\ \mathrm{T}&\mathrm{F}&\mathrm{F} \\ \mathrm{F}&\mathrm{T}&\mathrm{T} \\ \mathrm{F}&\mathrm{F}&\mathrm{T} \end{array}$$

>[!info] Note (one false row)
> $P \implies Q$ is false only when $P$ is true and $Q$ is false. Its truth value depends on nothing but those of $P$ and $Q$: no causal link between them is asserted.

>[!e] Worked example
> "If $2$ is even then $9$ is prime" is false: true hypothesis, false conclusion. "If $9$ is even then $9$ is prime" is true, since its hypothesis is false. "If $2$ is even then $3$ is prime" is true, though neither fact explains the other.
