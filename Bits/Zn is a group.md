---
id: zn-is-a-group
title: "Z_n is a group under addition"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: ex-z6-multiplicative-subgroup
    question: "Can a subset of Z_n be a group under multiplication instead?"
    edge_type: prerequisite
parents:
  - group-definition
  - congruence-classes-and-zn
---

You know $\mathbb{Z}_n$ well by now: the set of congruence classes $\{[0], [1], \ldots, [n-1]\}$ under addition modulo $n$. Let's verify that $(\mathbb{Z}_n, +)$ is actually a group.

**Associativity:** Addition of congruence classes is defined as $[a] + [b] = [a + b]$. We need $[a] + ([b] + [c]) = ([a] + [b]) + [c]$.

$$[a] + ([b] + [c]) = [a] + [b + c] = [a + (b + c)] = [(a + b) + c] = [a + b] + [c] = ([a] + [b]) + [c]$$

The middle steps work because addition of integers is associative. So addition of congruence classes inherits associativity automatically.

**Identity:** The element $[0]$ is the identity. For any $[a]$, we have $[0] + [a] = [0 + a] = [a]$ and $[a] + [0] = [a + 0] = [a]$.

**Inverses:** For any $[a] \in \mathbb{Z}_n$, the inverse is $[-a]$. Note that $[-a]$ is the same as $[n - a]$ (since $-a \equiv n - a \pmod{n}$), so the inverse is indeed in $\mathbb{Z}_n$. We have

$$[a] + [-a] = [a + (-a)] = [0] = e$$

and similarly $[-a] + [a] = [0]$.

So all three axioms are satisfied. $(\mathbb{Z}_n, +)$ is a group.

In an additive group, we usually write $a + a + a = 3a$ rather than $a^3$. Similarly, the inverse of $[a]$ is written $-[a]$ instead of $[a]^{-1}$, and we write $0$ for the identity instead of $e$.

>[!idea]
The congruence classes $\mathbb{Z}_n$ form a group under addition modulo $n$ — associativity is inherited from the integers, $[0]$ is the identity, and $[-a]$ is the inverse of $[a]$.
