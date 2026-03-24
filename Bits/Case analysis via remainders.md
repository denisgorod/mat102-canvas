---
id: case-analysis-via-remainders
title: "Case analysis via remainders"
role: bit
group: gcd-and-euclidean-algorithm
curriculum_path: null
learning_objectives: []
children:
  - id: ex-factor-n-cubed-minus-n
    question: "Is there a faster proof using factoring?"
    edge_type: prerequisite
  - id: ex-four-divides-odd-squared-minus-one
    question: "Can I use remainders for other divisibility problems?"
    edge_type: prerequisite
parents:
  - division-algorithm
---

The Division Algorithm tells us that every integer $n$ can be written as $n = qb + r$ for one of finitely many remainders $r \in \{0, 1, \ldots, b-1\}$. This is surprisingly useful: if you want to prove a divisibility fact that seems hard to handle directly, sometimes breaking into cases by remainder makes it obvious.

For instance, suppose you want to prove that $3 \mid (n^3 - n)$ for all integers $n$. A direct algebraic assault might not be obvious. But by the Division Algorithm, every integer satisfies one of:
$$n = 3q_0, \quad n = 3q_1 + 1, \quad n = 3q_2 + 2$$

Now substitute each case into $n^3 - n$:

**Case 1:** $n = 3q_0$ gives
$$n^3 - n = 27q_0^3 - 3q_0 = 3(9q_0^3 - q_0).$$

**Case 2:** $n = 3q_1 + 1$ gives
$$n^3 - n = 27q_1^3 + 27q_1^2 + 6q_1 = 3(9q_1^3 + 9q_1^2 + 2q_1).$$

**Case 3:** $n = 3q_2 + 2$ gives
$$n^3 - n = 27q_2^3 + 54q_2^2 + 33q_2 + 6 = 3(9q_2^3 + 18q_2^2 + 11q_2 + 2).$$

In all three cases, $3 \mid (n^3 - n)$. Done.

This technique—splitting into residue classes—is one of the most practical tools in elementary number theory. It turns a general statement into a finite number of explicit checks.

>[!idea]
>
>Case analysis via remainders: to prove a divisibility property holds for all $n$, use the Division Algorithm to write $n$ in each residue class mod $b$, then verify the property for each case.
