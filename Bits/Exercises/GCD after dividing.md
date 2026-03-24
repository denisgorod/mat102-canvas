---
id: ex-gcd-after-dividing
title: "GCD after dividing"
role: exercise
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children: []
parents:
  - bezout-corollaries
---

Suppose $a, b \in \mathbb{Z}$ and let $d = \gcd(a, b)$. Show that
$$\gcd\left(\frac{a}{d}, \frac{b}{d}\right) = 1$$

In other words, after dividing both $a$ and $b$ by their gcd, the resulting numbers are coprime.

**Hint:** Use Bézout's Identity to write $am + bn = d$ for some integers $m, n$. Then divide the equation by $d$ and think about what divisibility properties the quotients must satisfy.

>[!question] Exercise
Why does dividing out the gcd leave us with coprime numbers?
