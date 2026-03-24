---
id: proving-surjectivity
title: "Proving and disproving surjectivity"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - surjective-functions
---

You've learned what surjectivity means: every element in the codomain is hit by at least one input. Now, how do you prove a function is surjective? Or show that it isn't?

**Proving surjectivity** follows directly from the definition. To show $f: A \to B$ is surjective, you must prove: for *every* $t \in B$, there exists an $s \in A$ with $f(s) = t$. Your proof template is straightforward. Start with "Let $t \in B$ be arbitrary." Then construct an $s \in A$ (it will typically depend on $t$) and verify that $f(s) = t$. Since $t$ was arbitrary, you've covered all of $B$.

For example, is $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = 2x + 3$ surjective? Let $t \in \mathbb{R}$ be arbitrary. Solve $2s + 3 = t$ for $s$: you get $s = \frac{t - 3}{2}$. Then $f(s) = 2 \cdot \frac{t - 3}{2} + 3 = t - 3 + 3 = t$. ✓ Since $t$ was arbitrary, $f$ is surjective.

**Disproving surjectivity** is also concrete: find a single element in $B$ that is *not* hit by any input in $A$. For instance, is $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$ surjective? Consider $t = -1 \in \mathbb{R}$. For any $s \in \mathbb{R}$, we have $f(s) = s^2 \geq 0 > -1$. So no $s$ maps to $-1$. Therefore $f$ is not surjective.

The key difference from injectivity: proving surjectivity requires you to construct a preimage for *every* codomain element (a universal task), while disproving requires just one witness of a missed element. This asymmetry is built into the definitions of universal and existential quantifiers.

Always be clear about your codomain. The formula matters less than the choice of target set.

>[!idea]
To prove $f$ surjective: let $t \in B$ be arbitrary and construct $s$ with $f(s) = t$. To disprove: find one element in $B$ with no preimage.
