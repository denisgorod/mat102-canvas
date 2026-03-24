---
id: cartesian-product
title: "Cartesian product"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: ex-cartesian-product-properties
    question: "Does order matter in Cartesian products?"
    edge_type: prerequisite
parents:
  - what-is-a-set
---

You can combine sets in many ways. Union and intersection collect elements. Now consider a different kind of combination: pairing elements from two different sets.

>[!d] Definition
> Given two sets $A$ and $B$, their **Cartesian product** $A \times B$ is the collection of all ordered pairs $(a, b)$ where $a \in A$ and $b \in B$:
> $$A \times B = \{(a, b) : a \in A,\, b \in B\}.$$

Example: if $S = \{a, b\}$ and $T = \{1, 2, 3\}$, then
$$S \times T = \{(a,1), (a,2), (a,3), (b,1), (b,2), (b,3)\}.$$

Notice the word *ordered*: the pair $(a, 1)$ is different from the pair $(1, a)$. This matters. It also means that $S \times T$ and $T \times S$ are generally different. If we computed $T \times S$, we'd get $\{(1,a), (1,b), (2,a), (2,b), (3,a), (3,b)\}$ — a different set entirely (the first coordinate is always from $T$ now, the second from $S$).

The Cartesian product shows up everywhere: coordinates in the plane form $\mathbb{R} \times \mathbb{R}$, a chessboard is an $8 \times 8$ grid, databases are tables where each row is a tuple from a Cartesian product.

>[!idea]
> The Cartesian product $A \times B$ collects all ordered pairs from $A$ and $B$, and order matters: $(a, b) \neq (b, a)$ in general.
