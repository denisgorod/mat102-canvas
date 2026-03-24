---
id: ex-squares-mod-4
title: "Show that squares are congruent to 0 or 1 modulo 4"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - congruence-classes-and-zn
---

Prove that for any positive integer $n$, we have $n^2 \equiv 0 \pmod{4}$ or $n^2 \equiv 1 \pmod{4}$.

**Approach:** Consider all four residue classes modulo 4. For each residue class $n \equiv r \pmod{4}$ where $r \in \{0, 1, 2, 3\}$, compute $n^2 \pmod{4}$ and observe which classes appear. Since any integer falls into one of these four classes, you have checked all cases.

Alternatively, note that any integer is either even or odd, and handle each case separately.

>[!question] Exercise
Why is this a complete proof even though there are infinitely many integers?
