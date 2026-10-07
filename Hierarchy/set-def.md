---
id: set-def
title: "Sets, elements and the empty set"
role: definition
subject: sets-and-propositions
topic: sets
statement: "A set is an unordered collection of well-defined, distinct objects, its elements (x ∈ S: x is an element of S); two sets are equal exactly when they have the same elements, and the empty set ∅ has none."
depends_on: []
---
>[!d] Definition
> A **set** is an unordered collection of well-defined, distinct objects, its **elements**. We write $x \in S$ if $x$ is an element of $S$, and $x \notin S$ otherwise; **well-defined** means that for every object $x$ it is unambiguous whether $x \in S$. Sets are **equal** when they have exactly the same elements. The **empty set** $\emptyset$ is the set with no elements.

>[!info] Note
> Equality depends only on membership, so order and repetition in a listing are irrelevant: $\{1, 2, 3\} = \{3, 1, 2\} = \{1, 2, 2, 3, 3, 3\}$.

>[!warning] Common error
> Elements may themselves be sets. $\{\{1, 2\}, \{3\}\}$ has exactly two elements, $\{1, 2\}$ and $\{3\}$; so $2 \notin \{\{1, 2\}, \{3\}\}$, and this set is not $\{1, 2, 3\}$. Likewise $\{\emptyset\} \neq \emptyset$: the first has one element.
