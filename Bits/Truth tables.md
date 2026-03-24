---
id: truth-tables
title: "Truth tables"
role: bit
group: propositional-logic
curriculum_path: null
learning_objectives: []
children:
  - id: de-morgans-laws
    question: "What happens when I negate an AND or an OR?"
    edge_type: prerequisite
  - id: ex-build-truth-table
    question: "Can I build a truth table for a compound expression?"
    edge_type: prerequisite
  - id: ex-truth-tables-homework
    question: "Can I handle more complex truth tables?"
    edge_type: prerequisite
  - id: ex-logical-equivalence
    question: "When do two different-looking statements say the same thing?"
    edge_type: prerequisite
parents:
  - conjunction-and-disjunction
---

A truth table lists every combination of truth values for the component propositions and computes the result. For AND, OR, and NOT:

| $P$ | $Q$ | $P \wedge Q$ | $P \vee Q$ |
|:---:|:---:|:---:|:---:|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

| $P$ | $\neg P$ |
|:---:|:---:|
| T | F |
| F | T |

Two statements that produce identical truth tables are **logically equivalent**, written $P = Q$. Truth tables let us verify equivalences systematically, without relying on intuition.

>[!idea]
> A truth table exhaustively lists all possible truth combinations; if two expressions always match, they are logically equivalent.
