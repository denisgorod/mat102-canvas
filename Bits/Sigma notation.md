---
id: sigma-notation
title: "Sigma notation"
role: bit
group: summation-notation
curriculum_path: null
learning_objectives: []
parents:
  - induction-example-l-tiling
children:
  - id: summation-identity-example
    question: "How do I prove a summation identity by induction?"
    edge_type: prerequisite
  - id: ex-sum-of-squares
    question: "Can I prove the sum-of-squares formula by induction?"
    edge_type: prerequisite
  - id: ex-gauss-sum
    question: "Can I prove the formula for 1+2+⋯+n?"
    edge_type: prerequisite
  - id: ex-alternating-odd-squares
    question: "Can I discover and prove a formula for an alternating sum?"
    edge_type: prerequisite
  - id: ex-odd-pyramid-sum
    question: "Can I find a formula for the sum of a row in the odd-number pyramid?"
    edge_type: prerequisite
---

When you're writing long sums, notation becomes unwieldy. Imagine trying to write out "$1 + 2 + 3 + \cdots + 100$" every time. Sigma notation (the Greek letter $\Sigma$) is shorthand for sums.

The expression $\sum_{i=n}^{m} r_i$ means: "sum the terms $r_i$ as $i$ goes from $n$ to $m$."

More precisely, you follow a simple algorithm:
1. Set $i = n$ and write down $r_i$.
2. Increment $i$ by 1 and add $r_i$ to the running sum.
3. Repeat step 2 until $i = m$.

The result is:
$$\sum_{i=n}^{m} r_i = r_n + r_{n+1} + r_{n+2} + \cdots + r_m$$

The variable $i$ is called the *summation index* (or dummy index—it's just a placeholder). The values $n$ and $m$ are the *summation bounds*, and $r_i$ is the *summand*.

If you're comfortable with programming, think of this as a for-loop:
```
sum = 0
for i from n to m:
    sum = sum + r_i
return sum
```

**Example:** $\sum_{i=1}^{5} i^2$ means $1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 1 + 4 + 9 + 16 + 25 = 55$.

**Another example:** $\sum_{k=0}^{n} 2^k$ means $2^0 + 2^1 + 2^2 + \cdots + 2^n$.

The index is arbitrary—you can call it $i$, $k$, $j$, whatever you like. What matters is the lower and upper bounds and the formula you're summing. Sigma notation becomes invaluable in induction proofs where you need to manipulate sums carefully.

>[!idea] Sigma notation $\sum_{i=n}^{m} r_i$ is compact shorthand for the sum $r_n + r_{n+1} + \cdots + r_m$, and it behaves like a for-loop.
