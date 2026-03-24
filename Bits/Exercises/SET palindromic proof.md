---
id: ex-set-palindromic-proof
title: "SET on a palindromic number proof"
role: exercise
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children:
  - id: ex-even-digit-palindromes
    question: "Does this hold for palindromes with more than 4 digits?"
    edge_type: prerequisite
parents:
  - self-explanation-training
  - ex-palindromic-hypothesis
---

Apply self-explanation training to the following proof.

>[!s] Proposition
> Any 4-digit palindromic number is divisible by 11.

>[!p] Proof
> Any 4-digit palindromic number can be written as $\overline{abba}$ for some choice of digits $a$ and $b$, where $a$ and $b$ need not be distinct. We can write this as
> $$\overline{abba} = 1001 \cdot a + 110 \cdot b.$$
> Since $1001 = 11 \cdot 91$ and $110 = 11 \cdot 10$, the above equation can be rewritten as
> $$\overline{abba} = 11 \cdot 91a + 11 \cdot 10b = 11(91a + 10b),$$
> and so $11$ divides $\overline{abba}$.

>[!question] Exercise
> Apply self-explanation training to each line of the proof above. For each step, explain *why* it is true and how it connects to the previous steps.
