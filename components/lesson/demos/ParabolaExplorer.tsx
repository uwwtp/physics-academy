"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { analyseQuadratic, formatRoot } from "@/lib/math/quadratic";

const X_MIN = -6;
const X_MAX = 6;
const Y_MIN = -8;
const Y_MAX = 8;

function mapX(x: number) {
  return 24 + ((x - X_MIN) / (X_MAX - X_MIN)) * 272;
}

function mapY(y: number) {
  return 16 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * 168;
}

function SliderRow({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="font-mono text-cyan-200">{value.toFixed(1)}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-11 w-full accent-cyan-400"
        aria-valuetext={`${label} equals ${value.toFixed(1)}`}
      />
    </div>
  );
}

export function ParabolaExplorer() {
  const aId = useId();
  const bId = useId();
  const cId = useId();
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const analysis = useMemo(() => analyseQuadratic(a, b, c), [a, b, c]);

  function applyPreset(nextA: number, nextB: number, nextC: number) {
    setA(nextA);
    setB(nextB);
    setC(nextC);
  }

  const points = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i += 1) {
      const x = X_MIN + (i / 80) * (X_MAX - X_MIN);
      const y = a * x * x + b * x + c;
      pts.push(`${mapX(x)},${mapY(Math.max(Y_MIN, Math.min(Y_MAX, y)))}`);
    }
    return pts.join(" ");
  }, [a, b, c]);

  let caption = "";
  if (analysis.kind === "constant") {
    caption = analysis.identity
      ? "a = 0, b = 0 and c = 0: every x works. This is 0 = 0, not a curve to solve."
      : `a = 0 and b = 0: the graph is the horizontal line y = ${formatRoot(c)}. It never crosses the x-axis, so there is no root.`;
  } else if (analysis.kind === "linear") {
    caption = `a = 0, so this is the straight line y = ${formatRoot(b)}x + ${formatRoot(c)}. A linear equation has one root, x = ${formatRoot(analysis.roots[0] ?? 0)}. The quadratic formula does not apply.`;
  } else if (analysis.discriminant > 1e-9) {
    caption = `Two real roots: x = ${formatRoot(analysis.roots[0])} and x = ${formatRoot(analysis.roots[1])}. The parabola crosses the x-axis twice.`;
  } else if (Math.abs(analysis.discriminant) <= 1e-9) {
    caption = `One real root (a repeated root) at x = ${formatRoot(analysis.roots[0] ?? 0)}. The parabola just touches the x-axis at the vertex.`;
  } else {
    caption = "No real roots: the discriminant is negative, so the parabola does not meet the x-axis.";
  }

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Demonstration</p>
      <h3 className="mt-1 font-serif text-xl text-white">Parabola explorer</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Drag a, b and c. The graph is y = ax² + bx + c. The coefficient a opens
        the bowl up or down; b slides it sideways; c lifts or lowers it. Set a
        to 0 to see the quadratic collapse into a straight line.
      </p>
      <div className="mt-2 overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-3 py-1">
        <Equation
          display
          latex={`y = ${formatRoot(a)}x^{2} + (${formatRoot(b)})x + (${formatRoot(c)})`}
        />
      </div>
      <svg
        viewBox="0 0 320 200"
        className="mt-4 h-48 w-full"
        role="img"
        aria-label={caption}
      >
        <rect x="0" y="0" width="320" height="200" fill="#07101e" rx="12" />
        <line x1="24" y1={mapY(0)} x2="296" y2={mapY(0)} stroke="rgba(148,163,184,0.35)" />
        <line x1={mapX(0)} y1="16" x2={mapX(0)} y2="184" stroke="rgba(148,163,184,0.35)" />
        <polyline fill="none" stroke="#22d3ee" strokeWidth="2.5" points={points} />
        {analysis.kind === "quadratic" ? (
          <>
            <line
              x1={mapX(analysis.axis)}
              y1="16"
              x2={mapX(analysis.axis)}
              y2="184"
              stroke="rgba(96,165,250,0.5)"
              strokeDasharray="4 4"
            />
            <circle
              cx={mapX(analysis.vertex.x)}
              cy={mapY(Math.max(Y_MIN, Math.min(Y_MAX, analysis.vertex.y)))}
              r="4.5"
              fill="#60a5fa"
            />
          </>
        ) : null}
        {analysis.roots.map((root) =>
          root >= X_MIN && root <= X_MAX ? (
            <circle key={root} cx={mapX(root)} cy={mapY(0)} r="4" fill="#fbbf24" />
          ) : null,
        )}
      </svg>
      <p className="mt-2 text-[11px] text-slate-500">
        Cyan curve: y. Blue dashed line: axis of symmetry. Blue dot: vertex.
        Gold dots: real roots on the x-axis.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            { label: "Two real roots", a: 1, b: -2, c: -3 },
            { label: "One repeated root", a: 1, b: -4, c: 4 },
            { label: "No real roots", a: 1, b: 0, c: 2 },
            { label: "a = 0 (a line)", a: 0, b: -2, c: 2 },
          ] as const
        ).map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset.a, preset.b, preset.c)}
            className="min-h-11 rounded-lg border border-cyan-200/20 px-3 py-2 text-sm text-cyan-100 hover:bg-white/5"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <SliderRow id={aId} label="a (opens the bowl)" value={a} min={-2} max={2} step={0.1} onChange={setA} />
        <SliderRow id={bId} label="b (slides sideways)" value={b} min={-6} max={6} step={0.1} onChange={setB} />
        <SliderRow id={cId} label="c (moves up and down)" value={c} min={-6} max={6} step={0.1} onChange={setC} />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2" aria-live="polite">
        {analysis.kind === "quadratic" ? (
          <>
            <p>Discriminant D = {formatRoot(analysis.discriminant)}</p>
            <p>
              Vertex ({formatRoot(analysis.vertex.x)}, {formatRoot(analysis.vertex.y)})
            </p>
            <p>Axis of symmetry x = {formatRoot(analysis.axis)}</p>
            <p>
              Real roots:{" "}
              {analysis.roots.length === 0
                ? "none (D < 0)"
                : analysis.roots.length === 1
                  ? `one repeated root x = ${formatRoot(analysis.roots[0])}`
                  : `two distinct roots x = ${formatRoot(analysis.roots[0])} and x = ${formatRoot(analysis.roots[1])}`}
            </p>
          </>
        ) : (
          <p className="sm:col-span-2">{caption}</p>
        )}
      </div>
      {analysis.kind === "quadratic" ? (
        <p className="mt-3 text-sm leading-6 text-slate-400">{caption}</p>
      ) : null}
    </Card>
  );
}
