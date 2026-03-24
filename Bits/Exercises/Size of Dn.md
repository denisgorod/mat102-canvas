---
id: ex-size-of-dn
title: "|D_n| = 2n"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
children: []
parents:
  - dihedral-group
---

The dihedral group $D_3$ has 6 elements: the identity, two rotations, and three reflections. You can verify this by listing them explicitly: $\{e, r, r^2, s, sr, sr^2\}$.

How many elements does $D_n$ have in general? The answer is $|D_n| = 2n$, but you should justify it by counting carefully.

Think about the $n$ rotations: starting from the identity $e = r^0$, you can apply $r$ repeatedly to get $r, r^2, \ldots, r^{n-1}$, and then $r^n = e$ (you've come full circle). How many distinct rotations are there?

Now think about reflections. If $s$ is one reflection, what about $sr, sr^2, \ldots, sr^{n-1}$? Are these all distinct from the rotations and from each other? Why?

>[!question] Exercise
> Prove that $|D_n| = 2n$ by counting rotations and reflections separately.
