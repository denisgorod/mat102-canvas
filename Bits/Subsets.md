---
id: subsets
title: "Subsets"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: ex-subset-intersection
    question: "Is a set always a subset of its intersection with another set, or the other way around?"
    edge_type: prerequisite
  - id: set-equality-via-double-inclusion
    question: "If two sets are subsets of each other, what does that tell us?"
    edge_type: prerequisite
  - id: ex-subset-proof-homework
    question: "How do I prove one set is a subset of another?"
    edge_type: prerequisite
parents:
  - what-is-a-set
---

Not all sets are the same size or scope. Some sets fit inside others. This relationship is fundamental.

>[!d] Definition
> Let $S$ and $T$ be two sets. We say that $S$ is a **subset** of $T$, written $S \subseteq T$, if every element of $S$ is also an element of $T$.

For example, $\{a, b, c\} \subseteq \{a, b, c, 1, 2\}$ because all three letters appear in the larger set. Similarly, $\{\text{cat}\} \subseteq \{\text{cat}, \text{dog}, \text{cow}\}$. However, $\{a, b, c\}$ is NOT a subset of $\{a, b, 1, 2\}$ because $c$ is in the first set but not the second.

Notice that every set is a subset of itself: $S \subseteq S$ for any set $S$. Also, the empty set is a subset of every set — there are no elements in $\emptyset$ to violate the condition.

Here is how you prove one set is a subset of another: show that $A \subseteq A \cup B$ for any sets $A, B$. Let $x \in A$. Since $A \cup B$ contains everything in $A$ or in $B$, we have $x \in A \cup B$. Since $x$ was arbitrary, every element of $A$ is in $A \cup B$, so $A \subseteq A \cup B$.

>[!idea]
> A set $S$ is a subset of a set $T$ if every element of $S$ belongs to $T$, and you prove this by showing any element of $S$ must be in $T$.
