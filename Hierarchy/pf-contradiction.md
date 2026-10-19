---
id: pf-contradiction
title: "Proof by contradiction"
role: objective
subject: relations
topic: proof-techniques
statement: "To prove a statement T, assume ¬T and derive a contradiction R ∧ ¬R; this is valid because ¬T ⟹ (R ∧ ¬R) is logically equivalent to T, and it may prove that something exists without identifying it."
depends_on: [impl-def]
---
>[!s] Method
> To prove $T$: assume $\neg T$, derive some statement $R$ and also $\neg R$, and conclude $T$. This is valid because $R \wedge \neg R$ is always false, so by the definition of implication $\neg T \implies (R \wedge \neg R)$ is true exactly when $\neg T$ is false:
> $$\big(\neg T \implies (R \wedge \neg R)\big) \equiv T.$$

>[!e] Worked example
> **Claim.** If $x$ is irrational, some digit occurs infinitely often in its decimal expansion. Suppose not: each digit $i$ occurs $N_i$ times, $N_i$ finite. Then the expansion has $N_0 + \dots + N_9$ digits, so it terminates and $x = m/10^{k}$ for integers $m, k$: rational, a contradiction.

>[!info] Note (non-constructive)
> The proof names no digit. For $x = \pi$, whether every digit occurs infinitely often is an open problem.
