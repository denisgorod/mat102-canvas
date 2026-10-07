---
id: prop-de-morgan
title: "De Morgan's laws"
role: theorem
subject: sets-and-propositions
topic: propositional-logic
statement: "For all propositions P and Q, ¬(P ∧ Q) is logically equivalent to ¬P ∨ ¬Q, and ¬(P ∨ Q) is logically equivalent to ¬P ∧ ¬Q."
depends_on: [prop-truth-tables]
---
>[!t] Theorem (De Morgan's laws)
> For all propositions $P$ and $Q$,
> $$\neg(P \wedge Q) \equiv \neg P \vee \neg Q, \qquad \neg(P \vee Q) \equiv \neg P \wedge \neg Q.$$

>[!p] Proof
> Compute each column over the four assignments from the truth tables of $\wedge$, $\vee$ and $\neg$:
> $$\begin{array}{cc|cc|cc} P&Q&\neg(P\wedge Q)&\neg P\vee\neg Q&\neg(P\vee Q)&\neg P\wedge\neg Q \\ \hline T&T&F&F&F&F \\ T&F&T&T&F&F \\ F&T&T&T&F&F \\ F&F&T&T&T&T \end{array}$$
> Columns 3 and 4 agree in every row, as do columns 5 and 6, so both equivalences hold by the definition of logical equivalence. $\square$

>[!warning] Common error
> $\neg(P \wedge Q)$ is not logically equivalent to $\neg P \wedge \neg Q$: they differ when $P$ is true and $Q$ false. Correctly, for an integer $n$, the negation of "$n$ is even and $n > 2$" is "$n$ is odd or $n \le 2$".
