---
id: card-equal
title: "Equal cardinality"
role: definition
subject: functions
topic: functions-ii
statement: "For sets S and T, |S| = |T| means there exists a bijection S → T; equal cardinality is reflexive, symmetric and transitive, and |S| < |T| means |S| ≤ |T| but not |S| = |T|."
depends_on: [card-leq, fn-invertible-iff-bijective, rel-properties]
---
>[!d] Definition
> For sets $S$ and $T$, $|S| = |T|$ (**equal cardinality**) means that there exists a bijection $S \to T$; and $|S| < |T|$ means $|S| \le |T|$ but not $|S| = |T|$, i.e. there is an injection $S \to T$ but no bijection.

>[!info] Note (properties)
> Equal cardinality is **reflexive** ($\mathrm{id}_S$ is a bijection), **symmetric** (a bijection $f : S \to T$ is invertible, and $f^{-1}$ is a bijection) and **transitive** (composites of bijections are bijections). Since a bijection is an injection, $|S| = |T|$ gives $|S| \le |T|$ and $|T| \le |S|$.

>[!e] Worked example
> With $\mathbb{N} = \{0,1,2,\dots\}$, $f(n) = 2n$ is a bijection $\mathbb{N} \to 2\mathbb{N} = \{0,2,4,\dots\}$: $2n = 2m$ gives $n = m$, and each $2m \in 2\mathbb{N}$ is $f(m)$. So $|2\mathbb{N}| = |\mathbb{N}|$ although $2\mathbb{N} \subsetneq \mathbb{N}$, which no finite set allows.
