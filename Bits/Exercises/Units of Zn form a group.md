---
id: ex-units-of-zn
title: "Units of Z_n form a group"
role: exercise
group: subgroups-and-order
curriculum_path: null
learning_objectives: []
children: []
parents:
  - subgroup-test
---

Not every element of $\mathbb{Z}_n$ has a multiplicative inverse modulo $n$. An element $[a]_n$ is a *unit* if there exists $[b]_n$ such that $[a]_n \times [b]_n \equiv [1]_n$.

For example, in $\mathbb{Z}_{12}$, the units are $\{[1]_{12}, [5]_{12}, [7]_{12}, [11]_{12}\}$ — these are exactly the residues coprime to 12.

**(a)** Show that the set of units $\mathbb{Z}_n^*$ is a group under multiplication modulo $n$. (Use the subgroup test, or verify the three axioms directly.)

**(b)** Write out all elements of $\mathbb{Z}_{12}^*$ explicitly.

Hint: An element $[a]_n$ is a unit iff $\gcd(a, n) = 1$.

>[!question] Exercise
> (a) Show that $\mathbb{Z}_n^*$ is a group under multiplication mod $n$. (b) Write out the elements of $\mathbb{Z}_{12}^*$.
