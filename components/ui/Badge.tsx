import type { Difficulty, SubjectId } from "@/lib/types";
import { difficultyLabel } from "@/lib/format";

const subjectStyles: Record<SubjectId, string> = {
  mathematics: "text-cyan-200 bg-cyan-400/10 ring-cyan-400/25",
  "classical-physics": "text-sky-200 bg-sky-400/10 ring-sky-400/25",
  "special-relativity": "text-teal-200 bg-teal-400/10 ring-teal-400/25",
  "general-relativity": "text-indigo-200 bg-indigo-400/10 ring-indigo-400/25",
  "quantum-mechanics": "text-violet-200 bg-violet-400/10 ring-violet-400/25",
  "quantum-field-theory": "text-blue-200 bg-blue-400/10 ring-blue-400/25",
};

export function SubjectBadge({
  subject,
  label,
}: {
  subject: SubjectId;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase ring-1 ${subjectStyles[subject]}`}
    >
      {label}
    </span>
  );
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-300 ring-1 ring-white/10">
      {difficultyLabel[level]}
    </span>
  );
}
