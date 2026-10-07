---
id: grp-dihedral
title: "The dihedral group Dₙ"
role: object
subject: group-theory
topic: groups-first-principles
statement: "The symmetries of a regular n-gon (n ≥ 3) form a non-abelian group Dₙ of 2n elements rⁱ, srⁱ (0 ≤ i < n), for r the 2π/n rotation, s a reflection; rⁿ = s² = e, sr = r⁻¹s."
depends_on: [grp-abelian, fn-composition]
---
>[!d] Definition
> For $n\ge3$, the **dihedral group** $D_n$ is the set of symmetries (rotations and reflections mapping it onto itself) of a regular $n$-gon, under composition. Let $r$ be the rotation through $2\pi/n$ about the centre and $s$ a reflection in an axis of symmetry. Plane geometry (not proved here) gives $r^n=s^2=e$, $sr=r^{-1}s$, and $D_n=\{e,r,\dots,r^{n-1},s,sr,\dots,sr^{n-1}\}$ with these $2n$ elements distinct, so $|D_n|=2n$.

>[!info] Note (non-abelian)
> If $sr=rs$, then $r^{-1}s=rs$, and cancelling $s$ gives $r^{-1}=r$, i.e. $r^2=e$. But $r^2$ is the rotation through $4\pi/n$, and $0<4\pi/n<2\pi$ as $n\ge3$; so $sr\ne rs$.

>[!e] Worked example
> In $D_3$, record each symmetry by its action on the vertices $1,2,3$, composing right to left: $r=(1\,2\,3)$ and $s=(2\,3)$, the reflection fixing vertex $1$. Then $sr=(1\,3)=r^2s$, and multiplying $sr$ by $s$ on the right gives $srs=(1\,3)(2\,3)=(1\,3\,2)=r^{-1}$. The six elements $e,r,r^2,s,sr,sr^2$ are $\mathrm{id},(1\,2\,3),(1\,3\,2),(2\,3),(1\,3),(1\,2)$.
