---
id: surjective-functions
title: "Surjective functions"
role: bit
group: functions-i
curriculum_path: null
learning_objectives: []
children: []
parents:
  - domain-codomain-range
---

A function $f: A \to B$ can hit some elements of $B$ and miss others. What if you want every element of $B$ to be hit?

When every element in the codomain $B$ is the output of at least one input from $A$, we say $f$ is **surjective** (or "onto"). In other words, $f$ is surjective if and only if for every $t \in B$, there exists some $s \in A$ with $f(s) = t$.

This is a universal statement inside an existential one: $\forall t \in B, \exists s \in A$ such that $f(s) = t$. Every codomain element is covered.

Picture it with arrows: you draw an element in $A$ for each input, an element in $B$ for each output, and an arrow from input to output for each evaluation. A function is surjective if every element in $B$ has at least one arrow pointing to it. You might have multiple arrows hitting one codomain element (that's fine — the function doesn't need to be injective), but nothing is left orphaned.

Compare this to injectivity, which cares about *different* inputs. Surjectivity doesn't care about how many arrows point to $B$; it just cares that nothing in $B$ is skipped. These are independent properties. A function can be injective but not surjective (like $f(x) = x$ from $\mathbb{R}$ to $\mathbb{R}^2$, which hits only a line). It can be surjective but not injective (like $f(x) = \lfloor x \rfloor$ from $\mathbb{R}$ to $\mathbb{Z}$, which hits every integer but uses multiple real inputs per output). Or both, or neither.

Notice again: surjectivity depends on the codomain. The function $f(x) = x^2$ is *not* surjective from $\mathbb{R}$ to $\mathbb{R}$ (negative numbers are never outputs), but it *is* surjective from $\mathbb{R}$ to $[0, \infty)$ (every non-negative real is a square).

>[!idea]
> A function is surjective onto its codomain if every codomain element is hit by at least one input. Surjectivity is about coverage, not injectivity, and depends crucially on the codomain.
