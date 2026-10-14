"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { DifficultyBadge, SubjectBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { modulePath, subjectLabel } from "@/lib/courses";
import { useProgress } from "@/lib/progress/context";
import { moduleCompletion } from "@/lib/progress/stats";
import type { Module } from "@/lib/types";

export function ModuleCard({ module: course }: { module: Module }) {
  const { progress } = useProgress();
  const completion = moduleCompletion(progress, course.id);

  return (
    <Link href={modulePath(course.id)} className="block h-full">
      <Card className="flex h-full flex-col p-5 transition hover:border-cyan-300/25 hover:bg-[#102038]/80">
        <div className="flex flex-wrap gap-2">
          <SubjectBadge subject={course.subject} label={subjectLabel(course.subject)} />
          <DifficultyBadge level={course.level} />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          Module {String(course.order).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-serif text-xl text-white">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{course.tagline}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {course.durationHours} h · {course.lessons.length} lessons
        </div>
        <div className="mt-4">
          <ProgressBar value={completion} label="Module progress" />
        </div>
      </Card>
    </Link>
  );
}
