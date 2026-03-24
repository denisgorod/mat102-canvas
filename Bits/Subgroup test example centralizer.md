---
id: subgroup-test-example
title: "Subgroup test example: centralizer"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: cyclic-group-definition
    question: "Is there a particularly simple kind of subgroup?"
    edge_type: prerequisite
parents:
  - subgroup-test
---

Let's work through a complete example using the subgroup test. Fix an element $g \in G$ and define

$$C_G(g) = \{h \in G : hgh^{-1} = g\}.$$

This is the **centralizer** of $g$ — the set of all elements that "commute with $g$ in a conjugate sense." We'll show that $C_G(g) \le G$ using the subgroup test.

**Step 1: Check nonemptiness.** The identity $e$ satisfies $ege^{-1} = g$, so $e \in C_G(g)$.

**Step 2: Apply the subgroup test.** Let $a, b \in C_G(g)$. We need to show $ab^{-1} \in C_G(g)$, meaning
$$(ab^{-1})g(ab^{-1})^{-1} = g.$$

Compute the left side. Recall that $(ab^{-1})^{-1} = ba^{-1}$:
$$(ab^{-1})g(ba^{-1}) = a(b^{-1}gb)a^{-1}.$$

Since $b \in C_G(g)$, we have $bgb^{-1} = g$, which means $b^{-1}gb = g$. So
$$a(b^{-1}gb)a^{-1} = aga^{-1}.$$

Since $a \in C_G(g)$, we have $aga^{-1} = g$. Putting it together:
$$(ab^{-1})g(ab^{-1})^{-1} = g.$$

Therefore $ab^{-1} \in C_G(g)$, and the subgroup test is satisfied.

**Conclusion:** $C_G(g) \le G$.

This example shows the power of the subgroup test: rather than checking closure, identity, and inverses separately (which would be messy with the conjugation condition), a single check accomplishes all three at once. The computation of $(ab^{-1})g(ab^{-1})^{-1}$ unfolds step by step, using the definitions and the assumption that $a$ and $b$ are in the centralizer.

>[!idea]
The centralizer $C_G(g) = \{h \in G : hgh^{-1} = g\}$ is a subgroup of $G$ — the subgroup test reduces three separate checks to one elegant algebraic manipulation.
