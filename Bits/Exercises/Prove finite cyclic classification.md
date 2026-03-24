---
id: ex-prove-finite-cyclic-classification
title: "Prove finite cyclic classification"
role: exercise
group: isomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - cyclic-groups-classification
---

You've seen that every finite cyclic group of order $n$ looks like $\mathbb{Z}_n = \{[0]_n, [1]_n, \ldots, [n-1]_n\}$ under addition modulo $n$. Now prove this rigorously.

**Theorem 13(2)**: If $G$ is a finite cyclic group of order $n$, then $G \cong \mathbb{Z}_n$.

**Proof sketch**: Let $G = \langle g \rangle$ where $|G| = n$, so $|g| = n$.

(a) Define a map $\varphi: \mathbb{Z}_n \to G$ by $\varphi([k]_n) = g^k$. Show that this is well-defined (if $[k]_n = [j]_n$ in $\mathbb{Z}_n$, then $g^k = g^j$ in $G$). Hint: use the fact that the order of $g$ is $n$.

(b) Show that $\varphi$ is a homomorphism.

(c) Show that $\varphi$ is surjective. (Why does every element of $G$ have the form $g^k$ for some $0 \leq k < n$?)

(d) Show that $\varphi$ is injective (equivalently, $\ker(\varphi) = \{[0]_n\}$).

(e) Conclude that $G \cong \mathbb{Z}_n$.

What does this theorem say about all finite cyclic groups of order 5? Of order 12?

>[!question] Exercise
> Prove Theorem 13(2): every finite cyclic group of order $n$ is isomorphic to $\mathbb{Z}_n$.
