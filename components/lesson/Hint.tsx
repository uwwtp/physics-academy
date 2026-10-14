"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

export function Hint({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-amber-200/15 bg-amber-400/5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-amber-100">
          <Lightbulb className="h-4 w-4 text-amber-300" />
          Hint: {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-amber-200 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p className="border-t border-amber-200/10 px-4 py-3 text-sm leading-6 text-slate-300">
          {body}
        </p>
      ) : null}
    </div>
  );
}
