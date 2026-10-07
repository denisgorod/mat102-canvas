---
id: card-leq
title: "Comparing cardinalities"
role: definition
subject: functions
topic: functions-ii
statement: "For sets S and T, |S| ≤ |T| means there exists an injection S → T; this comparison is reflexive and transitive, and S ⊆ T implies |S| ≤ |T| via the inclusion map."
depends_on: [fn-composition-preserves]
---
>[!d] Definition
> For sets $S$ and $T$, $|S| \le |T|$ means that there exists an injection $f : S \to T$.

>[!info] Note (properties)
> The comparison is **reflexive**, as $\mathrm{id}_S$ is injective, and **transitive**, as a composite of injections is an injection. If $S \subseteq T$, the inclusion $x \mapsto x$ is injective, so $|S| \le |T|$. A surjection $f : S \to T$ gives $|T| \le |S|$: choosing for each $t \in T$ some $g(t) \in S$ with $f(g(t)) = t$ defines $g : T \to S$, injective since $f \circ g = \mathrm{id}_T$ is.

>[!e] Worked example
> $s \mapsto -3s$ injects $\{1,2,3\}$ into $\{-3,-6,-9,-12\}$, as $-3s_1 = -3s_2$ gives $s_1 = s_2$, matching $3 \le 4$. With $\mathbb{N} = \{0,1,2,\dots\}$, the inclusions $\mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R}$ give $|\mathbb{N}| \le |\mathbb{Z}| \le |\mathbb{Q}| \le |\mathbb{R}|$.
