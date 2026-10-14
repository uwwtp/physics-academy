"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Flame, Target, Timer } from "lucide-react";
import { TimeDilationLab } from "@/components/simulations/TimeDilationLab";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  getFirstPublishedLesson,
  getLesson,
  lessonPath,
  modules,
} from "@/lib/courses";
import { useProgress } from "@/lib/progress/context";
import {
  computeStreak,
  masteryScore,
  overallCompletion,
} from "@/lib/progress/stats";

export function DashboardView() {
  const { progress, ready } = useProgress();
  const current =
    (progress.currentLesson &&
      getLesson(progress.currentLesson.moduleId, progress.currentLesson.lessonId)) ||
    getFirstPublishedLesson();
    const streak = ready
    ? computeStreak(progress.visitDates, new Date().toISOString().slice(0, 10))
    : 0;
  const mastery = ready ? masteryScore(progress) : 0;
  const completion = ready ? overallCompletion(progress) : 0;
  const continueHref = lessonPath(current.module.id, current.lesson.id);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            Welcome, {progress.displayName}.
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            A structured path from algebra to quantum fields. Continue the current
            lesson, or open the library and choose a module.
          </p>
        </div>
        <Link
          href={continueHref}
          className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Continue learning
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Timer className="h-4 w-4 text-cyan-300" />}
          label="Course progress"
          value={`${completion}%`}
          detail={`${progress.completedLessons.length} lessons marked complete`}
        />
        <StatCard
          icon={<Flame className="h-4 w-4 text-orange-300" />}
          label="Learning streak"
          value={`${streak} day${streak === 1 ? "" : "s"}`}
          detail="Counted from local daily visits"
        />
        <StatCard
          icon={<Target className="h-4 w-4 text-amber-300" />}
          label="Mastery score"
          value={`${mastery}`}
          detail="Completion weighted with quiz accuracy"
        />
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Current lesson</p>
          <h2 className="mt-2 font-serif text-lg text-white">{current.lesson.title}</h2>
          <p className="mt-1 text-sm text-slate-400">{current.module.title}</p>
          <Link
            href={continueHref}
            className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200"
          >
            Resume lesson →
          </Link>
        </Card>
      </section>

      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-white">Path through the academy</h2>
          <Link href="/library" className="text-sm text-cyan-300 hover:text-cyan-200">
            Course library
          </Link>
        </div>
        <ProgressBar value={completion} label="All lessons" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {modules.slice(0, 4).map((module) => (
            <Link
              key={module.id}
              href={`/library/${module.id}`}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-cyan-300/20"
            >
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Module {String(module.order).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-100">{module.title}</p>
              <p className="text-xs text-slate-500">{module.lessons.length} lessons</p>
            </Link>
          ))}
        </div>
      </Card>

      <TimeDilationLab compact />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-3 font-serif text-3xl text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </Card>
  );
}
