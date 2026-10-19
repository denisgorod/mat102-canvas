---
id: sind-generalized
title: "Induction from any base and step"
role: theorem
subject: induction
topic: strong-induction
statement: "For a ∈ ℤ, d ∈ ℤ⁺: if P(a) holds and P(k) ⟹ P(k + d) for all k ∈ A = {a, a + d, …}, then P holds on A; d = 1 gives induction from base a."
depends_on: [ind-principle]
---
>[!t] Theorem
> Let $a \in \mathbb{Z}$, $d \in \mathbb{Z}^{+}$ and $A = \{a, a+d, a+2d, \dots\}$. If $P(a)$ is true and $P(k) \implies P(k+d)$ for every $k \in A$, then $P(n)$ is true for every $n \in A$. Taking $d=1$ gives induction from base $a$.

>[!p] Proof
> Let $Q(m)$ be $P(a+(m-1)d)$; every $n \in A$ is $a+(m-1)d$ for some $m \in \mathbb{Z}^{+}$. $Q(1)$ is $P(a)$. If $Q(m)$ holds, the step at $k = a+(m-1)d \in A$ gives $P(a+md)$, i.e. $Q(m+1)$. The Principle of Mathematical Induction gives $Q(m)$ for every $m \in \mathbb{Z}^{+}$. $\square$

>[!e] Worked example
> For odd $n \ge 1$, $8 \mid n^2-1$ ($a=1$, $d=2$). Base: $1^2-1=0$. Step: $k^2-1=8c$ and $k+1=2j$ ($k$ odd) give $(k+2)^2-1 = (k^2-1)+4(k+1) = 8(c+j)$. The chain only climbs: base $1$ and step $+5$ reach $1, 6, 11, \dots$ but never $-4$, though $-4\equiv 1 \pmod 5$.
