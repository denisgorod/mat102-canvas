---
id: ex-seven-divides-sum
title: "Does 7 divide 3²⁰⁰¹ + 4²⁰⁰¹?"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fermats-little-theorem
---

Determine whether $7 \mid (3^{2001} + 4^{2001})$.

**Strategy:** Use Fermat's Little Theorem. Since 7 is prime, we have $3^6 \equiv 1 \pmod{7}$ and $4^6 \equiv 1 \pmod{7}$ (because $7 \nmid 3$ and $7 \nmid 4$). Reduce the exponents: write $2001 = 6q + r$ where $0 \le r < 6$. Then $3^{2001} = (3^6)^q \cdot 3^r \equiv 1^q \cdot 3^r \equiv 3^r \pmod{7}$, and similarly for $4^{2001}$.

Compute $r$, then find $3^r \pmod{7}$ and $4^r \pmod{7}$, and determine whether their sum is divisible by 7.

>[!question] Exercise
How does Fermat's Little Theorem let us reduce a huge exponent to a much smaller one?
