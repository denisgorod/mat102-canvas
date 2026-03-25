---
id: doubly-quantified-statements
title: "Doubly quantified statements"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: quantifier-order-matters
    question: "Does the order of different quantifiers matter?"
    edge_type: prerequisite
parents:
  - universal-quantifier
  - existential-quantifier
---

Some statements need more than one quantifier. You can freely swap adjacent quantifiers of the *same* type:
$$\forall x \in \mathbb{Q},\, \forall y \in \mathbb{Q},\, x+y \in \mathbb{Q}$$
is equivalent to
$$\forall y \in \mathbb{Q},\, \forall x \in \mathbb{Q},\, x+y \in \mathbb{Q}.$$

Same rule applies to $\exists\exists$ — order doesn't matter.

But mixing $\forall$ and $\exists$ is dangerous. Swapping a universal quantifier with an existential quantifier can change the meaning entirely.

Here's the key: the universal quantifier confers a "scope" to the existential quantifiers it precedes. In the statement
$$\forall x,\, \exists y,\, P(x,y),$$
the choice of $y$ is allowed to *depend* on $x$. For each $x$, you get to pick a (possibly different) $y$.

In contrast,
$$\exists y,\, \forall x,\, P(x,y)$$
says that a *single* $y$ must work for every $x$. There is no dependence; one $y$ does it all.

These encode fundamentally different claims. Be careful when you write or read statements with multiple quantifiers.

>[!idea]
> Quantifiers of the same type commute, but swapping a $\forall$ and an $\exists$ changes what the statement says: $\forall x,\, \exists y$ allows $y$ to depend on $x$, while $\exists y,\, \forall x$ requires a single $y$ for all $x$.
