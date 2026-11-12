---
id: ex-r-not-isomorphic-q
title: "R and Q are not isomorphic"
role: exercise
group: isomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - isomorphism-properties
---

You've seen examples of groups that are isomorphic and others that are not. Now prove that two well-known groups are fundamentally different: the additive groups of real numbers and rational numbers are not isomorphic.

**Theorem**: The groups $(\mathbb{R}, +)$ and $(\mathbb{Q}, +)$ are not isomorphic.

To show two groups are not isomorphic, find a property, stated using only the group operation, that one has and the other lacks. Halving will not do: every element of either group is twice some element, since $x = \tfrac{x}{2} + \tfrac{x}{2}$ with $\tfrac{x}{2}$ in the same group.

Instead, write $ma$ for $a + a + \cdots + a$ ($m$ terms) and $(-m)a = -(ma)$, and call two nonzero elements $a, b$ **commensurable** if $ma = nb$ for some nonzero integers $m, n$. For real numbers this says exactly that $a/b$ is rational.

(a) Show that any two nonzero elements of $(\mathbb{Q}, +)$ are commensurable: given $a = p/q$ and $b = r/s$, find nonzero integers $m, n$ with $ma = nb$.

(b) Let $\varphi: G \to H$ be an isomorphism. Show that $\varphi(ma) = m\,\varphi(a)$ for all $m \in \mathbb{Z}$ and $a \in G$, and that $\varphi(a) \neq 0$ whenever $a \neq 0$.

(c) Deduce that if any two nonzero elements of $G$ are commensurable and $G \cong H$, then the same holds in $H$.

(d) Show that $1$ and $\sqrt{2}$ are not commensurable in $(\mathbb{R}, +)$: if $m \cdot 1 = n\sqrt{2}$ with nonzero integers $m, n$, what would follow about $\sqrt{2}$?

(e) Conclude that $(\mathbb{R}, +) \not\cong (\mathbb{Q}, +)$.

>[!question] Exercise
> Prove that $(\mathbb{R}, +)$ and $(\mathbb{Q}, +)$ are not isomorphic.
