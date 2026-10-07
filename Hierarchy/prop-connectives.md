---
id: prop-connectives
title: "Conjunction, disjunction and negation"
role: definition
subject: sets-and-propositions
topic: propositional-logic
statement: "For propositions P and Q, the conjunction P ∧ Q is true exactly when both are true, the disjunction P ∨ Q exactly when at least one is true (inclusive or), and the negation ¬P exactly when P is false."
depends_on: [prop-proposition]
---
>[!d] Definition
> For propositions $P$ and $Q$, the **conjunction** $P \wedge Q$ ("$P$ and $Q$"), the **disjunction** $P \vee Q$ ("$P$ or $Q$") and the **negation** $\neg P$ ("not $P$") are defined by
> $$\begin{array}{cc|cc} P&Q&P\wedge Q&P\vee Q \\ \hline T&T&T&T \\ T&F&F&T \\ F&T&F&T \\ F&F&F&F \end{array} \qquad \begin{array}{c|c} P&\neg P \\ \hline T&F \\ F&T \end{array}$$

>[!info] Note (inclusive or)
> Mathematical "or" is **inclusive**: $P \vee Q$ is true exactly when at least one of $P$, $Q$ is true, including when both are. English "pizza or Thai food" often excludes both; mathematics never intends that exclusive reading unless it says so.

>[!e] Worked example
> With $E(n)$: "$n$ is even" and $P(n)$: "$n$ is prime", $E(2) \wedge P(2)$ is true; $E(3) \wedge P(5)$ is false, as $E(3)$ is false; $E(3) \vee P(5)$ is true, as $P(5)$ is true.
