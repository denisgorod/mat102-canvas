---
id: generalized-induction
title: "Generalized induction"
role: bit
group: strong-induction
curriculum_path: null
learning_objectives: []
parents:
  - summation-identity-example
children:
  - id: strong-induction-principle
    question: "What if the induction step needs more than just P(k)?"
    edge_type: prerequisite
---

So far, your base cases have always been $n = 1$. But induction doesn't require that. You can start from any integer.

Suppose you want to prove a statement $P(n)$ for all even integers $n \geq 10$. You don't start with $n = 1$; you start with $n = 10$. The induction step becomes: "If $P(n)$ is true for some even $n \geq 10$, then $P(n+2)$ is true."

This creates the chain:
$$P(10) \Rightarrow P(12) \Rightarrow P(14) \Rightarrow P(16) \Rightarrow \cdots$$

and you reach every even integer $\geq 10$.

**Another example:** Suppose you want to prove $P(n)$ for all integers $n \equiv 1 \pmod{5}$ (that is, all $n$ leaving remainder 1 when divided by 5). You'd start with the base case $P(1)$, then show $P(k) \Rightarrow P(k+5)$, creating the chain:
$$P(1) \Rightarrow P(6) \Rightarrow P(11) \Rightarrow P(16) \Rightarrow \cdots$$

In both cases, you can think of this as a substitution of the standard induction. For example, if you're proving $P(n)$ for even $n \geq 10$, define $Q(m) = P(10 + 2m)$. Then you're really doing standard induction on $Q(m)$ for $m \geq 0$. The base case becomes $Q(0) = P(10)$, and the induction step becomes $Q(m) \Rightarrow Q(m+1)$, which translates to $P(10+2m) \Rightarrow P(10+2(m+1)) = P(12+2m)$.

The point is that **induction applies to any arithmetic progression**, not just $1, 2, 3, \ldots$ You just need a clear base case, a clear induction step that moves from one term to the next, and the knowledge that these steps cover all the integers you care about.

>[!idea] Induction works for any arithmetic progression: pick any starting point as your base case, then show that each step implies the next.
