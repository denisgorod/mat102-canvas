---
id: conjunction-and-disjunction
title: "Conjunction and disjunction"
role: bit
group: propositional-logic
curriculum_path: null
learning_objectives: []
children:
  - id: negation
    question: "What if I want the opposite of a statement?"
    edge_type: prerequisite
  - id: truth-tables
    question: "How do I systematically check all possible truth values?"
    edge_type: prerequisite
  - id: ex-conjunction-disjunction-practice
    question: "Can I evaluate AND/OR/NOT for concrete sets and predicates?"
    edge_type: prerequisite
parents:
  - what-is-a-proposition
---

You can combine propositions using logical operators.

>[!d] Definition
> - The **conjunction** (AND), written $P \wedge Q$, is true when both $P$ and $Q$ are true, and false otherwise.
> - The **disjunction** (OR), written $P \vee Q$, is true when at least one of $P$ or $Q$ is true, and false otherwise.

Note: mathematical OR is *inclusive* — "$P$ or $Q$" is true even when both are true.

Example: let $P(x)$: "$x$ is prime" and $E(y)$: "$y$ is even." Then $E(2) \wedge P(2)$ is true (2 is both even and prime), while $E(3) \wedge P(5)$ is false (3 is not even). Meanwhile $E(3) \vee P(5)$ is true (5 is prime, so at least one holds).

>[!idea]
> AND requires both propositions true; OR requires at least one true; both are operators that combine propositions into larger ones.
