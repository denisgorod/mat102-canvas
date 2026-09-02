---
id: gcd-division-algorithm
title: "Division Algorithm"
role: theorem
subject: number-theory
topic: gcd-and-euclidean-algorithm
statement: "For a ∈ ℤ and b ∈ ℤ⁺ there exist unique q, r ∈ ℤ with a = qb + r and 0 ≤ r < b."
depends_on: [gcd-wop]
---
>[!t] Theorem
> Let $a \in \mathbb{Z}$ and $b \in \mathbb{Z}^{+}$. There exist unique integers $q$ (the **quotient**) and $r$ (the **remainder**) with
> $$a = qb + r, \qquad 0 \le r < b.$$

>[!p] Proof
> *Existence.* Let $r$ be the least element of $S = \{a-qb : q \in \mathbb{Z}\} \cap \mathbb{Z}^{\ge 0}$, non-empty because $q=-|a|$ gives $a+|a|b \ge 0$. Say $r = a-qb$. If $r \ge b$ then $r-b = a-(q+1)b \in S$ is smaller, contradicting minimality; hence $0 \le r < b$.
> *Uniqueness.* If $q_1b + r_1 = q_2b + r_2$ with $0 \le r_1, r_2 < b$, then $b \mid (r_1-r_2)$ while $|r_1-r_2| < b$, so $r_1 = r_2$ and $q_1 = q_2$. $\square$
