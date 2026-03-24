---
id: cardinality-via-bijection
title: "Equal cardinality via bijection"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children:
  - id: infinite-sets-surprise
    question: "Can an infinite set have the same cardinality as a proper subset?"
    edge_type: prerequisite
  - id: countable-sets
    question: "Is there a name for sets with |S| <= |N|?"
    edge_type: prerequisite
parents:
  - cardinality-definition
---

You now know how to say when one set is at least as big as another: $|S| \leq |T|$ if there's an injection $S \to T$. But when are two sets the *same* size?

The intuitive answer: when you can pair up their elements perfectly. Formally, two sets have the same cardinality if there is a bijection between them.

>[!d] Definition
>Let $S$ and $T$ be sets. We say $|S| = |T|$ (they have equal cardinality) if there exists a bijection $f: S \to T$.

If $f: S \to T$ is a bijection, then $f$ is both injective and surjective. This means:
- $|S| \leq |T|$ (because $f$ is injective)
- $|T| \leq |S|$ (because $f$ is surjective, so by the dual property, there is an injection $T \to S$)

Thus, defining equality this way is consistent with the inequality relation.

We can also define strict inequality: $|S| < |T|$ if there exists an injection $S \to T$ but no surjection from $S$ onto $T$. In other words, $|S| \leq |T|$ but $|S| \neq |T|$.

A useful fact: cardinality is **transitive**. If $|A| = |B|$ (with bijection $f: A \to B$) and $|B| = |C|$ (with bijection $g: B \to C$), then $|A| = |C|$ because the composition $g \circ f: A \to C$ is a bijection. This means you can build chains of equality across many sets.

>[!idea]
>Two sets have equal cardinality, written $|S| = |T|$, if and only if there is a bijection between them. We also write $|S| < |T|$ if $|S| \leq |T|$ but they are not equal in cardinality.
