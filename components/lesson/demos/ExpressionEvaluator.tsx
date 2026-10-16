"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { latexSigned, parseStudentNumber } from "@/lib/math/parse-number";

export function ExpressionEvaluator() {
  const sliderId = useId();
  const numberId = useId();
  const liveId = useId();
  const [x, setX] = useState(2);
  const [typed, setTyped] = useState("2");
  const linear = useMemo(() => 3 * x + 2, [x]);
  const square = useMemo(() => x * x, [x]);
  const xLatex = latexSigned(x);
  const cx = 100 + x * 16;
  const linearY = Math.min(58, Math.max(6, 32 - linear * 1.35));
  const squareY = Math.min(58, Math.max(6, 32 - square * 1.05));

  function setFromSlider(next: number) {
    setX(next);
    setTyped(next.toFixed(1).replace(/\.0$/, ".0"));
  }

  function setFromInput(raw: string) {
    setTyped(raw);
    const next = parseStudentNumber(raw);
    if (!Number.isFinite(next)) return;
    setX(Math.min(5, Math.max(-5, next)));
  }

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
        Demonstration
      </p>
      <h3 className="mt-1 font-serif text-xl text-white">Live substitution</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Choose any value of x, including negatives, zero, and tenths. Watch 3x + 2
        move in a straight line, while x² stays zero or positive. The letter is a
        blank: once a number sits there, ordinary arithmetic takes over.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor={sliderId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Value of x</span>
            <span className="font-mono text-cyan-200">{x.toFixed(1)}</span>
          </label>
          <input
            id={sliderId}
            type="range"
            min={-5}
            max={5}
            step={0.1}
            value={x}
            onChange={(event) => setFromSlider(Number(event.target.value))}
            className="mt-3 h-11 w-full accent-cyan-400"
            aria-valuetext={`x equals ${x.toFixed(1)}`}
          />
        </div>
        <div>
          <label htmlFor={numberId} className="text-sm text-slate-400">
            Type x
          </label>
          <input
            id={numberId}
            type="text"
            inputMode="decimal"
            value={typed}
            onChange={(event) => setFromInput(event.target.value)}
            className="mt-1 w-28 rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>
      </div>
      <div id={liveId} aria-live="polite" className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07101e] px-3 py-3">
          <Equation display latex={`3x+2 = 3${xLatex}+2 = ${linear.toFixed(1)}`} />
        </div>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07101e] px-3 py-3">
          <Equation display latex={`x^{2} = ${xLatex}^{2} = ${square.toFixed(1)}`} />
        </div>
      </div>
      <div className="mt-4 h-20 overflow-hidden rounded-xl bg-white/5">
        <svg
          viewBox="0 0 200 64"
          className="h-full w-full"
          role="img"
          aria-label={`Graph of the two expressions. At x = ${x.toFixed(1)}, 3x+2 is ${linear.toFixed(1)} and x squared is ${square.toFixed(1)}.`}
        >
          <line x1="8" y1="32" x2="192" y2="32" stroke="rgba(148,163,184,0.35)" />
          <circle cx={cx} cy={linearY} r="6" fill="#22d3ee" />
          <circle cx={Math.min(192, Math.max(8, cx + 8))} cy={squareY} r="5" fill="#60a5fa" />
        </svg>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Cyan marker: 3x + 2. Blue marker: x² (shifted slightly right so the two
        dots do not hide each other). Try x = 0, x = −3, and x = 2.5.
      </p>
    </Card>
  );
}
