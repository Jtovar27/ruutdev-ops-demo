"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  UploadCloud,
  Flag,
  CheckCircle2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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

function checkOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate + "T00:00:00") < today;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </h2>
      <Separator className="flex-1" />
    </div>
  );
}

function MetaRow({
  icon: Icon,
  children,
  highlight,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span
        className={cn(
          "text-sm",
          highlight ? "font-medium text-red-600" : "text-muted-foreground",
        )}
      >
        {children}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function TaskDetailClient({ task }: { task: Task }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(task.steps.filter((s) => s.completed).map((s) => s.id)),
  );
  const [flagged, setFlagged] = useState(false);
  const [markedDone, setMarkedDone] = useState(task.status === "done");

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const doneCount = checked.size;
  const totalCount = task.steps.length;
  const pct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const allDone = doneCount === totalCount && totalCount > 0;
  const overdue = checkOverdue(task.dueDate, task.status);

  return (
    <>
      <div className="space-y-6 pb-8">
        {/* ── Back ── */}
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/app/tasks">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            All Tasks
          </Link>
        </Button>

        {/* ── Header ── */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold leading-snug tracking-tight">
              {task.title}
            </h1>
            <div className="shrink-0 pt-0.5">
              <TaskStatusBadge status={task.status} />
            </div>
          </div>

          <div className="space-y-1.5">
            <MetaRow icon={Building2}>{task.client}</MetaRow>
            <MetaRow icon={MapPin}>{task.location}</MetaRow>
            <MetaRow icon={Calendar} highlight={overdue}>
              {formatDate(task.dueDate)}
              {overdue && " · Overdue"}
            </MetaRow>
          </div>
        </div>

        {/* ── Progress ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-semibold">
              {doneCount} / {totalCount} steps
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                allDone ? "bg-green-500" : "bg-primary",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
          {allDone && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-green-600">
              <Check className="h-3.5 w-3.5" />
              All steps complete
            </p>
          )}
        </div>

        {/* ── Checklist ── */}
        <div className="space-y-2">
          <SectionLabel>Checklist</SectionLabel>
          <ul className="divide-y rounded-xl border">
            {task.steps.map((step) => {
              const isChecked = checked.has(step.id);
              return (
                <li key={step.id}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors">
                    <Checkbox
                      id={step.id}
                      checked={isChecked}
                      onCheckedChange={() => toggle(step.id)}
                    />
                    <label
                      htmlFor={step.id}
                      className={cn(
                        "flex-1 cursor-pointer select-none text-sm leading-snug",
                        isChecked && "text-muted-foreground line-through",
                      )}
                    >
                      {step.label}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Evidence ── */}
        <div className="space-y-2">
          <SectionLabel>Evidence</SectionLabel>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-10 px-4 text-center transition-colors hover:border-foreground/25 hover:bg-muted/30 active:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Upload evidence</p>
              <p className="text-xs text-muted-foreground">
                Tap to add photos, PDFs, or site documents
              </p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
            aria-hidden
            tabIndex={-1}
          />
        </div>

        {/* ── Notes ── */}
        <div className="space-y-2">
          <SectionLabel>Notes</SectionLabel>
          <Textarea
            placeholder="Add observations, issues, or follow-up notes…"
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Spacer — clears the sticky action bar */}
        <div className="h-20 sm:h-16" aria-hidden />
      </div>

      {/* ── Sticky action bar ── */}
      <div className="fixed bottom-16 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur-sm sm:bottom-0">
        <div className="mx-auto flex max-w-5xl gap-3 px-4 py-3 sm:px-6">
          <Button
            variant={flagged ? "destructive" : "outline"}
            className="flex-1"
            onClick={() => setFlagged((f) => !f)}
          >
            <Flag className="mr-2 h-4 w-4" />
            {flagged ? "Flagged" : "Flag Issue"}
          </Button>

          <Button
            className={cn(
              "flex-1 transition-colors",
              markedDone &&
                "bg-green-600 hover:bg-green-700 text-white border-green-600",
            )}
            onClick={() => setMarkedDone((d) => !d)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {markedDone ? "Completed" : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </>
  );
}
