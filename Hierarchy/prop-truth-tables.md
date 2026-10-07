---
id: prop-truth-tables
title: "Truth tables and logical equivalence"
role: definition
subject: sets-and-propositions
topic: propositional-logic
statement: "A truth table lists the truth value of a compound proposition under each of the 2ⁿ assignments of T/F to its n component propositions; two compound propositions are logically equivalent when their truth tables agree in every row."
depends_on: [prop-connectives]
---
>[!d] Definition
> A **truth table** for a compound proposition built from components $P_1, \dots, P_n$ has one row for each of the $2^n$ assignments of T/F to the components, with columns computed from the innermost subexpressions outward. Propositions $A$ and $B$ are **logically equivalent**, written $A \equiv B$, when in a truth table over all their components the columns of $A$ and $B$ agree in every row.

>[!e] Worked example
> $P \wedge (P \vee Q) \equiv P$, although $Q$ occurs only on the left:
> $$\begin{array}{cc|c|c} P&Q&P\vee Q&P\wedge(P\vee Q) \\ \hline T&T&T&T \\ T&F&T&T \\ F&T&T&F \\ F&F&F&F \end{array}$$
> The last column equals the $P$ column in all four rows.

>[!info] Note
> $A \equiv B$ is a claim about two propositions, not a connective (course notes also write $A = B$). Logically equivalent propositions may replace each other in any argument.
