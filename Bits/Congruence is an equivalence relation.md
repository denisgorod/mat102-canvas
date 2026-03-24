---
id: congruence-is-equivalence-relation
title: "Congruence is an equivalence relation"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: arithmetic-of-congruences
    question: "Can we add and multiply congruences?"
    edge_type: prerequisite
parents:
  - congruence-mod-n
  - what-is-an-equivalence-relation
---

You've seen equivalence relations before. They're relations that are reflexive, symmetric, and transitive. Now we'll check that congruence modulo $n$ is one of them.

>[!s] Proposition
>
>For any positive integer $n$, congruence modulo $n$ is an equivalence relation.

Let me verify each property.

>[!p] Proof (Reflexive)
>
>Fix any integer $a$. We need to show $a \equiv a \pmod{n}$. This means we need $n \mid (a - a) = 0$. Since every integer divides zero, this is true.

>[!p] Proof (Symmetric)
>
>Suppose $a \equiv b \pmod{n}$, so $n \mid (b - a)$. We need to show $b \equiv a \pmod{n}$, meaning $n \mid (a - b)$. But $a - b = -(b - a)$, and if $n$ divides $(b - a)$, it also divides its negative. Done.

>[!p] Proof (Transitive)
>
>Suppose $a \equiv b \pmod{n}$ and $b \equiv c \pmod{n}$. This means $n \mid (b - a)$ and $n \mid (c - b)$. We need $n \mid (c - a)$. Notice:
>$$c - a = (c - b) + (b - a)$$
>Since $n$ divides both terms on the right, it divides their sum. Thus $n \mid (c - a)$, as required.

Because congruence modulo $n$ is an equivalence relation, it partitions the integers into equivalence classes—groups of integers that are all congruent to each other. This structure will let us build a new arithmetic system.

>[!idea]
>
>Congruence modulo $n$ is reflexive, symmetric, and transitive, making it a true equivalence relation that partitions the integers by their remainders.
