"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Building2, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskStatusBadge } from "@/components/task-status-badge";
import type { Task, TaskStatus } from "@/lib/demo-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Filter = TaskStatus | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "blocked", label: "Blocked" },
  { value: "todo", label: "To Do" },
  { value: "done", label: "Done" },
];

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");
  return due < today && status !== "done";
}

function stepProgress(task: Task) {
  const done = task.steps.filter((s) => s.completed).length;
  const total = task.steps.length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

const progressBarColor: Record<TaskStatus, string> = {
  done: "bg-green-500",
  "in-progress": "bg-blue-500",
  blocked: "bg-red-400",
  todo: "bg-muted-foreground/40",
};

// ---------------------------------------------------------------------------
// Filter pill
// ---------------------------------------------------------------------------

function FilterPill({
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
        "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-xs leading-none",
          active
            ? "bg-background/20 text-background"
            : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Task card
// ---------------------------------------------------------------------------

function TaskCard({ task }: { task: Task }) {
  const { done, total, pct } = stepProgress(task);
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <Link
      href={`/app/tasks/${task.id}`}
      className="group flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md active:scale-[0.99]"
    >
      {/* Row 1 — title + badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-foreground/80">
          {task.title}
        </h3>
        <TaskStatusBadge status={task.status} />
      </div>

      {/* Row 2 — metadata */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{task.client}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{task.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className={cn(overdue ? "font-medium text-red-600" : "text-muted-foreground")}>
            {formatDate(task.dueDate)}
            {overdue && " · Overdue"}
          </span>
        </div>
      </div>

      {/* Row 3 — progress */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", progressBarColor[task.status])}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
          <span>
            {done}/{total} steps
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function TasksClient({ tasks }: { tasks: Task[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const countFor = (f: Filter) =>
    f === "all" ? tasks.length : tasks.filter((t) => t.status === f).length;

  const visible =
    activeFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === activeFilter);

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
        <span className="text-sm text-muted-foreground">{visible.length} showing</span>
      </div>

      {/* Filter pills — horizontally scrollable on mobile */}
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 pb-1">
          {FILTERS.map((f) => (
            <FilterPill
              key={f.value}
              label={f.label}
              count={countFor(f.value)}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            />
          ))}
        </div>
      </div>

      {/* Card list */}
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-sm text-muted-foreground">
          No tasks match this filter.
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
