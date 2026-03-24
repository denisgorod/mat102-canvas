---
id: set-difference
title: "Set difference"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: complement-of-a-set
    question: "What if I want everything that's NOT in a set?"
    edge_type: prerequisite
parents:
  - union-and-intersection
---

You've learned to combine sets by taking their union and intersection. Now consider the opposite direction: starting with one set, you might want to remove some elements.

>[!d] Definition
> The **difference** $S \setminus T$ is the collection of all elements in $S$ that are not in $T$:
> $$S \setminus T = \{x : x \in S \text{ and } x \notin T\}.$$

Example: Let $S = \{a, b, c, d\}$ and $T = \{a, b, 1, 2, 3\}$. Then $S \setminus T = \{c, d\}$ — you keep only the elements of $S$ that don't appear in $T$. Notice that $1, 2, 3$ are not in the difference, even though they're in $T$, because they were never in $S$ to begin with.

Unlike union and intersection, set difference is NOT symmetric: $S \setminus T$ need not equal $T \setminus S$. In fact, $T \setminus S = \{1, 2, 3\}$ here, which is completely different from $\{c, d\}$. This makes sense: removing $S$ from $T$ leaves behind the elements of $T$ that $S$ never claimed.

>[!idea]
> Set difference $S \setminus T$ selects the elements of $S$ that don't belong to $T$, and it is not symmetric.
