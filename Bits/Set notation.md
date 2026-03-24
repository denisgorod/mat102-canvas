---
id: set-notation
title: "Set notation"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: sets-can-contain-anything
    question: "What kinds of things can be elements of a set?"
    edge_type: prerequisite
  - id: ex-which-sets-are-equal
    question: "Does the way I write a set change which set it is?"
    edge_type: prerequisite
parents:
  - what-is-a-set
---

To write down a set, you list its elements between curly braces. The set containing the letters $a$, $b$, and $c$ is written $\{a, b, c\}$.

To say an element belongs to a set, we use the symbol $\in$ ("in" or "belongs to"). For example, $a \in \{a, b, c\}$ means "$a$ is an element of the set." To say something is NOT an element, we write $\notin$ ("not in"): $\text{cow} \notin \{\text{cat}, \text{dog}\}$.

Because sets are unordered collections of distinct elements, order doesn't matter and duplicates collapse to a single copy. The three expressions
$$\{1, 2, 3\}, \quad \{3, 1, 2\}, \quad \{1, 2, 2, 3, 3, 3\}$$
all describe the same set. When you write elements, they're automatically treated as distinct, so listing an element multiple times is simply redundant.

This is one of the defining features of sets: two sets are equal if and only if they have exactly the same elements. Order and repetition in the notation don't matter — only membership.

>[!idea]
> Sets are written with braces: $\{a, b, c\}$. We use $\in$ for membership and $\notin$ for non-membership. Order and repetition don't affect which set you get — only the elements themselves matter.
