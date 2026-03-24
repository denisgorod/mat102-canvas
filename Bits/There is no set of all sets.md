---
id: no-set-of-all-sets
title: "There is no set of all sets"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cantors-theorem
---

Cantor's theorem shows that you can always take the power set to get a strictly larger cardinality. So you have an infinite tower of sizes:
$$|S| < |\mathcal{P}(S)| < |\mathcal{P}(\mathcal{P}(S))| < \cdots$$

This raises a startling question: is there a *set of all sets* $V$?

If such a set existed, then by Cantor's theorem, we would have $|V| < |\mathcal{P}(V)|$. But every subset of $V$ is also a set (since $V$ is the set of all sets), so $\mathcal{P}(V) \subseteq V$. Then by the properties of cardinality and injections, $|\mathcal{P}(V)| \leq |V|$.

This is a contradiction: we cannot simultaneously have $|V| < |\mathcal{P}(V)|$ and $|\mathcal{P}(V)| \leq |V|$.

Therefore, no set of all sets can exist.

**What is the collection of all sets then?** It exists as a **proper class** — a mathematical object that is "too big" to be a set. Proper classes lie outside the universe of ordinary set theory. They do not carry cardinalities in the usual sense, so they escape Cantor's comparison.

This is one of the foundational subtleties of mathematics: the distinction between sets (which can be elements of other sets) and proper classes (which cannot). The existence of uncountable towers of cardinality shows that you cannot gather everything into a single set without creating a logical contradiction.

>[!idea]
There is no set of all sets: Cantor's theorem applied to such a $V$ would contradict itself, so the collection of all sets forms a proper class instead.
