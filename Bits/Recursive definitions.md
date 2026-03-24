---
id: recursive-definitions
title: "Recursive definitions"
role: bit
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
parents:
  - strong-induction-postage-stamps
children:
  - id: fibonacci-sequence
    question: "What is a famous example of a recursively defined sequence?"
    edge_type: prerequisite
  - id: structural-induction-principle
    question: "How do we prove things about recursively defined objects?"
    edge_type: prerequisite
---

Sometimes you don't have a formula for the objects you care about. Instead, you describe how to build new objects from old ones. That's recursion.

A **recursively defined set** has two parts:

1. **Basis:** A set of initial elements that are automatically in the set.
2. **Constructor(s):** Rule(s) describing how to build new elements from existing ones.

The implicit rule is: *an element belongs to the set if and only if it can be obtained by starting with basis elements and repeatedly applying constructors*.

**Example:** Let's recursively define the set $E$ of all even integers.
- **Basis:** $0 \in E$.
- **Constructors:** If $e \in E$, then $-e \in E$ and $e + 2 \in E$.

Starting with 0, you apply the constructors:
- From 0: apply $e + 2$ to get 2, or apply $-e$ to get 0 (already have it).
- From 2: apply $e + 2$ to get 4, or apply $-e$ to get $-2$.
- From 4: apply $e + 2$ to get 6, or apply $-e$ to get $-4$.
- And so on...

Over time, you build $\{\ldots, -4, -2, 0, 2, 4, 6, \ldots\}$—exactly the even integers.

**Another example:** You can define sequences recursively too. For instance:
- Let $x_1 = 1, x_2 = 1$ (basis).
- For $n \geq 3$, define $x_n = x_{n-1} + x_{n-2}$ (constructor).

This gives you the famous Fibonacci sequence: $1, 1, 2, 3, 5, 8, 13, \ldots$

The difference between a sequence and a set is that a sequence preserves order—the same elements in different order form a different sequence. A set ignores order.

Recursive definitions are powerful because they let you describe potentially infinite collections in a compact way. And as you'll see, you can prove properties of recursive objects using a method tailored to recursion: structural induction.

>[!idea] A recursive definition specifies a basis (initial elements) and constructors (building rules), allowing you to generate all members of a set or sequence from simple rules.
