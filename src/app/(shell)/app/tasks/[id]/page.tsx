import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const tasks: Record<string, { title: string; status: string; description: string }> = {
  "1": { title: "Set up CI pipeline", status: "in-progress", description: "Configure GitHub Actions workflow for automated testing and deployment." },
  "2": { title: "Write deployment docs", status: "todo", description: "Document the full deployment process for staging and production environments." },
  "3": { title: "Configure staging env", status: "done", description: "Provision and configure the staging environment with all required services." },
  "4": { title: "Add health check endpoint", status: "todo", description: "Implement a /health endpoint that verifies database and service connectivity." },
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = tasks[id] ?? {
    title: `Task #${id}`,
    status: "unknown",
    description: "No details available for this task.",
  };

  return (
    <div className="space-y-6 max-w-xl">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/app/tasks">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tasks
        </Link>
      </Button>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
          <Badge variant={task.status === "done" ? "outline" : task.status === "in-progress" ? "default" : "secondary"}>
            {task.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Task ID: {id}</p>
      </div>

      <Separator />

      <p className="text-sm leading-relaxed">{task.description}</p>
    </div>
  );
}
