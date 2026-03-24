---
id: congruence-classes-and-zn
title: "Congruence classes and Zn"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: modular-cancellation-lemma
    question: "Can we cancel common factors in a modular equation?"
    edge_type: prerequisite
  - id: ex-last-digits
    question: "Can I compute last digits of large powers using Z_10?"
    edge_type: prerequisite
  - id: ex-digital-roots
    question: "Can modular arithmetic explain the digit-sum trick?"
    edge_type: prerequisite
  - id: ex-nine-divides-10n-minus-1
    question: "Does 9 always divide 10^n − 1?"
    edge_type: prerequisite
  - id: ex-squares-mod-4
    question: "What are the possible remainders of n² when divided by 4?"
    edge_type: prerequisite
  - id: zn-is-a-group
    question: "Does Z_n with its addition form a group?"
    edge_type: prerequisite
parents:
  - arithmetic-of-congruences
  - equivalence-classes
---

Now that you know congruence is an equivalence relation, let's examine its equivalence classes.

For a fixed positive integer $n$, the *congruence class* of an integer $a$ is:
$$[a]_n = \{x \in \mathbb{Z} : x \equiv a \pmod{n}\}$$

In other words, $[a]_n$ contains all integers that leave the same remainder as $a$ when divided by $n$.

How many such classes are there? Well, when you divide any integer by $n$, the remainder can only be $0, 1, 2, \ldots, n-1$. So there are exactly $n$ equivalence classes: $[0]_n, [1]_n, \ldots, [n-1]_n$. Every integer belongs to one of these classes.

The set of all congruence classes modulo $n$ is denoted:
$$\mathbb{Z}_n = \mathbb{Z}/n\mathbb{Z} = \{[0]_n, [1]_n, \ldots, [n-1]_n\}$$

Because congruence is compatible with addition and multiplication (from the previous bit), you can create addition and multiplication tables for $\mathbb{Z}_n$ just like you would for regular integers.

For $\mathbb{Z}_4$, the addition table is:

| + | $[0]_4$ | $[1]_4$ | $[2]_4$ | $[3]_4$ |
|:---:|:---:|:---:|:---:|:---:|
| $[0]_4$ | $[0]_4$ | $[1]_4$ | $[2]_4$ | $[3]_4$ |
| $[1]_4$ | $[1]_4$ | $[2]_4$ | $[3]_4$ | $[0]_4$ |
| $[2]_4$ | $[2]_4$ | $[3]_4$ | $[0]_4$ | $[1]_4$ |
| $[3]_4$ | $[3]_4$ | $[0]_4$ | $[1]_4$ | $[2]_4$ |

And the multiplication table:

| $\times$ | $[0]_4$ | $[1]_4$ | $[2]_4$ | $[3]_4$ |
|:---:|:---:|:---:|:---:|:---:|
| $[0]_4$ | $[0]_4$ | $[0]_4$ | $[0]_4$ | $[0]_4$ |
| $[1]_4$ | $[0]_4$ | $[1]_4$ | $[2]_4$ | $[3]_4$ |
| $[2]_4$ | $[0]_4$ | $[2]_4$ | $[0]_4$ | $[2]_4$ |
| $[3]_4$ | $[0]_4$ | $[3]_4$ | $[2]_4$ | $[1]_4$ |

Notice something striking: in the multiplication table, some elements have multiplicative inverses. For example, $[3]_4 \cdot [3]_4 = [1]_4$, so $[3]_4$ is its own inverse. But $[2]_4$ has no multiplicative inverse—there is no class $[x]_4$ such that $[2]_4 \cdot [x]_4 = [1]_4$. This asymmetry will become crucial when the modulus is prime.

>[!idea]
> $\mathbb{Z}_n$ has exactly $n$ congruence classes, and we can perform arithmetic operations on them—but multiplicative inverses don't always exist.
