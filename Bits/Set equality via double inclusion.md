---
id: set-equality-via-double-inclusion
title: "Set equality via double inclusion"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: ex-prove-set-equality
    question: "Can I prove two complicated-looking sets are actually the same?"
    edge_type: prerequisite
  - id: ex-subset-implies-union
    question: "If A ⊆ B, what happens to A ∪ B?"
    edge_type: prerequisite
parents:
  - subsets
---

Two sets are equal if they contain exactly the same elements. Mathematically, this means every element of the first is in the second and vice versa. This observation gives you a powerful proof technique.

>[!d] Definition
> Two sets $S$ and $T$ are **equal**, written $S = T$, if $S \subseteq T$ and $T \subseteq S$.

This is the "double inclusion" method: to prove $S = T$, show that everything in $S$ is in $T$, and everything in $T$ is in $S$.

Example: Let $A = \{n \in \mathbb{Z}^* : n = 4k + 1 \text{ for some } k \in \mathbb{Z}\}$ and $B = \{n \in \mathbb{Z}^* : n = 4k - 3 \text{ for some } k \in \mathbb{Z}\}$. These look different, but they are the same set.

To show $A = B$, first show $A \subseteq B$: if $n \in A$, then $n = 4k + 1$ for some integer $k$. Rewrite: $n = 4k + 1 = 4(k+1) - 3$. Setting $k' = k + 1$, we have $n = 4k' - 3$, so $n \in B$.

Now show $B \subseteq A$: if $n \in B$, then $n = 4k - 3$ for some integer $k$. Rewrite: $n = 4k - 3 = 4(k-1) + 1$. Setting $k'' = k - 1$, we have $n = 4k'' + 1$, so $n \in A$.

Since $A \subseteq B$ and $B \subseteq A$, we conclude $A = B$.

>[!idea]
> To prove two sets are equal, show that each is a subset of the other — this transforms equality into two simpler subset arguments.
