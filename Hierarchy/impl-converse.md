---
id: impl-converse
title: "Converse of an implication"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "The converse of P ⟹ Q is Q ⟹ P; it is not logically equivalent to P ⟹ Q, so a true implication can have a false converse."
depends_on: [impl-def]
---
>[!d] Definition
> The **converse** of $P \implies Q$ is $Q \implies P$. The two are not logically equivalent: with $P$ false and $Q$ true, $P \implies Q$ is true and $Q \implies P$ false. A true implication can thus have a false converse.

>[!e] Worked example
> For $x \in \mathbb{R}$, "if $x = 2$ then $x^2 = 4$" always holds. Its converse "if $x^2 = 4$ then $x = 2$" fails at $x = -2$.

>[!info] Note (Math vs English)
> "If you do the dishes, you can go out" states $D \implies O$ but also means the **inverse** $\neg D \implies \neg O$, which is logically equivalent to the converse $O \implies D$: each is false only when $O$ is true and $D$ false. Such an everyday "if" claims both directions and suggests causation; a mathematical "if" asserts neither.
