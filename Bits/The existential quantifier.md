---
id: existential-quantifier
title: "The existential quantifier"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: proving-quantified-statements
    question: "How do I prove that something exists?"
    edge_type: prerequisite
  - id: quantifiers-turn-predicates-into-propositions
    question: "Does ∃ also turn a predicate into a proposition?"
    edge_type: prerequisite
  - id: doubly-quantified-statements
    question: "Can I have multiple ∃ in one statement?"
    edge_type: prerequisite
parents:
  - predicates
---

If you want to say at least one element of a set makes a predicate true, use the **existential quantifier** $\exists$, read "there exists." The statement $\exists x \in S,\, P(x)$ is true as long as one (or more) elements of $S$ make $P(x)$ true.

Mnemonic: $\exists$ is a backwards E, for "Exists."

Example: $\exists x \in \mathbb{Z}^+,\, x > 10$ says "there is a positive integer greater than 10" — true, since $x = 100$ works.

Another example: $\exists x \in \mathbb{Z}^+,\, x = -5$ says "there is a positive integer equal to $-5$" — false, because no positive integer is negative.

The key difference from $\forall$: you only need *one* witness. As soon as you find a single element that satisfies the predicate, the existential statement is true. You don't have to check all of them.

Think of $\exists$ as the statement "there is at least one." That "at least one" might be unique, or there might be many — the $\exists$ statement doesn't care. It's true as long as the count is not zero.

>[!idea]
> The existential quantifier $\exists x \in S,\, P(x)$ asserts that at least one element of $S$ satisfies $P(x)$.
