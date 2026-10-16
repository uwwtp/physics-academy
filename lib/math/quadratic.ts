const EPS = 1e-9;

export type QuadraticAnalysis =
  | {
      kind: "quadratic";
      a: number;
      b: number;
      c: number;
      discriminant: number;
      roots: number[];
      vertex: { x: number; y: number };
      axis: number;
    }
  | {
      kind: "linear";
      a: number;
      b: number;
      c: number;
      roots: number[];
    }
  | {
      kind: "constant";
      a: number;
      b: number;
      c: number;
      roots: number[];
      identity: boolean;
    };

export function analyseQuadratic(a: number, b: number, c: number): QuadraticAnalysis {
  if (Math.abs(a) < EPS) {
    if (Math.abs(b) < EPS) {
      return {
        kind: "constant",
        a,
        b,
        c,
        roots: [],
        identity: Math.abs(c) < EPS,
      };
    }
    return { kind: "linear", a, b, c, roots: [-c / b] };
  }

  const discriminant = b * b - 4 * a * c;
  const axis = -b / (2 * a);
  const vertex = { x: axis, y: a * axis * axis + b * axis + c };

  let roots: number[] = [];
  if (discriminant > EPS) {
    const sqrtD = Math.sqrt(discriminant);
    const r1 = (-b - sqrtD) / (2 * a);
    const r2 = (-b + sqrtD) / (2 * a);
    roots = r1 <= r2 ? [r1, r2] : [r2, r1];
  } else if (Math.abs(discriminant) <= EPS) {
    roots = [axis];
  }

  return { kind: "quadratic", a, b, c, discriminant, roots, vertex, axis };
}

export function formatRoot(n: number) {
  if (Math.abs(n) < 1e-10) return "0";
  const rounded = Math.round(n * 1000) / 1000;
  return String(rounded);
}

/** True when every expected root appears once among the submitted values, in any order. */
export function rootsMatch(submitted: number[], expected: number[], tolerance: number) {
  if (submitted.length !== expected.length) return false;
  if (submitted.some((value) => !Number.isFinite(value))) return false;
  const remaining = [...expected];
  for (const value of submitted) {
    const index = remaining.findIndex((candidate) => Math.abs(value - candidate) <= tolerance);
    if (index < 0) return false;
    remaining.splice(index, 1);
  }
  return remaining.length === 0;
}
