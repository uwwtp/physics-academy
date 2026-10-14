"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";

const C = 299_792_458;

function lorentzFactor(beta: number) {
  if (beta >= 1) return Number.POSITIVE_INFINITY;
  return 1 / Math.sqrt(1 - beta * beta);
}

export function TimeDilationLab({ compact = false }: { compact?: boolean }) {
  const [betaPercent, setBetaPercent] = useState(60);
  const beta = betaPercent / 100;
  const gamma = useMemo(() => lorentzFactor(beta), [beta]);
  const proper = 1;
  const dilated = gamma * proper;
  const v = beta * C;

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-cyan-100/10 bg-linear-to-r from-cyan-400/10 to-transparent px-5 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
          Simulation
        </p>
        <h2 className="mt-1 font-serif text-2xl text-white">
          Time dilation calculator
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          A clock that ticks {proper.toFixed(0)} s in its rest frame is watched
          from an inertial laboratory. Drag the velocity to see the Lorentz
          factor and the dilated time interval.
        </p>
      </div>
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <label className="flex items-center justify-between text-sm text-slate-300">
            <span>Velocity as a fraction of c</span>
            <span className="font-mono text-cyan-200">{beta.toFixed(3)} c</span>
          </label>
          <input
            type="range"
            min={0}
            max={99}
            step={0.1}
            value={betaPercent}
            onChange={(event) => setBetaPercent(Number(event.target.value))}
            className="mt-3 w-full accent-cyan-400"
            aria-label="Velocity as a percentage of the speed of light"
          />
          <div className="mt-2 flex justify-between text-[11px] uppercase tracking-wider text-slate-500">
            <span>Rest</span>
            <span>0.99 c</span>
          </div>
          <div className="mt-5 space-y-2 text-sm text-slate-300">
            <Equation
              display
              latex={`\\gamma = \\frac{1}{\\sqrt{1-v^{2}/c^{2}}} = ${Number.isFinite(gamma) ? gamma.toFixed(4) : "\\infty"}`}
            />
            <Equation
              display
              latex={`\\Delta t = \\gamma\\,\\Delta\\tau = ${Number.isFinite(dilated) ? dilated.toFixed(4) : "\\infty"}\\,\\mathrm{s}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Speed" value={`${(v / 1000).toExponential(3)} km/s`} />
          <Stat label="Lorentz factor γ" value={gamma.toFixed(4)} />
          <Stat label="Proper time Δτ" value={`${proper.toFixed(1)} s`} />
          <Stat
            label="Lab time Δt"
            value={`${Number.isFinite(dilated) ? dilated.toFixed(4) : "∞"} s`}
          />
          <div className="col-span-2 rounded-xl bg-[#07101e] p-4 text-sm leading-6 text-slate-400">
            At {beta.toFixed(2)}c the moving clock records 1.00 s while the
            laboratory clock records{" "}
            {Number.isFinite(dilated) ? dilated.toFixed(2) : "an unbounded"} s.
            The two observers disagree about elapsed time, not about the local
            ticking of a clock at rest beside them.
          </div>
        </div>
      </div>
      {!compact ? (
        <div className="flex flex-wrap gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
          <Link
            href="/library/time-dilation"
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Open the time dilation module
          </Link>
          <Link
            href="/practice"
            className="rounded-xl border border-cyan-200/20 px-4 py-2 text-sm text-cyan-100 hover:bg-white/5"
          >
            Back to practice
          </Link>
        </div>
      ) : (
        <div className="border-t border-white/10 px-5 py-4 sm:px-6">
          <Link
            href="/practice/time-dilation"
            className="text-sm text-cyan-300 hover:text-cyan-200"
          >
            Open the full laboratory →
          </Link>
        </div>
      )}
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
      <p className="text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-sm text-cyan-100">{value}</p>
    </div>
  );
}
