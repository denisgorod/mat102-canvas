---
id: subgroup-test
title: "Subgroup test"
role: bit
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children:
  - id: subgroup-test-example
    question: "What does a subgroup test proof look like in practice?"
    edge_type: prerequisite
  - id: ex-squares-subgroup-abelian
    question: ""
    edge_type: prerequisite
  - id: ex-units-of-zn
    question: ""
    edge_type: prerequisite
parents:
  - subgroup-definition
---

Checking that a subset $H$ is a subgroup requires verifying four things: closure, associativity, identity, and inverses. That's tedious. Here's a shortcut that does it all in one condition.

**Proposition (Subgroup Test):** Let $G$ be a group and $H \subseteq G$ a nonempty subset. Then $H \le G$ if and only if $a \cdot b^{-1} \in H$ for all $a, b \in H$.

*Proof:*

$(\Rightarrow)$ If $H$ is a subgroup, then it's closed under inverses and multiplication, so $a \cdot b^{-1} \in H$.

$(\Leftarrow)$ Now assume the condition holds. We show $H$ is a group.

1. **Associativity:** Inherited from $G$.

2. **Identity:** Take any $h \in H$ (possible since $H$ is nonempty). By the condition, $h \cdot h^{-1} = e \in H$. So the identity is in $H$.

3. **Inverses:** Let $h \in H$. We have $e \in H$ from step 2. By the condition with $a = e$ and $b = h$, we get $e \cdot h^{-1} = h^{-1} \in H$. So every element of $H$ has its inverse in $H$.

4. **Closure:** Let $a, b \in H$. Then $b^{-1} \in H$ (by step 3). By the condition with $a$ and $b^{-1}$, we get $a \cdot (b^{-1})^{-1} = a \cdot b \in H$.

So all four axioms hold, and $H \le G$.

**Why is this useful?** Instead of checking closure, identity, and inverses separately, you check just one condition: $a \cdot b^{-1} \in H$. This single test encodes all three requirements.

**Example:** In $(\mathbb{Z}, +)$, is $3\mathbb{Z} = \{3m : m \in \mathbb{Z}\}$ a subgroup? For $a = 3m$ and $b = 3n$ in $3\mathbb{Z}$, we have $a + (-b) = 3m - 3n = 3(m - n) \in 3\mathbb{Z}$. So yes, $3\mathbb{Z} \le \mathbb{Z}$.

The subgroup test is one of the most practical tools in group theory. Memorize it.

>[!idea]
> To check if a nonempty subset $H$ is a subgroup: verify that $ab^{-1} \in H$ for all $a, b \in H$ — this one condition ensures closure, identity, and inverses all at once.
