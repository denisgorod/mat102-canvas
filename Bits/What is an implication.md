---
id: what-is-an-implication
title: "What is an implication?"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: vacuous-truth
    question: "Why is 'if pigs fly then the sky is black' true?"
    edge_type: prerequisite
  - id: converse-of-an-implication
    question: "If P implies Q, does Q imply P?"
    edge_type: prerequisite
  - id: contrapositive-of-an-implication
    question: "Is there another statement always equivalent to P ⟹ Q?"
    edge_type: prerequisite
  - id: negating-an-implication
    question: "What is the negation of 'if P then Q'?"
    edge_type: prerequisite
  - id: math-vs-english-implication
    question: "Does 'if-then' in English work the same as in math?"
    edge_type: prerequisite
  - id: if-and-only-if
    question: "What does it mean for two statements to imply each other?"
    edge_type: prerequisite
  - id: principle-of-induction
    question: "How can a chain of implications prove something for all integers?"
    edge_type: prerequisite
parents:
  - hypothesis-and-conclusion
  - truth-tables
---

At the core of mathematical statements are **implications**: "if $P$ then $Q$," written $P \Longrightarrow Q$. The truth table:

| $P$ | $Q$ | $P \Longrightarrow Q$ |
|:---:|:---:|:---:|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

The only way an implication is false is when $P$ is true and $Q$ is false. If the hypothesis $P$ is false, the implication is automatically true — these bottom two rows are called **vacuous truths**. For example, "if pigs can fly, then the sky is black" is technically true, because the hypothesis is never satisfied.

>[!idea]
> An implication $P \Longrightarrow Q$ is false only when $P$ is true and $Q$ is false. When $P$ is false, the implication is automatically true.
