---
id: rel-def
title: "Binary relation"
role: definition
subject: relations
topic: binary-relations
statement: "A binary relation R between sets A and B is a subset of A × B, with aRb meaning (a, b) ∈ R; A is its domain, B its codomain; if B = A, R is a relation on A."
depends_on: [set-cartesian-product, set-subset]
---
>[!d] Definition
> Let $A$ and $B$ be sets. A **binary relation** between $A$ and $B$ is a subset $R \subseteq A \times B$; write $a\,R\,b$ when $(a,b) \in R$. $A$ is the **domain** and $B$ the **codomain**. When $B = A$, $R$ is a **relation on** $A$.

>[!info] Note
> Every subset of $A \times B$ is a relation, $\emptyset$ included; properties such as transitivity are extra conditions, not part of the definition. **Equality** on $A$ is the diagonal $\{(a,a) : a \in A\}$.

>[!e] Worked example
> On $\{2,4,6\}$, $<$ is $\{(2,4),(2,6),(4,6)\}$, and $\le$ adds the diagonal pairs $(2,2),(4,4),(6,6)$. On $\mathbb{Z}$, $<$ is the infinite set $\{(a,b) \in \mathbb{Z} \times \mathbb{Z} : a < b\}$, containing $(-2,5)$ but not $(15,14)$.
