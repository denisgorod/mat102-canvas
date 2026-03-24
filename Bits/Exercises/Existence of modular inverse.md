---
id: ex-coprime-modular-inverse
title: "Existence of a modular inverse"
role: exercise
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: multiplicative-inverses-in-zp
    question: "When does every nonzero element have a modular inverse?"
    edge_type: prerequisite
parents:
  - bezout-corollaries
---

Let $n \in \mathbb{Z}^+$ with $n \geq 2$. Show that for any $a \in \mathbb{Z}$ with $\gcd(a, n) = 1$, there exists $b \in \mathbb{Z}$ such that $n \mid (ab - 1)$.

In other words, if $a$ is coprime to $n$, then $a$ has a multiplicative inverse modulo $n$.

**Hint:** Apply Bézout's Identity to $a$ and $n$. What does the Bézout relation tell you about integers $m, n$ satisfying $am + bn = 1$?

>[!question] Exercise
How does coprimality guarantee the existence of a modular inverse?
