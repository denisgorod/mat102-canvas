---
id: induction-example-inequality
title: "Induction example: inequality"
role: bit
group: mathematical-induction
curriculum_path: null
learning_objectives: []
parents:
  - principle-of-induction
children:
  - id: induction-example-divisibility
    question: "Can induction prove divisibility results too?"
    edge_type: prerequisite
  - id: ex-bernoullis-inequality
    question: "Can I prove a more general inequality by induction?"
    edge_type: prerequisite
  - id: ex-nth-root-of-2-bound
    question: "Can induction prove bounds involving roots or powers?"
    edge_type: prerequisite
---

Let's see induction in action. You want to prove that $2n + 2 \leq 4n$ for every positive integer $n$.

**Base case:** Let $n = 1$. Then $2(1) + 2 = 4$ and $4(1) = 4$, so $4 \leq 4$ is true.

**Induction step:** Assume the statement is true for some positive integer $k$; that is, assume $2k + 2 \leq 4k$. Now you need to show that $2(k+1) + 2 \leq 4(k+1)$.

Start with the right side of what you want to prove:
$$4(k+1) = 4k + 4$$

Now use your induction hypothesis. Since $2k + 2 \leq 4k$, you know $4k \geq 2k + 2$. Therefore:
$$4k + 4 \geq (2k + 2) + 4$$

Since $4 \geq 2$, you have $(2k + 2) + 4 \geq 2k + 2 + 2 = 2(k+1) + 2$.

Chaining these together:
$$4(k+1) = 4k + 4 \geq (2k + 2) + 4 \geq 2k + 2 + 2 = 2(k+1) + 2$$

So if the inequality holds at $k$, it holds at $k+1$. Combined with the base case, it holds for all positive integers.

Notice how the induction hypothesis appears in the middle—you couldn't finish the proof without it. That's the power of the method: you don't need to prove the result "from scratch" for $k+1$; you build on what you already know about $k$.

>[!idea] A concrete induction proof has two parts: verify the base case by direct computation, then use the induction hypothesis to bridge from $k$ to $k+1$.
