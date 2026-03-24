---
id: strong-induction-equivalence
title: "Strong induction equivalence"
role: bit
group: strong-induction
curriculum_path: null
learning_objectives: []
parents:
  - strong-induction-principle
children: []
---

You might wonder: is strong induction *actually* stronger than regular induction, or is it just a convenience?

The answer is that strong and regular induction are **logically equivalent**. Anything provable by one method is provable by the other.

**Why are they equivalent?** Here's a proof sketch. Suppose you have a strong induction proof of $P(n)$ for all $n$:
- Base case: $P(1)$ is true.
- Induction step: $P(1) \land \cdots \land P(k) \Rightarrow P(k+1)$ for all $k$.

Define a new predicate $Q(n)$ to mean "$P(1) \land P(2) \land \cdots \land P(n)$ is true." (So $Q(n)$ says "all instances up to $n$ are true.")

Now apply regular induction to $Q$:
- Base case: $Q(1) = P(1)$, which is true by assumption.
- Induction step: Assume $Q(k)$ is true, meaning $P(1) \land \cdots \land P(k)$ is true. By the strong induction hypothesis, this implies $P(k+1)$. Therefore $Q(k+1) = P(1) \land \cdots \land P(k) \land P(k+1)$ is true.

By regular induction, $Q(n)$ is true for all $n$, which means $P(n)$ is true for all $n$.

Conversely, since regular induction is a special case of strong induction (you just don't use the extra assumptions), anything provable by regular induction is provable by strong induction.

So strong induction is *conceptually* stronger—it gives you more assumptions in the hypothesis—but *logically* equivalent. It's a tool that often makes proofs cleaner and more readable, especially when your statement naturally depends on multiple previous cases.

>[!idea] Strong and regular induction are logically equivalent: strong induction is a convenience that simplifies proofs when you genuinely need multiple prior cases.
