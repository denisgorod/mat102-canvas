---
id: definitions-vs-intuition
title: "Definitions vs intuition"
role: bit
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children:
  - id: ex-quirky-number-result
    question: "What can I say about quirky numbers using only the definition?"
    edge_type: prerequisite
  - id: what-is-a-set
    question: "How do mathematicians organize the objects they define?"
    edge_type: prerequisite
parents:
  - what-is-a-definition
---

Your intuition will betray you. Intuition is built from experience with common cases, and mathematics has a way of asking about edge cases and strange corners where intuition fails.

Suppose someone asks: "Is $0$ even?" Your intuition might hesitate — zero is weird. But the definition settles it instantly. An integer $n$ is even if $n = 2m$ for some integer $m$. Take $m = 0$. Then $0 = 2 \cdot 0$. So $0$ is even. Done.

Here is another example: "How many holes does a straw have?" The answer depends entirely on *which definition of hole you use*. Topologically, a straw has one hole. But if you define a hole as "a point you can poke through", you might count two (top and bottom). Intuition gives you arguing — definition gives you truth.

In mathematics, always return to the definition. Do not trust what feels right.

Here is a new definition to practice with:

>[!d] Definition
An integer $n$ is **quirky** if $n^2$ is not even.

Try some examples. Is $1$ quirky? Then $1^2 = 1$. Is $1$ even? No (since $1 \neq 2m$ for any integer $m$). So $1^2$ is not even. Therefore $1$ is quirky. ✓

Is $2$ quirky? Then $2^2 = 4 = 2 \cdot 2$, so $4$ is even. So $2^2$ is even, which means $2$ is *not* quirky.

Try to find more examples and non-examples. What pattern do you notice? Always return to the definition, not your intuition.

>[!idea]
Intuition is built from common cases and often fails at edges. Always apply the definition precisely, even when it contradicts what feels right.
