import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson/LessonView";
import { getLesson, modules } from "@/lib/courses";

export function generateStaticParams() {
  return modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleId: module.id,
      lessonId: lesson.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}): Promise<Metadata> {
  const { moduleId, lessonId } = await params;
  const found = getLesson(moduleId, lessonId);
  return { title: found?.lesson.title ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  const found = getLesson(moduleId, lessonId);
  if (!found) notFound();
  return <LessonView module={found.module} lesson={found.lesson} />;
}
