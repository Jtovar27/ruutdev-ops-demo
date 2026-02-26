import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/app/tasks" className="flex items-center gap-2">
          <span className="font-semibold tracking-tight">ruutdev</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            ops-demo
          </Badge>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/app/tasks"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Tasks
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
