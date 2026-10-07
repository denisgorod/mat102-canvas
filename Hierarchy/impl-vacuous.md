---
id: impl-vacuous
title: "Vacuous truth"
role: theorem
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "If P is false then P ⟹ Q is true whatever Q is; in particular ∀x ∈ ∅, P(x) is true for every predicate P, since no element can fail P."
depends_on: [impl-def, quant-forall]
---
>[!t] Theorem
> Let $P$ and $Q$ be propositions. If $P$ is false, then $P \implies Q$ is true whatever $Q$ is; it is then **vacuously true**. Likewise, $\forall x \in \emptyset,\ P(x)$ is true for every predicate $P(x)$.

>[!p] Proof
> Both rows of the implication truth table with $P$ false give $P \implies Q$ true. By the definition of the universal quantifier, $\forall x \in \emptyset,\ P(x)$ is false only if some $x \in \emptyset$ has $P(x)$ false; $\emptyset$ has no elements, so no such $x$ exists. $\square$

>[!e] Worked example
> "If $1 = 2$ then $5$ is even" is true, as $1 = 2$ is false. For every set $A$, $\emptyset \subseteq A$ says $\forall x \in \emptyset,\ x \in A$, which is true by the theorem. Neither fact is an extra convention: both follow from the definitions.
