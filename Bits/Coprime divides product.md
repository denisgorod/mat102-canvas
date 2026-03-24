---
id: coprime-divides-product
title: "Coprime divides product"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: linear-diophantine-equation
    question: "When does an integer equation ax+by=d have integer solutions?"
    edge_type: prerequisite
  - id: prime-divisibility-property
    question: "How does coprimality relate to primes?"
    edge_type: prerequisite
  - id: lde-general-solution
    question: "How does coprimality help parametrize solutions?"
    edge_type: prerequisite
  - id: ex-prove-coprime-divides-product
    question: "Can I prove this myself using Bézout?"
    edge_type: prerequisite
  - id: modular-cancellation-lemma
    question: "Can coprimality let us cancel in modular equations?"
    edge_type: prerequisite
parents:
  - bezouts-identity
---

Suppose you've just learned that two numbers are coprime—their greatest common divisor is 1. You know from Bézout's identity that this means you can write $\gcd(a, b) = am + bn = 1$ for some integers $m$ and $n$. Now a natural question arises: if $a$ divides a product $bc$, and $a$ is coprime to $b$, what can you say about whether $a$ divides $c$?

The answer is intuitive. Since $a$ is coprime to $b$, the two numbers share no prime factors. So if $a$ divides the product $bc$, all the prime factors of $a$ must come from $c$—there's nowhere else for them to go. Therefore, $a$ must divide $c$.

Let's prove this using Bézout. Start with the identity $am + bn = 1$. Multiply both sides by $c$:

$$a(cm) + bc(n) = c$$

Now, $a$ divides the left side: it divides both $a(cm)$ (obviously) and $bc(n)$ (because $a \mid bc$). So $a$ divides the entire left side. But the left side equals $c$, so $a \mid c$.

This fact is surprisingly powerful. It connects divisibility (which tells you about structure) to coprimality (which tells you about shared factors). You'll soon use it to solve Diophantine equations and to understand the behavior of prime numbers.

>[!d] Definition
>If $a \mid bc$ and $\gcd(a, b) = 1$, then $a \mid c$.
