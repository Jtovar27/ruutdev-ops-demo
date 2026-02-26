import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Total Tasks", value: "4" },
  { label: "In Progress", value: "1" },
  { label: "Completed", value: "1" },
  { label: "Active Users", value: "3" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="destructive">Admin only</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border bg-card p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <Separator />

      <section className="space-y-3">
        <h2 className="font-semibold">Recent Activity</h2>
        <ul className="divide-y rounded-lg border text-sm">
          {[
            { msg: "CI pipeline task updated to in-progress", time: "2m ago" },
            { msg: "New user registered: alex@example.com", time: "1h ago" },
            { msg: "Staging env task marked done", time: "3h ago" },
          ].map((item) => (
            <li key={item.msg} className="flex items-center justify-between px-4 py-3">
              <span>{item.msg}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
