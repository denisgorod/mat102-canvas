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

Suppose, for contradiction, that there exists an isomorphism $\varphi: \mathbb{R} \to \mathbb{Q}$.

Consider the equation $x + x = a$ in $\mathbb{R}$ for any $a \in \mathbb{R}$. This equation always has a solution: $x = a/2$.

(a) Show that for any $a \in \mathbb{R}$, there exists $x \in \mathbb{R}$ such that $x + x = a$. What is $x$?

(b) Now apply $\varphi$ to both sides of the equation $x + x = a$. What equation do you get in $\mathbb{Q}$?

(c) Use the fact that $\varphi$ is a homomorphism to rewrite your equation in terms of $\varphi(x)$ and $\varphi(a)$.

(d) Show that the division-by-2 map on $\mathbb{Q}$ is surjective: for every $q \in \mathbb{Q}$, there exists $r \in \mathbb{Q}$ with $r + r = q$.

(e) Now derive a contradiction. If $\varphi$ is surjective, then $\varphi$ maps $\mathbb{R}$ onto all of $\mathbb{Q}$. But what does your work above say about which elements of $\mathbb{Q}$ can be reached by applying the division-by-2 map starting from arbitrary rationals?

Hint: Think carefully about what rational numbers can be written as $p/q$ where both $p$ and $q$ are even, versus which rationals have an "odd part" somewhere in their numerator or denominator.

>[!question] Exercise
> Prove that $(\mathbb{R}, +)$ and $(\mathbb{Q}, +)$ are not isomorphic.
