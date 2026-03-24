---
id: structural-induction-principle
title: "Principle of structural induction"
role: bit
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
parents:
  - recursive-definitions
children:
  - id: structural-induction-example-divisibility
    question: "What does a structural induction proof look like?"
    edge_type: prerequisite
---

Sequences have an obvious "next" element, so strong induction works well for them. But arbitrary recursively defined sets don't have that linear ordering. You need a proof technique tailored to recursive structure: **structural induction**.

**Principle of Structural Induction:** Suppose $S$ is a recursively defined set with:
- **Basis:** elements $b_1, b_2, \ldots, b_n$
- **Constructor(s):** function(s) that build new elements from existing ones

To prove that a predicate $P$ holds for all $s \in S$, you must show:

1. **Base cases:** $P(b_1), P(b_2), \ldots, P(b_n)$ are all true.
2. **Constructor step:** For each constructor, if $P$ holds for all inputs to that constructor, then $P$ holds for the output.

Once both are verified, $P(s)$ holds for every element $s \in S$.

**Why this works:** Any element of $S$ is either a basis element or was built from basis elements by repeatedly applying constructors. If $P$ is true for all basis elements, and applying constructors preserves the truth of $P$, then by tracing any element back to its construction, you know $P$ is true for it.

**Example framework:** Suppose $S$ has basis $\{0\}$ and constructors $c_1(x) = -x$ and $c_2(x) = x+2$.

To prove $P(s)$ for all $s \in S$:
- **Base case:** Show $P(0)$.
- **Constructor step for $c_1$:** Show that if $P(x)$ is true, then $P(-x)$ is true.
- **Constructor step for $c_2$:** Show that if $P(x)$ is true, then $P(x+2)$ is true.

In contrast to strong induction on sequences (where the index goes $1, 2, 3, \ldots$), structural induction follows the actual recursive construction of the elements. It's a perfect match.

>[!idea] Structural induction proves properties of recursively defined sets by verifying the property for all basis elements and showing it's preserved by each constructor.
