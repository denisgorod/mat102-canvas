---
id: de-morgans-laws
title: "De Morgan's laws"
role: bit
group: propositional-logic
curriculum_path: null
learning_objectives: []
children:
  - id: ex-negate-conjunction
    question: "Can I discover the negation rule for OR myself?"
    edge_type: prerequisite
parents:
  - truth-tables
  - negation
---

What happens when you negate a conjunction or disjunction? De Morgan's laws give the answer.

>[!s] Proposition (De Morgan's Laws)
> If $P$ and $Q$ are propositions, then:
> $$\neg(P \wedge Q) = \neg P \vee \neg Q$$
> $$\neg(P \vee Q) = \neg P \wedge \neg Q$$

In words: negation flips AND to OR (and vice versa) and negates each part. You can verify the first law by truth table:

| $P$ | $Q$ | $P \wedge Q$ | $\neg(P \wedge Q)$ | $\neg P$ | $\neg Q$ | $\neg P \vee \neg Q$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | F | F | F |
| T | F | F | T | F | T | T |
| F | T | F | T | T | F | T |
| F | F | F | T | T | T | T |

The last two columns match, confirming the equivalence.

>[!idea]
> Negating a conjunction flips it to disjunction and negates each part; negating a disjunction does the reverse.
