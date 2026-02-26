import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 sm:pb-6 sm:px-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
