---
id: ex-nth-root-of-2-bound
title: "nth root of 2 bound"
role: exercise
group: mathematical-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - induction-example-inequality
---

Show that $\sqrt[n]{2} \leq 1 + \frac{1}{n}$ for all $n \in \mathbb{Z}^+$.

Equivalently, raise both sides to the $n$-th power to get $2 \leq \left(1 + \frac{1}{n}\right)^n$ and prove this by induction.

**Hint**: For the base case $n=1$, check both sides. For the induction step, assume $2 \leq \left(1 + \frac{1}{k}\right)^k$ and show $2 \leq \left(1 + \frac{1}{k+1}\right)^{k+1}$. You may use Bernoulli's inequality, or expand directly and carefully track the inequalities.

>[!question] Exercise
>Prove by induction that $\sqrt[n]{2} \leq 1 + \frac{1}{n}$ for all $n \in \mathbb{Z}^+$.
