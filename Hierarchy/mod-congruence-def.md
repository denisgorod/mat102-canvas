---
id: mod-congruence-def
title: "Congruence modulo n"
role: definition
subject: number-theory
topic: modular-arithmetic
statement: "a ≡ b (mod n) means n ∣ (b − a); equivalently, a and b leave the same remainder on division by n."
depends_on: []
drills:
  - id: reduce
    prompt: 'Compute $%a% \bmod %n%$.'
    vars:
      a: {int: [17, 200]}
      n: {int: [2, 15]}
    answer: 'mod(a,n)'
    type: integer
  - id: congruent
    prompt: 'True or false: $%a% \equiv %b% \pmod{%n%}$?'
    vars:
      a: {int: [10, 99]}
      b: {int: [10, 99]}
      n: {int: [2, 9]}
    answer: 'mod(a-b,n)==0'
    type: boolean
  - id: def
    prompt: 'What does $a \equiv b \pmod{n}$ mean?'
    options:
      - '$n$ divides $a - b$'
      - '$a$ divides $b - n$'
      - '$a$ and $b$ have the same sign'
      - '$ab$ is a multiple of $n$'
    answer: 0
    type: mc
---
>[!d] Definition
> Let $n \in \mathbb{Z}^{+}$. For $a, b \in \mathbb{Z}$, we say $a$ is **congruent to** $b$ **modulo** $n$, written
> $$a \equiv b \pmod{n},$$
> if and only if $n \mid (b - a)$.

>[!s] Proposition (remainder characterization)
> $a \equiv b \pmod{n}$ if and only if $a$ and $b$ have the same remainder when divided by $n$.

>[!p] Proof
> By the division algorithm write $a = q_1 n + r_1$ and $b = q_2 n + r_2$ with $0 \le r_1, r_2 < n$. Then $b - a = (q_2 - q_1)n + (r_2 - r_1)$, so $n \mid (b-a)$ iff $n \mid (r_2 - r_1)$. Since $|r_2 - r_1| < n$, that holds iff $r_1 = r_2$. $\square$
