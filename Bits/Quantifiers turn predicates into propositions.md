---
id: quantifiers-turn-predicates-into-propositions
title: "Quantifiers turn predicates into propositions"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children: []
parents:
  - universal-quantifier
  - existential-quantifier
---

Recall that a predicate $P(x)$ has no truth value on its own — its truth depends on what you plug in for $x$. For instance, "$x$ is an even number" is neither true nor false until you choose $x$.

Attaching a quantifier over a set changes this. The statement $\forall x \in S,\, P(x)$ is now unambiguously true or false — it's a proposition. Likewise $\exists x \in S,\, P(x)$ is a proposition.

This is how we go from "open" statements (predicates) to "closed" ones (propositions). The quantifiers bind the free variable and seal it up.

Examples of propositions formed this way:
- "Every cow has a favourite radio station." (Proposes a fact about all cows.)
- "There is a black horse." (Proposes the existence of at least one black horse.)
- "In every sport, there exists someone who breaks the rules." (Quantifies over sports; for each sport, claims existence of a rulebreaker.)

Once you have a closed proposition, you can ask: is it true or false? You can try to prove it or disprove it. With a bare predicate, that question doesn't make sense.

>[!idea]
A quantifier closes an open predicate by binding its free variable, turning it into a proposition with a definite truth value.
