---
id: read-direct-proof
title: "Anatomy of a direct proof"
role: objective
subject: reading-mathematics
topic: reading-mathematics
statement: "A direct proof of 'if H then C' assumes H for arbitrary objects, unpacks definitions, computes until C's defining form appears, states C and ends with □, explaining each step in words; e.g. ab = (2m₁)(2m₂) = 2(2m₁m₂) is even."
depends_on: [read-proof, read-even-odd]
---
>[!s] Method
> To prove "if $H$, then $C$" directly:
> 1. **Assume:** introduce arbitrary objects satisfying $H$.
> 2. **Unpack:** rewrite $H$ by the relevant definitions.
> 3. **Compute:** reach the form the definition in $C$ requires.
> 4. **Conclude:** state $C$, citing that definition; end with $\square$.

>[!e] Worked example
> If $a$ and $b$ are even integers, then $ab$ is even.
> *Proof.* Let $a, b$ be even integers. By definition $a = 2m_1$ and $b = 2m_2$ for some $m_1, m_2 \in \mathbb{Z}$. Then
> $$ab = (2m_1)(2m_2) = 2(2m_1m_2),$$
> and $n = 2m_1m_2$ is an integer, as a product of integers. So $ab = 2n$ is even by definition. $\square$

>[!info] Note
> A proof is prose, not a column of equations: each step is stated with its reason, so a careful reader never has to guess.
