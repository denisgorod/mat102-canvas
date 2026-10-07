---
id: rel-checking
title: "Verifying and refuting relation properties"
role: application
subject: relations
topic: binary-relations
statement: "Each relation property is universally quantified, so it is verified by a proof for arbitrary elements and refuted by one counterexample; e.g. a ∼ b ⟺ ab > 1 on ℝ⁺ is symmetric but not reflexive, total, or transitive."
depends_on: [rel-properties, quant-proof-methods, quant-negation]
---
>[!s] Method
> Each property reads $\forall x \in S,\ P(x)$, with $x$ ranging over elements, pairs or triples of $A$. To **verify** it, fix arbitrary elements and prove $P$. To **refute** it, use $\neg\forall x\, P(x) \equiv \exists x\, \neg P(x)$: one counterexample suffices.

>[!e] Worked example
> On $\mathbb{R}^{+}$ let $a \sim b \iff ab > 1$. **Symmetric:** $ab > 1$ gives $ba = ab > 1$. **Not reflexive:** $0.5 \cdot 0.5 = 0.25 \le 1$. **Not total:** $0.5 \neq 1$ and $0.5 \cdot 1 = 0.5$, so neither $0.5 \sim 1$ nor $1 \sim 0.5$. **Not transitive:** $0.5 \sim 10$ and $10 \sim 0.5$ (product $5$), yet $0.5 \not\sim 0.5$.

>[!warning] Common error
> Instances prove nothing: $2 \sim 3$ and $3 \sim 2$ do not establish symmetry. A transitivity counterexample must satisfy both $a \sim b$ and $b \sim c$.
