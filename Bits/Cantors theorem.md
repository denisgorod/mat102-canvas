---
id: cantors-theorem
title: "Cantor's theorem"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - power-set
---

You've seen that the power set always has more subsets than elements. But does $|\mathcal{P}(S)|$ always exceed $|S|$? The answer is yes — and the proof is a beautiful generalization of the diagonal argument that proved $\mathbb{R}$ is uncountable.

>[!t] Theorem (Cantor's Theorem)
> For any set $S$, we have $|S| < |\mathcal{P}(S)|$.

>[!p] Proof
> We show two things: (1) $|S| \leq |\mathcal{P}(S)|$, and (2) there is no surjection from $S$ onto $\mathcal{P}(S)$.

**Part 1:** Define $f: S \to \mathcal{P}(S)$ by $f(x) = \{x\}$. This is injective: if $f(x) = f(y)$ then $\{x\} = \{y\}$, so $x = y$. Thus $|S| \leq |\mathcal{P}(S)|$.

**Part 2:** Suppose for contradiction that a surjection $f: S \to \mathcal{P}(S)$ exists. Define the set
$$D = \{x \in S : x \notin f(x)\}$$

Since $f$ is a function into $\mathcal{P}(S)$, each $f(x)$ is a subset of $S$. So it makes sense to ask whether $x \in f(x)$ or $x \notin f(x)$.

Now $D \in \mathcal{P}(S)$ (it is a subset of $S$). Since $f$ is surjective, there must exist some $a \in S$ with $f(a) = D$.

But this leads to a contradiction: either $a \in f(a) = D$ or $a \notin f(a) = D$. If $a \in D$, then by definition of $D$ we have $a \notin f(a)$, so $a \notin D$ — contradiction. If $a \notin D$, then by definition of $D$ we must have $a \in f(a)$, so $a \in D$ — contradiction.

Therefore no surjection from $S$ onto $\mathcal{P}(S)$ can exist. Combined with Part 1, this gives $|S| < |\mathcal{P}(S)|$.

>[!idea]
> For any set $S$, the power set is strictly larger: $|S| < |\mathcal{P}(S)|$. The diagonal argument extends from reals to all sets.
