---
id: mod-inverses
title: "Multiplicative inverses in ℤₙ"
role: theorem
subject: number-theory
topic: modular-arithmetic
statement: "[a] is invertible in ℤₙ iff gcd(a,n)=1; the inverse is computed from a Bézout identity au+nv=1."
depends_on: [mod-zn]
drills:
  - id: inverse
    prompt: 'Find $x$ with $0 \le x < %n%$ and $%a%\,x \equiv 1 \pmod{%n%}$.'
    vars:
      a: {int: [2, 20]}
      n: {int: [3, 21]}
    where: 'gcd(a,n)==1'
    inputs: [x]
    answer: 'mod(a*x, n) == 1'
    witness: {x: 'inverse(a, n)'}
    type: predicate
---
>[!t] Theorem
> Let $n \in \mathbb{Z}^{+}$ and $a \in \mathbb{Z}$. The class $[a]$ has a multiplicative inverse in $\mathbb{Z}_n$ if and only if $\gcd(a, n) = 1$. When it exists, the inverse is unique.

>[!p] Proof
> ($\Leftarrow$) If $\gcd(a,n)=1$, Bézout gives $u, v$ with $au + nv = 1$, so $au \equiv 1 \pmod n$ and $[u] = [a]^{-1}$. ($\Rightarrow$) If $[a][u]=[1]$ then $au - 1 = nk$, so any common divisor of $a$ and $n$ divides $1$; hence $\gcd(a,n)=1$. Uniqueness follows from cancellation. $\square$

>[!e] Method
> Compute the inverse with the extended Euclidean algorithm on $a$ and $n$ to obtain $u, v$ with $au + nv = 1$; then $[a]^{-1} = [u \bmod n]$.
