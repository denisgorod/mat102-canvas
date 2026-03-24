---
id: function-as-relation
title: "A function is a special relation"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - relation-properties-transitive-total
  - what-is-a-binary-relation
---

You've already met binary relations — subsets of $A \times B$ that capture when pairs of elements are "related" in some way. Now comes a question: can a relation do more than just compare elements? Can a relation actually assign each input to an output?

The answer is yes, and this is where functions enter. A function is a very special kind of binary relation — one with two specific properties.

A binary relation $R$ between sets $A$ and $B$ is called:
- **left-total** if every element of $A$ is related to at least one element of $B$
- **functional** if every element of $A$ is related to at most one element of $B$

When a relation is both left-total and functional, we call it a **function**.

What do these properties mean in practice? Left-totality says that a function must "work" for every input in $A$ — there is no undefined case. Functionality says that each input produces exactly one output, not multiple. This is sometimes called the **vertical line test** in the context of real functions: when you draw the graph, no input has two outputs.

So when $A = \{1, 2, 3\}$ and $B = \{a, b, c\}$, the subset $S_f = \{(1, a), (2, b), (3, c)\} \subseteq A \times B$ defines a function: every element of $A$ appears exactly once as a first coordinate. But $S_g = \{(1, a), (1, b), (2, c)\}$ does not define a function, because $1$ is related to both $a$ and $b$ — it violates functionality.

This formal definition is the mathematical truth about functions, but in practice you'll rarely think about them this way. Instead, you'll think of a function as a "machine" that takes an input and produces an output. Still, it's good to know that under the hood, a function is just a special relation.

>[!idea]
A function $f: A \to B$ is a left-total, functional binary relation on $A \times B$ — every input maps to exactly one output.
