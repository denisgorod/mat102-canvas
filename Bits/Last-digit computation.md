---
id: last-digit-computation
title: "Last-digit computation"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - arithmetic-of-congruences
---

Finding the last digit of a number is a practical application of modular arithmetic: the last digit of any integer $n$ is exactly $n \bmod 10$.

So if you want the last digit of a large power like $4^{441}$, you need to compute $4^{441} \pmod{10}$.

Here's how you do it: use the fact that congruences are preserved under multiplication. Instead of computing $4^{441}$ (astronomically large), you compute only the remainders at each step.

Start by looking for a pattern in powers of $4$ modulo $10$:
- $4^1 \equiv 4 \pmod{10}$
- $4^2 \equiv 16 \equiv 6 \pmod{10}$
- $4^3 \equiv 4 \cdot 6 \equiv 24 \equiv 4 \pmod{10}$
- $4^4 \equiv 4 \cdot 4 \equiv 16 \equiv 6 \pmod{10}$

The pattern repeats every 2 steps! Since $441 = 2 \cdot 220 + 1$ is odd, we have $4^{441} \equiv 4^1 \equiv 4 \pmod{10}$.

For more complex exponents, you can also decompose the exponent and use repeated squaring. For instance, $4^{441} = (4^3)^{147} \equiv 4^{147} \pmod{10}$. Then $4^{147} = (4^2)^{73} \cdot 4 \equiv 6^{73} \cdot 4 \pmod{10}$. Continue breaking down the exponent and reducing modulo $10$ at each step.

The key is: you never compute the full number, only its remainder after dividing by $10$. This makes even impossible-to-calculate exponents tractable.

>[!idea]
> The last digit of $n$ is $n \bmod 10$, and you can find it by computing with remainders using modular arithmetic.
