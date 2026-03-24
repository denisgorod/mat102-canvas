---
id: ex-bernoullis-inequality
title: "Bernoulli's Inequality"
role: exercise
group: mathematical-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - induction-example-inequality
---

**Bernoulli's Inequality**: Show that $(1+x)^n \geq 1+nx$ for all $x \geq -1$ and $n \in \mathbb{Z}^+$.

Proceed by induction on $n$. For the base case, verify the inequality at $n=1$. For the induction step, assume $(1+x)^k \geq 1+kx$ and consider $(1+x)^{k+1} = (1+x) \cdot (1+x)^k$. Multiply the induction hypothesis by $(1+x)$ (being careful about the sign) and simplify.

This inequality has deep connections to compound interest and exponential growth.

>[!question] Exercise
>Prove by induction that $(1+x)^n \geq 1+nx$ for all $x \geq -1$ and $n \in \mathbb{Z}^+$.
