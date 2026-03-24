---
id: cardinality-definition
title: "Cardinality of a set"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children:
  - id: cardinality-via-bijection
    question: "When do two sets have the same cardinality?"
    edge_type: prerequisite
parents:
  - invertibility-requires-bijectivity
  - injective-functions
  - surjective-functions
---

How do you compare the sizes of sets? For finite sets, you count: $\{a, b, c\}$ has 3 elements, $\{1, 2\}$ has 2 elements, so the first set is larger. But what happens when sets are infinite? How do you compare $\mathbb{N}$ and $\mathbb{Z}$, or $\mathbb{N}$ and $\mathbb{R}$?

The key idea is to use functions. If you have two sets $S$ and $T$, and you can find an injective function $f: S \to T$, that tells you something: each element of $S$ maps to a *different* element of $T$. So $S$ is "no bigger" than $T$. This intuition works for both finite and infinite sets.

The **cardinality** of a set $S$, denoted $|S|$, is a measure of its size. For finite sets, $|S|$ is just the count. For infinite sets, we use the following definition:

>[!d] Definition
>Let $S$ and $T$ be sets. We say $|S| \leq |T|$ (read "$S$ has cardinality at most that of $T$") if there exists an injective function $f: S \to T$.

For example, if $S = \{1, 2, 3\}$ and $T = \{-3, -6, -9, -12\}$, define $f(s) = -3s$. This is injective: if $-3s = -3t$ then $s = t$. So $|S| \leq |T|$, and indeed $3 \leq 4$ as you'd expect.

The same definition extends to infinite sets. Let $S = \mathbb{N}$ and $T = \mathbb{Z}$. Define $f(n) = n$ (just the inclusion map). This is injective, so $|\mathbb{N}| \leq |\mathbb{Z}|$. Similarly, $|\mathbb{Z}| \leq |\mathbb{Q}|$ because you can embed the integers into the rationals.

There is also a dual notion using surjections: if $f: S \to T$ is surjective, then every element of $T$ is "hit" by at least one element of $S$, which intuitively means $S$ is "at least as large" as $T$ — that is, $|T| \leq |S|$.

>[!idea]
>The cardinality $|S|$ measures the size of a set. For sets $S$ and $T$, we write $|S| \leq |T|$ if there is an injection from $S$ to $T$.
