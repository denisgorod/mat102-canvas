---
id: ex-rational-multiplication-automorphism
title: "φ_q(r) = qr is an automorphism of Q"
role: exercise
group: isomorphisms
curriculum_path: null
learning_objectives: []
children: []
parents:
  - ex-automorphism-group
---

The multiplicative structure of $\mathbb{Q}$ lets you build many automorphisms of the additive group $(\mathbb{Q}, +)$. Here's a family of them.

For any nonzero rational $q \in \mathbb{Q}^*$, define $\varphi_q: \mathbb{Q} \to \mathbb{Q}$ by:
$$\varphi_q(r) = qr$$

That is, $\varphi_q$ multiplies every element of $\mathbb{Q}$ by the fixed constant $q$.

Show that $\varphi_q$ is an automorphism of $(\mathbb{Q}, +)$ for any nonzero $q \in \mathbb{Q}$.

(a) **Well-defined**: Is $\varphi_q(r)$ always a rational number? (Yes, but state it clearly.)

(b) **Homomorphism**: Show that for any $r, s \in \mathbb{Q}$:
$$\varphi_q(r + s) = \varphi_q(r) + \varphi_q(s)$$

(c) **Bijective**:

   (i) Show that $\varphi_q$ is injective (use the fact that $q \neq 0$)

   (ii) Show that $\varphi_q$ is surjective (given any $t \in \mathbb{Q}$, find $r \in \mathbb{Q}$ such that $\varphi_q(r) = t$)

(d) Conclude: $\varphi_q \in \text{Aut}(\mathbb{Q})$.

**Examples**: What is $\varphi_2(r)$? What is $\varphi_{1/3}(r)$? What is $\varphi_{-1}(r)$?

**Observation**: Are these inner automorphisms? That is, for each $q$, can you find $a \in \mathbb{Q}$ such that $\varphi_q = c_a$? (Conjugation in an abelian group has a special form — think about what it is.)

>[!question] Exercise
> Prove that multiplication by a nonzero rational $q$ is an automorphism of $(\mathbb{Q}, +)$.
