---
id: q-star-is-a-group
title: "Q* is a group under multiplication"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: ex-why-not-q-with-zero
    question: "What goes wrong if we include zero?"
    edge_type: prerequisite
parents:
  - group-definition
---

Let $\mathbb{Q}^* = \mathbb{Q} \setminus \{0\}$ be the set of all nonzero rational numbers. Let's check that $(\mathbb{Q}^*, \times)$ is a group under multiplication.

**Associativity:** Multiplication of rationals is associative. So for $a, b, c \in \mathbb{Q}^*$, we have
$$a \cdot (b \cdot c) = (a \cdot b) \cdot c.$$

**Identity:** The number $1$ is the multiplicative identity. For any $a \in \mathbb{Q}^*$, we have $1 \cdot a = a$ and $a \cdot 1 = a$.

**Inverses:** For any nonzero rational $\frac{p}{q}$, the multiplicative inverse is $\frac{q}{p}$. Both are nonzero, so $\frac{q}{p} \in \mathbb{Q}^*$. We have
$$\frac{p}{q} \cdot \frac{q}{p} = 1.$$

All three axioms are satisfied. $(\mathbb{Q}^*, \times)$ is a group.

Here's something important: we *must* exclude zero. Why? Because zero has no multiplicative inverse. There is no rational number $b$ such that $0 \cdot b = 1$. If we tried to include $0$ in our group, the inverse axiom would fail. The group structure forces us to leave zero out.

This is a general pattern. When building a multiplicative group, you must always exclude zero (if it's an element of your set). Division by zero is not optional — it's a consequence of the group axioms.

>[!idea]
> The nonzero rationals form a group under multiplication: associativity is inherited, $1$ is the identity, and every nonzero rational has a multiplicative inverse. Zero must be excluded because it has no inverse.
