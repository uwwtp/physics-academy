import type { Metadata } from "next";
import { LearningView } from "@/components/learning/LearningView";

export const metadata: Metadata = { title: "My Learning" };

export default function LearningPage() {
  return <LearningView />;
}
