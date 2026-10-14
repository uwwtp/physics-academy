"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { modules } from "@/lib/courses";
import { useProgress } from "@/lib/progress/context";
import {
  computeStreak,
  masteryScore,
  moduleCompletion,
  overallCompletion,
  quizAccuracy,
} from "@/lib/progress/stats";
import { subjects } from "@/lib/subjects";

export function ProgressView() {
  const { progress } = useProgress();
  const accuracy = quizAccuracy(progress);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Progress</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Mastery map</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Local completion, quiz accuracy, and a visit streak. These numbers will
          later be stored per account.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Overall</p>
          <p className="mt-2 font-serif text-3xl text-white">{overallCompletion(progress)}%</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Mastery</p>
          <p className="mt-2 font-serif text-3xl text-white">{masteryScore(progress)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Streak</p>
          <p className="mt-2 font-serif text-3xl text-white">
            {computeStreak(progress.visitDates, new Date().toISOString().slice(0, 10))} days
          </p>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="font-serif text-xl text-white">Quiz accuracy</h2>
        <p className="mt-2 text-sm text-slate-400">
          {accuracy === null
            ? "No quiz attempts yet. Complete the kinematics questions to begin."
            : `${accuracy}% of recorded attempts are within tolerance.`}
        </p>
        {accuracy !== null ? <div className="mt-4"><ProgressBar value={accuracy} /></div> : null}
        <Link
          href="/library/kinematics/position-velocity-acceleration"
          className="mt-4 inline-block text-sm text-cyan-300"
        >
          Practice kinematics →
        </Link>
      </Card>

      {subjects.map((subject) => {
        const group = modules.filter((module) => module.subject === subject.id);
        return (
          <section key={subject.id}>
            <h2 className="font-serif text-xl text-white">{subject.title}</h2>
            <div className="mt-3 space-y-3">
              {group.map((module) => (
                <Link key={module.id} href={`/library/${module.id}`} className="block">
                  <Card className="p-4 hover:border-cyan-300/20">
                    <ProgressBar
                      value={moduleCompletion(progress, module.id)}
                      label={module.title}
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
