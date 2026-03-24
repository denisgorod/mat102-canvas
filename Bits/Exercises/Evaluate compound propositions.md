---
id: ex-conjunction-disjunction-practice
title: "Evaluate compound propositions"
role: exercise
group: propositional-logic
curriculum_path: null
learning_objectives: []
children: []
parents:
  - conjunction-and-disjunction
---

Suppose you are working with subsets of $\mathbb{Z}$, and define the predicates

$P(x)$: "The set $x$ has an even integer."
$Q(x)$: "The set $x$ contains more than 3 elements."

Define the sets
$$A = \{x \in \mathbb{Z} : x^2 < 2\} \quad \text{and} \quad B = A \cup \{x \in \mathbb{Z} : x = y - 1,\; y \in A\}.$$

>[!question] Exercise
> Determine the truth of each of the following:
> 1. $\neg P(B)$
> 2. $P(A) \vee Q(A)$
> 3. $P(A) \vee Q(B)$
> 4. $Q(A) \wedge Q(B)$
> 5. $(\neg P(B)) \vee Q(A)$
> 6. $\neg(P(A) \wedge Q(B))$
