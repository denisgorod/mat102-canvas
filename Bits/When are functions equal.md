---
id: when-are-functions-equal
title: "When are functions equal?"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - function-notation
---

Two functions look the same if they have the same rule, right? Well, not quite. Because a function is really three pieces of data — domain, codomain, and rule — equality of functions requires all three to match.

Two functions $f$ and $g$ are equal if and only if:
1. They have the same domain
2. They have the same codomain
3. For every element $a$ in the domain, $f(a) = g(a)$

This means that if you change the codomain, you get a different function, even if the rule and domain stay the same.

For example, consider:
- $f: \{0, 1\} \to \mathbb{R}$ defined by $x \mapsto x$
- $g: \{0, 1\} \to \{0, 1\}$ defined by $x \mapsto x$

Both have the rule "map $x$ to itself." But they have different codomains! So $f \neq g$.

Why does this matter? Part of specifying a function is making a choice about where the outputs are allowed to go. That choice is part of the function's identity. You might ask: "Does this function map onto its entire codomain?" That's a sensible question, and it depends on your choice of codomain. If the codomain were the actual range, the answer would always be yes — trivially. So the codomain has to be *allowed* to be larger than the range for the question to be interesting.

This is why we insist that the codomain must be part of the definition. It's not extra decoration; it's data.

>[!idea]
Two functions are equal if and only if they have the same domain, the same codomain, and the same rule. Changing the codomain produces a different function.
