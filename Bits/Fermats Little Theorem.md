---
id: fermats-little-theorem
title: "Fermat's Little Theorem"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: fermats-little-theorem-corollary
    question: "What if p does divide a?"
    edge_type: prerequisite
  - id: ex-prove-flt-corollary
    question: "Can I prove the corollary that a^p ≡ a (mod p)?"
    edge_type: prerequisite
  - id: ex-seven-divides-sum
    question: "Can Fermat's Little Theorem determine divisibility of large sums?"
    edge_type: prerequisite
parents:
  - modular-cancellation-lemma
---

One of the most elegant results in number theory connects prime moduli to exponentiation.

>[!t] Theorem (Fermat's Little Theorem)
> If $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod{p}$.

>[!p] Proof
> Consider the set $S = \{0 \cdot a, 1 \cdot a, 2 \cdot a, \ldots, (p-1) \cdot a\}$. I claim no two elements of $S$ lie in the same congruence class modulo $p$.
>
> If $ma \equiv na \pmod{p}$ for some $0 \leq m, n \leq p-1$, then since $\gcd(p, a) = 1$ (because $p$ is prime and $p \nmid a$), we can cancel $a$ by the lemma from the previous bit, obtaining $m \equiv n \pmod{p}$. Since $0 \leq m, n \leq p-1$, we have $m = n$.
>
> Thus $S$ consists of $p$ elements in $p$ different residue classes—so $S$ is a rearrangement of $\{0, 1, 2, \ldots, p-1\}$ modulo $p$.
>
> Multiply all nonzero elements of $S$:
> $$(a)(2a)(3a) \cdots ((p-1)a) \equiv (1)(2)(3) \cdots (p-1) \pmod{p}$$
> $$(p-1)! \cdot a^{p-1} \equiv (p-1)! \pmod{p}$$
>
> Since $p$ is prime and $1 \leq (p-1)! \leq p-1$, we have $\gcd(p, (p-1)!) = 1$. Cancel $(p-1)!$:
> $$a^{p-1} \equiv 1 \pmod{p}$$

This is a powerful result: for any prime $p$ and any $a$ not divisible by $p$, the number $a^{p-1} - 1$ is divisible by $p$. This single observation unlocks deep connections between exponentiation and prime divisibility.

>[!idea]
> If $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod{p}$.
