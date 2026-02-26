import { notFound } from "next/navigation";
import { getTaskById } from "@/lib/demo-data";
import { TaskDetailClient } from "@/components/task-detail-client";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = getTaskById(id);

  if (!task) notFound();

  return <TaskDetailClient task={task} />;
}
