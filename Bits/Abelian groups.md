---
id: abelian-groups
title: "Abelian groups"
role: bit
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children:
  - id: symmetric-group
    question: "What is the simplest example of a non-abelian group?"
    edge_type: prerequisite
  - id: ex-abelian-iff-inverse-commutes
    question: ""
    edge_type: prerequisite
  - id: ex-squares-subgroup-abelian
    question: ""
    edge_type: prerequisite
  - id: ex-inversion-homomorphism-iff-abelian
    question: ""
    edge_type: prerequisite
parents:
  - group-definition
---

A group $(G, \cdot)$ is **abelian** (or **commutative**) if $a \cdot b = b \cdot a$ for all $a, b \in G$.

This is a simple condition: the group operation commutes. In many groups, this is true. In fact, all the groups you've seen so far are abelian:
- $(\mathbb{Z}_n, +)$ is abelian because $[a] + [b] = [a + b] = [b + a] = [b] + [a]$.
- $(\mathbb{Q}^*, \times)$ is abelian because $\frac{p}{q} \cdot \frac{r}{s} = \frac{pr}{qs} = \frac{rs}{qp} = \frac{r}{s} \cdot \frac{p}{q}$.
- $(\mathbb{Z}, +)$ and $(\mathbb{R}, +)$ are abelian for the same reason.

But not all groups are abelian. Here's the key insight: when we move to operations beyond arithmetic — like function composition — commutativity can fail.

Let $X$ be a set with at least 3 elements, say $X = \{1, 2, 3\}$. Consider two bijections $f, g : X \to X$. Define $f \circ g$ to be composition: $(f \circ g)(x) = f(g(x))$.

In general, $f \circ g \neq g \circ f$. For instance, let $f$ swap 1 and 2 (fixing 3), and let $g$ swap 2 and 3 (fixing 1). Then $(f \circ g)(1) = f(g(1)) = f(1) = 2$, but $(g \circ f)(1) = g(f(1)) = g(2) = 3$. So $f \circ g \neq g \circ f$.

This happens because function composition is inherently directional. The operation applies functions in sequence, and the order matters.

So there are groups where commutativity fails. These are called **non-abelian groups**, and they're much richer than abelian ones — they have more subtle structure to explore.

>[!idea]
> A group is abelian if its operation commutes; most arithmetic groups are abelian, but groups based on function composition (like bijections) can be non-abelian when the set has three or more elements.
