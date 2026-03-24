---
id: negating-existential-quantifier
title: "Negating the existential quantifier"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children: []
parents:
  - negating-universal-quantifier
---

To negate $\exists x,\, P(x)$ — "there is some $x$ satisfying $P$" — you must show it fails for *all* $x$. So $\neg(\exists x,\, P(x)) = \forall x,\, \neg P(x)$. In plain language: "there is no pink horse" means "every horse is not pink."

The pattern is symmetric: negating a quantifier flips $\forall \leftrightarrow \exists$ and negates the inner predicate. For multiply quantified statements, apply the rule one quantifier at a time from left to right.

>[!idea]
> To negate "there exists $x$ such that $P(x)$", flip the quantifier to "for all" and negate the inner predicate: $\neg(\exists x,\, P(x)) = \forall x,\, \neg P(x)$.
