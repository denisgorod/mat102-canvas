---
id: ex-show-a2-minus-2-not-div-7
title: "Show: if a² − 2 not divisible by 7, then a − 4 not divisible by 7"
role: exercise
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - congruence-mod-n
---

Show that if $a^2 - 2$ is not divisible by 7, then $a - 4$ is not divisible by 7.

**Approach:** Check all residue classes modulo 7. For each residue class $a \equiv r \pmod{7}$ where $r \in \{0, 1, 2, 3, 4, 5, 6\}$, compute $a^2 - 2 \pmod{7}$. Observe which residues make $a^2 - 2 \equiv 0 \pmod{7}$ and which make $a - 4 \equiv 0 \pmod{7}$. Then verify the contrapositive: if $a \equiv 4 \pmod{7}$, then $a^2 - 2 \equiv 0 \pmod{7}$.

>[!question] Exercise
Which residue class(es) mod 7 satisfy $a^2 - 2 \equiv 0 \pmod{7}$?
