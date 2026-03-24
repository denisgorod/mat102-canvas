---
id: arithmetic-of-congruences
title: "Arithmetic of congruences"
role: bit
group: modular-arithmetic
curriculum_path: null
learning_objectives: []
children:
  - id: congruence-classes-and-zn
    question: "What are the equivalence classes of congruence mod n?"
    edge_type: prerequisite
  - id: last-digit-computation
    question: "Can I use modular arithmetic to find the last digit of a huge number?"
    edge_type: prerequisite
  - id: ex-exponentiation-well-defined
    question: "Is exponentiation also well-defined in modular arithmetic?"
    edge_type: prerequisite
parents:
  - congruence-is-equivalence-relation
---

You already know that congruence mod $n$ is an equivalence relation. But congruence is more than just a way to sort integers—you can actually *do arithmetic* with it.

Suppose you have $a \equiv r \pmod{n}$ and $b \equiv s \pmod{n}$. What happens when you add or multiply?

>[!s] Proposition
> If $a \equiv r \pmod{n}$ and $b \equiv s \pmod{n}$, then:
> - $(a + b) \equiv (r + s) \pmod{n}$
> - $ab \equiv rs \pmod{n}$

>[!p] Proof
> Since $a \equiv r \pmod{n}$ and $b \equiv s \pmod{n}$, we have $n \mid (r - a)$ and $n \mid (s - b)$. So there exist integers $k$ and $\ell$ with $r - a = nk$ and $s - b = n\ell$.
>
> For addition, add these equations: $(r + s) - (a + b) = n(k + \ell)$, so $n \mid [(r + s) - (a + b)]$, meaning $(a + b) \equiv (r + s) \pmod{n}$.
>
> For multiplication, compute:
> $$rs - ab = rs - rb + rb - ab = r(s - b) + (r - a)b = rn\ell + knb = n(r\ell + kb)$$
> Thus $n \mid (rs - ab)$, so $ab \equiv rs \pmod{n}$.

This is the heart of modular arithmetic: congruence is *compatible* with addition and multiplication. You can replace numbers with their congruent partners and the results will still be congruent. This means you can compute with remainders instead of huge numbers—a tool that will prove invaluable for problems like finding the last digit of $4^{441}$.

>[!idea]
> Addition and multiplication are well-defined on congruence classes modulo $n$.
