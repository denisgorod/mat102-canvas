---
id: back-substitution
title: "Back-substitution technique"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: ex-solve-bezout-equation
    question: "Can I apply back-substitution to another example?"
    edge_type: prerequisite
  - id: lde-particular-solution
    question: "Can I use back-substitution to solve Diophantine equations?"
    edge_type: prerequisite
parents:
  - bezouts-identity
---

Bézout's Identity promises that we can write $\gcd(a, b) = am + bn$ for some integers $m$ and $n$. But how do we *find* them? The answer lies in unwinding the Euclidean Algorithm backward, substituting each remainder in terms of the previous ones. This technique is called **back-substitution**.

Here's the idea: as you run the Euclidean Algorithm, you get a chain of equations
$$a = q_1 b + r_1, \quad b = q_2 r_1 + r_2, \quad \ldots, \quad r_{n-1} = q_{n+1} r_n + 0.$$

The last nonzero remainder $r_n$ is the gcd. Now start from that last equation and work backward, solving for each remainder in terms of earlier remainders. Each substitution pushes you closer to expressing the gcd in terms of $a$ and $b$ alone.

**Example:** Find integers $m, n$ such that $616m + 427n = 7$.

From our earlier Euclidean Algorithm computation:
$$\begin{align}
616 &= 427 \cdot 1 + 189 \tag{1}\\
427 &= 189 \cdot 2 + 49 \tag{2}\\
189 &= 49 \cdot 3 + 42 \tag{3}\\
49 &= 42 \cdot 1 + 7 \tag{4}\\
42 &= 7 \cdot 6 + 0
\end{align}$$

Start from equation (4): $7 = 49 - 42 \cdot 1$. Now substitute $42 = 189 - 49 \cdot 3$ from (3):
$$7 = 49 - (189 - 49 \cdot 3) \cdot 1 = 49 \cdot 4 - 189.$$

Substitute $49 = 427 - 189 \cdot 2$ from (2):
$$7 = (427 - 189 \cdot 2) \cdot 4 - 189 = 427 \cdot 4 - 189 \cdot 9.$$

Finally, substitute $189 = 616 - 427 \cdot 1$ from (1):
$$7 = 427 \cdot 4 - (616 - 427 \cdot 1) \cdot 9 = 616 \cdot (-9) + 427 \cdot 13.$$

So $m = -9$ and $n = 13$. Check: $616 \cdot (-9) + 427 \cdot 13 = -5544 + 5551 = 7$. ✓

>[!idea]
>
>Back-substitution unwinds the Euclidean Algorithm to find Bézout coefficients: substitute each remainder in terms of earlier ones, working backward until you express the gcd as a combination of $a$ and $b$.
