import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const routes = [
  { href: "/login", label: "Login", tag: "public" },
  { href: "/app/tasks", label: "Tasks", tag: "app" },
  { href: "/app/tasks/1", label: "Task Detail", tag: "app" },
  { href: "/admin/dashboard", label: "Admin Dashboard", tag: "admin" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge>Demo</Badge>
          <Badge variant="outline">v0.1.0</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ruutdev-ops-demo
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          A minimal Next.js starter with App Router, TypeScript, Tailwind CSS,
          and shadcn/ui.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Routes</h2>
        <div className="flex flex-col gap-3">
          {routes.map((r) => (
            <div key={r.href} className="flex items-center gap-3">
              <Badge
                variant={
                  r.tag === "admin"
                    ? "destructive"
                    : r.tag === "app"
                      ? "default"
                      : "secondary"
                }
                className="w-16 justify-center"
              >
                {r.tag}
              </Badge>
              <Button variant="link" className="h-auto p-0" asChild>
                <Link href={r.href}>{r.href}</Link>
              </Button>
              <span className="text-sm text-muted-foreground">— {r.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
