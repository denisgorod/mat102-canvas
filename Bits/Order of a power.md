---
id: order-of-a-power
title: "Order of a power"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: ex-prove-order-of-power
    question: ""
    edge_type: prerequisite
parents:
  - order-divides-exponent
---

You know that $g$ has order $n$. Now consider $g^k$ for some integer $k$. What is the order of $g^k$?

**Proposition:** If $g$ has order $n$, then
$$|g^k| = \frac{n}{\gcd(n, k)}.$$

Let $d = \gcd(n, k)$. Write $n = da$ and $k = db$ where $\gcd(a, b) = 1$. Then
$$(g^k)^a = (g^{db})^a = g^{dab} = g^{ndb/d} = g^{nb} = (g^n)^b = e^b = e.$$

So $(g^k)^a = e$, which means $|g^k|$ divides $a = \frac{n}{d}$.

Conversely, suppose $(g^k)^m = e$, meaning $g^{km} = e$. By the previous result, $n \mid km$. Write $n = da$ and $k = db$ with $\gcd(a, b) = 1$. Then $da \mid dbm$, which simplifies to $a \mid bm$. Since $\gcd(a, b) = 1$, we have $a \mid m$. So every $m$ with $(g^k)^m = e$ satisfies $a \mid m$, which means $|g^k| \geq a$.

Combining both directions: $|g^k| = a = \frac{n}{d} = \frac{n}{\gcd(n, k)}$.

**What does this mean?** The order of $g^k$ is determined by the gcd of $k$ with the original order $n$. When $\gcd(n, k) = 1$ (i.e., $k$ and $n$ are coprime), the order of $g^k$ is still $n$. But as $\gcd(n, k)$ grows, the order of $g^k$ shrinks proportionally.

For example, in $\mathbb{Z}_{12}$ under addition, the element $[1]$ has order 12. What is the order of $[4]$? We have $\gcd(12, 4) = 4$, so $|[4]| = \frac{12}{4} = 3$. Indeed, $[4]^3 = [12] = [0]$.

This formula connects combinatorics (the gcd) with group structure (element order) in a elegant way.

>[!idea]
If $g$ has order $n$, then the order of $g^k$ is $\frac{n}{\gcd(n,k)}$ — the common factors between $k$ and $n$ reduce the order proportionally.
