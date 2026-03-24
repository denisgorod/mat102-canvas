---
id: proof-by-contrapositive
title: "Proof by contrapositive"
role: bit
group: quantifiers-and-implications
curriculum_path: null
learning_objectives: []
children:
  - id: proof-by-contradiction
    question: "Is there a proof technique even stronger than contrapositive?"
    edge_type: prerequisite
parents:
  - contrapositive-of-an-implication
---

Since $P \Longrightarrow Q$ and $\neg Q \Longrightarrow \neg P$ are logically equivalent, to prove $P \Longrightarrow Q$ you may equivalently prove $\neg Q \Longrightarrow \neg P$.

>[!s] Proposition
> Let $n$ be an integer. If $n^2$ is even, then $n$ is even.

>[!p] Proof
> We prove the contrapositive: if $n$ is not even (i.e., $n$ is odd), then $n^2$ is not even (i.e., $n^2$ is odd). Suppose $n$ is odd, so $n = 2k+1$ for some integer $k$. Then
> $$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,$$
> which is odd. $\square$

The contrapositive reformulation ("if $n$ is odd then $n^2$ is odd") was much more natural to prove directly than the original statement. This is often the case.

>[!idea]
> To prove $P \Longrightarrow Q$, you can instead prove $\neg Q \Longrightarrow \neg P$ — sometimes the contrapositive direction is easier to establish directly.
