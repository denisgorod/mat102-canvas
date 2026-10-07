---
id: card-cantor
title: "Cantor's theorem"
role: theorem
subject: functions
topic: functions-ii
statement: "For every set S there is no surjection S → P(S), while x ↦ {x} is an injection, so |S| < |P(S)|; consequently there is no set of all sets."
depends_on: [card-power-set, card-equal]
---
>[!t] Theorem (Cantor)
> For every set $S$, $x \mapsto \{x\}$ is an injection $S \to \mathcal{P}(S)$, but no function $S \to \mathcal{P}(S)$ is surjective. Hence $|S| < |\mathcal{P}(S)|$.

>[!p] Proof
> $\{x\} = \{y\}$ gives $x = y$. Let $f : S \to \mathcal{P}(S)$ and $D = \{x \in S : x \notin f(x)\} \in \mathcal{P}(S)$. For each $a \in S$, $a \in D \iff a \notin f(a)$, so $D$ and $f(a)$ differ at $a$. Hence $D$ is not in the range of $f$. $\square$

>[!t] Corollary (no set of all sets)
> A set $V$ containing every set would satisfy $\mathcal{P}(V) \subseteq V$, as each $U \subseteq V$ is a set. Then $r(x) = x$ for $x \in \mathcal{P}(V)$ and $r(x) = \emptyset$ otherwise is a surjection $V \to \mathcal{P}(V)$, contradicting the theorem. The collection of all sets is a **proper class**.
