import type { Metadata } from "next";
import { LibraryView } from "@/components/courses/LibraryView";

export const metadata: Metadata = { title: "Course Library" };

export default function LibraryPage() {
  return <LibraryView />;
}
