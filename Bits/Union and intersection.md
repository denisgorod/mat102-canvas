---
id: union-and-intersection
title: "Union and intersection"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: set-difference
    question: "What if I want the elements in one set but not the other?"
    edge_type: prerequisite
  - id: ex-set-operations-compute
    question: "Can I compute union, intersection, and difference for specific sets?"
    edge_type: prerequisite
  - id: ex-set-identities
    question: "Are there algebraic laws for set operations, like distributivity?"
    edge_type: prerequisite
  - id: what-is-a-proposition
    question: "Set operations use 'or' and 'and' — is there a logic behind that?"
    edge_type: analogy
parents:
  - what-is-a-set
---

Once you have two sets, you can create new sets from them by combining their elements in different ways. Two operations stand out: union and intersection.

>[!d] Definition
> The **union** $S \cup T$ is the collection of all elements in either $S$ or $T$ (or both):
> $$S \cup T = \{x : x \in S \text{ or } x \in T\}.$$
> The **intersection** $S \cap T$ is the collection of all elements in both $S$ and $T$:
> $$S \cap T = \{x : x \in S \text{ and } x \in T\}.$$

Here's a concrete example. Let $S = \{a, b, c, d\}$ and $T = \{a, b, 1, 2, 3\}$.

The union combines everything: $S \cup T = \{a, b, c, d, 1, 2, 3\}$. You put in every element that appears in at least one of the two sets.

The intersection keeps only what both have in common: $S \cap T = \{a, b\}$. Only $a$ and $b$ appear in both.

Notice the language: union uses "or" (either $S$ or $T$ or both), and intersection uses "and" (must be in both $S$ and $T$). This connection between set operations and logical language is not a coincidence — it runs deep in mathematics.

>[!idea]
> Union $S \cup T$ collects all elements from either set. Intersection $S \cap T$ keeps only elements in both sets. Union uses "or," intersection uses "and."
