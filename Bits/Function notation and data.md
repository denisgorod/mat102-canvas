---
id: function-notation
title: "Function notation and data"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - function-as-relation
---

Now that you know what a function is formally — a left-total, functional binary relation — let's talk about how to write one down and what it actually contains.

When you have a function from set $A$ to set $B$, you write it as $f: A \to B$. This notation tells you:
- The name of the function: $f$
- Where inputs come from (the domain): $A$
- Where outputs go (the codomain): $B$

But a function is more than just this notation. It also requires a **rule** that specifies what output each input produces. This rule is often written as $f(x) = \ldots$ or using the notation $x \mapsto f(x)$.

For example, if $f: \mathbb{R} \to \mathbb{R}$ is defined by $x \mapsto x^2$, then $f$ takes any real number and squares it.

The **data of a function** consists of three pieces:
1. The domain $A$ (where inputs live)
2. The codomain $B$ (where outputs are allowed to live)
3. The rule (how to compute $f(x)$ from $x$)

All three pieces are essential. Changing any one of them gives you a different function.

There's another way to capture the essence of a function: its **graph**. The graph of $f$, written $\Gamma(f)$, is the set of all input-output pairs:
$$\Gamma(f) = \{(a, f(a)) : a \in A\} \subseteq A \times B$$

This is exactly the subset $S_f$ that defined the relation in the first place! The graph is complete information about where each input goes.

In practice, you'll think of $f$ as a machine: feed it an element from $A$, and it produces an element from $B$. The formal definition (a special relation) sits underneath this intuition, ensuring that the machine is well-defined and doesn't produce multiple outputs for the same input.

>[!idea]
> A function $f: A \to B$ is described by its domain $A$, codomain $B$, and rule $x \mapsto f(x)$. Its graph $\Gamma(f) = \{(a, f(a)) : a \in A\}$ is the complete set of input-output pairs.
