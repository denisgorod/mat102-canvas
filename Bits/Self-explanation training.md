---
id: self-explanation-training
title: "Self-explanation training"
role: bit
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children:
  - id: self-explanation-vs-paraphrasing
    question: "Is restating each line in my own words enough?"
    edge_type: prerequisite
  - id: ex-set-palindromic-proof
    question: "Can I practice self-explanation on a real proof?"
    edge_type: prerequisite
  - id: ex-set-triangular-numbers
    question: "Can I self-explain a proof that uses a clever trick?"
    edge_type: prerequisite
parents:
  - what-is-a-proof
---

Research shows that undergraduate students don't read proofs the way experts do. When you watch an expert scan a proof, they're mentally connecting each line to prior knowledge, filling in implicit steps, and asking "Why did they do this?" — not just absorbing words. A technique called **self-explanation** significantly improves your proof comprehension.

After reading each line of a proof, pause and ask yourself these three questions:

1. **What are the main ideas here?** Identify the key concept or move.
2. **How does this line connect to what came before?** Relate it to earlier steps in the proof, definitions you know, or theorems you've seen.
3. **What question does this raise?** If something contradicts your understanding or seems unmotivated, note it.

Before you move to the next line, ask: *Do I understand the ideas? Do I understand why those ideas were used? How do they connect to the rest of the proof?*

Let's practice. Consider this proposition and proof:

>[!t] Theorem
> No odd integer can be expressed as the sum of three even integers.

>[!p] Proof
> Suppose, for the sake of contradiction, that some odd integer $x$ can be written as $x = a + b + c$ where $a$, $b$, and $c$ are even integers. Then $a = 2k$, $b = 2\ell$, and $c = 2m$ for some integers $k$, $\ell$, and $m$. Substituting, we have $x = 2k + 2\ell + 2m = 2(k + \ell + m)$. Since $k + \ell + m$ is an integer, $x$ is even. But this contradicts our assumption that $x$ is odd. Therefore, no odd integer can be written as the sum of three even integers.

Now, self-explain line by line: *"The proof uses proof by contradiction, so I need to watch for a logical impossibility."* Then: *"We're told $a$, $b$, $c$ are even, so I use the definition: each is twice an integer."* Then: *"The algebra combines them and factors: $2(k + \ell + m)$. By definition, that's even."* Then: *"But we assumed $x$ is odd — even and odd contradict. That's the impossibility we wanted. Proof complete."*

This is self-explanation. You're not just re-reading; you're building a mental map of how the proof works.

>[!idea]
> Self-explanation means pausing at each line to identify main ideas, connect to prior knowledge, and ask yourself why each step matters. This mental engagement significantly deepens your understanding of proofs.
