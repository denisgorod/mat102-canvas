---
id: fermats-little-theorem-corollary
title: "Fermat's Little Theorem corollary"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: multiplicative-inverses-in-zp
    question: "Can Fermat's theorem produce multiplicative inverses?"
    edge_type: prerequisite
parents:
  - fermats-little-theorem
---

Fermat's Little Theorem required the restriction that $p \nmid a$. But there's an elegant extension that removes this restriction entirely.

>[!s] Corollary
> For any integer $a$ and any prime $p$, $a^p \equiv a \pmod{p}$.

To see why, consider two cases:

**Case 1: $p \nmid a$** (the hypothesis of Fermat's Little Theorem holds)
By Fermat's Little Theorem, $a^{p-1} \equiv 1 \pmod{p}$. Multiply both sides by $a$:
$$a^p = a \cdot a^{p-1} \equiv a \cdot 1 = a \pmod{p}$$

**Case 2: $p \mid a$** (so $a \equiv 0 \pmod{p}$)
Then $a^p \equiv 0^p = 0 \equiv a \pmod{p}$.

In both cases, $a^p \equiv a \pmod{p}$, regardless of whether $p$ divides $a$.

This corollary is remarkable because it applies universally—no exceptions, no conditions. It says that every integer, when raised to the $p$-th power, returns to itself modulo any prime $p$. This kind of universal property often signals that something fundamental is at play.

>[!idea]
> For any prime $p$ and any integer $a$, we have $a^p \equiv a \pmod{p}$ (with no restrictions on $a$).
