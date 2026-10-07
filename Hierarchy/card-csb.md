---
id: card-csb
title: "Cantor–Schröder–Bernstein theorem"
role: theorem
subject: functions
topic: functions-ii
statement: "If there are injections f: A → B and g: B → A then there is a bijection A → B; that is, |A| ≤ |B| and |B| ≤ |A| together imply |A| = |B|."
depends_on: [card-equal]
---
>[!t] Theorem (Cantor–Schröder–Bernstein)
> If $f : A \to B$ and $g : B \to A$ are injections, there is a bijection $A \to B$; that is, $|A| \le |B| \le |A|$ implies $|A| = |B|$.

>[!p] Proof
> Let $C_0 = A \setminus g(B)$, $C_{n+1} = g(f(C_n))$, $C = \bigcup_{n} C_n$. Define $h = f$ on $C$ and $h = g^{-1}$ on $A \setminus C \subseteq g(B)$ ($g$ injective). *Injective:* $f$ and $g^{-1}$ are; $f(a) = g^{-1}(a')$ with $a \in C_n$, $a' \notin C$ would give $a' = g(f(a)) \in C$. *Surjective:* for $b \in B$, if $g(b) \notin C$, $b = h(g(b))$; otherwise $g(b) = g(f(a))$ for some $a \in C_n$ (as $g(b) \notin C_0$), so $b = f(a) = h(a)$. $\square$

>[!e] Example
> The inclusion $(0,1) \to [0,1]$ and $t \mapsto \frac{1+2t}{4}$, an injection $[0,1] \to (0,1)$, give $|(0,1)| = |[0,1]|$.
