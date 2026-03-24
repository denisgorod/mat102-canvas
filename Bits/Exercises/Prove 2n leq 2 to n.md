---
id: ex-induction-2n-leq-2n
title: "Prove 2n ≤ 2^n"
role: exercise
group: mathematical-induction
curriculum_path: null
learning_objectives: []
children: []
parents:
  - principle-of-induction
---

Show that $2n \leq 2^n$ for every $n \in \mathbb{Z}^+$ using mathematical induction.

Use the two-step structure: first verify the base case $n=1$, then assume $2k \leq 2^k$ for some positive integer $k$ and show that $2(k+1) \leq 2^{k+1}$. Consider how $2^{k+1}$ relates to $2^k$ and what inequality you can apply to move from the induction hypothesis to the goal.

>[!question] Exercise
>Prove by induction that $2n \leq 2^n$ for all $n \in \mathbb{Z}^+$.
