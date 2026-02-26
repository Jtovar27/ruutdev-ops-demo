"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  Building2,
  MapPin,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskStatusBadge } from "@/components/task-status-badge";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/demo-data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

function isOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate + "T00:00:00") < today;
}

// ---------------------------------------------------------------------------
// KPI card
// ---------------------------------------------------------------------------

type KpiCardProps = {
  label: string;
  value: number;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  emphasis?: boolean;
};

function KpiCard({ label, value, sub, icon: Icon, iconColor, iconBg, emphasis }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm",
        emphasis && "border-red-200",
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconBg)}>
          <Icon className={cn("h-4.5 w-4.5", iconColor)} />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
      <p className={cn("mt-1 text-xs", emphasis ? "text-red-500 font-medium" : "text-muted-foreground")}>
        {sub}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filter tab
// ---------------------------------------------------------------------------

type Filter = TaskStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "blocked", label: "Blocked" },
  { value: "todo", label: "To Do" },
  { value: "done", label: "Done" },
];

function FilterTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
      <Badge
        variant="secondary"
        className={cn(
          "h-4 min-w-4 rounded-full px-1 text-[10px] leading-none",
          active && "bg-background/20 text-background",
        )}
      >
        {count}
      </Badge>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function AdminDashboardClient({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // ── KPI values ──
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const blocked = tasks.filter((t) => t.status === "blocked").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const clients = new Set(tasks.map((t) => t.client)).size;
  const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.status)).length;
  const completionRate = Math.round((done / total) * 100);

  const kpis: KpiCardProps[] = [
    {
      label: "Total Tasks",
      value: total,
      sub: `Across ${clients} clients`,
      icon: ClipboardList,
      iconColor: "text-foreground",
      iconBg: "bg-muted",
    },
    {
      label: "In Progress",
      value: inProgress,
      sub: `${Math.round((inProgress / total) * 100)}% of all tasks`,
      icon: Clock,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      label: "Blocked",
      value: blocked,
      sub: overdue > 0 ? `${overdue} overdue` : "None overdue",
      icon: AlertCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
      emphasis: blocked > 0,
    },
    {
      label: "Completed",
      value: done,
      sub: `${completionRate}% completion rate`,
      icon: CheckCircle2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
  ];

  // ── Table filter ──
  const countFor = (f: Filter) =>
    f === "all" ? tasks.length : tasks.filter((t) => t.status === f).length;

  const visible =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="destructive">Admin</Badge>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Tasks table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">All Tasks</h2>
          <span className="text-sm text-muted-foreground">
            {visible.length} of {total}
          </span>
        </div>

        {/* Filter tabs — scrollable on narrow screens */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-1 rounded-lg border bg-muted/50 p-1 w-fit">
            {FILTERS.map((f) => (
              <FilterTab
                key={f.value}
                label={f.label}
                count={countFor(f.value)}
                active={filter === f.value}
                onClick={() => setFilter(f.value)}
              />
            ))}
          </div>
        </div>

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px]">Task</TableHead>
                <TableHead className="hidden sm:table-cell">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    Client
                  </span>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Location
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Due Date
                  </span>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Steps</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visible.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No tasks match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                visible.map((task) => {
                  const overduePast = isOverdue(task.dueDate, task.status);
                  const stepsCompleted = task.steps.filter((s) => s.completed).length;
                  const stepsTotal = task.steps.length;
                  const stepsPct = Math.round((stepsCompleted / stepsTotal) * 100);

                  return (
                    <TableRow key={task.id} className="group">
                      {/* Title */}
                      <TableCell className="font-medium">
                        <Link
                          href={`/app/tasks/${task.id}`}
                          className="flex items-center gap-1 hover:underline underline-offset-4"
                        >
                          <span className="line-clamp-2">{task.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                        </Link>
                      </TableCell>

                      {/* Client */}
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {task.client}
                      </TableCell>

                      {/* Location */}
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[200px]">
                        <span className="truncate block">{task.location}</span>
                      </TableCell>

                      {/* Due date */}
                      <TableCell>
                        <span
                          className={cn(
                            "whitespace-nowrap text-sm",
                            overduePast
                              ? "font-medium text-red-600"
                              : "text-muted-foreground",
                          )}
                        >
                          {formatDate(task.dueDate)}
                          {overduePast && (
                            <span className="ml-1 text-xs">· Overdue</span>
                          )}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <TaskStatusBadge status={task.status} />
                      </TableCell>

                      {/* Steps */}
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {stepsCompleted}/{stepsTotal}
                          </span>
                          <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                task.status === "done"
                                  ? "bg-green-500"
                                  : task.status === "blocked"
                                    ? "bg-red-400"
                                    : "bg-blue-500",
                              )}
                              style={{ width: `${stepsPct}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
