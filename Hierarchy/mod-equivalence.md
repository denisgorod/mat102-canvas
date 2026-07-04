---
id: mod-equivalence
title: "Congruence is an equivalence relation"
role: theorem
subject: number-theory
topic: modular-arithmetic
statement: "For fixed n, ≡ (mod n) is reflexive, symmetric, and transitive, so it partitions ℤ into n congruence classes."
depends_on: [mod-congruence-def]
drills: []
---
>[!t] Theorem
> For a fixed modulus $n \in \mathbb{Z}^{+}$, congruence modulo $n$ is an equivalence relation on $\mathbb{Z}$: for all $a, b, c \in \mathbb{Z}$,
> - **Reflexive:** $a \equiv a \pmod{n}$;
> - **Symmetric:** $a \equiv b \pmod{n} \implies b \equiv a \pmod{n}$;
> - **Transitive:** $a \equiv b$ and $b \equiv c \pmod{n} \implies a \equiv c \pmod{n}$.

>[!p] Proof
> Reflexivity: $n \mid 0 = a - a$. Symmetry: if $n \mid (b - a)$ then $n \mid -(b-a) = a - b$. Transitivity: if $n \mid (b-a)$ and $n \mid (c-b)$ then $n \mid (b-a)+(c-b) = c-a$. $\square$

>[!info] Consequence
> The equivalence classes of $\equiv \pmod n$ are the $n$ **congruence classes** $[0], [1], \dots, [n-1]$, and they partition $\mathbb{Z}$.
