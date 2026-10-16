"use client";

import { useId, useMemo, useState } from "react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { parseStudentNumber } from "@/lib/math/parse-number";

type Side = { bags: number; weight: number };
type Target = "both" | "left" | "right";
type Op = "add" | "sub" | "mul" | "div";

type StepLog = {
  before: string;
  after: string;
  explanation: string;
  equivalent: boolean;
  invalid?: boolean;
};

const TRUE_X = 7;
const START_LEFT: Side = { bags: 1, weight: 5 };
const START_RIGHT: Side = { bags: 0, weight: 12 };
const EPS = 1e-9;

function formatNum(n: number) {
  if (Math.abs(n) < 1e-12) return "0";
  const rounded = Math.round(n * 1000) / 1000;
  return String(rounded);
}

function latexSide(side: Side) {
  const bags = side.bags;
  const w = side.weight;
  const bag =
    Math.abs(bags) < EPS ? "" : Math.abs(bags - 1) < EPS ? "x" : `${formatNum(bags)}x`;
  if (!bag) return formatNum(w);
  if (Math.abs(w) < EPS) return bag;
  if (w > 0) return `${bag}+${formatNum(w)}`;
  return `${bag}-${formatNum(Math.abs(w))}`;
}

function applyOp(side: Side, op: Op, n: number): Side {
  if (op === "add") return { bags: side.bags, weight: side.weight + n };
  if (op === "sub") return { bags: side.bags, weight: side.weight - n };
  if (op === "mul") return { bags: side.bags * n, weight: side.weight * n };
  return { bags: side.bags / n, weight: side.weight / n };
}

function valueAt(side: Side, x: number) {
  return side.bags * x + side.weight;
}

function opPhrase(op: Op, n: number, target: Target) {
  const amount = formatNum(n);
  const verb =
    op === "add"
      ? `added ${amount}`
      : op === "sub"
        ? `subtracted ${amount}`
        : op === "mul"
          ? `multiplied by ${amount}`
          : `divided by ${amount}`;
  if (target === "both") return `You ${verb} on both pans.`;
  if (target === "left") return `You ${verb} on the left pan only.`;
  return `You ${verb} on the right pan only.`;
}

