---
id: strong-induction-postage-stamps
title: "Strong induction postage stamps"
role: bit
group: strong-induction
curriculum_path: null
learning_objectives: []
parents:
  - strong-induction-principle
children:
  - id: ex-marble-game
    question: "Can strong induction prove a game-theoretic result?"
    edge_type: prerequisite
  - id: ex-binary-representation
    question: "Can strong induction show every integer has a binary representation?"
    edge_type: prerequisite
  - id: recursive-definitions
    question: "Can we define mathematical objects using a base case and a building rule?"
    edge_type: prerequisite
---

Here's a concrete example where strong induction is essential.

**Claim:** Any postage amount of 8 cents or more can be made using 3-cent and 5-cent stamps.

With regular induction, you'd be stuck. If you assume you can make $k$ cents and want to prove you can make $k+1$ cents, you'd need to know that $k-2$ cents is achievable (so you can add a 3-cent stamp). But if $k = 1$ or $k = 2$, then $k - 2 \leq 0$, and you're outside your domain.

Strong induction rescues you. Let $P(n)$ be "$n$ cents can be made with 3-cent and 5-cent stamps."

**Base cases:** You need to check several to get the argument off the ground:
- $P(8)$: $8 = 3 + 5$ ✓
- $P(9)$: $9 = 3 + 3 + 3$ ✓
- $P(10)$: $10 = 5 + 5$ ✓

**Induction step:** Assume $P(1), P(2), \ldots, P(k)$ are all true for some $k \geq 10$. You want to show $P(k+1)$.

Write $k + 1 = (k - 2) + 3$. Since $k \geq 10$, we have $k - 2 \geq 8$, so by the induction hypothesis, $P(k-2)$ is true. This means you can make $k-2$ cents. Add one 3-cent stamp, and you've made $(k-2) + 3 = k+1$ cents.

Therefore $P(k+1)$ is true.

By strong induction, $P(n)$ is true for all $n \geq 8$.

Notice why this needs strong induction: the trick of writing $k+1 = (k-2) + 3$ requires you to know the result for $k-2$, which might be far earlier than $k$. Regular induction only promises the result for $k$, so you'd get stuck.

The multiple base cases (8, 9, 10) are necessary to ensure the induction step "kicks in" once it reaches $k = 10$. For $n < 8$, the statement is simply false (you can make 3, 5, 6, but not 1, 2, 4, 7), so the claim doesn't apply there.

>[!idea] Strong induction often requires multiple base cases to ensure the induction step has enough "room" to work with, especially when the step refers to earlier cases beyond the immediate predecessor.
