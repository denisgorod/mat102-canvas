---
id: lde-solvability
title: "LDE solvability criterion"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: lde-particular-solution
    question: "How do I actually find a solution?"
    edge_type: prerequisite
  - id: ex-prove-lde-solvability
    question: "Can I prove the solvability criterion?"
    edge_type: prerequisite
parents:
  - linear-diophantine-equation
---

You're wondering: given $ax + by = d$, when does this equation have integer solutions?

The answer is surprisingly clean and connects directly to the greatest common divisor. From Bézout's identity, you know that $\gcd(a, b) = am + bn$ for some integers $m$ and $n$. Multiply both sides by $k = \frac{d}{\gcd(a, b)}$ (assuming this is an integer):

$$a(km) + b(kn) = d$$

So if $\gcd(a, b)$ divides $d$, you've just constructed a solution: $x_0 = km$, $y_0 = kn$.

Conversely, suppose a solution exists: $ax_0 + by_0 = d$. Since $\gcd(a, b)$ divides both $a$ and $b$, it divides $ax_0 + by_0 = d$. So $\gcd(a, b) \mid d$ is necessary.

Therefore, the equation $ax + by = d$ has integer solutions if and only if $\gcd(a, b) \mid d$. This criterion tells you exactly which Diophantine equations are solvable—no guesswork required.

>[!t] Theorem
>The linear Diophantine equation $ax + by = d$ (with $a, b, d \in \mathbb{Z}$) has integer solutions if and only if $\gcd(a, b) \mid d$.
