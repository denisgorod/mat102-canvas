---
id: ex-find-inverse-in-z41
title: "Find the multiplicative inverse of [22] in Z₄₁"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - multiplicative-inverses-in-zp
---

Find the multiplicative inverse of $[22]$ in $\mathbb{Z}_{41}$. That is, find an integer $x$ with $0 \le x < 41$ such that $22x \equiv 1 \pmod{41}$.

**Two approaches:**
1. **Fermat's Little Theorem:** Since 41 is prime and $\gcd(22, 41) = 1$, we have $22^{39} \equiv 1 \pmod{41}$. Thus $22^{-1} \equiv 22^{38} \pmod{41}$. Compute this by repeated squaring.
2. **Euclidean Algorithm:** Use the extended Euclidean algorithm to write $1 = 41s + 22t$ for some integers $s, t$. Then $t$ is the desired inverse (after reducing modulo 41).

Show your work and verify your answer by computing $22 \cdot x \pmod{41}$.

>[!question] Exercise
Which method is more efficient for computing this particular inverse?
