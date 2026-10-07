---
id: rel-properties
title: "Properties of relations on a set"
role: definition
subject: relations
topic: binary-relations
statement: "R on A is reflexive if aRa, irreflexive if ¬aRa, symmetric if aRb ⟹ bRa, anti-symmetric if aRb ∧ bRa ⟹ a=b, transitive if aRb ∧ bRc ⟹ aRc, total if a=b ∨ aRb ∨ bRa (∀a,b,c ∈ A)."
depends_on: [rel-def]
---
>[!d] Definition
> A relation $R$ on $A$ is, for all $a, b, c \in A$:
> - **reflexive** if $a\,R\,a$; **irreflexive** if not $a\,R\,a$;
> - **symmetric** if $a\,R\,b \implies b\,R\,a$;
> - **anti-symmetric** if $a\,R\,b \wedge b\,R\,a \implies a = b$;
> - **transitive** if $a\,R\,b \wedge b\,R\,c \implies a\,R\,c$;
> - **total** if $a = b$ or $a\,R\,b$ or $b\,R\,a$.

>[!info] Note
> Symmetric and anti-symmetric are not opposites: $R$ has both exactly when $R \subseteq \{(a,a) : a \in A\}$ (if $a\,R\,b$, symmetry gives $b\,R\,a$, so $a = b$ by anti-symmetry), e.g. $R = \emptyset$. And $\{(1,1)\}$ on $\{1,2\}$ is neither reflexive nor irreflexive.

>[!e] Worked example
> On $\mathbb{Z}$: $=$ is reflexive, symmetric, anti-symmetric, transitive. $<$ is irreflexive, anti-symmetric (vacuously), transitive and total (trichotomy), not symmetric ($2 < 4$, $4 \not< 2$). $\le$ is reflexive, anti-symmetric, transitive, total.
