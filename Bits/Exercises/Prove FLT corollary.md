---
id: ex-prove-flt-corollary
title: "Prove Fermat's Little Theorem corollary: a^p ≡ a (mod p)"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fermats-little-theorem
---

Prove that for any integer $a$ and prime $p$, we have $a^p \equiv a \pmod{p}$.

**Note:** Fermat's Little Theorem requires $p \nmid a$. Here there is no such restriction. Consider two cases:
1. When $p \nmid a$, use Fermat's Little Theorem directly.
2. When $p \mid a$, what can you say about $a \pmod{p}$? What about $a^p \pmod{p}$?

Your proof should explain why the restriction from FLT can be dropped here.

>[!question] Exercise
Why does removing the condition $p \nmid a$ require handling the case $p \mid a$ separately?
