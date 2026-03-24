---
id: contrapositive-of-an-implication
title: "Contrapositive of an implication"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: proof-by-contrapositive
    question: "Can I use the contrapositive to prove theorems?"
    edge_type: prerequisite
parents:
  - what-is-an-implication
---

>[!d] Definition
> The **contrapositive** of $P \Longrightarrow Q$ is the statement $\neg Q \Longrightarrow \neg P$.

Unlike the converse, the contrapositive is **always logically equivalent** to the original. You can verify this by truth table: $P \Longrightarrow Q$ and $\neg Q \Longrightarrow \neg P$ have identical truth values in every row.

Example: "All dogs are animals" is equivalent to "If it's not an animal, it's not a dog." Both are true for the same reason. This equivalence gives us a powerful proof technique: to prove $P \Longrightarrow Q$, we can instead prove $\neg Q \Longrightarrow \neg P$.

>[!idea]
> The contrapositive $\neg Q \Longrightarrow \neg P$ is always logically equivalent to the original implication $P \Longrightarrow Q$.
