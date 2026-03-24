---
id: ex-fibonacci-closed-form
title: "Fibonacci closed form"
role: exercise
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fibonacci-sequence
  - strong-induction-principle
---

Define the Fibonacci sequence by $x_1 = x_2 = 1$ and $x_n = x_{n-1} + x_{n-2}$ for $n \geq 3$. Define:
$$\alpha_+ = \frac{1 + \sqrt{5}}{2}, \quad \alpha_- = \frac{1 - \sqrt{5}}{2}$$

Show by strong induction that $$x_n = \frac{\alpha_+^n - \alpha_-^n}{\sqrt{5}}$$ for all $n \in \mathbb{Z}^+$.

Use two base cases ($n=1$ and $n=2$). For the induction step, assume the formula holds for all $j \leq n$, then verify it for $n+1$ using the recurrence. Note that $\alpha_+$ and $\alpha_-$ are the roots of $x^2 - x - 1 = 0$, so $\alpha_{\pm}^2 = \alpha_{\pm} + 1$.

>[!question] Exercise
>Prove by strong induction that the Fibonacci numbers satisfy $x_n = \frac{\alpha_+^n - \alpha_-^n}{\sqrt{5}}$.
