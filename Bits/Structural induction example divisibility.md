---
id: structural-induction-example-divisibility
title: "Structural induction example: divisibility"
role: bit
group: recursion-and-structural-induction
curriculum_path: null
learning_objectives: []
parents:
  - structural-induction-principle
children:
  - id: ex-structural-induction-pairs
    question: "Can I apply structural induction to pairs of integers?"
    edge_type: prerequisite
  - id: ex-balanced-parentheses
    question: "Can structural induction prove a property of formal strings?"
    edge_type: prerequisite
  - id: ex-binary-string-reversal
    question: "Can structural induction prove a property about string operations?"
    edge_type: prerequisite
---

Let's prove a concrete result using structural induction.

**Definition:** Define $S$ recursively:
- **Basis:** $3 \in S$.
- **Constructor:** If $a, b \in S$, then $a + b \in S$.

**Claim:** $3 \mid s$ for every $s \in S$ (that is, every element of $S$ is divisible by 3).

**Proof by structural induction:**

**Base case:** The only basis element is 3. Clearly, $3 \mid 3$, so the property holds for the basis.

**Constructor step:** Assume $a, b \in S$ and that $P$ holds for both: $3 \mid a$ and $3 \mid b$. You need to show $3 \mid (a + b)$.

Since $3 \mid a$, there exists an integer $m$ such that $a = 3m$. Since $3 \mid b$, there exists an integer $n$ such that $b = 3n$. Therefore:
$$a + b = 3m + 3n = 3(m + n)$$

This shows $3 \mid (a + b)$, so the property is preserved by the constructor.

**Conclusion:** By structural induction, $3 \mid s$ for every element $s \in S$.

The proof mirrors the structure of the definition: you handle the basis, then you handle the constructor. No need to worry about indices or dominos. You just trace through *how* elements are built and verify that the property survives each construction step.

Note that the set $S$ consists exactly of all positive multiples of 3: $\{3, 6, 9, 12, \ldots\}$. This proof shows why: every element is built from 3 by adding, so every element is a sum of 3's, hence a multiple of 3.

>[!idea] Structural induction proves a property by checking the basis and verifying that each constructor preserves the property—exactly mirroring how the recursive set is built.
