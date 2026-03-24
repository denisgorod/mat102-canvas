---
id: ex-trailing-zeros-factorial
title: "Trailing zeros of 100!"
role: exercise
group: primes
curriculum_path: null
learning_objectives: []
children: []
parents:
  - fta-uniqueness
---

# Trailing zeros of 100!

**How many zeros appear at the end of $100! = 100 \cdot 99 \cdot 98 \cdots 3 \cdot 2 \cdot 1$?**

A trailing zero comes from a factor of 10, which is $2 \times 5$. By the Fundamental Theorem of Arithmetic, the number of trailing zeros equals the number of times 10 divides $100!$, which is the minimum of the powers of 2 and 5 in the prime factorization.

Count how many times 5 divides $100!$ by summing $\lfloor 100/5 \rfloor + \lfloor 100/25 \rfloor + \lfloor 100/125 \rfloor + \cdots$. (There are always more factors of 2 than 5, so you only need to count 5's.)

>[!question] Exercise
>Each multiple of 5 contributes one factor of 5; each multiple of 25 contributes an additional factor; and so on. Sum the contributions.
