---
id: impl-contrapositive
title: "Contrapositive of an implication"
role: theorem
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "For propositions P and Q, the contrapositive ¬Q ⟹ ¬P of P ⟹ Q is logically equivalent to it: the two have the same truth value in every case."
depends_on: [impl-def]
---
>[!t] Theorem
> For propositions $P$ and $Q$, the **contrapositive** of $P \implies Q$ is $\neg Q \implies \neg P$, and they are logically equivalent:
> $$(P \implies Q) \equiv (\neg Q \implies \neg P).$$

>[!p] Proof
> By the definitions of implication and negation, $\neg Q \implies \neg P$ is false only when $\neg Q$ is true and $\neg P$ false, i.e. when $P$ is true and $Q$ false: the only false row of $P \implies Q$. So the truth tables agree in every row. $\square$

>[!e] Worked example
> "If $x$ is a dog then $x$ is an animal" has contrapositive "if $x$ is not an animal then $x$ is not a dog". Negating without swapping fails: $\neg P \implies \neg Q$ is false when $P$ is false and $Q$ true, while $P \implies Q$ is true. This licenses proof by contrapositive.
