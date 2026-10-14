import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleView } from "@/components/courses/ModuleView";
import { getModule, modules } from "@/lib/courses";

export function generateStaticParams() {
  return modules.map((module) => ({ moduleId: module.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const course = getModule(moduleId);
  return { title: course?.title ?? "Module" };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const course = getModule(moduleId);
  if (!course) notFound();
  return <ModuleView module={course} />;
}
