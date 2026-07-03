#!/usr/bin/env python3
"""
build-reader-data.py — emit reader-data.json for the reader-first prototype.

A compact, self-describing graph the reader UI consumes at runtime: every node's
slug/title/role/group/file, and every edge's question + edge_type (from the
now-reconciled canvas). The reader filters this to a topic (by `group`), treats
role==bit as the spine, and fetches each bit's markdown from `file` on demand.

Regenerate after any graph change:
  python tools/build-reader-data.py
"""
import json, glob, os
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANVAS = os.path.join(ROOT, "MAT102.canvas")
BITS = os.path.join(ROOT, "Bits")
OUT = os.path.join(ROOT, "reader-data.json")

canvas = json.loads(open(CANVAS, encoding="utf-8").read())
nodes = {}
base2slug = {}
for f in glob.glob(os.path.join(BITS, "**", "*.md"), recursive=True):
    t = open(f, encoding="utf-8").read()
    if not t.startswith("---\n"):
        continue
    d = yaml.safe_load(t[4:t.index(chr(10) + "---", 4)]) or {}
    slug = str(d.get("id")).strip()
    rel = os.path.relpath(f, ROOT).replace(os.sep, "/")
    nodes[slug] = {
        "title": d.get("title") or slug,
        "role": d.get("role"),
        "group": d.get("group"),
        "curriculum_path": d.get("curriculum_path"),  # null today; reader falls back to role==bit
        "file": rel,
    }
    base2slug[os.path.basename(f)] = slug

hex2slug = {n["id"]: base2slug.get(os.path.basename(n["file"]))
            for n in canvas["nodes"] if n.get("type") == "file"}

edges = []
for e in canvas["edges"]:
    a, b = hex2slug.get(e["fromNode"]), hex2slug.get(e["toNode"])
    if not a or not b:
        continue
    edges.append({"from": a, "to": b,
                  "question": (e.get("label") or "").strip(),
                  "edge_type": e.get("edge_type") or "prerequisite"})

data = {"nodes": nodes, "edges": edges}
open(OUT, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent="\t"))
print(f"wrote {os.path.relpath(OUT, ROOT)}: {len(nodes)} nodes, {len(edges)} edges")
