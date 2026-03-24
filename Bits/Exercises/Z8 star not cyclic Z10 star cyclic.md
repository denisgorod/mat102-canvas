---
id: ex-z8-not-cyclic-z10-cyclic
title: "Z_8* not cyclic, Z_10* cyclic"
role: exercise
group: cyclic-groups
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cyclic-group-definition
---

Not every group is cyclic. You're going to construct explicit examples of cyclic and nonabelian groups to see the difference.

**Part A: $\mathbb{Z}_8^*$ is NOT cyclic.**

$\mathbb{Z}_8^*$ is the set of units modulo 8: $\{1, 3, 5, 7\}$. Check the order of each element under multiplication mod 8. (Recall: the order of $a$ is the smallest positive $n$ with $a^n \equiv 1 \pmod{8}$.)

If $\mathbb{Z}_8^*$ were cyclic, at least one element would have order 4 (the size of the group). But compute: $3^2 \equiv 9 \equiv 1$, $5^2 \equiv 25 \equiv 1$, $7^2 \equiv 49 \equiv 1$. Every nontrivial element has order 2. So there's no generator.

**Part B: $\mathbb{Z}_{10}^*$ IS cyclic.**

$\mathbb{Z}_{10}^*$ is $\{1, 3, 7, 9\}$. Compute the powers of 3 modulo 10: $3^1, 3^2, 3^3, 3^4$. Does 3 generate the entire group?

>[!question] Exercise
> Show that $\mathbb{Z}_8^*$ is not cyclic. Then show that $\mathbb{Z}_{10}^*$ is cyclic and find a generator.
