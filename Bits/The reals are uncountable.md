---
id: reals-are-uncountable
title: "The reals are uncountable"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - rationals-are-countable
  - proof-by-contradiction
---

You've now seen that $|\mathbb{N}| = |\mathbb{Z}| = |\mathbb{Q}|$. It's natural to ask: does this pattern hold for all infinite sets? Is every infinite set countable?

The answer is no. The reals $\mathbb{R}$ are strictly larger than $\mathbb{N}$.

To prove $|\mathbb{R}| > |\mathbb{N}|$, assume for contradiction that $\mathbb{R}$ is countable and derive an impossibility using the **Cantor diagonal argument**.

Suppose you could list all real numbers in $[0,1]$ as $r_1, r_2, r_3, \ldots$ Write each in decimal form:
$$r_1 = 0.d_1^{(1)} d_2^{(1)} d_3^{(1)} \cdots$$
$$r_2 = 0.d_1^{(2)} d_2^{(2)} d_3^{(2)} \cdots$$
$$r_3 = 0.d_1^{(3)} d_2^{(3)} d_3^{(3)} \cdots$$

Now construct a new real number $s$ by:
$$s = 0.s_1 s_2 s_3 \cdots$$

where $s_i = 2$ if $d_i^{(i)} = 1$, and $s_i = 1$ if $d_i^{(i)} \neq 1$.

By construction, $s$ differs from $r_i$ in the $i$-th decimal place for every $i$. So $s$ is not in your list — yet $s \in [0,1]$ is a real number. This contradicts the assumption that your list contained all reals.

Therefore $\mathbb{R}$ is not countable, and $|\mathbb{R}| > |\mathbb{N}|$.

>[!idea]
> The reals are uncountable: no matter how you try to list all real numbers, the diagonal argument constructs one you missed.
