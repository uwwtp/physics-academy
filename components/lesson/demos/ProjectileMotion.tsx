"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { formatRoot } from "@/lib/math/quadratic";
import {
  G,
  projectileHeight,
  projectileLandingTime,
  projectilePeakHeight,
  projectilePeakTime,
} from "@/lib/math/projectile";

const GROUND_Y = 150;
const PLOT_LEFT = 20;
const PLOT_WIDTH = 280;
const PLOT_HEIGHT = 120;

export function ProjectileMotion() {
  const yId = useId();
  const uId = useId();
  const clipId = useId();
  const [y0, setY0] = useState(5);
  const [u, setU] = useState(12);

  const tLand = useMemo(() => projectileLandingTime(y0, u), [y0, u]);
  const tPeak = projectilePeakTime(u);
  const yPeak = projectilePeakHeight(y0, u);
  const inAir = tLand > 1e-9;

  const yScaleMax = Math.max(yPeak, y0, 1) * 1.15;

  function mapT(t: number) {
    return PLOT_LEFT + (tLand > 0 ? (t / tLand) * PLOT_WIDTH : 0);
  }

  function mapY(y: number) {
    const clamped = Math.max(0, y);
    return GROUND_Y - (clamped / yScaleMax) * PLOT_HEIGHT;
  }

  const path = useMemo(() => {
    if (!inAir || tLand <= 0) return "";
    const scale = Math.max(yPeak, y0, 1) * 1.15;
    const pts: string[] = [];
    const n = 60;
    for (let i = 0; i <= n; i += 1) {
      const t = (i / n) * tLand;
      const y = Math.max(0, projectileHeight(t, y0, u));
      const x = PLOT_LEFT + (t / tLand) * PLOT_WIDTH;
      const py = GROUND_Y - (y / scale) * PLOT_HEIGHT;
      pts.push(`${x},${py}`);
    }
    return pts.join(" ");
  }, [inAir, tLand, y0, u, yPeak]);

  let physicsNote = "";
  if (!inAir) {
    physicsNote =
      "y₀ = 0 and u ≤ 0: the object is already on the ground and not thrown up, so there is no flight to plot.";
  } else if (u > 0) {
    physicsNote = `Thrown upward: peak at t = u/g = ${tPeak.toFixed(2)} s, height ${formatRoot(yPeak)} m. It lands at the later root t = ${tLand.toFixed(2)} s. The graph is cut off at y = 0 — the algebraic parabola would continue below the ground, but a real projectile cannot.`;
  } else if (u === 0) {
    physicsNote = `Dropped from rest: the peak is the release height ${formatRoot(y0)} m at t = 0. Flight time t = √(2 y₀ / g) = ${tLand.toFixed(2)} s.`;
  } else {
    physicsNote = `Thrown or falling downward (u < 0): the highest point is still the release height ${formatRoot(y0)} m. The quadratic has a negative-time root (before t = 0) that we discard. The curve shown is only t ≥ 0 and y ≥ 0.`;
  }

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Demonstration</p>
      <h3 className="mt-1 font-serif text-xl text-white">Projectile height as a quadratic</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Thrown straight up (or dropped) near Earth, height against time is
        y = y₀ + ut − ½gt² with g = 9.81 m/s². That is a downward-opening
        parabola in t. Only the physically allowed part is drawn: from t = 0
        until the ball meets the ground, never below y = 0.
      </p>
      <div className="mt-2 overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-3 py-1">
        <Equation
          display
          latex={`y = ${formatRoot(y0)} + (${formatRoot(u)})t - \\tfrac{1}{2}(9.81)t^{2}`}
        />
      </div>
      <svg
        viewBox="0 0 320 170"
        className="mt-4 h-44 w-full"
        role="img"
        aria-label={
          inAir
            ? `Height against time from ${y0.toFixed(1)} metres with vertical speed ${u.toFixed(1)} metres per second. Lands after ${tLand.toFixed(2)} seconds. Peak height ${yPeak.toFixed(2)} metres. The curve stays at or above the ground.`
            : "The projectile is already at ground level with no upward speed, so it does not fly."
        }
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="320" height={GROUND_Y} />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="320" height="170" fill="#07101e" rx="12" />
        <line x1="20" y1={GROUND_Y} x2="300" y2={GROUND_Y} stroke="rgba(148,163,184,0.4)" />
        {inAir ? (
          <g clipPath={`url(#${clipId})`}>
            <polyline fill="none" stroke="#22d3ee" strokeWidth="2.5" points={path} />
            <circle
              cx={mapT(Math.min(tPeak, tLand))}
              cy={mapY(yPeak)}
              r="4.5"
              fill="#60a5fa"
            />
          </g>
        ) : null}
        <text x="24" y="164" fill="#94a3b8" fontSize="10">
          t = 0
        </text>
        <text x="232" y="164" fill="#94a3b8" fontSize="10">
          ground y = 0
        </text>
      </svg>
      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor={yId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Initial height y₀</span>
            <span className="font-mono text-cyan-200">{y0.toFixed(1)} m</span>
          </label>
          <input
            id={yId}
            type="range"
            min={0}
            max={20}
            step={0.5}
            value={y0}
            onChange={(event) => setY0(Number(event.target.value))}
            className="mt-2 h-11 w-full accent-cyan-400"
            aria-valuetext={`${y0.toFixed(1)} metres`}
          />
        </div>
        <div>
          <label htmlFor={uId} className="flex items-center justify-between text-sm text-slate-300">
            <span>Initial vertical velocity u</span>
            <span className="font-mono text-cyan-200">{u.toFixed(1)} m/s</span>
          </label>
          <input
            id={uId}
            type="range"
            min={-8}
            max={25}
            step={0.5}
            value={u}
            onChange={(event) => setU(Number(event.target.value))}
            className="mt-2 h-11 w-full accent-cyan-400"
            aria-valuetext={`${u.toFixed(1)} metres per second`}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2" aria-live="polite">
        <p>Time of flight: {inAir ? `${tLand.toFixed(2)} s` : "already on the ground"}</p>
        <p>Maximum height: {formatRoot(yPeak)} m</p>
        <p>Time of peak: {u > 0 ? `${tPeak.toFixed(2)} s` : "t = 0 (not thrown up)"}</p>
        <p>g = {G} m/s² downward</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{physicsNote}</p>
    </Card>
  );
}
