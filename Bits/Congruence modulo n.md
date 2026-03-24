---
id: congruence-mod-n
title: "Congruence modulo n"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: congruence-is-equivalence-relation
    question: "Is congruence mod n reflexive, symmetric, and transitive?"
    edge_type: prerequisite
  - id: ex-show-a2-minus-2-not-div-7
    question: "Can congruence help prove a divisibility statement by checking all cases?"
    edge_type: prerequisite
parents:
  - divisibility-definition
  - division-algorithm
---

You've worked with divisibility before, so now let's introduce a powerful language for talking about when two numbers leave the same remainder. We'll call this **congruence modulo n**.

>[!d] Definition
>
>Let $n$ be a positive integer and $a, b$ be any integers. We say that $a$ is **congruent to** $b$ **modulo** $n$, written $a \equiv b \pmod{n}$, if $n \mid (b - a)$.

In other words, two numbers are congruent modulo $n$ when their difference is divisible by $n$—or equivalently, when they leave the same remainder when divided by $n$.

Let's try some examples. Take $n = 4$. Then $1 \equiv 29 \pmod{4}$ because $4 \mid (29 - 1) = 28$. Also $5 \equiv 13 \pmod{4}$ since $4 \mid (13 - 5) = 8$. And $7 \equiv 3 \pmod{4}$ since $4 \mid (3 - 7) = -4$.

You might notice this is just a fancy way of saying that $1$ and $29$ both leave remainder $1$ when divided by $4$. That's exactly right: congruence modulo $n$ is simply the relation "same remainder mod $n$."

This notation will let us treat arithmetic questions about remainders with the precision of the divisibility machinery you already know. Instead of saying "these numbers have the same remainder," you can write a clean equation using the congruence symbol and all the power of divisibility comes along for free.

>[!idea]
>
>Congruence $a \equiv b \pmod{n}$ means $n \mid (b - a)$—two numbers are congruent modulo $n$ exactly when they leave the same remainder when divided by $n$.
