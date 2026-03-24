---
id: inverse-with-respect-to-operator
title: "Inverse with respect to an operator"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children:
  - id: group-definition
    question: "What structure do we get when every element has an inverse?"
    edge_type: prerequisite
parents:
  - binary-operator-identity
---

Now that you know what an identity element is, you can ask: given an operation and its identity, what element *undoes* the operation for a particular input?

If $\circ$ is a binary operator with identity $\text{id}$, then the **inverse** of an element $x$ with respect to $\circ$ is an element $y$ such that:

$$x \circ y = \text{id}$$

For addition, the identity is 0. The inverse of 2 is $-2$ because $2 + (-2) = 0$. The inverse of $-5$ is $5$ because $-5 + 5 = 0$. Generally, the inverse of $n$ under addition is $-n$.

For multiplication, the identity is 1. The inverse of 2 is $\frac{1}{2}$ because $2 \times \frac{1}{2} = 1$. The inverse of $\frac{3}{4}$ is $\frac{4}{3}$ because $\frac{3}{4} \times \frac{4}{3} = 1$.

But here's a crucial observation: **not every element has an inverse.** Under multiplication, the number 0 has no inverse. There is no number $y$ such that $0 \times y = 1$, no matter what $y$ you choose. This is not a failure of the system — it's a feature. Not all elements need have inverses.

When an element *does* have an inverse $y$, we sometimes write that inverse as $x^{-1}$ to mean "the element that, when combined with $x$ via $\circ$, gives the identity." The notation is a shorthand, not exponentiation.

>[!idea]
>Given a binary operator $\circ$ with identity $\text{id}$, the inverse of $x$ is an element $y$ such that $x \circ y = \text{id}$. Not every element has an inverse; it depends on the operator and the set.
