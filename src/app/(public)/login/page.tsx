import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ── Left brand panel ── */}
      <div className="relative hidden flex-col justify-between bg-slate-900 p-10 text-white lg:flex">
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top wordmark */}
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
            ruutdev
          </span>
        </div>

        {/* Center copy */}
        <div className="relative space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Ground Operations Platform
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Operational visibility
            <br />
            for modern
            <br />
            ground teams.
          </h1>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            Manage tasks, track field activity, and coordinate across terminals
            — all in one place.
          </p>
        </div>

        {/* Bottom legal */}
        <p className="relative text-xs text-white/30">
          &copy; {new Date().getFullYear()} ruutdev. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-slate-700">
            ruutdev
          </span>
        </div>

        <div className="w-full max-w-sm space-y-8">
          {/* Heading */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-sm text-muted-foreground">
              Use your organization credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Work email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/app/tasks">Sign in</Link>
            </Button>
          </form>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full" size="lg" disabled>
              Continue with SSO
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Access is restricted to authorized personnel.{" "}
            <span className="font-medium text-foreground">
              Contact your administrator
            </span>{" "}
            to request access.
          </p>
        </div>
      </div>
    </div>
  );
}
