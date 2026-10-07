---
id: pf-sqrt2
title: "√2 is irrational"
role: theorem
subject: relations
topic: proof-techniques
statement: "√2 is irrational: there are no integers p, q with q ≠ 0 and p² = 2q²."
depends_on: [pf-contradiction, impl-contrapositive-proof]
---
>[!t] Theorem
> $\sqrt{2}$ is irrational: there are no integers $p, q$ with $q \neq 0$ and $p^2 = 2q^2$.

>[!p] Proof
> $\sqrt{2} = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$ would give $p^2 = 2q^2$, so it suffices to show no such pair exists. Suppose one does. Replacing $p, q$ by $|p|, |q|$, some $q \in \mathbb{Z}^{+}$ admits a $p$; by the Well-Ordering Principle take $q$ least. As $p^2 = 2q^2$ is even, $p$ is even ($n^2$ even implies $n$ even, by contrapositive): $p = 2r$. Then $4r^2 = 2q^2$, so $q^2 = 2r^2$ is even and $q = 2s$, giving $r^2 = 2s^2$ with $0 < s < q$, contrary to the minimality of $q$. $\square$

>[!info] Note
> For prime $\ell$, Euclid's Lemma gives $\ell \mid n^2 \implies \ell \mid n$, and the same argument shows $\sqrt{\ell}$ is irrational.
