---
id: integers-are-countable
title: "The integers are countable"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - countable-sets
  - standard-number-sets
---

You've seen that a set is countable if there is an injection into $\mathbb{N}$. Here's your first big surprise: the integers $\mathbb{Z}$, which look *much* larger than $\mathbb{N}$ since they extend in both directions, are actually the same size as $\mathbb{N}$.

To show $|\mathbb{Z}| = |\mathbb{N}|$, you need two injections. First, $\mathbb{N} \subseteq \mathbb{Z}$ gives you $|\mathbb{N}| \leq |\mathbb{Z}|$ immediately.

For the other direction, define $f: \mathbb{Z} \to \mathbb{N} \times \mathbb{N}$ by
$$f(n) = (|n|, \operatorname{sgn}(n) + 1)$$

where $\operatorname{sgn}(n)$ is the sign of $n$: it's $1$ if $n > 0$, $-1$ if $n < 0$, and $0$ if $n = 0$. The second component adds $1$ to ensure we land in $\mathbb{N}$.

Examples: $f(5) = (5, 2)$, $f(-5) = (5, 0)$, $f(0) = (0, 1)$.

This map is injective because if $f(n) = f(m)$, then the first coordinates must be equal: $|n| = |m|$, so $n = \pm m$. The second coordinates must also be equal: $\operatorname{sgn}(n) + 1 = \operatorname{sgn}(m) + 1$, so $\operatorname{sgn}(n) = \operatorname{sgn}(m)$. Together, these force $n = m$.

Now, $\mathbb{N} \times \mathbb{N}$ is itself countable (this comes from a counting argument using the Fundamental Theorem of Arithmetic or by diagonalizing the grid). So you have:
$$|\mathbb{Z}| \leq |\mathbb{N} \times \mathbb{N}| \leq |\mathbb{N}|$$

Combined with $|\mathbb{N}| \leq |\mathbb{Z}|$, this gives $|\mathbb{Z}| = |\mathbb{N}|$.

>[!idea]
> Even though $\mathbb{Z}$ extends infinitely in both directions, it has the same cardinality as $\mathbb{N}$ — the map $(|n|, \operatorname{sgn}(n)+1)$ witnesses this equality.
