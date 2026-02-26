import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold tracking-tight">
              ruutdev
            </Link>
            <Badge variant="destructive">Admin</Badge>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/app/tasks"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to App
            </Link>
          </nav>
        </div>
        <Separator />
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
