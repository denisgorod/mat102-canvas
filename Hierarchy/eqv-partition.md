---
id: eqv-partition
title: "Equivalence classes partition the set"
role: theorem
subject: relations
topic: equivalence-relations
statement: "For an equivalence relation ∼ on A and a, b ∈ A: a ∈ [a]; [a] = [b] ⟺ a ∼ b; [a] ∩ [b] = ∅ ⟺ a ≁ b. Thus classes are non-empty, pairwise disjoint and cover A."
depends_on: [eqv-classes, set-double-inclusion]
---
>[!t] Theorem
> Let $\sim$ be an equivalence relation on $A$ and $a, b \in A$: (1) $a \in [a]$; (2) $[a] = [b] \iff a \sim b$; (3) $[a] \cap [b] = \emptyset \iff a \not\sim b$. Hence the classes **partition** $A$: non-empty, pairwise disjoint if distinct, and covering $A$.

>[!p] Proof
> (1) Reflexivity. (2) If $[a] = [b]$, then $a \in [b]$ by (1), so $a \sim b$. If $a \sim b$ and $x \in [a]$, transitivity gives $x \sim b$: $[a] \subseteq [b]$. Symmetry gives $b \sim a$, so likewise $[b] \subseteq [a]$; use double inclusion. (3) If $a \sim b$, then $a \in [a] \cap [b]$. If $x \in [a] \cap [b]$, then $a \sim x$ by symmetry and $x \sim b$, so $a \sim b$ by transitivity. Last, (1) gives non-emptiness and cover, and (2), (3) disjointness. $\square$
