import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
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
          and shadcn/ui — ready for your next project.
        </p>
        <div className="flex gap-3 pt-2">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </section>

      <Separator />

      {/* Stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Next.js 16", desc: "App Router, file-based routing" },
            { name: "TypeScript", desc: "Static typing end-to-end" },
            { name: "Tailwind CSS v4", desc: "Utility-first styling" },
            { name: "shadcn/ui", desc: "Accessible component primitives" },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <p className="font-medium">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
