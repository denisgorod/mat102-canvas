#!/usr/bin/env python3
"""
build-hierarchy.py — emit hierarchy-data.json for the review map.

The review map is a SECOND graph, structured by the mathematical hierarchy
(subject → topic → node) rather than by inquiry. Its nodes live in Hierarchy/
and are canonical, reference-grade statements — authored separately from the
question-driven bits in Bits/. Objectives, definitions, theorems and their
drills live here.

The bridge between the two graphs is a function  f : bits → hierarchy  encoded
by a `concludes:` field on each inquiry bit (an inquiry branch *concludes* in a
hierarchy node). This script inverts f into each hierarchy node's
`inquiry_sources` so the review map can jump back to "how it was discovered".

Regenerate after editing Hierarchy/ or any `concludes:`:
  python tools/build-hierarchy.py
Then run the layout step to (re)generate the canvas:
  node tools/layout-hierarchy.cjs
"""
import json, glob, os
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HIER = os.path.join(ROOT, "Hierarchy")
BITS = os.path.join(ROOT, "Bits")
OUT = os.path.join(ROOT, "hierarchy-data.json")


def frontmatter(path):
    t = open(path, encoding="utf-8").read()
    if not t.startswith("---\n"):
        return None
    return yaml.safe_load(t[4:t.index("\n---", 4)]) or {}


# --- hierarchy nodes -------------------------------------------------------
nodes = {}
for f in sorted(glob.glob(os.path.join(HIER, "*.md"))):
    d = frontmatter(f)
    if not d:
        continue
    hid = str(d.get("id")).strip()
    rel = os.path.relpath(f, ROOT).replace(os.sep, "/")
    nodes[hid] = {
        "title": d.get("title") or hid,
        "role": d.get("role"),
        "subject": d.get("subject"),
        "topic": d.get("topic"),
        "statement": d.get("statement"),
        "file": rel,
        "depends_on": list(d.get("depends_on") or []),
        "drills": d.get("drills") or [],
        "inquiry_sources": [],  # filled from f below
    }

# --- f : inquiry bit --> hierarchy node (the `concludes:` field) -----------
f_map = {}
for f in glob.glob(os.path.join(BITS, "**", "*.md"), recursive=True):
    d = frontmatter(f)
    if not d:
        continue
    tgt = d.get("concludes")
    if not tgt:
        continue
    slug = str(d.get("id")).strip()
    f_map[slug] = tgt
    if tgt in nodes:
        nodes[tgt]["inquiry_sources"].append(slug)
    else:
        print(f"  ⚠ {slug} concludes in unknown hierarchy node '{tgt}'")

# --- logical DAG edges from depends_on (prerequisite -> dependent) ---------
edges = []
for hid, n in nodes.items():
    for dep in n["depends_on"]:
        if dep in nodes:
            edges.append({"from": dep, "to": hid})
        else:
            print(f"  ⚠ {hid} depends_on unknown node '{dep}' (edge skipped)")

data = {"nodes": nodes, "edges": edges}
open(OUT, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent="\t"))
mapped = sum(1 for v in f_map.values() if v in nodes)
print(f"wrote {os.path.relpath(OUT, ROOT)}: {len(nodes)} nodes, {len(edges)} edges, "
      f"{mapped} inquiry bits mapped by f")
