---
id: group-definition
title: "Group definition"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: zn-is-a-group
    question: "Is Z_n a group?"
    edge_type: prerequisite
  - id: q-star-is-a-group
    question: "Are the nonzero rationals a group under multiplication?"
    edge_type: prerequisite
  - id: abelian-groups
    question: "What if the group operation is also commutative?"
    edge_type: prerequisite
  - id: basic-group-properties
    question: "What can we deduce from the group axioms alone?"
    edge_type: prerequisite
  - id: ex-inverse-power-identity
    question: ""
    edge_type: prerequisite
  - id: ex-odd-integers-not-group
    question: ""
    edge_type: prerequisite
  - id: ex-group-check-four
    question: ""
    edge_type: prerequisite
parents:
  - binary-operator-identity
  - inverse-with-respect-to-operator
---

You've been working with numbers and operations for a while now. You've seen addition and multiplication, and you've learned which properties they satisfy. Now you're ready for an abstraction: a **group** is a set with an operation that behaves *very nicely*.

Here's the formal definition. A group is a pair $(G, \cdot)$ where $G$ is a set and $\cdot$ is a binary operator satisfying three axioms:

1. **Associativity:** For every $a, b, c \in G$, we have $a \cdot (b \cdot c) = (a \cdot b) \cdot c$.
2. **Identity:** There exists an element $e \in G$ (the *identity*) such that $e \cdot a = a \cdot e = a$ for all $a \in G$.
3. **Inverses:** For every $a \in G$, there exists an element $b \in G$ (the *inverse* of $a$, written $a^{-1}$) such that $a \cdot b = b \cdot a = e$.

That's it. Just three rules. But they're very powerful.

When we write in the language of groups, we use some convenient notation. We write $a^n$ to mean $a \cdot a \cdot \ldots \cdot a$ ($n$ times). We write $a^{-1}$ for the inverse. And we define $a^0 = e$ (the identity).

Notice what the axioms *don't* require: they don't require the operation to be commutative (you might have $a \cdot b \neq b \cdot a$). They don't require $G$ to be finite. They don't require the operation to be the usual arithmetic we're used to.

The beauty of this abstraction is that $Z_n$ under addition is a group. So is the set of nonzero rationals under multiplication. So is the set of all bijections of a set under composition. All of them satisfy these same three axioms. Once you prove something using only the axioms, it automatically applies to all of them.

>[!idea]
> A group is a set with an associative operation, an identity element, and inverses for every element — these three properties unlock a vast landscape of mathematical structures.
