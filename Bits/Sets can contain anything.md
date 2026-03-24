---
id: sets-can-contain-anything
title: "Sets can contain anything"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children: []
parents:
  - set-notation
---

The elements of a set can be numbers, letters, words, people, functions, or even other sets. There is no restriction on what kind of objects you collect.

For example, the set $\{\text{apple}, \text{banana}, 17, \pi\}$ is a perfectly valid set: it contains two words, one integer, and one irrational number. You have gathered four very different things into a single container.

But here's where it gets interesting: you can also make a set of sets. Consider
$$\{\{1, 2\}, \{3\}\}.$$
This set has exactly two elements: the set $\{1, 2\}$ and the set $\{3\}$. It is fundamentally different from $\{1, 2, 3\}$, which has three elements (all numbers). In the first case, the elements are sets; in the second, the elements are numbers.

The distinction matters. When you write $2 \in \{1, 2, 3\}$, that's true. But $2 \in \{\{1, 2\}, \{3\}\}$ is false — the number 2 is not an element of that set. The set $\{1, 2\}$ is an element, but not 2 by itself. If you wanted 2 to be an element, you'd have to write something like $\{\{1, 2\}, \{3\}, 2\}$.

This flexibility is one of the reasons sets are so powerful in mathematics: they can contain anything you define clearly enough.

>[!idea]
> Elements of a set can be numbers, symbols, words, functions, or other sets. A set of sets is different from a set of numbers, even if the same symbols appear — what matters is what the elements actually are.
