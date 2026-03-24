---
id: principle-of-induction
title: "Principle of Mathematical Induction"
role: bit
group: mathematical-induction
curriculum_path: null
learning_objectives: []
parents:
  - well-ordering-principle
  - what-is-an-implication
children:
  - id: induction-example-inequality
    question: "What does an induction proof look like in practice?"
    edge_type: prerequisite
  - id: ex-induction-wop-equivalence
    question: "Are induction and the Well-Ordering Principle equivalent?"
    edge_type: prerequisite
  - id: ex-induction-2n-leq-2n
    question: "Can I try a simple induction proof myself?"
    edge_type: prerequisite
---

Imagine dominoes standing in a line, each touching the next. You knock over the first one. If you can guarantee that whenever any domino falls, it knocks over the next one, then all dominoes fall. That's the essence of mathematical induction.

Suppose you want to prove that some statement $P(n)$ is true for *every* positive integer $n$. You can't check infinitely many cases one by one, so you need a chain of reasoning. Induction gives you exactly that: a way to create a chain of implications that reaches all positive integers.

Here's how it works. You need to verify two things:

**Base case:** Show that $P(1)$ is true.

**Induction step:** Show that whenever $P(k)$ is true for some positive integer $k$, then $P(k+1)$ must also be true.

Once you have both pieces, the logic unfolds like this:

$$P(1) \Rightarrow P(2) \Rightarrow P(3) \Rightarrow \cdots \Rightarrow P(n) \Rightarrow \cdots$$

Since $P(1)$ is true (the base case), and each true case implies the next (the induction step), every $P(n)$ must be true.

The induction step is where your reasoning lives. You assume $P(k)$ is true for some arbitrary $k$ (this assumption is called the *induction hypothesis*), and you use that assumption to prove $P(k+1)$. You're not trying to prove the hypothesis; you're using it as a stepping stone to reach the next case.

>[!idea] Mathematical induction proves statements for all positive integers by establishing a base case and a chain of implications that extends from one integer to the next.
