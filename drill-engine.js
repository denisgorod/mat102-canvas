// Parametric spaced-repetition drills — pure, DOM-free engine shared by the
// reader (browser) and the build-time validator (node). No eval(): a small
// whitelisted expression interpreter, so drill specs authored in content
// frontmatter can never run arbitrary code.
//
// A drill spec (authored in a bit's frontmatter under `drills:`):
//   - id: reduce
//     prompt: '$%a% \bmod %n%$'         # %var% placeholders; LaTeX for MathJax
//     vars: { a: {int: [17,200]}, n: {int: [2,15]} }
//     where: 'n >= 2'                    # optional &&-joined constraints
//     answer: 'mod(a,n)'                # safe expression / comparison over vars
//     type: integer                     # integer | mod | boolean | set

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const mod = (a, n) => ((a % n) + n) % n;
const modpow = (b, e, m) => { let r = 1; b = ((b % m) + m) % m; while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1; } return r; };
const FUNCS = { gcd, mod, modpow, abs: Math.abs, floor: Math.floor, min: Math.min, max: Math.max, sqrt: Math.sqrt };

// Pratt parser: numbers, + - * / % ^, unary -, parentheses, whitelisted calls, vars.
export function evalExpr(src, vars) {
  let i = 0;
  const ws = () => { while (i < src.length && /\s/.test(src[i])) i++; };
  const binom = { "+": 10, "-": 10, "*": 20, "/": 20, "%": 20, "^": 30 };
  const apply = (op, a, b) => op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : op === "/" ? a / b : op === "%" ? mod(a, b) : Math.pow(a, b);
  function atom() {
    ws();
    const c = src[i];
    if (c === "(") { i++; const v = parse(0); ws(); if (src[i] === ")") i++; return v; }
    if (c === "-") { i++; return -atom(); }
    if (/[0-9.]/.test(c)) { let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++; const n = Number(src.slice(i, j)); i = j; return n; }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i; while (j < src.length && /[a-zA-Z0-9_]/.test(src[j])) j++;
      const name = src.slice(i, j); i = j; ws();
      if (src[i] === "(") {
        i++; const args = []; ws();
        if (src[i] !== ")") { args.push(parse(0)); ws(); while (src[i] === ",") { i++; args.push(parse(0)); ws(); } }
        if (src[i] === ")") i++;
        if (!FUNCS[name]) throw new Error("unknown function: " + name);
        return FUNCS[name](...args);
      }
      if (!(name in vars)) throw new Error("unknown variable: " + name);
      return vars[name];
    }
    throw new Error("parse error near '" + src.slice(i, i + 8) + "'");
  }
  function parse(bp) {
    let left = atom();
    while (true) {
      ws();
      const op = src[i], b = binom[op];
      if (b === undefined || b < bp) break;
      i++;
      left = apply(op, left, parse(op === "^" ? b : b + 1)); // ^ right-assoc
    }
    return left;
  }
  const v = parse(0); ws();
  if (i < src.length) throw new Error("trailing input in expression: " + src);
  return v;
}

export function evalBool(src, vars) {
  const m = src.match(/^(.+?)(==|!=|>=|<=|>|<)(.+)$/);
  if (!m) return Boolean(evalExpr(src, vars));
  const a = evalExpr(m[1], vars), b = evalExpr(m[3], vars);
  return { "==": a === b, "!=": a !== b, ">=": a >= b, "<=": a <= b, ">": a > b, "<": a < b }[m[2]];
}

const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

export function sampleVars(spec) {
  for (let t = 0; t < 200; t++) {
    const vars = {};
    for (const [k, def] of Object.entries(spec.vars || {})) vars[k] = randInt(def.int[0], def.int[1]);
    if (!spec.where || String(spec.where).split("&&").every((c) => evalBool(c.trim(), vars))) return vars;
  }
  throw new Error("constraints unsatisfiable for drill: " + spec.id);
}

export function computeAnswer(spec, vars) {
  if (spec.type === "boolean") return evalBool(spec.answer, vars);
  if (spec.type === "set") return new Set(String(spec.answer).split(",").map((e) => evalExpr(e.trim(), vars)));
  if (spec.type === "mod") return mod(evalExpr(spec.answer, vars), evalExpr(spec.modulus, vars));
  return evalExpr(spec.answer, vars);
}

export const renderPrompt = (spec, vars) => spec.prompt.replace(/%(\w+)%/g, (_, k) => vars[k]);

export function formatAnswer(spec, vars) {
  const a = computeAnswer(spec, vars);
  if (spec.type === "boolean") return a ? "True" : "False";
  if (spec.type === "set") return [...a].sort((x, y) => x - y).join(", ");
  return String(a);
}

export function checkAnswer(spec, vars, input) {
  const s = String(input).trim();
  if (s === "") return false;
  if (spec.type === "boolean") { const truth = evalBool(spec.answer, vars); const t = s.toLowerCase(); return truth ? /^(t|y|true|yes)/.test(t) : /^(f|n|false|no)/.test(t); }
  if (spec.type === "set") { const want = computeAnswer(spec, vars); const got = new Set(s.split(/[,\s]+/).map((x) => Number(x)).filter((x) => !Number.isNaN(x))); return want.size === got.size && [...want].every((x) => got.has(x)); }
  if (spec.type === "mod") { const n = evalExpr(spec.modulus, vars); return mod(Number(s), n) === computeAnswer(spec, vars); }
  return Number(s) === computeAnswer(spec, vars);
}

export function makeInstance(spec) {
  const vars = sampleVars(spec);
  return { spec, vars, prompt: renderPrompt(spec, vars) };
}
