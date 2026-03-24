---
id: why-diagonalization-fails-for-rationals
title: "Why diagonalization fails for Q"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children: []
parents:
  - reals-are-uncountable
---

You now know that the diagonal argument proves $\mathbb{R}$ is uncountable, while $\mathbb{Q}$ is countable. Why can't you apply the same diagonal trick to $\mathbb{Q}$?

The key difference lies in how much *data* you need to specify an element of each set.

Every rational number can be encoded as a finite pair of integers: if you write $p/q$ in lowest terms, you only need two pieces of information. In principle, you could encode $\mathbb{Q}$ as pairs from $\mathbb{Z} \times \mathbb{Z}^+$, which is countable. Any individual rational has a *finite* data footprint.

Real numbers are different. A typical real number's decimal expansion is *infinite* — you need infinitely many digits to specify it. Even with a finite representation like $\sqrt{2}$, the decimal expansion $1.414213562\ldots$ is infinite and non-repeating.

The diagonal argument *exploits* this infinite bandwidth. When you list rationals and try to apply diagonalization, you pick off each rational's finite code and construct something new — but that new thing (a real number with an infinite decimal expansion) escapes the finite data bounds of the rationals. The argument doesn't generate a rational; it generates a real that has no finite encoding as a ratio of integers.

In other words: the diagonal argument works on $\mathbb{R}$ *precisely because* real numbers require infinite data to describe, while natural numbers and their encodings of $\mathbb{Q}$ use only finite data.

>[!idea]
Naturals and rationals are finitely encodable; reals need infinite data to specify. The diagonal argument exploits this gap by building an infinite object that cannot be a rational.
