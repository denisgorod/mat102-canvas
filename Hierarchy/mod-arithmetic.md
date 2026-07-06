---
id: mod-arithmetic
title: "Arithmetic of congruences"
role: objective
subject: number-theory
topic: modular-arithmetic
statement: "State and prove that congruence is compatible with + and ×, so a ≡ r, b ≡ s (mod n) ⟹ a+b ≡ r+s and ab ≡ rs (mod n)."
depends_on: [mod-equivalence]
drills:
  - id: modsum
    prompt: 'Compute $(%a% + %b%) \bmod %n%$.'
    vars:
      a: {int: [10, 99]}
      b: {int: [10, 99]}
      n: {int: [3, 12]}
    answer: 'mod(a+b,n)'
    type: integer
  - id: modprod
    prompt: 'Compute $(%a% \cdot %b%) \bmod %n%$.'
    vars:
      a: {int: [3, 40]}
      b: {int: [3, 40]}
      n: {int: [3, 12]}
    answer: 'mod(a*b,n)'
    type: integer
---
>[!t] Theorem (compatibility with $+$ and $\times$)
> If $a \equiv r \pmod{n}$ and $b \equiv s \pmod{n}$, then
> $$a + b \equiv r + s \pmod{n} \qquad\text{and}\qquad ab \equiv rs \pmod{n}.$$

>[!p] Proof
> Write $r - a = nk$ and $s - b = n\ell$. Then $(r+s) - (a+b) = n(k + \ell)$, so $n \mid (r+s)-(a+b)$. And $rs - ab = r(s-b) + (r-a)b = n(r\ell + kb)$, so $n \mid rs - ab$. $\square$

>[!objective] Objective
> Given this compatibility, computations may be carried out on remainders instead of on the original (possibly huge) integers — the foundation for every later technique in this topic.
