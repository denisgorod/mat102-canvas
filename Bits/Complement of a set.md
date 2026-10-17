---
id: complement-of-a-set
title: "Complement of a set"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
concludes: set-difference-complement
children:
  - id: ex-complement-of-integers
    question: "What does the complement look like for a concrete set?"
    edge_type: prerequisite
  - id: ex-set-identities
    question: "How does complement interact with union and intersection?"
    edge_type: prerequisite
parents:
  - set-difference
---

Sometimes there is an implicit ambient set called the **universe of discourse** $U$, within which all operations take place. Everything you care about lives inside $U$. When you form the complement of a set, you're really asking: what's left over outside?

>[!d] Definition
> Given a universe of discourse $U$ and a set $A$ whose elements all belong to $U$, the **complement** of $A$ in $U$ is
> $$A^c = \{x \in U : x \notin A\},$$
> the set of all elements in $U$ that are not in $A$.

For example, if your universe is $U = \mathbb{R}$ (all real numbers) and $P = \{x : x > 0\}$ (the positive reals), then $P^c = \{x \in \mathbb{R} : x \leq 0\}$, the non-positive reals. The same $P$ has no complement in $U = \mathbb{Z}$, because $\tfrac12 \in P$ is not an integer. But $\mathbb{Z}^+$ lies in both universes, and its complement depends on which one you choose: in $U = \mathbb{Z}$ it is $\{x \in \mathbb{Z} : x \leq 0\}$, the non-positive integers; in $U = \mathbb{R}$ it is $\mathbb{R} \setminus \mathbb{Z}^+$, which also contains $\tfrac12$.

Notice that the complement is really a special case of set difference: $A^c = U \setminus A$. But complement has a distinctive character: it explicitly acknowledges the universe. You can't take a complement without first deciding what "everything" means.

>[!idea]
> The complement $A^c$ of a set $A$ within a universe $U$ consists of all elements in $U$ not in $A$, and it depends on your choice of universe.
