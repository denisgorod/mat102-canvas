---
id: symmetric-group
title: "The symmetric group"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: dihedral-group
    question: "Are there other natural non-abelian groups?"
    edge_type: prerequisite
  - id: ex-cycle-composition
    question: ""
    edge_type: prerequisite
  - id: ex-sn-abelian-iff
    question: ""
    edge_type: prerequisite
parents:
  - abelian-groups
  - bijective-functions
  - function-composition
---

Let $X$ be any set. A **bijection** from $X$ to itself is a function $f : X \to X$ that is both injective (no two inputs map to the same output) and surjective (every element of $X$ is the image of some input).

The set of all bijections from $X$ to $X$ is denoted $S_X$ and is called the **symmetric group** on $X$. The group operation is **function composition**: $(f \circ g)(x) = f(g(x))$.

Let's verify that $(S_X, \circ)$ is a group.

**Associativity:** Composition of functions is associative. For any $f, g, h \in S_X$,
$$f \circ (g \circ h) = (f \circ g) \circ h$$
because both sides evaluate $x$ by first applying $h$, then $g$, then $f$.

**Identity:** The identity function $\text{id}(x) = x$ is a bijection. For any $f \in S_X$,
$$f \circ \text{id} = f \quad \text{and} \quad \text{id} \circ f = f.$$

**Inverses:** Every bijection $f : X \to X$ has an inverse function $f^{-1} : X \to X$ (also a bijection) such that $f \circ f^{-1} = \text{id}$ and $f^{-1} \circ f = \text{id}$.

So $(S_X, \circ)$ is a group. When $X = \{1, 2, \ldots, n\}$, we write $S_n$ instead of $S_X$.

**Non-abelian for $|X| \geq 3$:** If $X$ has at least 3 elements, $S_X$ is non-abelian. For instance, in $S_3$, let $\sigma$ swap 1 and 2 (fixing 3), and let $\tau$ swap 2 and 3 (fixing 1). Then $\sigma \circ \tau \neq \tau \circ \sigma$ because the order of applying these transpositions matters.

The symmetric group is one of the most important groups in mathematics. Its elements are called **permutations**, and their composition gives the group structure.

>[!idea]
> The symmetric group $S_X$ is the set of all bijections from a set $X$ to itself, with composition as the operation — it is a group, and for $|X| \geq 3$, it is non-abelian because function composition does not commute.
