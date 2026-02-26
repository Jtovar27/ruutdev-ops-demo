import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-lg font-semibold tracking-tight">
          ruutdev-ops-demo
        </span>
        <Badge variant="secondary">Next.js 16</Badge>
      </div>
      <Separator />
    </header>
  );
}
