---
id: quant-proof-methods
title: "Proving quantified statements"
role: objective
subject: quantifiers-and-implications
topic: quantifiers-and-implications
statement: "To prove ∀x ∈ S, P(x), fix an arbitrary x ∈ S and prove P(x) using only that x ∈ S; to prove ∃x ∈ S, P(x), exhibit one specific witness x₀ ∈ S and verify P(x₀)."
depends_on: [quant-forall, quant-exists, read-proof-generality]
---
>[!s] Method
> - To prove $\forall x \in S,\ P(x)$: let $x \in S$ be **arbitrary** and prove $P(x)$ using only that $x \in S$. By Generality in proofs, this covers all of $S$.
> - To prove $\exists x \in S,\ P(x)$: exhibit one specific **witness** $x_0 \in S$ and verify $P(x_0)$.

>[!e] Worked example
> $\forall x,y\in\mathbb{Q},\ x+y\in\mathbb{Q}$: for arbitrary $x, y \in \mathbb{Q}$ write $x = a/b$, $y = c/d$ with $a,b,c,d \in \mathbb{Z}$, $b,d \neq 0$. Then $x+y = (ad+bc)/(bd)$ with $ad+bc,\, bd \in \mathbb{Z}$, $bd \neq 0$, so $x+y \in \mathbb{Q}$. And $\exists x,y\in\mathbb{Z}^{+},\ x/y\in\mathbb{Z}^{+}$: the witness $(4,2)$ gives $4/2 = 2 \in \mathbb{Z}^{+}$.

>[!warning] Common error
> Checking examples does not prove a $\forall$ statement: unchecked elements may fail. In an $\exists$ proof, "let $x$ satisfy $P(x)$" is no witness; it assumes the existence being proved.