export function BalanceScale() {
  const amountId = useId();
  const [left, setLeft] = useState<Side>(START_LEFT);
  const [right, setRight] = useState<Side>(START_RIGHT);
  const [target, setTarget] = useState<Target>("both");
  const [op, setOp] = useState<Op>("sub");
  const [amount, setAmount] = useState("5");
  const [log, setLog] = useState<StepLog | null>(null);

  const leftValue = valueAt(left, TRUE_X);
  const rightValue = valueAt(right, TRUE_X);
  const difference = leftValue - rightValue;
  const balanced = Math.abs(difference) < 1e-6;
  const heavier = !balanced && leftValue > rightValue ? "left" : !balanced ? "right" : null;
  const tilt = Math.max(-18, Math.min(18, -difference * 1.1));
  const solved =
    balanced &&
    Math.abs(left.bags - 1) < EPS &&
    Math.abs(left.weight) < EPS &&
    Math.abs(right.bags) < EPS &&
    Math.abs(right.weight - TRUE_X) < EPS;

  const equationLatex = useMemo(
    () => `${latexSide(left)} = ${latexSide(right)}`,
    [left, right],
  );

  function recordInvalid(explanation: string) {
    setLog({
      before: `${latexSide(left)} = ${latexSide(right)}`,
      after: `${latexSide(left)} = ${latexSide(right)}`,
      explanation,
      equivalent: balanced,
      invalid: true,
    });
  }

  function reset() {
    setLeft(START_LEFT);
    setRight(START_RIGHT);
    setTarget("both");
    setOp("sub");
    setAmount("5");
    setLog(null);
  }

  function applyWith(
    currentLeft: Side,
    currentRight: Side,
    nextTarget: Target,
    nextOp: Op,
    n: number,
  ) {
    if (!Number.isFinite(n)) {
      recordInvalid("Enter a number for the amount. Positive, negative, and decimals are allowed.");
      return;
    }
    if ((nextOp === "mul" || nextOp === "div") && Math.abs(n) < EPS) {
      recordInvalid(
        nextOp === "div"
          ? "Division by zero is not allowed. It does not give a new equation."
          : "Multiplying both sides by zero wipes the unknown: 0 = 0 is true but tells you nothing about x. The scale is left unchanged.",
      );
      return;
    }

    const before = `${latexSide(currentLeft)} = ${latexSide(currentRight)}`;
    const nextLeft = nextTarget === "right" ? currentLeft : applyOp(currentLeft, nextOp, n);
    const nextRight = nextTarget === "left" ? currentRight : applyOp(currentRight, nextOp, n);
    const after = `${latexSide(nextLeft)} = ${latexSide(nextRight)}`;
    const nextBalanced =
      Math.abs(valueAt(nextLeft, TRUE_X) - valueAt(nextRight, TRUE_X)) < 1e-6;
    const isolated =
      nextBalanced &&
      Math.abs(nextLeft.bags - 1) < EPS &&
      Math.abs(nextLeft.weight) < EPS &&
      Math.abs(nextRight.bags) < EPS;

    let explanation = opPhrase(nextOp, n, nextTarget);
    if (nextBalanced) {
      explanation +=
        " The same change hit both pans, so they still evaluate to the same number at x = 7. This is an equivalent equation: it has the same solution x = 7.";
      if (n < 0 || valueAt(nextLeft, TRUE_X) < 0 || valueAt(nextRight, TRUE_X) < 0) {
        explanation +=
          " If a reading is negative, treat it as a signed algebraic value, not as a physical weight you could place on a real scale.";
      }
      if (isolated) {
        explanation += ` The bag is now alone on the left, so it must weigh ${formatNum(nextRight.weight)}. That means x = ${formatNum(nextRight.weight)}.`;
      }
    } else {
      explanation +=
        " Only one pan changed, so the two sides no longer weigh the same. Equality is broken: this is not a legal solving step.";
    }

    setLeft(nextLeft);
    setRight(nextRight);
    setLog({
      before,
      after,
      explanation,
      equivalent: nextBalanced,
    });
  }

  function apply() {
    applyWith(left, right, target, op, parseStudentNumber(amount));
  }

  function guidedSubtractFive() {
    setTarget("both");
    setOp("sub");
    setAmount("5");
    applyWith(START_LEFT, START_RIGHT, "both", "sub", 5);
  }

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Demonstration</p>
      <h3 className="mt-1 font-serif text-xl text-white">A balancing scale</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Start from x + 5 = 12. Each bag is the unknown x. We already know the
        true value is <span className="font-medium text-cyan-200">x = 7</span>,
        because 7 + 5 = 12. The cyan number on each pan is the side evaluated at
        x = 7. Legal algebra keeps those two numbers equal, so the beam stays
        level. A negative number here is a signed comparison, not a block of
        mass hanging upward: kitchen scales do not have negative kilograms, but
        equations do have negative values.
      </p>

      <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-400/8 px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300">Guided example</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          Subtract 5 from both pans. The left bag is left alone, and the right
          pan shows 7 — the value of x.
        </p>
        <button
          type="button"
          onClick={guidedSubtractFive}
          className="mt-3 min-h-11 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Subtract 5 from both sides
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <p
          className={`mb-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            balanced
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-amber-400/15 text-amber-200"
          }`}
          aria-live="polite"
        >
          {balanced
            ? "Level — both pans weigh the same"
            : heavier === "left"
              ? "Tipped left — the left pan is heavier"
              : "Tipped right — the right pan is heavier"}
        </p>
        <svg
          viewBox="0 0 320 168"
          className="h-44 w-full max-w-lg"
          role="img"
          aria-label={
            balanced
              ? `Scale balanced. Left ${latexSide(left)} weighs ${formatNum(leftValue)}. Right ${latexSide(right)} weighs ${formatNum(rightValue)}.`
              : `Scale tipped toward the ${heavier} pan. Left weighs ${formatNum(leftValue)}, right weighs ${formatNum(rightValue)}.`
          }
        >
          <rect x="154" y="118" width="12" height="42" rx="2" fill="#1e3a5f" />
          <polygon points="120,160 200,160 188,148 132,148" fill="#0b1528" stroke="rgba(103,232,249,0.2)" />
          <g
            style={{
              transform: `rotate(${tilt}deg)`,
              transformOrigin: "160px 36px",
              transition: "transform 400ms ease",
            }}
          >
            <line x1="36" y1="36" x2="284" y2="36" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" />
            <line x1="88" y1="36" x2="88" y2="58" stroke="#94a3b8" strokeWidth="2" />
            <line x1="232" y1="36" x2="232" y2="58" stroke="#94a3b8" strokeWidth="2" />
            <rect
              x="40"
              y="58"
              width="96"
              height="56"
              rx="10"
              fill="#07101e"
              stroke={heavier === "left" ? "#fbbf24" : "rgba(103,232,249,0.4)"}
            />
            <rect
              x="184"
              y="58"
              width="96"
              height="56"
              rx="10"
              fill="#07101e"
              stroke={heavier === "right" ? "#fbbf24" : "rgba(103,232,249,0.4)"}
            />
            <text x="88" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="13">
              {latexSide(left)}
            </text>
            <text x="88" y="100" textAnchor="middle" fill="#67e8f9" fontSize="12">
              {formatNum(leftValue)}
            </text>
            <text x="232" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="13">
              {latexSide(right)}
            </text>
            <text x="232" y="100" textAnchor="middle" fill="#67e8f9" fontSize="12">
              {formatNum(rightValue)}
            </text>
          </g>
          <polygon points="160,16 148,48 172,48" fill="#22d3ee" />
        </svg>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <PanReadout
          label="Left pan"
          expression={latexSide(left)}
          weight={leftValue}
          heavier={heavier === "left"}
        />
        <PanReadout
          label="Right pan"
          expression={latexSide(right)}
          weight={rightValue}
          heavier={heavier === "right"}
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-3 py-2">
        <p className="text-[11px] uppercase tracking-wider text-slate-500">Current equation</p>
        <Equation display latex={equationLatex} />
      </div>

      {log ? (
        <div
          className={`mt-4 rounded-xl border p-4 ${
            log.invalid
              ? "border-amber-200/20 bg-amber-400/8"
              : log.equivalent
                ? "border-emerald-300/20 bg-emerald-400/8"
                : "border-rose-300/20 bg-rose-400/8"
          }`}
        >
          <p className="text-xs uppercase tracking-wider text-slate-400">
            {log.invalid
              ? "Operation not applied"
              : log.equivalent
                ? "Equivalent transformation — equality kept"
                : "Equality broken — not a solving step"}
          </p>
          <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <p className="text-slate-500">Before</p>
              <Equation latex={log.before} />
            </div>
            <div>
              <p className="text-slate-500">After</p>
              <Equation latex={log.after} />
            </div>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{log.explanation}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Use the guided button, or try your own operation. Same change on both
          pans keeps the beam level. Changing one pan only makes it dip toward
          the heavier side.
        </p>
      )}

      {leftValue < 0 || rightValue < 0 ? (
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Negative pan readings are signed numbers used to compare the two
          sides. They are not literal weights on a kitchen scale.
        </p>
      ) : null}

      {solved ? (
        <p className="mt-3 text-sm font-medium text-emerald-300" aria-live="polite">
          Solved: the isolated bag matches 7, so x = 7. Check: 7 + 5 = 12.
        </p>
      ) : null}

      <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">Experiment</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <label className="text-sm text-slate-400">
          Apply to
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value as Target)}
            className="mt-1 min-h-11 w-full rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 text-sm text-white"
          >
            <option value="both">Both sides</option>
            <option value="left">Left pan only</option>
            <option value="right">Right pan only</option>
          </select>
        </label>
        <label className="text-sm text-slate-400">
          Operation
          <select
            value={op}
            onChange={(event) => setOp(event.target.value as Op)}
            className="mt-1 min-h-11 w-full rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 text-sm text-white"
          >
            <option value="add">Add</option>
            <option value="sub">Subtract</option>
            <option value="mul">Multiply by</option>
            <option value="div">Divide by</option>
          </select>
        </label>
        <label className="text-sm text-slate-400" htmlFor={amountId}>
          Amount
          <input
            id={amountId}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="text"
            autoComplete="off"
            className="mt-1 min-h-11 w-full rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={apply}
          className="min-h-11 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-xl border border-cyan-200/20 px-4 py-2 text-sm text-cyan-100 hover:bg-white/5"
        >
          Reset to x + 5 = 12
        </button>
      </div>
    </Card>
  );
}

function PanReadout({
  label,
  expression,
  weight,
  heavier,
}: {
  label: string;
  expression: string;
  weight: number;
  heavier: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        heavier ? "border-amber-300/30 bg-amber-400/8" : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
      <div className="mt-1 overflow-x-auto">
        <Equation latex={expression} />
      </div>
      <p className="mt-1 font-mono text-sm text-cyan-200">
        Value at x = 7: {formatNum(weight)}
      </p>
      {weight < 0 ? (
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Negative means “below zero on the number line,” not a physical mass.
        </p>
      ) : null}
    </div>
  );
}
