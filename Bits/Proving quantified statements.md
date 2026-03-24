---
id: proving-quantified-statements
title: "Proving quantified statements"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children: []
parents:
  - universal-quantifier
  - existential-quantifier
---

To prove $\forall x \in S,\, P(x)$: let $x$ be *arbitrary* (don't pick a specific one), then show $P(x)$ holds. If it works for an unspecified $x$, it works for all of them.

To prove $\exists x \in S,\, P(x)$: find one concrete example — a *witness*. One specific $x$ that makes $P(x)$ true is enough.

**Universal example:** Prove $\forall x \in \mathbb{Q},\, \forall y \in \mathbb{Q},\, x+y \in \mathbb{Q}$.

*Proof:* Let $x = a/b$ and $y = c/d$ be arbitrary rationals (where $b, d \neq 0$). Then
$$x + y = \frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}.$$
Since $a, b, c, d$ are all integers and $bd \neq 0$, we have $x + y \in \mathbb{Q}$. Because $x$ and $y$ were arbitrary, this holds for all rationals.

**Existential example:** Prove $\exists x \in \mathbb{Z}^+,\, \exists y \in \mathbb{Z}^+,\, x/y \in \mathbb{Z}^+$.

*Proof:* Take $x = 4$ and $y = 2$. Then $x/y = 4/2 = 2$, which is in $\mathbb{Z}^+$. This witnesses the existence.

These are fundamentally different proof strategies. Universal proofs demand generality; existential proofs demand a concrete example. When you encounter a claim with a quantifier, check which strategy applies.

>[!idea]
To prove a universal statement, argue about an arbitrary element; to prove an existential statement, exhibit a witness.
