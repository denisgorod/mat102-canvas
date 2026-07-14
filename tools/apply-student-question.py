#!/usr/bin/env python3
"""
apply-student-question.py — fold an approved student question into the map.

Reads the parsed Issue-Form fields (as JSON, from $ISSUE_JSON) plus the issue
number ($ISSUE_NUMBER), resolves the target bit, and appends ONE entry to that
file's `student_questions:` frontmatter list. It writes ONLY from the structured,
already-parsed fields — never from raw issue prose — and touches nothing but the
`student_questions` block, so the diff a human reviews in the PR stays minimal and
`children:`/canvas parity (check-sync.py) is untouched.

Env in:
  ISSUE_JSON      JSON like {"node-slug": "...", "node-basename": "...",
                  "node-title": "...", "question": "..."}
  ISSUE_NUMBER    the GitHub issue number (provenance backlink)

Exits non-zero (without writing) if the node can't be resolved, so the workflow
fails loudly rather than editing the wrong file.
"""
import datetime
import glob
import json
import os
import re
import sys
import textwrap

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BITS = os.path.join(ROOT, "Bits")

FM_OPEN = "---\n"


def read_frontmatter(text):
    """Return the parsed frontmatter dict, or None if the file has no FM block."""
    if not text.startswith(FM_OPEN):
        return None
    end = text.find("\n---", len(FM_OPEN))
    if end < 0:
        return None
    return yaml.safe_load(text[len(FM_OPEN):end]) or {}


def resolve_target(slug, basename):
    """Map the slug (preferred) or basename to a bit file path. Returns (path, fm)."""
    by_slug = {}
    by_basename = {}
    for f in sorted(glob.glob(os.path.join(BITS, "**", "*.md"), recursive=True)):
        d = read_frontmatter(open(f, encoding="utf-8").read())
        if d is None:
            continue
        sid = str(d.get("id") or "").strip()
        if sid:
            by_slug[sid] = (f, d)
        by_basename[os.path.basename(f)] = (f, d)

    if slug and slug in by_slug:
        path, d = by_slug[slug]
        if basename and os.path.basename(path) != basename:
            print(f"note: slug {slug!r} resolved to {os.path.basename(path)!r}, "
                  f"but the link carried basename {basename!r} (renamed since?). Using the slug.")
        return path, d
    if basename and basename in by_basename:
        print(f"warning: slug {slug!r} did not resolve; falling back to basename {basename!r}.")
        return by_basename[basename]
    sys.exit(f"error: could not resolve a bit from slug={slug!r} basename={basename!r}. "
             f"Not editing anything.")


def clean_question(raw):
    """Collapse whitespace to a single line; the panel renders it on one row."""
    q = " ".join(str(raw or "").split()).strip()
    if not q:
        sys.exit("error: empty question; nothing to add.")
    return q


def render_block(questions):
    """Serialize the full student_questions list as an indented YAML block."""
    dumped = yaml.safe_dump(
        questions, default_flow_style=False, sort_keys=False,
        allow_unicode=True, width=10 ** 9,
    ).rstrip("\n")
    return ["student_questions:"] + textwrap.indent(dumped, "  ").split("\n")


def strip_existing_block(fm_lines, key):
    """Drop a top-level `key:` block (its line + indented continuation lines)."""
    out, i, n = [], 0, len(fm_lines)
    while i < n:
        if re.match(rf"^{re.escape(key)}\s*:", fm_lines[i]):
            i += 1
            while i < n and fm_lines[i][:1] in (" ", "\t"):
                i += 1
            continue
        out.append(fm_lines[i])
        i += 1
    return out


def main():
    data = json.loads(os.environ["ISSUE_JSON"])
    slug = str(data.get("node-slug") or "").strip()
    basename = str(data.get("node-basename") or "").strip()
    question = clean_question(data.get("question"))
    issue_number = int(os.environ["ISSUE_NUMBER"])

    path, fm = resolve_target(slug, basename)

    entry = {
        "question": question,
        "status": "pending",
        "source_issue": issue_number,
        "submitted": datetime.date.today().isoformat(),
    }
    existing = fm.get("student_questions") or []
    if not isinstance(existing, list):
        existing = []
    if any(isinstance(e, dict) and e.get("source_issue") == issue_number for e in existing):
        print(f"issue #{issue_number} already recorded on {os.path.basename(path)}; nothing to do.")
        return
    questions = existing + [entry]

    text = open(path, encoding="utf-8").read()
    end = text.find("\n---", len(FM_OPEN))
    fm_text, rest = text[len(FM_OPEN):end], text[end:]  # rest starts with "\n---"
    kept = strip_existing_block(fm_text.split("\n"), "student_questions")
    new_fm = "\n".join(kept + render_block(questions))
    open(path, "w", encoding="utf-8").write(FM_OPEN + new_fm + rest)

    print(f"added student question from issue #{issue_number} to "
          f"{os.path.relpath(path, ROOT)} ({len(questions)} total).")


if __name__ == "__main__":
    main()
