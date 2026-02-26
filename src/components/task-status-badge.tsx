import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/lib/demo-data";

const config: Record<TaskStatus, { label: string; className: string }> = {
  todo: {
    label: "To Do",
    className: "border-border bg-secondary text-secondary-foreground",
  },
  "in-progress": {
    label: "In Progress",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  done: {
    label: "Done",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  blocked: {
    label: "Blocked",
    className: "border-red-200 bg-red-50 text-red-700",
  },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { label, className } = config[status];
  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}

export { config as statusConfig };
