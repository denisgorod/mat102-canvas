---
id: read-proof-generality
title: "Generality in proofs"
role: objective
subject: reading-mathematics
topic: reading-mathematics
statement: "Reasoning about arbitrary objects, using only what the hypothesis grants, proves a result for all objects satisfying it; checking particular values does not. Unneeded hypotheses can be dropped: if a is even, ab is even for every integer b."
depends_on: [read-direct-proof]
---
>[!s] Method
> Name objects satisfying the hypothesis by unspecified symbols ($a = 2k$, $b = 2\ell$ with $k, \ell \in \mathbb{Z}$), never by values ($a = 4$, $b = 6$), and use only what the hypothesis grants; the argument then covers every admissible choice at once. Afterwards, note which hypotheses were needed; unneeded ones may be dropped.

>[!e] Worked example
> In the even-product proof, $a = 2k$ alone suffices. **Proposition.** If $a$ is even and $b \in \mathbb{Z}$, then $ab$ is even.
> *Proof.* Write $a = 2k$ with $k \in \mathbb{Z}$. Then $ab = 2(kb)$ and $kb \in \mathbb{Z}$, so $ab$ is even. $\square$

>[!warning] Common error
> Checking cases such as $2 \cdot 4 = 8$ and $6 \cdot 8 = 48$ and calling the claim proved. Examples prove nothing about unchecked cases, though one counterexample refutes a general claim.
