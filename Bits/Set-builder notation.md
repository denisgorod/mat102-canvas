---
id: set-builder-notation
title: "Set-builder notation"
role: bit
group: sets
curriculum_path: null
learning_objectives: []
children:
  - id: standard-number-sets
    question: "What are the standard sets mathematicians work with?"
    edge_type: prerequisite
  - id: ex-expand-set-builder
    question: "Can I go backwards and list the elements from a set-builder description?"
    edge_type: prerequisite
  - id: ex-write-sets-explicitly
    question: "Can I convert set-builder notation into explicit lists?"
    edge_type: prerequisite
parents:
  - what-is-a-set
---

Most interesting sets are too large or infinite to list element by element. Instead, you describe a set by specifying a property that its elements must satisfy.

The notation is
$$\{a : a \text{ satisfies property } P\}$$
read as "the set of all $a$ which satisfy $P$." The colon (or sometimes a vertical bar $|$) means "such that."

For example, the set of all positive integers can be written as
$$\{1, 2, 3, \ldots\} = \{a : a \text{ is a positive integer}\}.$$
You could also write
$$\{n : n \in \mathbb{Z} \text{ and } n > 0\}$$
if you already know what $\mathbb{Z}$ means (the integers).

Set-builder notation is powerful because it lets you define sets you could never list explicitly. The set of all people taller than 6 feet is
$$\{\text{person } p : p \text{ is taller than 6 feet}\}.$$
The set of all real numbers between 0 and 1 is
$$\{x : 0 < x < 1\}.$$
These are infinite or immensely large, yet the notation captures them precisely and concisely.

The key requirement is that the property must be well-defined: there is no ambiguity in deciding whether an object satisfies it or not.

>[!idea]
> Set-builder notation $\{a : \text{property}\}$ describes a set by what its elements must satisfy, not by listing them explicitly. This lets you define infinite or huge sets unambiguously.
