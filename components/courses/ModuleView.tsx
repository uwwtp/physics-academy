"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clock, Lock } from "lucide-react";
import { DifficultyBadge, SubjectBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { lessonPath, subjectLabel } from "@/lib/courses";
import { formatMinutes } from "@/lib/format";
import { useProgress } from "@/lib/progress/context";
import { moduleCompletion } from "@/lib/progress/stats";
import type { Module } from "@/lib/types";

export function ModuleView({ module: course }: { module: Module }) {
  const { progress } = useProgress();
  const completion = moduleCompletion(progress, course.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/library"
        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Course library
      </Link>
      <header>
        <div className="flex flex-wrap gap-2">
          <SubjectBadge subject={course.subject} label={subjectLabel(course.subject)} />
          <DifficultyBadge level={course.level} />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
          Module {String(course.order).padStart(2, "0")}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">{course.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">{course.description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">Study time</p>
          <p className="mt-2 font-serif text-2xl text-white">{course.durationHours} hours</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">Lessons</p>
          <p className="mt-2 font-serif text-2xl text-white">{course.lessons.length}</p>
        </Card>
        <Card className="p-4">
          <ProgressBar value={completion} label="Completion" />
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="font-serif text-xl text-white">Prerequisites</h2>
        {course.prerequisites.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">None. This is a starting module.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {course.prerequisites.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="font-serif text-xl text-white">Learning objectives</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {course.objectives.map((objective) => (
            <li key={objective} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              {objective}
            </li>
          ))}
        </ul>
      </Card>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl text-white">Lessons</h2>
        {course.lessons.map((lesson, index) => {
          const done = progress.completedLessons.includes(`${course.id}:${lesson.id}`);
          return (
            <Link key={lesson.id} href={lessonPath(course.id, lesson.id)} className="block">
              <Card className="flex items-start gap-4 p-4 transition hover:border-cyan-300/25">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-mono text-sm text-cyan-200">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-white">{lesson.title}</h3>
                    {lesson.status === "published" ? (
                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                        Interactive
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                        <Lock className="h-3 w-3" /> Outline
                      </span>
                    )}
                    {done ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                        <Check className="h-3.5 w-3.5" /> Done
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{lesson.summary}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {formatMinutes(lesson.durationMinutes)}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
