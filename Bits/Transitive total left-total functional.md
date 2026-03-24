---
id: relation-properties-transitive-total
title: "Transitive, total, left-total, functional"
role: bit
group: binary-relations
curriculum_path: null
learning_objectives: []
children:
  - id: checking-relation-properties
    question: "How do I check these properties in practice?"
    edge_type: prerequisite
  - id: what-is-an-equivalence-relation
    question: "What combination makes a relation behave like equality?"
    edge_type: prerequisite
  - id: what-is-an-order-relation
    question: "What distinguishes a total order from a partial one?"
    edge_type: prerequisite
  - id: function-as-relation
    question: "What kind of relation is both left-total and functional?"
    edge_type: prerequisite
parents:
  - relation-properties-reflexive-symmetric
---

>[!d] Definition
> A relation $R$ on $A$ (or between $A$ and $B$) is:
> - **Transitive** if for all $a, b, c$: $a\,R\,b$ and $b\,R\,c$ implies $a\,R\,c$.
> - **Total** if for all $a, b \in A$: either $a = b$, $a\,R\,b$, or $b\,R\,a$.
> - **Left-total** if for every $a \in A$, there exists $b \in B$ with $a\,R\,b$.
> - **Functional** if for every $a \in A$: $a\,R\,b$ and $a\,R\,c$ implies $b = c$.

Let's verify these on familiar examples:

- Equals ($=$) is transitive ($a = b$ and $b = c$ implies $a = c$).
- Less than or equal ($\leq$) on $\mathbb{Z}$ is transitive and total (any two integers are comparable).
- Less than ($<$) is transitive but not total ($2 < 3$ or $2 = 3$ or $3 < 2$, but you need exactly one).

Left-total and functional encode different ideas: a left-total relation ensures every element on the left has *at least one* partner; a functional relation ensures every element has *at most one* partner. Together, they will define functions — relations where every input has exactly one output.

>[!idea]
> Transitivity chains relationships together; totality compares all elements; left-totality and functionality constrain which elements participate.
