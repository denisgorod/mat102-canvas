---
id: negating-universal-quantifier
title: "Negating the universal quantifier"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: negating-existential-quantifier
    question: "What about negating 'there exists'?"
    edge_type: prerequisite
  - id: math-vs-english-not
    question: "Does 'not' work the same way in math as in English?"
    edge_type: prerequisite
parents:
  - negation
  - universal-quantifier
---

To negate $\forall x,\, P(x)$ — "every $x$ satisfies $P$" — you need to show it fails for at least one $x$. So $\neg(\forall x,\, P(x)) = \exists x,\, \neg P(x)$. In plain language: "not every horse is black" means "there exists a non-black horse."

Example: $\forall x \in \mathbb{R},\, x < x^2$ is false. The negation is $\exists x \in \mathbb{R},\, x \geq x^2$. Indeed, $x = 1/2$ gives $x^2 = 1/4 < 1/2 = x$, confirming the negation. The counterexample satisfies the negated statement, as expected.

>[!idea]
> To negate "for all $x$, $P(x)$", you flip the quantifier to "there exists" and negate the inner predicate: $\neg(\forall x,\, P(x)) = \exists x,\, \neg P(x)$.
