---
id: power-set
title: "Power set"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - countable-sets
  - set-builder-notation
---

You've now seen several infinite cardinalities: $|\mathbb{N}|$, $|\mathbb{Z}|$, $|\mathbb{Q}|$, and $|\mathbb{R}|$. You might wonder: is $|\mathbb{R}|$ the largest cardinality, or can you construct something even bigger?

The answer comes from the **power set** — the set of all subsets.

>[!d] Definition
> Let $S$ be a set. The **power set** $\mathcal{P}(S)$ is the set of all subsets of $S$. It is sometimes denoted $2^S$.

**Example:** If $S = \{1, 2, 3\}$, then
$$\mathcal{P}(S) = \{\emptyset, \{1\}, \{2\}, \{3\}, \{1,2\}, \{1,3\}, \{2,3\}, \{1,2,3\}\}$$

This set has $8 = 2^3$ elements. In general, for a finite set with $n$ elements, $|\mathcal{P}(S)| = 2^n$.

For infinite sets, the notation $2^S$ makes sense too: there are as many subsets of $\mathbb{N}$ as there are functions from $\mathbb{N}$ to $\{0, 1\}$ (each function picks which elements to include). This gives you a *systematic way* to build larger and larger cardinalities.

For example, $|\mathcal{P}(\mathbb{N})| > |\mathbb{N}|$ (you'll prove this next). Then $|\mathcal{P}(\mathcal{P}(\mathbb{N}))| > |\mathcal{P}(\mathbb{N})|$, and so on forever.

>[!idea]
> The power set $\mathcal{P}(S)$ is the set of all subsets of $S$; for finite sets with $n$ elements, $|\mathcal{P}(S)| = 2^n$.
