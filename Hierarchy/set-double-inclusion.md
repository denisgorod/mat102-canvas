---
id: set-double-inclusion
title: "Set equality by double inclusion"
role: theorem
subject: sets-and-propositions
topic: sets
statement: "For sets S and T, S = T if and only if S ⊆ T and T ⊆ S, so an equality of sets is proved by establishing the two inclusions separately."
depends_on: [set-subset]
---
>[!t] Theorem
> For sets $S$ and $T$, $S = T$ if and only if $S \subseteq T$ and $T \subseteq S$.

>[!p] Proof
> By the definition of set equality, $S = T$ means every element of $S$ is in $T$ and every element of $T$ is in $S$; by the definition of subset, these two clauses are $S \subseteq T$ and $T \subseteq S$. $\square$

>[!e] Worked example
> Let $A = \{n \in \mathbb{Z}^{*} : n = 4k+1,\ k \in \mathbb{Z}\}$ and $B = \{n \in \mathbb{Z}^{*} : n = 4k-3,\ k \in \mathbb{Z}\}$. For $n \in \mathbb{Z}^{*}$: if $n = 4k+1$ with $k \in \mathbb{Z}$, then $n = 4(k+1) - 3$ with $k+1 \in \mathbb{Z}$, so $A \subseteq B$; if $n = 4k-3$, then $n = 4(k-1) + 1$ with $k-1 \in \mathbb{Z}$, so $B \subseteq A$. Hence $A = B$.
