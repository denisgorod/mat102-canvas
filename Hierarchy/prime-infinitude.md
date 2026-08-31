---
id: prime-infinitude
title: "Infinitude of the primes"
role: theorem
subject: number-theory
topic: primes
statement: "There are infinitely many primes."
depends_on: [prime-fta]
---
>[!t] Theorem (Euclid)
> There are infinitely many primes.

>[!p] Proof
> Let $p_1, \dots, p_k$ be any finite list of primes and put
> $$N = p_1 \cdots p_k + 1 .$$
> Since $N > 1$, the FTA gives a prime $q \mid N$. If $q$ were some $p_i$, it would divide both $N$ and $p_1 \cdots p_k$, hence their difference $1$ — impossible. So $q$ is a prime off the list; no finite list holds every prime. $\square$

>[!warning] Common error
> The proof never claims $N$ is prime; usually it is not:
> $$2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509 .$$
> Only *some* prime divisor of $N$ is needed, and it is necessarily new.
