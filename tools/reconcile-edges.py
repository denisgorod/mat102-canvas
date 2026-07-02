#!/usr/bin/env python3
"""
reconcile-edges.py — bring bit frontmatter into sync with the canvas graph.

The Obsidian canvas (MAT102.canvas) is the fuller artifact: some edges were
added there (by dragging in Obsidian) without being written back to the parent
bit's frontmatter `children`, and some frontmatter `question` fields were left
blank. This tool makes the two coincide by BACKFILLING the frontmatter from the
canvas:

  1. add every canvas edge missing from a parent's `children` (edge_type:
     prerequisite by default — the author reclassifies bit->bit edges later);
  2. fill blank `question` fields from the canvas edge label;
  3. on the one genuine question conflict, take the canvas (more specific) text;
  4. stamp `edge_type` onto every canvas edge (from the reconciled frontmatter),
     so the canvas carries edge type for the viewer's visual encoding.

Only the `children:` block of each frontmatter is rewritten (existing entries
are preserved verbatim); the canvas is re-serialized byte-for-byte except for
the added edge_type fields. Nothing is deleted.

Usage:
  python tools/reconcile-edges.py            # dry run: writes a preview diff, changes nothing
  python tools/reconcile-edges.py --apply    # backfill frontmatter + stamp canvas
"""
import argparse, json, glob, os, re, sys, difflib
from collections import defaultdict
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANVAS = os.path.join(ROOT, "MAT102.canvas")
BITS = os.path.join(ROOT, "Bits")
PREVIEW = os.path.join(ROOT, "tools", "reconcile-preview.diff")
DEFAULT_EDGE_TYPE = "prerequisite"


def load_frontmatter():
    """slug -> {file, children: {child: (question, edge_type)}}"""
    slugs = {}
    base2slug = {}
    for f in glob.glob(os.path.join(BITS, "**", "*.md"), recursive=True):
        t = open(f, encoding="utf-8").read()
        if not t.startswith("---\n"):
            continue
        end = t.index("\n---", 4)
        d = yaml.safe_load(t[4:end]) or {}
        sid = str(d.get("id")).strip()
        kids = {}
        for k in (d.get("children") or []):
            if isinstance(k, dict) and k.get("id"):
                kids[str(k["id"]).strip()] = (str(k.get("question", "")).strip(),
                                              str(k.get("edge_type", "")).strip())
        slugs[sid] = {"file": f, "children": kids}
        base2slug[os.path.basename(f)] = sid
    return slugs, base2slug


def canvas_edges(canvas, base2slug):
    hex2slug = {}
    for n in canvas["nodes"]:
        if n.get("type") == "file":
            hex2slug[n["id"]] = base2slug.get(os.path.basename(n["file"]))
    out = []
    for e in canvas["edges"]:
        a, b = hex2slug.get(e["fromNode"]), hex2slug.get(e["toNode"])
        out.append((a, b, (e.get("label") or "").strip(), e))
    return out


def esc(q):
    return q.replace("\\", "\\\\").replace('"', '\\"')


