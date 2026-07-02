#!/usr/bin/env python3
"""
check-sync.py — verify MAT102.canvas and the bit frontmatter describe the SAME
graph. Exits non-zero (with a report) on any divergence, so drift can't creep
back in. Run before commits, or wire into CI.

Checks, over directed edges keyed by slug (parent -> child):
  - every canvas edge has a matching frontmatter `children` entry and vice versa;
  - the edge question (canvas label vs frontmatter question) matches;
  - the edge_type stamped on the canvas matches the frontmatter edge_type.
"""
import json, glob, os, sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANVAS = os.path.join(ROOT, "MAT102.canvas")
BITS = os.path.join(ROOT, "Bits")


def load():
    canvas = json.loads(open(CANVAS, encoding="utf-8").read())
    base2slug = {}
    fm = {}
    for f in glob.glob(os.path.join(BITS, "**", "*.md"), recursive=True):
        t = open(f, encoding="utf-8").read()
        if not t.startswith("---\n"):
            continue
        d = yaml.safe_load(t[4:t.index(chr(10) + "---", 4)]) or {}
        sid = str(d.get("id")).strip()
        base2slug[os.path.basename(f)] = sid
        for k in (d.get("children") or []):
            if isinstance(k, dict) and k.get("id"):
                fm[(sid, str(k["id"]).strip())] = (
                    str(k.get("question", "")).strip(), str(k.get("edge_type", "")).strip())
    hex2slug = {n["id"]: base2slug.get(os.path.basename(n["file"]))
                for n in canvas["nodes"] if n.get("type") == "file"}
    cv = {}
    for e in canvas["edges"]:
        a, b = hex2slug.get(e["fromNode"]), hex2slug.get(e["toNode"])
        cv[(a, b)] = ((e.get("label") or "").strip(), (e.get("edge_type") or "").strip())
    return cv, fm


def main():
    cv, fm = load()
    problems = []
    for k in sorted(set(cv) - set(fm)):
        problems.append(f"canvas-only edge (missing from frontmatter): {k[0]} -> {k[1]}")
    for k in sorted(set(fm) - set(cv)):
        problems.append(f"frontmatter-only edge (missing from canvas): {k[0]} -> {k[1]}")
    for k in sorted(set(cv) & set(fm)):
        (cq, cet), (fq, fet) = cv[k], fm[k]
        if cq != fq:
            problems.append(f"question mismatch {k[0]}->{k[1]}: canvas={cq!r} frontmatter={fq!r}")
        if cet != fet:
            problems.append(f"edge_type mismatch {k[0]}->{k[1]}: canvas={cet!r} frontmatter={fet!r}")

    if problems:
        print(f"OUT OF SYNC — {len(problems)} problem(s):")
        for p in problems[:60]:
            print("  -", p)
        if len(problems) > 60:
            print(f"  … and {len(problems) - 60} more")
        sys.exit(1)
    print(f"IN SYNC — {len(cv)} edges match across canvas and frontmatter.")


if __name__ == "__main__":
    main()
