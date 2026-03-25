---
id: preimage-of-a-set
title: "Preimage of a set"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - image-of-a-set
---

You've learned to go forward: given a set of inputs, find the set of outputs (the image). Now let's go backward: given a set of outputs, which inputs produce them?

If $f: A \to B$ is a function and $V \subseteq B$, the **preimage** (or **inverse image**) of $V$ is the set of all inputs that land in $V$:
$$f^{-1}(V) = \{x \in A : f(x) \in V\}$$

Important: despite the notation $f^{-1}(V)$, the preimage does *not* require an inverse function to exist. The notation is historical and a bit unfortunate, but it's standard. $f^{-1}(V)$ is just a set that contains the inputs whose outputs are in $V$.

Let's compute a preimage. Consider $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$. What is $f^{-1}([1, 4])$ — the preimage of the interval $[1, 4]$?

We want all $x$ such that $x^2 \in [1, 4]$. This means $1 \le x^2 \le 4$, which happens when $x \in [-2, -1] \cup [1, 2]$.

Here's how to verify it:
- If $x \in [-2, -1]$, then $1 \le x^2 \le 4$, so $f(x) \in [1, 4]$.
- If $x \in [1, 2]$, then $1 \le x^2 \le 4$, so $f(x) \in [1, 4]$.
- If $|x| < 1$, then $x^2 < 1$, so $f(x) \notin [1, 4]$.
- If $|x| > 2$, then $x^2 > 4$, so $f(x) \notin [1, 4]$.

Thus $f^{-1}([1, 4]) = [-2, -1] \cup [1, 2]$.

Like images, preimages require careful reasoning to compute. The double-inclusion proof — showing one direction contains the other — is your standard tool.

>[!idea]
> The preimage of a set $V$ under $f$ is $f^{-1}(V) = \{x \in A : f(x) \in V\}$. It contains exactly the inputs that land in $V$. This notation requires no inverse function.
