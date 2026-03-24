---
id: equivalence-relations-partition-a-set
title: "Equivalence relations partition a set"
role: bit
group: equivalence-relations
curriculum_path: null
learning_objectives: []
children: []
parents:
  - equivalence-classes
---

>[!s] Theorem
> If $\sim$ is an equivalence relation on $A$, then $\sim$ partitions $A$ into disjoint equivalence classes: every element $x \in A$ belongs to a unique equivalence class.

Three facts make this work:

1. Every element belongs to *some* class: $a \in [a]$ (by reflexivity).
2. Related elements have the *same* class: $a \cong b \Longleftrightarrow [a] = [b]$.
3. Unrelated elements have *disjoint* classes: $a \not\cong b \Longleftrightarrow [a] \cap [b] = \emptyset$.

So equivalence classes never partially overlap — they are either identical or completely separate. The set $A$ is perfectly carved into non-overlapping pieces.

>[!idea]
> Equivalence relations partition a set into disjoint classes with no element belonging to more than one.
