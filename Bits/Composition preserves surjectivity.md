---
id: composition-preserves-surjectivity
title: "Composition preserves surjectivity"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - surjective-functions
---

You know that surjective functions hit every element of their codomain. What happens when you compose two surjective functions?

**Proposition.** If $f: A \to B$ and $g: B \to C$ are both surjective, then their composition $g \circ f: A \to C$ is also surjective.

Let's prove this. We need to show that for any $c \in C$, there exists an $a \in A$ with $(g \circ f)(a) = c$. Here's the argument:

Let $c \in C$ be arbitrary. Since $g: B \to C$ is surjective, there exists some $b \in B$ such that $g(b) = c$.

Now apply surjectivity of $f: A \to B$. Since $b \in B$, there exists some $a \in A$ such that $f(a) = b$.

Combining these: $(g \circ f)(a) = g(f(a)) = g(b) = c$.

Since $c$ was arbitrary, $g \circ f$ is surjective.

The strategy is backward-chaining: to hit an arbitrary target in $C$, first find what in $B$ hits it (using $g$'s surjectivity), then find what in $A$ hits that (using $f$'s surjectivity). This two-step construction guarantees coverage of all of $C$.

Surjectivity chains through composition because the codomain structure is preserved: nothing in the final codomain is orphaned if nothing was orphaned before.

>[!idea]
The composition of surjective functions is surjective. Surjectivity is preserved under composition because you can construct preimages by working backward through each layer.
