---
id: divisibility-definition
title: "Divisibility definition"
role: bit
group: divisibility
curriculum_path: null
learning_objectives: []
children:
  - id: basic-divisibility-properties
    question: "What can we deduce from divisibility alone?"
    edge_type: prerequisite
  - id: ex-divisibility-and-zero
    question: "What happens when zero is involved?"
    edge_type: prerequisite
  - id: congruence-mod-n
    question: "What if we only care about remainders, not exact divisibility?"
    edge_type: prerequisite
parents:
  - ex-divisibility-examples
---

We've worked with divisibility informally before—saying that 4 divides 12 because $12 = 4 \cdot 3$. Now let's pin down exactly what we mean.

Suppose you're a merchant with bolts of fabric. If you have 12 meters and want to cut them into sections of 4 meters each, you can do it evenly with no leftover. On the other hand, if you try to cut 12 meters into sections of 5 meters, you'll have material left over. This is the key intuition behind divisibility.

>[!d] Definition
>
>Let $a, b \in \mathbb{Z}$. We say that $a$ is **divisible by** $b$ (or that $b$ **divides** $a$) if there exists some $k \in \mathbb{Z}$ such that $a = bk$. We write $b \mid a$ to indicate that $b$ divides $a$, and $b \nmid a$ to indicate that $b$ does not divide $a$.

So $4 \mid 12$ because we can write $12 = 4 \cdot 3$. And $5 \nmid 12$ because there is no integer $k$ with $12 = 5k$.

Notice that the definition doesn't require $a$ and $b$ to be positive. For instance, $(-3) \mid 12$ because $12 = (-3) \cdot (-4)$. The beauty of this definition is that it works for abstract statements too. Can you convince yourself that $k \mid (k^2 + k)$ for any integer $k$? If so, what value of the multiplier would you use?

>[!idea]
>
>Divisibility $b \mid a$ simply means $a = bk$ for some integer $k$—a clean, algebraic way to capture "no remainder."
