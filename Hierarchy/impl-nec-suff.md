---
id: impl-nec-suff
title: "Necessary and sufficient conditions"
role: definition
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "'P is sufficient for Q' means P ⟹ Q, 'P is necessary for Q' means Q ⟹ P, and 'P is necessary and sufficient for Q' means P ⟺ Q."
depends_on: [impl-iff]
---
>[!d] Definition
> For propositions or predicates $P$ and $Q$:
> - "$P$ is **sufficient** for $Q$" means $P \implies Q$.
> - "$P$ is **necessary** for $Q$" means $Q \implies P$: $Q$ cannot hold without $P$.
> - "$P$ is **necessary and sufficient** for $Q$" means $P \iff Q$.

>[!e] Worked example
> For $n \in \mathbb{Z}$, $4 \mid n$ is sufficient for $2 \mid n$, as $n = 4k = 2(2k)$, but not necessary: $2 \mid 2$, $4 \nmid 2$. Being an integer is necessary but not sufficient for primality: every prime is an integer, but the integer $1$ is not prime.

>[!warning] Common error
> Do not reverse "necessary": "$2 \mid n$ is necessary for $4 \mid n$" means $4 \mid n \implies 2 \mid n$, not $2 \mid n \implies 4 \mid n$, which is false at $n = 2$.
