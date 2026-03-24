---
id: irrationality-of-sqrt-2
title: "The irrationality of √2"
role: bit
group: proof-techniques
curriculum_path: null
learning_objectives: []
children:
  - id: ex-contradiction-proofs-hw
    question: "Can I generalize the √2 argument to other primes?"
    edge_type: prerequisite
  - id: ex-no-rational-cubic-solution
    question: "Can I show other equations have no rational solutions?"
    edge_type: prerequisite
parents:
  - proof-by-contradiction
  - ex-even-iff-square-even
  - standard-number-sets
---

>[!s] Proposition
> The number $\sqrt{2}$ is irrational.

>[!p] Proof
> Assume for contradiction that $\sqrt{2}$ is rational, and write $\sqrt{2} = p/q$ where $\gcd(p,q) = 1$ (lowest terms). Squaring: $2q^2 = p^2$. Since $2q^2$ is even, $p^2$ is even. By a previous result, $p$ is even, so $p = 2k$. Substituting:
> $$2q^2 = (2k)^2 = 4k^2 \implies q^2 = 2k^2.$$
> So $q^2$ is even, hence $q$ is even. But then both $p$ and $q$ are even, contradicting $\gcd(p,q) = 1$. $\square$

This proof uses the fact that $n^2$ even implies $n$ even (proved by contrapositive). It's one of the most famous proofs in mathematics: clean, ancient, and utterly convincing. The argument relies on the greatest-common-divisor assumption — that you can always reduce a fraction to lowest terms — and the divisibility properties of even numbers.

>[!idea]
> The irrationality of $\sqrt{2}$ is proved by contradiction: assuming it's rational leads to a violation of "lowest terms."
