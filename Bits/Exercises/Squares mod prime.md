---
id: ex-squares-mod-prime
title: "Squares congruent mod a prime imply bases congruent to ±"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - modular-cancellation-lemma
  - prime-divisibility-property
---

Let $p$ be a prime.

(a) Show that if $a^2 \equiv b^2 \pmod{p}$, then $a \equiv b \pmod{p}$ or $a \equiv -b \pmod{p}$.

**Hint:** Factor: $a^2 - b^2 = (a-b)(a+b)$. Since $p$ is prime and $p \mid (a-b)(a+b)$, use the prime divisibility property.

(b) Show that the statement in part (a) does **not** hold when $p$ is composite.

**Hint:** Find a concrete counterexample. For instance, try $p = 8$, and look for integers $a, b$ with $a \not\equiv \pm b \pmod{8}$ but $a^2 \equiv b^2 \pmod{8}$.

>[!question] Exercise
Why is the primality of $p$ essential to part (a)?
