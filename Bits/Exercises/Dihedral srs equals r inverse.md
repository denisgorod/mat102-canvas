---
id: ex-dihedral-srs-equals-r-inverse
title: "srs = r^{−1} in D_n"
role: exercise
group: groups-first-principles
curriculum_path: null
learning_objectives: []
parents:
  - dihedral-group
---

In the dihedral group $D_n$, the generators $r$ (rotation by $\frac{2\pi}{n}$) and $s$ (reflection) satisfy several relations. One of the most important is $sr = r^{-1}s$.

Using this relation, derive another key identity: $srs = r^{-1}$.

Work it out symbolically. Start with $sr = r^{-1}s$, multiply on the right by $s$, and see what you get. (Remember that $s^2 = e$, so $ss = e$.)

Then verify this concretely for $D_3$ by explicit computation: compute $sr$, then multiply by $s$ on the left. Check that the result equals $r^{-1}$.

>[!question] Exercise
> Show that $srs = r^{-1}$ in $D_n$ for all $n \geq 3$. (Use the relation $sr = r^{-1}s$ and $s^2 = e$.)
