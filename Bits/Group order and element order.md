---
id: group-order-and-element-order
title: "Group order and element order"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: order-divides-exponent
    question: "When does g^k equal the identity?"
    edge_type: prerequisite
  - id: subgroup-definition
    question: "Can a subset of a group be a group in its own right?"
    edge_type: prerequisite
  - id: ex-order-of-ab-equals-ba
    question: ""
    edge_type: prerequisite
parents:
  - basic-group-properties
---

Once you have a group, you can start measuring it. There are two key notions of "size."

**Order of a group:** The **order** of a group $G$ is simply its cardinality, denoted $|G|$. For example, $|\mathbb{Z}_8| = 8$ and $|S_3| = 6$.

**Order of an element:** For an element $g \in G$, the **order** of $g$ is the smallest positive integer $n$ such that $g^n = e$. If no such $n$ exists (i.e., $g^k \neq e$ for all positive $k$), we say $g$ has **infinite order**.

Let's see some examples.

In $\mathbb{Z}_8$ under addition, what is the order of $[3]$? We compute:
- $[3]^1 = [3]$
- $[3]^2 = [3] + [3] = [6]$
- $[3]^3 = [6] + [3] = [9] = [1]$
- $[3]^4 = [1] + [3] = [4]$
- $[3]^5 = [4] + [3] = [7]$
- $[3]^6 = [7] + [3] = [10] = [2]$
- $[3]^7 = [2] + [3] = [5]$
- $[3]^8 = [5] + [3] = [8] = [0]$

So $[3]$ has order 8. Every power of $[3]$ cycles through all elements of $\mathbb{Z}_8$.

In $\mathbb{Z}_8$ under addition, the order of $[2]$ is:
- $[2]^1 = [2]$
- $[2]^2 = [4]$
- $[2]^3 = [6]$
- $[2]^4 = [8] = [0]$

So $[2]$ has order 4.

In $D_3$, the rotation $r$ has order 3 (since $r^3 = e$), and the reflection $s$ has order 2 (since $s^2 = e$).

In $(\mathbb{Z}, +)$, every nonzero element has infinite order. For instance, $1 + 1 + 1 + \cdots$ never reaches $0$ (the identity in additive notation).

The order of an element is a fundamental way to understand the group's structure. It tells you how the element "cycles" under repeated application.

>[!idea]
> The order of a group is its size; the order of an element $g$ is the smallest positive $n$ with $g^n = e$, or $\infty$ if no such $n$ exists — it measures how the element repeats under the group operation.
