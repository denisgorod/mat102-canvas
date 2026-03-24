---
id: rationals-are-countable
title: "The rationals are countable"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - integers-are-countable
---

If the integers have the same cardinality as $\mathbb{N}$, what about the rationals $\mathbb{Q}$? You might expect $\mathbb{Q}$ to be much larger — after all, between any two integers there are infinitely many rationals. Yet remarkably, $|\mathbb{Q}| = |\mathbb{N}|$.

To show this, define $f: \mathbb{Q} \to \mathbb{Z} \times \mathbb{Z}^+$ by
$$f\left(\frac{p}{q}\right) = (p, q)$$

where the fraction $p/q$ is written in lowest terms. If the fraction is negative, we put the sign in the numerator $p$.

This map is injective: if $f(p/q) = f(r/s)$, then $(p, q) = (r, s)$, which means $p = r$ and $q = s$. Since both fractions are in lowest terms, this forces $p/q = r/s$.

Now here's the key observation: $\mathbb{Z}$ is countable (you just showed this) and $\mathbb{Z}^+$ is clearly countable (it's a subset of $\mathbb{N}$). A product of two countable sets is countable — you can list all pairs $(a, b)$ with $a \in \mathbb{Z}$ and $b \in \mathbb{Z}^+$ by diagonalizing through the grid. So:
$$|\mathbb{Q}| \leq |\mathbb{Z} \times \mathbb{Z}^+| \leq |\mathbb{N}|$$

Since $\mathbb{N} \subseteq \mathbb{Q}$ (every positive integer $n$ is the rational $n/1$), you have $|\mathbb{N}| \leq |\mathbb{Q}|$ as well.

Therefore $|\mathbb{Q}| = |\mathbb{N}|$.

>[!idea]
The rationals are countable: despite appearing infinitely denser than the integers, $\mathbb{Q}$ has the same cardinality as $\mathbb{N}$.
