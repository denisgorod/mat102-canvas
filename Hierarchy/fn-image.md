---
id: fn-image
title: "Image of a set and range"
role: definition
subject: functions
topic: functions-i
statement: "For a function f: A → B and U ⊆ A, the image of U is f(U) = {f(x) : x ∈ U} ⊆ B, and the range of f is f(A), which need not equal the codomain B."
depends_on: [fn-def]
---
>[!d] Definition
> Let $f : A \to B$ and $U \subseteq A$. The **image** of $U$ is
> $$f(U) = \{f(x) : x \in U\} \subseteq B,$$
> and the **range** of $f$ is $f(A)$. It need not equal the codomain: $x \mapsto x^2$ on $\mathbb{R}$ has codomain $\mathbb{R}$ but range $[0, \infty)$.

>[!e] Worked example
> For $f(x) = x^2$ on $\mathbb{R}$, $f([-1,2]) = [0,4]$ by double inclusion. ($\subseteq$) If $-1 \le x \le 2$ then $|x| \le 2$, so $0 \le x^2 \le 4$. ($\supseteq$) If $0 \le y \le 4$ then $x = \sqrt{y} \in [0,2] \subseteq [-1,2]$ and $f(x) = y$.

>[!warning] Common error
> Images preserve unions, but for intersections only $f(U_1 \cap U_2) \subseteq f(U_1) \cap f(U_2)$ holds: for $f(x) = x^2$, $U_1 = \{-1\}$ and $U_2 = \{1\}$, the left side is $\emptyset$, the right $\{1\}$.
