---
id: proving-vs-applying
title: "Proving vs applying a theorem"
role: bit
group: reading-mathematics
curriculum_path: null
learning_objectives: []
children: []
parents:
  - anatomy-of-a-proof
---

When you prove a theorem, you assume the hypothesis is true and must show the conclusion follows. When you apply a theorem, you do the opposite: you verify that the hypothesis holds in your particular situation, and then you get to use the conclusion. These are opposite directions.

When proving, you work *from* hypothesis *toward* conclusion. You say: "Suppose the hypothesis is true. What can I deduce?" You're constructing a logical chain that ends in the conclusion. You never need to check whether the hypothesis actually exists in the real world — your job is just to connect it to the conclusion.

When applying, you check the hypothesis *first*, then invoke the conclusion. You say: "Does my situation satisfy the hypothesis? If yes, then the theorem guarantees the conclusion is true." You're working *backward*: you verify a concrete fact, then use the theorem to extract a new fact.

Consider a simple example. The theorem states: "If $n$ is even, then $n^2$ is even."

To *prove* this theorem, you assume $n$ is even (so $n = 2k$ for some integer $k$), and you show that $n^2 = 4k^2 = 2(2k^2)$ is even. You don't care whether such an $n$ exists — you just show that IF it does, THEN $n^2$ is even.

To *apply* this theorem to the number 6, you first verify that 6 is even (yes, $6 = 2 \cdot 3$). Only then can you conclude: "Therefore, $6^2 = 36$ is even." You needed the hypothesis to be true in order to invoke the conclusion.

Confusing these directions is a common mistake. When you're reading a proof and you see "Assume $n$ is even," you are entering *proof mode* — do not start checking whether $n$ is actually even. Your job is to follow the logical chain. Save the hypothesis-checking for when you apply the theorem later.

>[!idea]
> Proving and applying a theorem are opposite operations. In proofs, you assume the hypothesis and derive the conclusion. In applications, you verify the hypothesis and extract the conclusion.
