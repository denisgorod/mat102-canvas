---
id: card-countable
title: "Countable sets"
role: definition
subject: functions
topic: functions-ii
statement: "S is countable if there is an injection S → ℕ, countably infinite if there is a bijection S → ℕ; finite sets are countable, and a non-empty countable set is the range of a sequence s₀, s₁, s₂, …."
depends_on: [card-equal]
---
>[!d] Definition
> Let $\mathbb{N} = \{0, 1, 2, \dots\}$. A set $S$ is **countable** if there is an injection $S \to \mathbb{N}$, i.e. $|S| \le |\mathbb{N}|$; **countably infinite** if there is a bijection $S \to \mathbb{N}$, i.e. $|S| = |\mathbb{N}|$; and **uncountable** if not countable.

>[!info] Note
> A finite set $\{a_1, \dots, a_n\}$ of distinct elements is countable via $a_i \mapsto i$; restricting an injection shows subsets of countable sets are countable. If $f : S \to \mathbb{N}$ is injective and $c \in S$, let $s_n$ be the unique $s$ with $f(s) = n$ if $n \in f(S)$, else $s_n = c$; as $s = s_{f(s)}$, the sequence $s_0, s_1, s_2, \dots$ lists all of $S$.

>[!e] Worked example
> $\mathbb{Z}^{+}$ is countably infinite via $n \mapsto n - 1$, and $2\mathbb{N} = \{0, 2, 4, \dots\}$ via $k \mapsto k/2$.
