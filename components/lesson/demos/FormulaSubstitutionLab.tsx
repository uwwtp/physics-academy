"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { latexSigned } from "@/lib/math/parse-number";

function forceCaption(accel: number, force: number) {
  if (Math.abs(accel) < 0.05 || Math.abs(force) < 0.05) {
    return "When a = 0, F = m × 0 = 0. A mass that is not accelerating has no net force, even though the mass itself is not zero.";
  }
  if (accel < 0) {
    return "Negative acceleration makes F negative: the net force points opposite the positive direction. Mass stays positive; only the sign of a (and therefore F) flipped.";
  }
  return `Positive a and positive m give a positive force of ${force.toFixed(1)} N in the chosen positive direction.`;
}

export function FormulaSubstitutionLab() {
  const massSliderId = useId();
  const accelSliderId = useId();
  const [mass, setMass] = useState(2.5);
  const [accel, setAccel] = useState(3);
  const force = useMemo(() => mass * accel, [mass, accel]);
  const massLatex = latexSigned(mass);
  const accelLatex = latexSigned(accel);

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
        Demonstration
      </p>
      <h3 className="mt-1 font-serif text-xl text-white">Newton’s second law as substitution</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        The formula F = ma is an instruction: multiply the mass by the
        acceleration. Units travel with the numbers. One newton is one
        kilogram-metre per second squared. Mass cannot be negative here; try
        a = 0 and a negative to see what the sign of F means.
      </p>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor={massSliderId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Mass m</span>
            <span className="font-mono text-cyan-200">{mass.toFixed(1)} kg</span>
          </label>
          <input
            id={massSliderId}
            type="range"
            min={0.5}
            max={8}
            step={0.1}
            value={mass}
            onChange={(event) => setMass(Number(event.target.value))}
            className="mt-2 h-11 w-full accent-cyan-400"
            aria-valuetext={`${mass.toFixed(1)} kilograms`}
          />
        </div>
        <div>
          <label htmlFor={accelSliderId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Acceleration a</span>
            <span className="font-mono text-cyan-200">{accel.toFixed(1)} m/s²</span>
          </label>
          <input
            id={accelSliderId}
            type="range"
            min={-4}
            max={6}
            step={0.1}
            value={accel}
            onChange={(event) => setAccel(Number(event.target.value))}
            className="mt-2 h-11 w-full accent-cyan-400"
            aria-valuetext={`${accel.toFixed(1)} metres per second squared`}
          />
        </div>
      </div>
      <div aria-live="polite" className="mt-4 overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-3 py-2">
        <Equation
          display
          latex={`F = ma = (${massLatex}\\,\\mathrm{kg})(${accelLatex}\\,\\mathrm{m\\,s^{-2}}) = ${force.toFixed(1)}\\,\\mathrm{N}`}
        />
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[11px] uppercase tracking-wider text-slate-500">
          <span>Smaller |F|</span>
          <span>Larger |F|</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div
            className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500"
            style={{ width: `${Math.min(100, (Math.abs(force) / 48) * 100)}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {forceCaption(accel, force)}
        </p>
      </div>
    </Card>
  );
}
