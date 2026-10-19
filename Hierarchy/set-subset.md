---
id: set-subset
title: "Subsets"
role: definition
subject: sets-and-propositions
topic: sets
statement: "For sets S and T, S is a subset of T (S ⊆ T) when every element of S is in T, proved by showing each x ∈ S lies in T; thus S ⊆ S and ∅ ⊆ S."
depends_on: [set-def]
---
>[!d] Definition
> For sets $S$ and $T$, $S$ is a **subset** of $T$, written $S \subseteq T$, if every element of $S$ is in $T$. To prove $S \subseteq T$, take an arbitrary $x \in S$ and show $x \in T$; to refute it, exhibit one $x \in S$ with $x \notin T$.

>[!info] Note
> $S \subseteq S$, and $\emptyset \subseteq S$ because $\emptyset$ has no element outside $S$. $\subseteq$ relates two sets, $\in$ an element to a set: $\{1\} \subseteq \{1, 2\}$ but $\{1\} \notin \{1, 2\}$.

>[!e] Worked example
> $\{6k : k \in \mathbb{Z}\} \subseteq \{2k : k \in \mathbb{Z}\}$: if $x = 6k$ with $k \in \mathbb{Z}$, then $x = 2(3k)$ with $3k \in \mathbb{Z}$, so $x$ is in the second set. The reverse fails: $2 = 2 \cdot 1$, but $6k = 2$ forces $k = \tfrac13$.
