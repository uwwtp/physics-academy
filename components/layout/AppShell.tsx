"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressProvider } from "@/lib/progress/context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ProgressProvider>
      <div className="flex min-h-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-cyan-100/10 bg-[#050814]/80 px-4 py-3 backdrop-blur-md lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-cyan-100 hover:bg-white/5"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-serif text-base text-white">Physics Academy</span>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
        </div>
      </div>
    </ProgressProvider>
  );
}
