---
id: anatomy-of-a-proof
title: "Anatomy of a proof"
role: bit
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children:
  - id: proving-vs-applying
    question: "Is proving a theorem the same as applying it?"
    edge_type: prerequisite
  - id: generality-in-proofs
    question: "How can one argument cover infinitely many cases?"
    edge_type: prerequisite
parents:
  - what-is-a-proof
---

Let's see what a proof actually looks like. Here is the proposition: "If $a$ and $b$ are both even, then $ab$ is even."

>[!p] Proof
> Let $a$ and $b$ be even integers. By definition, this means there exist integers $m_1$ and $m_2$ such that $a = 2m_1$ and $b = 2m_2$.

Now compute the product:
$$ab = (2m_1)(2m_2) = 4m_1 m_2 = 2(2m_1 m_2).$$

Let $n = 2m_1 m_2$. Then $n$ is an integer (since it is the product of integers), and we have shown that $ab = 2n$.

By definition, $ab$ is even. □

Notice how the proof is structured. We start by restating the hypothesis: "Let $a$ and $b$ be even integers." We then unpack what this means using the definition of evenness: there must exist integers $m_1$ and $m_2$ so that $a$ and $b$ equal $2m_1$ and $2m_2$ respectively.

Next comes the computation. We multiply out $ab$ and rewrite it as $2$ times something. This is the crucial step — it shows that $ab$ has the form $2n$, which is exactly what it means to be even.

Finally, we conclude: $ab$ is even. The little box □ marks the end of the proof.

Notice that a proof is not just equations. There is exposition — words explaining each step. Proofs are meant to be read and understood, not merely skimmed. Every significant move is explained so that a careful reader can follow the logic without guessing.

>[!idea]
> A concrete proof shows how the hypothesis leads to the conclusion through logical steps; each step is explained in words, making the reasoning transparent.
