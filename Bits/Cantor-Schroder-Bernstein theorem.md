---
id: cantor-schroder-bernstein
title: "Cantor-Schroder-Bernstein theorem"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - reals-are-uncountable
---

You've been using a useful fact: if you can find injections $f: A \to B$ and $g: B \to A$, then you can conclude $|A| = |B|$. This is so useful that it deserves a name — and a proof.

>[!d] Definition
Two sets $A$ and $B$ have equal cardinality, denoted $|A| = |B|$, if there exists a bijection between them.

>[!t] Theorem (Cantor-Schroder-Bernstein)
Let $A$ and $B$ be sets. If there exist injections $f: A \to B$ and $g: B \to A$, then there exists a bijection $h: A \to B$, and hence $|A| = |B|$.

This theorem is not obvious. It says that having injections *both ways* is enough to guarantee a bijection exists, even though you haven't constructed one explicitly. The proof, while rigorous, is somewhat involved and relies on a careful analysis of the images and iterates of these injections, so we omit it here.

**Why does this matter?** In practice, you often have injections in both directions but constructing an explicit bijection is hard. This theorem frees you from that burden — you can assert equality of cardinality without writing down the bijection.

**Example:** To show $|(0,1)| = |[0,1]|$, the inclusion map $(0,1) \to [0,1]$ is injective. For the other direction, the map $f: [0,1] \to (0,1)$ given by $f(t) = (1 + 2t)/4$ is injective (it maps $[0,1]$ into $[1/4, 3/4] \subset (0,1)$). By Cantor-Schroder-Bernstein, a bijection exists without you needing to construct it.

>[!idea]
Injections both ways guarantee a bijection exists: the Cantor-Schroder-Bernstein theorem lets you prove cardinality equality without writing down the explicit bijection.
