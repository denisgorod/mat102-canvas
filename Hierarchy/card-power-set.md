---
id: card-power-set
title: "Power set"
role: definition
subject: functions
topic: functions-ii
statement: "The power set P(S) is the set of all subsets of S; U ↦ (indicator function of U) is a bijection from P(S) to the functions S → {0, 1}, so |P(S)| = 2ⁿ if S has n elements."
depends_on: [fn-bijective]
---
>[!d] Definition
> The **power set** of a set $S$ is $\mathcal{P}(S) = \{U : U \subseteq S\}$; e.g. $\mathcal{P}(\{1,2\}) = \{\emptyset, \{1\}, \{2\}, \{1,2\}\}$. The **indicator function** of $U \subseteq S$ is $\chi_U : S \to \{0,1\}$, equal to $1$ on $U$ and $0$ on $S \setminus U$.

>[!t] Theorem
> $U \mapsto \chi_U$ is a bijection from $\mathcal{P}(S)$ to the set $\{0,1\}^S$ of functions $S \to \{0,1\}$, whence the notation $2^S$. If $S$ has $n$ elements, $|\mathcal{P}(S)| = 2^n$.

>[!p] Proof
> If $\chi_U = \chi_V$, then $x \in U \iff \chi_U(x) = 1 \iff \chi_V(x) = 1 \iff x \in V$, so $U = V$. Each $g : S \to \{0,1\}$ equals $\chi_U$ for $U = \{x \in S : g(x) = 1\}$. There are $2^n$ functions $S \to \{0,1\}$: two choices at each of $n$ elements. $\square$
