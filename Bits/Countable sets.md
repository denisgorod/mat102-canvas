---
id: countable-sets
title: "Countable sets"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cardinality-via-bijection
---

Now that you have a way to measure infinite sets, you can classify them. The most natural class to consider is sets that are "not too much bigger" than $\mathbb{N}$.

>[!d] Definition
>A set $S$ is **countable** if $|S| \leq |\mathbb{N}|$. That is, there exists an injective function $f: S \to \mathbb{N}$.
>
>We say $S$ is **countably infinite** if $|S| = |\mathbb{N}|$ (there exists a bijection $S \leftrightarrow \mathbb{N}$).

Intuitively, a set is countable if you can list its elements — possibly in an infinite list $s_1, s_2, s_3, \ldots$ — where each element appears exactly once and each position in the list corresponds to a natural number.

Every finite set is countable (vacuously, since you can't inject a finite set into $\mathbb{N}$ if it has more than one element... actually, you can, just map to $\{1, 2, \ldots, n\}$). Many infinite sets are countable: $\mathbb{N}$, $\mathbb{Z}$, the rationals $\mathbb{Q}$, even the set of all polynomials with rational coefficients.

There is a powerful tool for detecting countability:

>[!s] Proposition
>A countable union of pairwise disjoint countable sets is countable.

The proof uses the Fundamental Theorem of Arithmetic: if each set $A_i$ is countable (injection $A_i \to \mathbb{N}$) and the index set is countable, you can assign each element $a \in A_i$ a unique natural number using prime factorization. This ensures injectivity from the union into $\mathbb{N}$.

This tool is crucial: it says that you can "stack" countable sets in a countable way and still get a countable set. This will help prove that $\mathbb{Z}$ and $\mathbb{Q}$ are countable, even though they appear much larger than $\mathbb{N}$.

>[!idea]
>A set is countable if there is an injection into $\mathbb{N}$. A countable union of countable sets is countable, which is the key tool for proving that many infinite sets have the same cardinality as $\mathbb{N}$.
