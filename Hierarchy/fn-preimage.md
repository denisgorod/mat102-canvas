---
id: fn-preimage
title: "Preimage of a set"
role: definition
subject: functions
topic: functions-i
statement: "For a function f: A → B and V ⊆ B, the preimage of V is f⁻¹(V) = {x ∈ A : f(x) ∈ V} ⊆ A, defined for every function whether or not f has an inverse."
depends_on: [fn-def]
---
>[!d] Definition
> Let $f : A \to B$ and $V \subseteq B$. The **preimage** (inverse image) of $V$ under $f$ is
> $$f^{-1}(V) = \{x \in A : f(x) \in V\} \subseteq A,$$
> so $x \in f^{-1}(V) \iff f(x) \in V$.

>[!warning] Common error
> The notation $f^{-1}(V)$ does not presuppose an inverse function: the preimage is defined for every function. For $f(x) = x^2$ on $\mathbb{R}$, which has no inverse, $f^{-1}(\{4\}) = \{-2, 2\}$ has two elements and $f^{-1}(\{-1\}) = \emptyset$.

>[!e] Worked example
> For $f(x) = x^2$ on $\mathbb{R}$, $f^{-1}([1,4]) = [-2,-1] \cup [1,2]$. Indeed $x^2 = |x|^2$ and squaring is strictly increasing on $[0, \infty)$, so for real $x$
> $$1 \le x^2 \le 4 \iff 1 \le |x| \le 2 \iff x \in [-2,-1] \cup [1,2].$$
