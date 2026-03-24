---
id: infinite-sets-surprise
title: "Infinite sets can match their subsets"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cardinality-via-bijection
---

Here is a fact that shocks many people on first hearing: an infinite set can have the same cardinality as a proper subset of itself. This never happens with finite sets.

Consider the set of even natural numbers: $2\mathbb{N} = \{0, 2, 4, 6, 8, \ldots\}$. Clearly $2\mathbb{N} \subseteq \mathbb{N}$ — it's a proper subset. Yet we have $|2\mathbb{N}| = |\mathbb{N}|$.

To prove this, define $f: \mathbb{N} \to 2\mathbb{N}$ by:

$$f(n) = 2n$$

This function maps 0 to 0, 1 to 2, 2 to 4, and so on. Is it injective? If $f(n) = f(m)$, then $2n = 2m$, so $n = m$. Yes, it's injective. Is it surjective? Every even number $k$ can be written as $k = 2m$ for some $m \in \mathbb{N}$, so $f(m) = k$. Yes, it's surjective. Thus $f$ is a bijection, and $|2\mathbb{N}| = |\mathbb{N}|$.

This feels strange because it contradicts intuition from finite sets. If $S$ is a finite set and $T$ is a proper subset, then $|T| < |S|$ strictly. But infinity does not behave this way.

What is happening? The key is that when you "remove" finitely many elements from an infinite set, you don't shrink its cardinality. You would need to remove infinitely many in a particular way — you'd need the removed set itself to have the same cardinality as the whole. For example, $\mathbb{N}$ and the odd natural numbers have equal cardinality, even though one is a subset of the other.

This is the first sign of a profound fact: infinite sets have unexpected properties. They are not just "really big versions" of finite sets.

>[!idea]
>Unlike finite sets, an infinite set can have the same cardinality as a proper subset of itself. The injection $n \mapsto 2n$ from $\mathbb{N}$ to $2\mathbb{N}$ is actually a bijection, so $|\mathbb{N}| = |2\mathbb{N}|$.
