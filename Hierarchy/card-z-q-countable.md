---
id: card-z-q-countable
title: "ℤ and ℚ are countably infinite"
role: theorem
subject: functions
topic: functions-ii
statement: "|ℤ| = |ℚ| = |ℕ|: n ↦ (|n|, sgn(n) + 1) injects ℤ into ℕ × ℕ, and r ↦ (qr, q), with q the least positive integer such that qr ∈ ℤ, injects ℚ into ℤ × ℤ⁺."
depends_on: [card-countable-closure, card-csb]
---
>[!t] Theorem
> With $\mathbb{N} = \{0,1,2,\dots\}$, $|\mathbb{Z}| = |\mathbb{Q}| = |\mathbb{N}|$.

>[!p] Proof
> $f(n) = (|n|, \operatorname{sgn}(n) + 1)$ injects $\mathbb{Z}$ into $\mathbb{N} \times \mathbb{N}$: $f(n) = f(m)$ gives $|n| = |m|$ and equal signs, so $n = m$. As $\mathbb{N} \times \mathbb{N}$ is countable, so is $\mathbb{Z}$. For $r = a/b \in \mathbb{Q}$, $\{q \in \mathbb{Z}^{+} : qr \in \mathbb{Z}\}$ contains $|b|$, so has a least element $q_r$ by well-ordering; $g(r) = (q_r r, q_r)$ injects $\mathbb{Q}$ into the countable product $\mathbb{Z} \times \mathbb{Z}^{+}$, since $r = (q_r r)/q_r$. So $|\mathbb{Z}|, |\mathbb{Q}| \le |\mathbb{N}|$; the inclusions $\mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q}$ give the reverse, and Cantor–Schröder–Bernstein concludes. $\square$

>[!info] Note
> An explicit bijection $\mathbb{N} \to \mathbb{Z}$ lists $0, 1, -1, 2, -2, \dots$: $2k - 1 \mapsto k$, $2k \mapsto -k$. Density is irrelevant to size.
