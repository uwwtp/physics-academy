import type { Metadata } from "next";
import Link from "next/link";
import { TimeDilationLab } from "@/components/simulations/TimeDilationLab";

export const metadata: Metadata = { title: "Time Dilation Laboratory" };

export default function TimeDilationPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
      >
        ← Practice
      </Link>
      <TimeDilationLab />
    </div>
  );
}
