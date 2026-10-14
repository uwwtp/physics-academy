"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { PROGRESS_STORAGE_KEY } from "@/lib/progress/local-store";
import { useProgress } from "@/lib/progress/context";

export function SettingsView() {
  const { progress, setDisplayName, resetProgress } = useProgress();
  const [draftName, setDraftName] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const name = draftName ?? progress.displayName;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Settings</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Prototype preferences</h1>
        <p className="mt-2 text-slate-400">
          Authentication is not configured yet. Display name and progress live in
          this browser only.
        </p>
      </header>

      <Card className="p-5 sm:p-6">
        <h2 className="font-serif text-xl text-white">Display name</h2>
        <label className="mt-4 block text-sm text-slate-400" htmlFor="display-name">
          Shown on the dashboard
        </label>
        <input
          id="display-name"
          value={name}
          onChange={(event) => {
            setDraftName(event.target.value);
            setSaved(false);
          }}
          className="mt-2 w-full rounded-xl border border-cyan-100/15 bg-[#07101e] px-3 py-2.5 text-white outline-none ring-cyan-400/40 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => {
            setDisplayName(name);
            setSaved(true);
          }}
          className="mt-4 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Save name
        </button>
        {saved ? <p className="mt-2 text-sm text-emerald-300">Saved locally.</p> : null}
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="font-serif text-xl text-white">Data</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Progress key: <code className="text-cyan-200">{PROGRESS_STORAGE_KEY}</code>.
          Replace <code className="text-cyan-200">progressRepository</code> in{" "}
          <code className="text-cyan-200">lib/progress/local-store.ts</code> with a
          Supabase implementation when accounts are added.
        </p>
        <button
          type="button"
          onClick={() => {
            resetProgress();
            setDraftName(null);
            setResetDone(true);
          }}
          className="mt-4 rounded-xl border border-rose-300/30 px-4 py-2.5 text-sm text-rose-200 hover:bg-rose-400/10"
        >
          Reset local progress
        </button>
        {resetDone ? (
          <p className="mt-2 text-sm text-slate-400">Progress cleared in this browser.</p>
        ) : null}
      </Card>
    </div>
  );
}
