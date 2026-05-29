import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({
  crumb,
  title,
  subtitle,
  actions,
  children,
}: {
  crumb: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground bg-grid">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar crumb={crumb} />
          <main className="p-6 space-y-6 max-w-[1600px]">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  {crumb}
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
                {subtitle && (
                  <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">{subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                {actions}
                <span className="size-1.5 rounded-full bg-success pulse-dot" />
                <span className="text-muted-foreground">streaming</span>
              </div>
            </div>
            {children}
            <footer className="pt-4 pb-8 flex items-center justify-between font-mono text-[11px] text-muted-foreground border-t border-border">
              <span>Monitor AI | open-source LLM observability</span>
              <span>p50 312ms · p95 1.4s · p99 2.8s</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
