---
id: fibonacci-sequence
title: "The Fibonacci sequence"
role: bit
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
parents:
  - recursive-definitions
children:
  - id: ex-fibonacci-closed-form
    question: "Is there a non-recursive formula for the Fibonacci numbers?"
    edge_type: prerequisite
  - id: ex-recursive-sequence-closed-form
    question: "Can I find a closed form for a different recursive sequence?"
    edge_type: prerequisite
---

The **Fibonacci sequence** is perhaps the most famous recursively defined sequence. It's defined by:
- $x_1 = 1$
- $x_2 = 1$
- $x_n = x_{n-1} + x_{n-2}$ for $n \geq 3$

This generates the sequence:
$$1, 1, 2, 3, 5, 8, 13, 21, 34, 55, \ldots$$

Each term is the sum of the two preceding terms. The sequence appears everywhere in nature: flower petals, spiral shells, branching trees. Mathematicians have studied it for centuries.

Here's an important distinction: **a sequence is not a set.** The sequence $(1, 1, 2, 3, 5, \ldots)$ is different from the set $\{1, 2, 3, 5, \ldots\}$. Sequences care about order and repetition; sets don't. In the Fibonacci sequence, 1 appears twice (at positions 1 and 2), and the order matters. In the set, 1 appears once, and position is meaningless.

This matters for induction. When you prove something about the Fibonacci sequence, you're proving a statement indexed by position: $x_1, x_2, x_3, \ldots$ When you prove something about a recursively defined set like the evens, you're proving a statement about membership: does an element belong?

The Fibonacci sequence motivates the next topic. Computing $x_n$ directly from the definition requires computing all previous terms, which can be slow. Mathematicians ask: **Is there a closed-form formula for $x_n$?** That is, can you compute $x_n$ without recursion?

The answer is yes—there's a surprisingly elegant formula involving the golden ratio—but proving it requires strong induction, because the recurrence relates $x_n$ to two earlier terms.

>[!idea] The Fibonacci sequence is defined recursively as $x_1=x_2=1$ and $x_n=x_{n-1}+x_{n-2}$, and sequences (unlike sets) preserve order and repetition.
