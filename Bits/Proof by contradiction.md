---
id: proof-by-contradiction
title: "Proof by contradiction"
role: bit
group: proof-techniques
curriculum_path: null
learning_objectives: []
children:
  - id: contradiction-is-not-constructive
    question: "Does a contradiction proof tell me which case is true?"
    edge_type: prerequisite
  - id: irrationality-of-sqrt-2
    question: "Can I see contradiction in action on a famous result?"
    edge_type: prerequisite
  - id: ex-no-smallest-positive-real
    question: "Can I prove something doesn't exist using contradiction?"
    edge_type: prerequisite
  - id: ex-intersection-complement-empty
    question: "Can I use contradiction to prove a set identity?"
    edge_type: prerequisite
  - id: ex-contradiction-proofs-hw
    question: "Can I apply contradiction to several different problems?"
    edge_type: prerequisite
parents:
  - what-is-a-proof
  - negating-an-implication
  - proof-by-contrapositive
---

To prove a statement $T$, a proof by contradiction assumes $\neg T$ is true and derives a contradiction — a statement of the form $R \wedge \neg R$, which is always false. Since a true hypothesis ($\neg T$) has led to something false, $\neg T$ must itself be false, so $T$ is true.

You can verify this with a truth table: $T$ and $\neg T \Longrightarrow (R \wedge \neg R)$ are logically equivalent.

>[!s] Proposition
> In the decimal expansion of $\pi$, at least one of the digits $\{0, 1, 2, \ldots, 9\}$ occurs infinitely often.

>[!p] Proof
> Assume for contradiction that each digit appears only finitely many times. Let $N_i$ be the count of digit $i$. Then $\pi$ has $N_0 + N_1 + \cdots + N_9$ digits total — a finite number. A number with a finite decimal expansion is rational. But $\pi$ is irrational — contradiction. $\square$

>[!idea]
> Proof by contradiction works by assuming the negation and deriving a logical impossibility.
