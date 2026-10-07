---
id: rel-left-total-functional
title: "Left-total and functional relations"
role: definition
subject: relations
topic: binary-relations
statement: "R ⊆ A×B is left-total if each a ∈ A has some b ∈ B with aRb, and functional if aRb ∧ aRc ⟹ b=c (∀a ∈ A, b,c ∈ B): at least one, respectively at most one, partner."
depends_on: [rel-def]
---
>[!d] Definition
> A relation $R \subseteq A \times B$ is
> - **left-total** if for every $a \in A$ there is $b \in B$ with $a\,R\,b$;
> - **functional** if for all $a \in A$ and $b, c \in B$, $a\,R\,b$ and $a\,R\,c$ imply $b = c$.

>[!info] Note
> Left-total: each $a \in A$ has **at least one** partner; functional: **at most one**. A relation with both relates each $a$ to exactly one $b$, and is precisely a **function** $A \to B$. Neither condition restricts $B$: elements of $A$ may share a partner, and some $b$ may have none.

>[!e] Worked example
> $R = \{(2,\diamondsuit),(4,\diamondsuit),(6,\spadesuit)\} \subseteq \{2,4,6\} \times \{\diamondsuit,\spadesuit\}$ is left-total and functional. Adding $(2,\spadesuit)$ breaks functionality: $2\,R\,\diamondsuit$, $2\,R\,\spadesuit$, $\diamondsuit \neq \spadesuit$. Deleting $(6,\spadesuit)$ breaks left-totality: $6$ has no partner.
