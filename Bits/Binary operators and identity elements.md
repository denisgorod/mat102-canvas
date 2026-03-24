---
id: binary-operator-identity
title: "Binary operators and identity elements"
role: bit
group: functions-ii
curriculum_path: null
learning_objectives: []
children:
  - id: group-definition
    question: "What if we require associativity, identity, and inverses all at once?"
    edge_type: prerequisite
parents:
  - bijective-functions
---

Suppose you're running a shop where every sale involves combining two goods: one you offer, one the customer brings. The combination — call it an *operation* — takes two things and produces one thing in return. Addition and multiplication are operations you know well. We call any operation that takes two inputs and produces one output a **binary operator**.

Now, many operations have a special element that "does nothing." When you add 0 to any number, the result is unchanged: $5 + 0 = 5$. When you multiply any number by 1, it stays the same: $7 \times 1 = 7$. These special elements — 0 for addition, 1 for multiplication — are called **identity elements**.

More formally, if we have a binary operator $\circ$ (any symbol representing the operation), and a set where that operation makes sense, we say that an element $\text{id}$ is the *identity element for $\circ$* if operating with it changes nothing:

$$x \circ \text{id} = x \quad \text{and} \quad \text{id} \circ x = x$$

for every element $x$.

The additive identity is $\text{id}_{+} = 0$ because $x + 0 = x$ for all real numbers $x$. The multiplicative identity is $\text{id}_{\times} = 1$ because $x \times 1 = x$ for all real numbers $x$.

These identities are not accidents of nature — they are structural features. Whenever you have an operation, you might ask: is there an identity? Many natural operations have one. Not all do. But when an operation *does* have an identity, it opens the door to asking the next natural question: what element *undoes* this operation?

>[!idea]
>A binary operator is an operation taking two inputs and producing one output. An identity element for that operator is an element that, when combined with anything via the operator, leaves that thing unchanged: $x \circ \text{id} = x$.
