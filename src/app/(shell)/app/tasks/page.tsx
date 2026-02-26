import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tasks = [
  { id: "1", title: "Set up CI pipeline", status: "in-progress" },
  { id: "2", title: "Write deployment docs", status: "todo" },
  { id: "3", title: "Configure staging env", status: "done" },
  { id: "4", title: "Add health check endpoint", status: "todo" },
];

const statusVariant: Record<
  string,
  "default" | "secondary" | "outline"
> = {
  "in-progress": "default",
  todo: "secondary",
  done: "outline",
};

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <Badge variant="secondary">{tasks.length} total</Badge>
      </div>

      <ul className="divide-y rounded-lg border">
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              href={`/app/tasks/${task.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium">{task.title}</span>
              <Badge variant={statusVariant[task.status]}>
                {task.status}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
