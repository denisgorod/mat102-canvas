---
id: impl-negation
title: "Negating an implication"
role: theorem
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "¬(P ⟹ Q) is logically equivalent to P ∧ ¬Q, so ¬(∀x ∈ S, P(x) ⟹ Q(x)) is equivalent to ∃x ∈ S, P(x) ∧ ¬Q(x): a universal implication is refuted by one counterexample."
depends_on: [impl-def, quant-negation]
---
>[!t] Theorem
> For propositions $P$, $Q$, $\neg(P \implies Q) \equiv P \wedge \neg Q$. Hence, for predicates on a set $S$,
> $$\neg\big(\forall x\in S,\ P(x) \implies Q(x)\big) \equiv \exists x\in S,\ P(x) \wedge \neg Q(x):$$
> one counterexample refutes a universal implication.

>[!p] Proof
> $\neg(P \implies Q)$ is true exactly when $P$ is true and $Q$ false (definition of implication), as is $P \wedge \neg Q$ (definitions of $\wedge$, $\neg$). Negating $\forall$ gives $\exists x\in S,\ \neg(P(x) \implies Q(x))$; apply the first part at each $x$. $\square$

>[!e] Worked example
> Over animals, "every duck likes peanut butter" is $\forall x,\ D(x) \implies L(x)$; its negation is $\exists x,\ D(x) \wedge \neg L(x)$: some duck does not. Neither $\neg P \implies \neg Q$ nor $P \implies \neg Q$ is equivalent to it: both hold when $P$, $Q$ are false, where it fails.