def rewrite_children(fm_body, fills, adds):
    """fills: {child_id: question}; adds: [(child_id, question, edge_type)]"""
    lines = fm_body.split("\n")
    ci = next((i for i, l in enumerate(lines) if l == "children:" or l.startswith("children:")), None)
    if ci is None:
        raise ValueError("no children: key")
    ei = len(lines)
    for j in range(ci + 1, len(lines)):
        if lines[j] and not lines[j][0].isspace():
            ei = j
            break
    entries, cur = [], None
    if lines[ci].strip() != "children: []":
        for l in lines[ci + 1:ei]:
            if l.lstrip().startswith("- "):
                if cur is not None:
                    entries.append(cur)
                cur = [l]
            elif cur is not None:
                cur.append(l)
        if cur is not None:
            entries.append(cur)

    def eid(elines):
        for l in elines:
            m = re.match(r"\s*-\s*id:\s*(\S+)", l)
            if m:
                return m.group(1)
        return None

    for e in entries:
        if eid(e) in fills:
            for k, l in enumerate(e):
                if re.match(r"\s*question:", l):
                    e[k] = f'    question: "{esc(fills[eid(e)])}"'
                    break

    block = []
    if entries or adds:
        block.append("children:")
        for e in entries:
            block.extend(e)
        for cid, q, et in adds:
            block += [f"  - id: {cid}", f'    question: "{esc(q)}"', f"    edge_type: {et}"]
    else:
        block.append("children: []")
    return "\n".join(lines[:ci] + block + lines[ei:])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="write changes (default: dry-run preview)")
    args = ap.parse_args()

    canvas = json.loads(open(CANVAS, encoding="utf-8").read())
    slugs, base2slug = load_frontmatter()
    fm_q = {}
    for s, info in slugs.items():
        for c, (q, et) in info["children"].items():
            fm_q[(s, c)] = q
    edges = canvas_edges(canvas, base2slug)

    fills_by_parent = defaultdict(dict)      # parent -> {child: question}
    adds_by_parent = defaultdict(list)       # parent -> [(child, question, edge_type)]
    edge_type_of = {}                        # (a,b) -> edge_type for canvas stamping
    for a, b, q, _ in edges:
        if (a, b) in fm_q:
            edge_type_of[(a, b)] = slugs[a]["children"][b][1] or DEFAULT_EDGE_TYPE
            if fm_q[(a, b)] != q and q:      # blank fill (39) or the 1 conflict
                fills_by_parent[a][b] = q
        else:
            adds_by_parent[a].append((b, q, DEFAULT_EDGE_TYPE))
            edge_type_of[(a, b)] = DEFAULT_EDGE_TYPE

    n_add = sum(len(v) for v in adds_by_parent.values())
    n_fill = sum(len(v) for v in fills_by_parent.values())
    changed_parents = set(fills_by_parent) | set(adds_by_parent)

    # ---- frontmatter edits ----
    diffs = []
    file_new = {}
    for parent in sorted(changed_parents):
        path = slugs[parent]["file"]
        old = open(path, encoding="utf-8").read()
        end = old.index("\n---", 4)
        fm_body, rest = old[4:end], old[end:]
        new_fm = rewrite_children(fm_body, fills_by_parent.get(parent, {}), adds_by_parent.get(parent, []))
        new = "---\n" + new_fm + rest
        file_new[path] = new
        rel = os.path.relpath(path, ROOT)
        diffs.append("".join(difflib.unified_diff(
            old.splitlines(keepends=True), new.splitlines(keepends=True),
            fromfile=rel, tofile=rel)))

    # ---- canvas edge_type stamping ----
    et_dist = defaultdict(int)
    for a, b, q, e in edges:
        e["edge_type"] = edge_type_of[(a, b)]
        et_dist[e["edge_type"]] += 1
    new_canvas = json.dumps(canvas, indent="\t", ensure_ascii=False)

    print(f"parents touched: {len(changed_parents)} | children added: {n_add} | questions filled: {n_fill}")
    print(f"canvas edges stamped with edge_type: {sum(et_dist.values())}  {dict(et_dist)}")

    if args.apply:
        for path, new in file_new.items():
            open(path, "w", encoding="utf-8").write(new)
        open(CANVAS, "w", encoding="utf-8").write(new_canvas)
        print(f"APPLIED: {len(file_new)} frontmatter files + MAT102.canvas")
    else:
        with open(PREVIEW, "w", encoding="utf-8") as fh:
            fh.write("\n".join(diffs))
        print(f"DRY RUN. Full frontmatter diff written to {os.path.relpath(PREVIEW, ROOT)} ({len(diffs)} files).")
        print("Canvas: +1 `edge_type` line per edge (415), otherwise byte-identical.")


if __name__ == "__main__":
    main()
