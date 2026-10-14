"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ModuleCard } from "@/components/courses/ModuleCard";
import { modules, subjectLabel } from "@/lib/courses";
import { subjects } from "@/lib/subjects";
import type { SubjectId } from "@/lib/types";

export function LibraryView() {
  const [filter, setFilter] = useState<SubjectId | "all">("all");
  const visible = useMemo(
    () => (filter === "all" ? modules : modules.filter((module) => module.subject === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Course library</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
          Twenty-two modules, one curriculum
        </h1>
        <p className="mt-3 text-slate-400">
          Mathematics first, then classical physics, relativity, quantum mechanics,
          and quantum field theory. Each module lists lessons, objectives, and
          estimated study time.
        </p>
      </header>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {subjects.map((subject) => (
          <FilterChip
            key={subject.id}
            active={filter === subject.id}
            onClick={() => setFilter(subject.id)}
          >
            {subjectLabel(subject.id)}
          </FilterChip>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs uppercase tracking-wider ${
        active
          ? "bg-cyan-400 text-slate-950"
          : "bg-white/5 text-slate-400 ring-1 ring-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
