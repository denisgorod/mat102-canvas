---
id: universal-quantifier
title: "The universal quantifier"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: proving-quantified-statements
    question: "How do I actually prove a 'for all' statement?"
    edge_type: prerequisite
  - id: quantifiers-turn-predicates-into-propositions
    question: "Why does adding ∀ suddenly give me a true/false statement?"
    edge_type: prerequisite
  - id: doubly-quantified-statements
    question: "What if I need two quantifiers in the same statement?"
    edge_type: prerequisite
  - id: negating-universal-quantifier
    question: "How do I disprove a ∀ statement?"
    edge_type: prerequisite
parents:
  - predicates
---

If you want to say a predicate is true for *every* element of a set, you use the **universal quantifier** $\forall$, read "for all." Given a set $S$ and a predicate $P$, the statement $\forall x \in S,\, P(x)$ is true precisely when $P(x)$ holds for every element $x$ in $S$.

A useful mnemonic: $\forall$ is an upside-down A, for "All."

Example: $\forall x \in \mathbb{Z}^+,\, x^2 \geq 0$ says "every non-negative integer has a non-negative square" — true.

Another example: $\forall x \in \mathbb{Z}^+,\, x > 10$ says "every positive integer is greater than 10" — false, because $x = 1$ is a counterexample.

The key insight is that $\forall$ claims something about *all* members of the set at once. If even one member violates the predicate, the whole statement is false.

>[!idea]
The universal quantifier $\forall x \in S,\, P(x)$ asserts that $P(x)$ holds for every element of $S$.
