---
id: negating-an-implication
title: "Negating an implication"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: proof-by-contradiction
    question: "Can I use negation to prove a statement is true?"
    edge_type: prerequisite
parents:
  - what-is-an-implication
---

A counterexample to $P \Longrightarrow Q$ is an $x$ where $P(x)$ is true but $Q(x)$ is false. This is exactly the negation:

>[!s] Proposition
> The negation of $P \Longrightarrow Q$ is $P \wedge \neg Q$.

You can verify this by truth table: $\neg(P \Longrightarrow Q)$ and $P \wedge \neg Q$ have identical truth tables.

Example: the negation of "If $x$ is a duck, then $x$ likes peanut butter" is "$x$ is a duck *and* $x$ does not like peanut butter."

>[!idea]
> To disprove an implication, you need a single case where the hypothesis is true but the conclusion is false — a counterexample.
