"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TimeDilationLab } from "@/components/simulations/TimeDilationLab";

export function PracticeView() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Practice</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
          Problems and simulations
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Check numerical answers with a tolerance, then vary velocity in the
          special-relativity laboratory.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/library/algebra-foundations/quadratic-equations">
          <Card className="h-full p-5 transition hover:border-cyan-300/25">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Lesson</p>
            <h2 className="mt-2 font-serif text-2xl text-white">Quadratic equations</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Parabolas, factorising, the formula, and projectile height as a quadratic in time.
            </p>
            <p className="mt-4 text-sm text-cyan-300">Open the quadratic lesson →</p>
          </Card>
        </Link>
        <Link href="/library/algebra-foundations/solving-equations">
          <Card className="h-full p-5 transition hover:border-cyan-300/25">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Lesson</p>
            <h2 className="mt-2 font-serif text-2xl text-white">
              Solving linear equations
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Balance both sides, undo operations, and check by substitution.
            </p>
            <p className="mt-4 text-sm text-cyan-300">Open the equations lesson →</p>
          </Card>
        </Link>
        <Link href="/library/algebra-foundations/symbols-and-substitution">
          <Card className="h-full p-5 transition hover:border-cyan-300/25">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Lesson</p>
            <h2 className="mt-2 font-serif text-2xl text-white">
              Symbols and substitution
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Guided practice, two live demonstrations, and a ten-question marked quiz.
            </p>
            <p className="mt-4 text-sm text-cyan-300">Open the algebra lesson →</p>
          </Card>
        </Link>
        <Link href="/library/kinematics/position-velocity-acceleration">
          <Card className="h-full p-5 transition hover:border-cyan-300/25">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Quiz</p>
            <h2 className="mt-2 font-serif text-2xl text-white">
              Position, velocity, acceleration
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Three numerical questions with answer checking, feedback, and retry.
            </p>
            <p className="mt-4 text-sm text-cyan-300">Open the lesson quiz →</p>
          </Card>
        </Link>
        <Link href="/practice/time-dilation">
          <Card className="h-full p-5 transition hover:border-cyan-300/25">
            <p className="text-xs uppercase tracking-wider text-cyan-300">Simulation</p>
            <h2 className="mt-2 font-serif text-2xl text-white">Time dilation</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Adjust v/c and watch the Lorentz factor and dilated time update live.
            </p>
            <p className="mt-4 text-sm text-cyan-300">Open the laboratory →</p>
          </Card>
        </Link>
      </div>

      <TimeDilationLab compact />
    </div>
  );
}
