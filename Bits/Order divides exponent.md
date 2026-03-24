---
id: order-divides-exponent
title: "Order divides exponent"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: order-of-a-power
    question: "What is the order of g^k?"
    edge_type: prerequisite
  - id: ex-order-disjoint-cycles
    question: ""
    edge_type: prerequisite
parents:
  - group-order-and-element-order
---

You have an element $g \in G$ with order $n$ (meaning $g^n = e$ and no smaller positive power works). Now ask: for which integers $k$ is $g^k = e$?

The answer is elegant: **$g^k = e$ if and only if $n \mid k$** (read "$n$ divides $k$").

**Proof of $(\Rightarrow)$:** Assume $g^k = e$. Use the Division Algorithm to write $k = nq + r$ where $0 \le r < n$. Then
$$g^k = g^{nq + r} = (g^n)^q \cdot g^r = e^q \cdot g^r = g^r.$$

Since $g^k = e$, we have $g^r = e$. But the order of $g$ is $n$, which means $g^m \neq e$ for all $0 < m < n$. Since $0 \le r < n$ and $g^r = e$, we must have $r = 0$. Therefore $k = nq$, so $n \mid k$.

**Proof of $(\Leftarrow)$:** Assume $n \mid k$, so $k = nq$ for some integer $q$. Then
$$g^k = g^{nq} = (g^n)^q = e^q = e.$$

This is a powerful criterion. It says that the divisors of $n$ are exactly the exponents that "hit" the identity. In $\mathbb{Z}_8$ under addition, the order of $[2]$ is 4, so $[2]^k = [0]$ precisely when $4 \mid k$, i.e., when $k \in \{\ldots, -4, 0, 4, 8, 12, \ldots\}$.

The fact that divisibility determines which powers equal the identity reveals a deep connection between the arithmetic of exponents and the group structure itself.

>[!idea]
If $g$ has order $n$, then $g^k = e$ if and only if $n$ divides $k$ — the exponents that yield the identity are exactly the multiples of the order.
