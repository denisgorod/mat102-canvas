---
id: mod-lastdigit
title: "Last-digit computation"
role: application
subject: number-theory
topic: modular-arithmetic
statement: "The last digit of an integer m is m mod 10; combined with compatibility, aᵏ mod 10 is found by reducing at each step."
depends_on: [mod-arithmetic]
drills:
  - id: lastdigit
    prompt: 'What is the last digit of $%a%^{%k%}$?'
    vars:
      a: {int: [2, 39]}
      k: {int: [2, 60]}
    answer: 'modpow(a,k,10)'
    type: integer
---
>[!s] Application
> The last (units) digit of an integer $m$ is $m \bmod 10$. Because congruence is compatible with multiplication,
> $$a^{k} \bmod 10 = \big((a \bmod 10)^{k}\big) \bmod 10,$$
> so the last digit of a large power is found by repeatedly multiplying and reducing modulo $10$ — never forming $a^{k}$ itself.

>[!e] Worked example
> $4^{441} \bmod 10$: the powers of $4$ modulo $10$ cycle $4, 6, 4, 6, \dots$ with period $2$. Since $441$ is odd, $4^{441} \equiv 4 \pmod{10}$, so the last digit is $\mathbf{4}$.
