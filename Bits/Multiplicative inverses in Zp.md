---
id: multiplicative-inverses-in-zp
title: "Multiplicative inverses in Zp"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: ex-find-inverse-in-z41
    question: "Can I compute a specific inverse in Z_p?"
    edge_type: prerequisite
parents:
  - fermats-little-theorem-corollary
  - ex-coprime-modular-inverse
---

Earlier you saw that in $\mathbb{Z}_4$, the element $[2]$ has no multiplicative inverse—there's no way to multiply it by something and get $[1]$. But when the modulus is prime, something magical happens.

>[!t] Theorem
> If $p$ is prime, every nonzero element of $\mathbb{Z}_p$ has a multiplicative inverse.

>[!p] Proof
> Let $p$ be prime and $[a]$ be a nonzero element of $\mathbb{Z}_p$. By Fermat's Little Theorem, since $p \nmid a$:
> $$a \cdot a^{p-2} = a^{p-1} \equiv 1 \pmod{p}$$
>
> Therefore, $[a^{p-2}]$ is the multiplicative inverse of $[a]$ in $\mathbb{Z}_p$.

This gives a constructive formula: to find the inverse of $[a]$ in $\mathbb{Z}_p$, simply compute $a^{p-2} \pmod{p}$.

There's an alternative approach that doesn't require Fermat's theorem: use Bézout's identity. Since $p$ is prime and $a \not\equiv 0 \pmod{p}$, we have $\gcd(a, p) = 1$. By Bézout, there exist integers $m$ and $n$ such that $am + pn = 1$. Reducing modulo $p$, we get $am \equiv 1 \pmod{p}$, so $[m]$ is the inverse of $[a]$.

Compare this to $\mathbb{Z}_4$: $[2]$ has no inverse because $\gcd(2, 4) = 2 \neq 1$. The fundamental difference is that when $p$ is prime, every nonzero element is coprime to $p$, guaranteeing an inverse exists.

>[!idea]
> In $\mathbb{Z}_p$ for prime $p$, every nonzero element $[a]$ has a unique multiplicative inverse: $[a]^{-1} = [a^{p-2}]$.
