---
id: prop-predicate
title: "Predicates"
role: definition
subject: sets-and-propositions
topic: propositional-logic
statement: "A predicate P(x) is a statement containing a variable x whose truth value depends on x; substituting a value for x yields a proposition, so x² > π is a predicate and 2² > π a true proposition."
depends_on: [prop-proposition]
---
>[!d] Definition
> A **predicate** $P(x)$ is a statement containing a **variable** $x$, ranging over some set, whose truth value depends on the value of $x$. $P(x)$ is not itself a proposition; substituting a specific value $a$ for $x$ yields the proposition $P(a)$. Predicates in several variables, such as $P(x, y)$, are defined likewise.

>[!e] Worked example
> "$x^2 > \pi$", for real $x$, has no truth value until $x$ is chosen: $x = 2$ gives the true proposition $4 > \pi$, and $x = 1$ the false proposition $1 > \pi$. By contrast "$2 + 2 = 5$" contains no variable, so it is already a (false) proposition.

>[!info] Note
> The other way to obtain a proposition from a predicate is to bind its variable with a quantifier: "for every real $x$, $x^2 \ge 0$" is a true proposition (see the universal quantifier).
