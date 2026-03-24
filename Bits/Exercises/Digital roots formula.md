---
id: ex-digital-roots
title: "Prove the digital root formula"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - congruence-classes-and-zn
---

The digital root $r(n)$ of a positive integer $n$ is the single digit obtained by recursively summing its digits until one digit remains. For example, $r(15993) = r(1+5+9+9+3) = r(27) = r(2+7) = r(9) = 9$.

Prove that $r(n) = 1 + [(n - 1) \bmod 9]$ for all positive integers $n$.

**Hint:** Show that $n \equiv \text{(sum of digits of } n) \pmod{9}$. This follows because $10 \equiv 1 \pmod{9}$. Then relate the digital root to the remainder when $n$ is divided by 9, handling the special case when the remainder is 0.

>[!question] Exercise
Why does the formula use $(n-1) \bmod 9$ rather than just $n \bmod 9$?
