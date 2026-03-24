---
id: checking-relation-properties
title: "Checking relation properties"
role: bit
group: binary-relations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - relation-properties-transitive-total
---

To *verify* a property (like reflexivity or symmetry), you must prove it holds for *all* relevant elements. To *disprove* a property, one counterexample suffices.

Example: on $\mathbb{R}^+$, define $a \sim b$ if $ab > 1$.

**Symmetric?** Yes: $ab = ba > 1$, so $a \sim b \Longrightarrow b \sim a$.

**Reflexive?** No: $a = 0.5$ gives $a^2 = 0.25 \not> 1$, so $a \not\sim a$.

**Total?** No: $a = 0.5$, $b = 1$ gives $ab = 0.5$, so neither $a \sim b$ nor $b \sim a$.

**Transitive?** No: $a = c = 0.5$, $b = 10$: $a \sim b$ and $b \sim c$, but $ac = 0.25 < 1$.

>[!idea]
> To verify a relation's property, prove it for all cases; to disprove it, find one counterexample.
