---
id: summation-identity-example
title: "Summation identity via induction"
role: bit
group: summation-notation
curriculum_path: null
learning_objectives: []
parents:
  - sigma-notation
children:
  - id: generalized-induction
    question: "What if the base case isn't n=1?"
    edge_type: prerequisite
---

Now that you have sigma notation, you can use induction to prove summation formulas.

**Claim:** For all positive integers $k$,
$$\sum_{n=1}^{k} \frac{1}{n(n+1)} = \frac{k}{k+1}$$

**Base case:** Let $k = 1$. The left side is:
$$\sum_{n=1}^{1} \frac{1}{n(n+1)} = \frac{1}{1 \cdot 2} = \frac{1}{2}$$

The right side is $\frac{1}{1+1} = \frac{1}{2}$. They match, so the base case holds.

**Induction step:** Assume the formula holds for some positive integer $k$:
$$\sum_{n=1}^{k} \frac{1}{n(n+1)} = \frac{k}{k+1}$$

Now you need to show it holds for $k+1$. Consider:
$$\sum_{n=1}^{k+1} \frac{1}{n(n+1)}$$

Separate the last term from the sum:
$$\sum_{n=1}^{k+1} \frac{1}{n(n+1)} = \sum_{n=1}^{k} \frac{1}{n(n+1)} + \frac{1}{(k+1)(k+2)}$$

Apply the induction hypothesis to the first part:
$$= \frac{k}{k+1} + \frac{1}{(k+1)(k+2)}$$

Find a common denominator:
$$= \frac{k(k+2)}{(k+1)(k+2)} + \frac{1}{(k+1)(k+2)} = \frac{k(k+2) + 1}{(k+1)(k+2)}$$

Simplify the numerator:
$$= \frac{k^2 + 2k + 1}{(k+1)(k+2)} = \frac{(k+1)^2}{(k+1)(k+2)} = \frac{k+1}{k+2}$$

This is exactly what you needed to prove. The key technique here is *peeling off the last term*—this isolates the place where your induction hypothesis applies.

>[!idea] To prove a summation identity by induction, peel off the last term from the sum and use the induction hypothesis to simplify the remaining part.
