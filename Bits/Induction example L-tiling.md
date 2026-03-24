---
id: induction-example-l-tiling
title: "Induction example: L-tiling"
role: bit
group: mathematical-induction
curriculum_path: null
learning_objectives: []
parents:
  - induction-example-divisibility
children:
  - id: sigma-notation
    question: "Is there a compact way to write down long sums for induction?"
    edge_type: prerequisite
  - id: ex-domino-tiling-count
    question: "How many ways can you tile a 2×n grid with dominoes?"
    edge_type: prerequisite
---

Induction isn't just for numbers and equations—it works for geometric and combinatorial facts too.

Consider a chessboard of size $2^n \times 2^n$ (so the board has side length $2^n$). Remove one square from anywhere on the board. Can you tile the remaining squares using L-shaped tiles, where each L-tile covers exactly three squares?

**Claim:** Yes, for any $n \geq 1$.

**Base case:** Let $n = 1$, so the board is $2 \times 2$. After removing one square, you have three squares left—which form an L-shape. One L-tile covers them perfectly.

**Induction step:** Assume the claim is true for some $n$: any $2^n \times 2^n$ board with one square removed can be L-tiled. Now consider a $2^{n+1} \times 2^{n+1}$ board with one square removed.

Divide the large board into four quadrants, each of size $2^n \times 2^n$. One quadrant contains the removed square. The other three quadrants are complete.

Place a single L-tile at the center of the board, covering one square in each of the three complete quadrants. Now all four quadrants have exactly one square missing (either the original removed square or one square covered by your center L-tile).

By the induction hypothesis, each quadrant can be L-tiled. Combining these four tilings gives a complete L-tiling of the entire board.

This example shows that induction applies far beyond simple number problems. The structure—base case, recursive subdivision, induction hypothesis—remains powerful wherever you can break a large problem into smaller instances of itself.

>[!idea] Geometric induction works by subdividing a large problem into smaller versions of itself, applying the induction hypothesis to each piece, and assembling the result.
