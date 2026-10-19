---
id: eqv-classes
title: "Equivalence classes and quotient set"
role: definition
subject: relations
topic: equivalence-relations
statement: "For an equivalence relation ∼ on a set A, the equivalence class of a ∈ A is [a] = {x ∈ A : x ∼ a}, and the quotient A/∼ is the set of all equivalence classes."
depends_on: [eqv-def]
---
>[!d] Definition
> Let $\sim$ be an equivalence relation on $A$. The **equivalence class** of $a \in A$ is $[a] = \{x \in A : x \sim a\}$; its elements are **representatives** of it. The **quotient** $A/{\sim} = \{[a] : a \in A\}$ is the set of all classes.

>[!info] Note
> $[a]$ is a subset of $A$ but a single element of $A/{\sim}$; different representatives may name the same class.

>[!e] Worked example
> On $\mathbb{R}$ let $a \sim b \iff b - a \in 2\pi\mathbb{Z} = \{2\pi k : k \in \mathbb{Z}\}$. Then $x \sim 0 \iff -x \in 2\pi\mathbb{Z} \iff x \in 2\pi\mathbb{Z}$, so $[0] = \{\dots, -2\pi, 0, 2\pi, \dots\}$; likewise $[1.5] = \{1.5 + 2\pi k : k \in \mathbb{Z}\}$. And $x \sim 2\pi \iff 2\pi - x \in 2\pi\mathbb{Z} \iff x \in 2\pi\mathbb{Z}$, so $[2\pi] = [0]$.
