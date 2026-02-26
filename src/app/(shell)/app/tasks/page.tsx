import { getTasks } from "@/lib/demo-data";
import { TasksClient } from "@/components/tasks-client";

export default function TasksPage() {
  const tasks = getTasks();
  return <TasksClient tasks={tasks} />;
}
