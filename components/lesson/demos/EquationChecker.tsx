"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { latexSigned, parseStudentNumber } from "@/lib/math/parse-number";

export function EquationChecker() {
  const sliderId = useId();
  const typedId = useId();
  const [x, setX] = useState(0);
  const [typed, setTyped] = useState("0");

  const left = useMemo(() => 2 * x + 3, [x]);
  const right = 11;
  const ok = Math.abs(left - right) < 0.05;

  function fromSlider(next: number) {
    setX(next);
    setTyped(String(next));
  }

  function fromTyped(raw: string) {
    setTyped(raw);
    const next = parseStudentNumber(raw);
    if (!Number.isFinite(next)) return;
    setX(Math.min(10, Math.max(-4, next)));
  }

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Demonstration</p>
      <h3 className="mt-1 font-serif text-xl text-white">Check by substitution</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        A candidate solution is only a solution if both sides become the same
        number. The equation is 2x + 3 = 11. Drag x, including 0 and negatives,
        and watch the two sides. They match only at one place.
      </p>
      <div className="mt-2 overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-3 py-1">
        <Equation display latex="2x + 3 = 11" />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor={sliderId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Trial value of x</span>
            <span className="font-mono text-cyan-200">{x.toFixed(1)}</span>
          </label>
          <input
            id={sliderId}
            type="range"
            min={-4}
            max={10}
            step={0.1}
            value={x}
            onChange={(event) => fromSlider(Number(event.target.value))}
            className="mt-3 h-11 w-full accent-cyan-400"
            aria-valuetext={`x equals ${x.toFixed(1)}`}
          />
        </div>
        <div>
          <label htmlFor={typedId} className="text-sm text-slate-400">
            Type x
          </label>
          <input
            id={typedId}
            type="text"
            inputMode="text"
            autoComplete="off"
            value={typed}
            onChange={(event) => fromTyped(event.target.value)}
            className="mt-1 w-28 rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>
      </div>
      <div aria-live="polite" className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07101e] px-3 py-3">
          <Equation display latex={`\\text{LHS } = 2${latexSigned(x)}+3 = ${left.toFixed(1)}`} />
        </div>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#07101e] px-3 py-3">
          <Equation display latex={`\\text{RHS } = 11`} />
        </div>
      </div>
      <p className={`mt-3 text-sm ${ok ? "text-emerald-300" : "text-slate-400"}`}>
        {ok
          ? "Both sides are 11. x = 4 is the solution — and the only one, because a non-zero multiple of x can hit 11 − 3 only once."
          : `The sides differ by ${Math.abs(left - 11).toFixed(1)}. Keep moving x until they match.`}
      </p>
    </Card>
  );
}
