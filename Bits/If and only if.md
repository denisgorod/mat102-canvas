---
id: if-and-only-if
title: "If and only if"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: necessary-and-sufficient-conditions
    question: "What do 'necessary' and 'sufficient' mean precisely?"
    edge_type: prerequisite
parents:
  - converse-of-an-implication
  - what-is-an-implication
---

When both $P \Longrightarrow Q$ and $Q \Longrightarrow P$ are true, we write $P \Longleftrightarrow Q$ and say "$P$ if and only if $Q$" (often abbreviated "iff"). This means the two statements are logically equivalent — they are always simultaneously true or simultaneously false.

To prove an iff statement, you must prove **both directions** separately: first show $P \Longrightarrow Q$, then show $Q \Longrightarrow P$.

Some examples: an integer $n$ is even if and only if $n/2$ is an integer. An integer $n$ is divisible by 10 if and only if its ones digit is 0. A triangle is isosceles if and only if at least two of its angles are equal.

>[!idea]
> $P \Longleftrightarrow Q$ means both implications $P \Longrightarrow Q$ and $Q \Longrightarrow P$ are true, so you must prove both directions separately.
