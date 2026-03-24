---
id: linear-diophantine-equation
title: "Linear Diophantine Equation"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: lde-solvability
    question: "Which linear Diophantine equations are solvable?"
    edge_type: prerequisite
parents:
  - coprime-divides-product
---

You've been studying the Euclidean algorithm and Bézout's identity, which let you express the greatest common divisor of two numbers as an integer linear combination. A natural next question is: given three integers $a$, $b$, and $d$, can you always find integers $x$ and $y$ satisfying $ax + by = d$?

This is a *linear Diophantine equation*—a linear equation where we seek integer (not just rational or real) solutions. The name honors the ancient Greek mathematician Diophantus, who studied such problems.

Here's the setup: you're given concrete integers $a$, $b$, and $d$. You want to know whether there exist integers $x$ and $y$ such that $ax + by = d$. It's easy to find *rational* solutions—just use algebra. But integers are much more restrictive. For instance, $2x + 4y = 3$ has no integer solutions: the left side is always even, but the right side is odd.

The question that drives the next node is: which values of $a$, $b$, and $d$ guarantee that integer solutions exist?

>[!idea]
>A linear Diophantine equation in two variables has the form $ax + by = d$, where $a, b, d \in \mathbb{Z}$ and we seek integer solutions $(x, y)$.
