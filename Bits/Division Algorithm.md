---
id: division-algorithm
title: "Division Algorithm"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: case-analysis-via-remainders
    question: "How can remainders help prove divisibility results?"
    edge_type: prerequisite
  - id: gcd-definition
    question: "Is there a way to measure the common structure between two numbers?"
    edge_type: prerequisite
  - id: congruence-mod-n
    question: "Can we formalize the idea that two numbers give the same remainder?"
    edge_type: prerequisite
parents:
  - well-ordering-principle
---

You learned long ago that $5 \nmid 12$ because dividing 12 by 5 leaves a remainder. We can write $12 = 5 \cdot 2 + 2$. But is this always possible? Can we always split an integer into a quotient and remainder?

The Division Algorithm says yes—and proves it using the Well-Ordering Principle.

>[!t] Theorem
>
>Let $a, b \in \mathbb{Z}$ with $b > 0$. There exist unique integers $q$ and $r$ such that
>$$a = qb + r \quad \text{where} \quad 0 \leq r < b.$$
>We call $q$ the **quotient** and $r$ the **remainder**.

Here's the proof strategy: think of the number line with ticks spaced every $b$ units starting at $a$. Among all these positions, find the one that lands in the interval $[0, b)$. That's your remainder.

>[!p] Proof
>
>Define $S = \{a - kb : k \in \mathbb{Z}\}$—the set of values we get by stepping backward and forward in multiples of $b$ from $a$. At least one element is nonnegative: if $a \geq 0$ we're done; otherwise $a - ab = a(1-b) \geq 0$ since $a < 0$ and $1 - b < 0$.
>
>Let $\hat{S} = \{x \in S : x \geq 0\}$. This is a nonempty subset of $\mathbb{Z}^+$, so by the Well-Ordering Principle it has a least element $r$. Let $q$ be the integer such that $r = a - qb$.
>
>We have $0 \leq r$ by construction. If $r \geq b$, then $0 \leq r - b < r$ and $r - b = a - (q+1)b \in \hat{S}$, contradicting minimality of $r$. Thus $0 \leq r < b$. Uniqueness follows because if two pairs $(q, r)$ and $(\tilde{q}, \tilde{r})$ both satisfy the conditions with $r \neq \tilde{r}$, their difference $b|r - \tilde{r}|$ would contradict $0 \leq |r - \tilde{r}| < b$.

The Division Algorithm is what makes WOP practical: it gives us a systematic way to break any problem into cases based on remainders.

>[!idea]
>
>The Division Algorithm formalizes remainders: any integer $a$ can be uniquely written as $a = qb + r$ with $0 \leq r < b$, turning intuition about remainders into a theorem proven by WOP.
