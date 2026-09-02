Fixture for the multi-subject layout check in `tools/smoke-test.mjs`.

The shipped review map covers a single subject, so a bug in lane separation —
topics from two subjects interleaved, or drawn into the wrong lane — cannot show
up on it. This pair of files is the smallest input that exposes one:

- two subject lanes (`Alpha` above `Beta`),
- two topics in each, deliberately named so that inquiry order, alphabetical
  order, and a flat left-to-right sort of all four topics all disagree.

Correct reading order is `zeta-first, alpha-second` then `mu-first, beta-second`.
A flat sort by `x` yields `zeta-first, mu-first, alpha-second, beta-second`,
because every lane restarts at the same `x`.
