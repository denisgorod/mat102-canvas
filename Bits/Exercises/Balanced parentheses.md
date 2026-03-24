---
id: ex-balanced-parentheses
title: "Balanced parentheses in logical formulas"
role: exercise
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - structural-induction-example-divisibility
---

Logical formulas are defined recursively:
- **Basis**: $T$ (true), $F$ (false), and any proposition $R$ are valid formulas.
- **Constructors**: If $P$ and $Q$ are valid formulas, then $(\neg P)$, $(P \wedge Q)$, $(P \vee Q)$, $(P \Rightarrow Q)$, and $(P \Leftrightarrow Q)$ are valid formulas.

Show by structural induction that every valid formula contains an equal number of left and right parentheses.

Verify the base case for $T$, $F$, and atomic propositions (zero left, zero right). For the inductive step, assume $P$ (and $Q$, if needed) have equal left and right parentheses. Show that each constructor adds matching pairs of parentheses.

>[!question] Exercise
>Prove by structural induction that every valid logical formula has an equal number of left and right parentheses.
