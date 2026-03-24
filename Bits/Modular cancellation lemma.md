---
id: modular-cancellation-lemma
title: "Modular cancellation lemma"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: fermats-little-theorem
    question: "What deeper properties does Z_p have when p is prime?"
    edge_type: prerequisite
  - id: ex-squares-mod-prime
    question: "Can cancellation help us factor congruences mod a prime?"
    edge_type: prerequisite
parents:
  - congruence-classes-and-zn
  - coprime-divides-product
---

In regular arithmetic, you can cancel a common factor: if $mx = nx$, then $m = n$ (as long as $x \neq 0$). But in modular arithmetic, cancellation is more delicate.

>[!s] Lemma
> Suppose $\gcd(p, x) = 1$. If $mx \equiv nx \pmod{p}$, then $m \equiv n \pmod{p}$.

>[!p] Proof
> The congruence $mx \equiv nx \pmod{p}$ means $p \mid (mx - nx) = (m - n)x$. Since $\gcd(p, x) = 1$, we know that $p$ and $x$ share no common prime factors. Therefore, if $p$ divides the product $(m - n)x$, it must divide $(m - n)$ itself. Thus $m \equiv n \pmod{p}$.

Why is the coprimality condition necessary? Consider $3 \cdot 2 \equiv 1 \cdot 2 \pmod{4}$. Both sides equal $2 \pmod{4}$, yet $3 \not\equiv 1 \pmod{4}$. The problem is that $\gcd(4, 2) = 2 \neq 1$.

Here's the payoff: if your modulus $p$ is *prime*, then any nonzero element $x$ is automatically coprime to $p$ (since $p$ has no divisors other than $1$ and itself). So in $\mathbb{Z}_p$ with $p$ prime, you can cancel any nonzero element freely. This is a fundamental property that makes working modulo a prime much nicer than working modulo a composite number.

>[!idea]
> If $\gcd(p, x) = 1$, you can cancel $x$ from a modular equation; when $p$ is prime, all nonzero elements can be cancelled.
