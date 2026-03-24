---
id: math-vs-english-not
title: "Math vs English: NOT"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children: []
parents:
  - negating-universal-quantifier
---

In English, "Not everything is alright" and "Everything is not alright" sound similar. In mathematics, they are very different:

$$\neg(\forall x,\, A(x)) = \exists x,\, \neg A(x) \qquad \text{vs} \qquad \forall x,\, \neg A(x).$$

The first says "something is not okay." The second says "nothing is okay."

Shakespeare wrote: "All that glisters is not gold." He meant $\neg(\forall x,\, \text{gold}(x))$ — "not everything that shines is valuable." But the literal mathematical reading would be $\forall x,\, \neg\text{gold}(x)$ — "nothing that shines is valuable." The placement of "not" matters enormously in mathematics.

>[!idea]
> The position of negation relative to quantifiers drastically changes meaning: $\neg(\forall x,\, A(x))$ says at least one counterexample exists, while $\forall x,\, \neg A(x)$ says none satisfy the property.
