---
id: lde-particular-solution
title: "LDE particular solution"
role: bit
group: diophantine-equations
curriculum_path: null
learning_objectives: []
children:
  - id: lde-general-solution
    question: "Is there more than one solution?"
    edge_type: prerequisite
  - id: ex-solve-lde-1053-481
    question: "Can I solve another LDE?"
    edge_type: prerequisite
parents:
  - lde-solvability
  - back-substitution
---

Now that you know when a linear Diophantine equation is solvable, the next question is practical: how do you *find* an actual solution?

The recipe combines three tools you already know: the Euclidean algorithm, back-substitution, and scaling. Here's the workflow:

**Step 1:** Run the Euclidean algorithm on $a$ and $b$ to find $d = \gcd(a, b)$.

**Step 2:** If $d \nmid c$, stop—no solutions exist.

**Step 3:** If $d \mid c$, use back-substitution (going backward through the Euclidean algorithm equations) to express $d = am + bn$ for some integers $m$ and $n$.

**Step 4:** Compute $k = c / d$, and multiply: $x_0 = km$, $y_0 = kn$. Then $ax_0 + by_0 = c$.

Let's work through an example: solve $504x + 1155y = 42$. The Euclidean algorithm gives $\gcd(504, 1155) = 21$. Since $21 \mid 42$, a solution exists. Back-substitution yields $21 = 504 \cdot (-16) + 1155 \cdot 7$. Multiplying by $2$ (since $42 = 2 \cdot 21$) gives:

$$504 \cdot (-32) + 1155 \cdot 14 = 42$$

So $(x_0, y_0) = (-32, 14)$ is one particular solution.

>[!idea]
>To find a particular solution to $ax + by = c$: apply the Euclidean algorithm to find $\gcd(a,b)$, use back-substitution to express it as $am + bn$, then scale by $c / \gcd(a,b)$.
