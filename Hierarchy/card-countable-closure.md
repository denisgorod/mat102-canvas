---
id: card-countable-closure
title: "Products and countable unions of countable sets"
role: theorem
subject: functions
topic: functions-ii
statement: "If A and B are countable then A × B is countable, so every finite product of countable sets is countable; and the union of countably many countable sets is countable."
depends_on: [card-countable, prime-fta]
---
>[!t] Theorem
> If $A$ and $B$ are countable, so is $A \times B$, hence, by induction, every finite product of countable sets. If $A_0, A_1, \dots$ are countable, so is $\bigcup_{i \in \mathbb{N}} A_i$.

>[!p] Proof
> Take injections $f : A \to \mathbb{N}$, $g : B \to \mathbb{N}$. Then $(a,b) \mapsto 2^{f(a)} 3^{g(b)}$ is injective: by unique prime factorisation $2^m 3^n$ determines $m$ and $n$, and $f, g$ are injective. For the union, **assume** an injection $f_i : A_i \to \mathbb{N}$ chosen for each $i$ (infinitely many choices, made tacitly here). Map $a$ to $2^{i} 3^{f_i(a)}$, $i$ least with $a \in A_i$ (well-ordering); equal images force equal $i$, then equal $f_i(a)$, so equal $a$. $\square$

>[!warning] Common error
> Infinite products may be uncountable: for any list $s_0, s_1, \dots$ in $\{0,1\}^{\mathbb{N}}$, $d(n) = 1 - s_n(n)$ differs from every $s_n$.
