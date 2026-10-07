---
id: impl-contrapositive-proof
title: "Proof by contrapositive"
role: application
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "To prove P ⟹ Q it suffices to prove ¬Q ⟹ ¬P; e.g. for n ∈ ℤ, n² even ⟹ n even, because odd n = 2k + 1 gives n² = 2(2k² + 2k) + 1, which is odd."
depends_on: [impl-contrapositive, read-even-odd, gcd-division-algorithm]
---
>[!s] Method
> To prove $P \implies Q$, assume $\neg Q$ and deduce $\neg P$. By the contrapositive theorem, $\neg Q \implies \neg P$ is logically equivalent to $P \implies Q$. Deducing $P$ from $Q$ proves the converse instead.

>[!t] Theorem
> Let $n \in \mathbb{Z}$. If $n^2$ is even, then $n$ is even. With the direct implication ($n = 2m$ gives $n^2 = 2(2m^2)$) this yields $n$ even $\iff$ $n^2$ even, used to prove $\sqrt{2}$ irrational.

>[!p] Proof
> Suppose $n$ is not even. By the Division Algorithm with divisor $2$, $n = 2k + r$ with $k \in \mathbb{Z}$ and $r \in \{0, 1\}$; $r \neq 0$ as $n$ is not even, so $n = 2k + 1$. Then
> $$n^2 = 4k^2+4k+1 = 2(2k^2+2k)+1$$
> is odd, and by uniqueness of the remainder it is not even. $\square$
