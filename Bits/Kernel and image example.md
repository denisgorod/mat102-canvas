---
id: kernel-and-image-example
title: "Kernel and image example"
role: bit
group: homomorphisms
curriculum_path: null
learning_objectives: []
children:
  - id: homomorphism-properties
    question: "What general properties do homomorphisms have?"
    edge_type: prerequisite
parents:
  - kernel-and-image
---

Let's compute the kernel and image of a specific homomorphism to see them in action.

Define $\varphi: \mathbb{Z}_{12} \to \mathbb{Z}_6$ by $\varphi([x]_{12}) = [2x]_6$.

First, compute all 12 outputs:
- $\varphi([0]_{12}) = [0]_6$
- $\varphi([1]_{12}) = [2]_6$
- $\varphi([2]_{12}) = [4]_6$
- $\varphi([3]_{12}) = [6]_6 = [0]_6$
- $\varphi([4]_{12}) = [8]_6 = [2]_6$
- $\varphi([5]_{12}) = [10]_6 = [4]_6$
- $\varphi([6]_{12}) = [12]_6 = [0]_6$
- $\varphi([7]_{12}) = [14]_6 = [2]_6$
- $\varphi([8]_{12}) = [16]_6 = [4]_6$
- $\varphi([9]_{12}) = [18]_6 = [0]_6$
- $\varphi([10]_{12}) = [20]_6 = [2]_6$
- $\varphi([11]_{12}) = [22]_6 = [4]_6$

Now read off the kernel and image:

**Kernel:** Elements mapping to $[0]_6$ are $\{[0]_{12}, [3]_{12}, [6]_{12}, [9]_{12}\}$. So $\ker(\varphi) = \{[0], [3], [6], [9]\}$.

**Image:** The distinct outputs are $\{[0]_6, [2]_6, [4]_6\}$. So $\text{im}(\varphi) = \{[0], [2], [4]\}$.

Notice that the kernel contains 4 elements and the image has 3 elements. Together they tell a story: $\varphi$ is not injective (the kernel is larger than $\{e_G\}$) and not surjective (the image doesn't cover all of $\mathbb{Z}_6$). In fact, $\mathbb{Z}_{12}$ has 12 elements that are "shared" among only 3 images, so each image is the output of 4 elements.

This is no accident: the kernel and image satisfy a fundamental relationship (which you'll see in the next bit) that governs how homomorphisms compress groups.

>[!idea]
> To find the kernel and image, compute all outputs and collect which inputs map to the identity, and which outputs actually occur.
