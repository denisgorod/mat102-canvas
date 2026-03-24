---
id: induction-example-divisibility
title: "Induction example: divisibility"
role: bit
group: mathematical-induction
curriculum_path: null
learning_objectives: []
parents:
  - induction-example-inequality
children:
  - id: induction-example-l-tiling
    question: "Can induction prove geometric or combinatorial facts?"
    edge_type: prerequisite
---

Induction works just as well for divisibility. Let's prove that $5 \mid (6^k - 1)$ for all positive integers $k$. (Here "$5 \mid (6^k - 1)$" means "5 divides $6^k - 1$," or equivalently, $6^k - 1$ is a multiple of 5.)

**Base case:** Let $k = 1$. Then $6^1 - 1 = 5$, and clearly $5 \mid 5$.

**Induction step:** Assume $5 \mid (6^k - 1)$ for some positive integer $k$. This means there exists an integer $d$ such that $6^k - 1 = 5d$.

Now consider $6^{k+1} - 1$. You can rewrite it:
$$6^{k+1} - 1 = 6 \cdot 6^k - 1$$

Notice that $6 = 1 + 5$, so:
$$6 \cdot 6^k - 1 = (1 + 5) \cdot 6^k - 1 = 6^k + 5 \cdot 6^k - 1$$

Rearrange:
$$= 5 \cdot 6^k + (6^k - 1)$$

Now apply the induction hypothesis: since $6^k - 1 = 5d$, you have:
$$5 \cdot 6^k + (6^k - 1) = 5 \cdot 6^k + 5d = 5(6^k + d)$$

So $6^{k+1} - 1$ is a multiple of 5, which is exactly what you needed to show.

The key algebraic trick here is recognizing that $6 = 1 + 5$, which allows you to separate the expression into something divisible by 5 and the thing you assumed divisible by 5. This kind of clever manipulation often appears in divisibility proofs.

>[!idea] Induction proves divisibility statements by factoring the induction hypothesis into the next case, allowing the same divisor to carry forward.
