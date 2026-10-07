---
id: eqv-def
title: "Equivalence relation"
role: definition
subject: relations
topic: equivalence-relations
statement: "A relation ∼ on a set A is an equivalence relation if it is reflexive, symmetric, and transitive."
depends_on: [rel-properties]
---
>[!d] Definition
> A relation $\sim$ on a set $A$ is an **equivalence relation** if it is reflexive, symmetric and transitive: for all $a, b, c \in A$, $a \sim a$; $a \sim b \implies b \sim a$; $a \sim b \wedge b \sim c \implies a \sim c$.

>[!info] Note
> Equality is the prototype; congruence modulo $n$ is another instance. $\le$ on $\mathbb{R}$ is reflexive and transitive but not symmetric ($1 \le 2$, $2 \not\le 1$).

>[!e] Worked example
> On $\mathbb{R}$ let $a \sim b$ iff $b - a = 2\pi k$ for some $k \in \mathbb{Z}$ (angles equal up to whole turns). Reflexive: $a - a = 2\pi \cdot 0$. Symmetric: $a - b = 2\pi(-k)$. Transitive: if $b - a = 2\pi k_1$ and $c - b = 2\pi k_2$, then $c - a = 2\pi(k_1 + k_2)$.
