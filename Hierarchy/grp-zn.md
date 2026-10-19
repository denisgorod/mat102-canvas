---
id: grp-zn
title: "The groups ℤₙ and ℤₙ*"
role: object
subject: group-theory
topic: groups-first-principles
statement: "(ℤₙ, +) is an abelian group of order n with identity [0] and −[a] = [n−a]; under multiplication, ℤₙ* = {[a] : gcd(a, n) = 1} is an abelian group and ℤₙ is not a group if n ≥ 2."
depends_on: [grp-abelian, mod-inverses]
---
>[!t] Theorem
> Let $n\in\mathbb{Z}^{+}$. $(\mathbb{Z}_n,+)$ is an abelian group of order $n$ with identity $[0]$ and $-[a]=[-a]=[n-a]$. The **units** $\mathbb{Z}_n^*=\{[a]\in\mathbb{Z}_n:\gcd(a,n)=1\}$ form an abelian group under multiplication, with identity $[1]$. For $n\ge 2$, $(\mathbb{Z}_n,\cdot)$ is not a group. E.g. $\mathbb{Z}_8^*=\{[1],[3],[5],[7]\}$, $\mathbb{Z}_{12}^*=\{[1],[5],[7],[11]\}$, $\mathbb{Z}_6^*=\{[1],[5]\}$.

>[!p] Proof
> The operations $[a]+[b]=[a+b]$ and $[a][b]=[ab]$ are well defined, and associativity and commutativity pass from $\mathbb{Z}$, e.g. $[a]+([b]+[c])=[a+(b+c)]=[(a+b)+c]=([a]+[b])+[c]$. Also $[0]+[a]=[a]$ and $[a]+[-a]=[0]$. By the theorem on multiplicative inverses in $\mathbb{Z}_n$, $\mathbb{Z}_n^*$ is the set of invertible classes. It contains $[1]$; if $[a],[b]$ are invertible then $([a][b])([b]^{-1}[a]^{-1})=[1]$ (in either order, by commutativity), so $[a][b]\in\mathbb{Z}_n^*$; and $[a]^{-1}$ is invertible with inverse $[a]$. For $n\ge2$, $[0][x]=[0]\ne[1]$ for every $x$. $\square$

>[!warning] Common error
> The subgroup test cannot show that $\mathbb{Z}_n^*$ is a group: $(\mathbb{Z}_n,\cdot)$ is not a group, so there is no ambient group. The axioms are checked directly, as above.
