import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveTraces, useLiveTraces } from "@/components/dashboard/LiveTraces";
import { TokenChart } from "@/components/dashboard/TokenChart";
import { JudgePanel } from "@/components/dashboard/JudgePanel";
import { AgentsList } from "@/components/dashboard/AgentsList";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const traces = useLiveTraces();
  const [counters, setCounters] = useState({
    requests: 84219,
    tokens: 12_482_103,
    cost: 142.83,
    pass: 0.918,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setCounters((c) => ({
        requests: c.requests + Math.floor(1 + Math.random() * 8),
        tokens: c.tokens + Math.floor(800 + Math.random() * 6000),
        cost: c.cost + Math.random() * 0.18,
        pass: Math.min(0.99, Math.max(0.85, c.pass + (Math.random() - 0.5) * 0.004)),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const spark = (seed: number) =>
    Array.from({ length: 24 }, (_, i) => Math.sin(i / 2 + seed) + Math.random() * 0.4 + 1);

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="p-6 space-y-6 max-w-[1600px]">
            {/* Hero header */}
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  observability · evaluation · llm-as-judge
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-balance">
                  Watch every prompt, score every response.
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
                  Open-source dashboard for tracing, evaluating and monitoring agent runs in real time.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="size-1.5 rounded-full bg-success pulse-dot" />
                <span className="text-muted-foreground">streaming</span>
                <span className="text-muted-foreground/50">·</span>
                <span>{new Date().toUTCString().slice(17, 25)} UTC</span>
              </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Requests"
                value={counters.requests.toLocaleString()}
                delta={4.2}
                spark={spark(1)}
              />
              <StatCard
                label="Tokens processed"
                value={(counters.tokens / 1_000_000).toFixed(2)}
                unit="M"
                delta={2.8}
                spark={spark(2)}
              />
              <StatCard
                label="Spend"
                value={`$${counters.cost.toFixed(2)}`}
                delta={-1.4}
                spark={spark(3)}
              />
              <StatCard
                label="Judge pass rate"
                value={`${(counters.pass * 100).toFixed(1)}%`}
                delta={0.6}
                spark={spark(4)}
              />
            </div>

            {/* Chart + Judge */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2 space-y-4">
                <TokenChart />
                <AgentsList />
              </div>
              <div className="xl:col-span-1">
                <JudgePanel />
              </div>
            </div>

            {/* Live traces */}
            <LiveTraces traces={traces} />

            <footer className="pt-4 pb-8 flex items-center justify-between font-mono text-[11px] text-muted-foreground border-t border-border">
              <span>obsidian · open-source llm observability</span>
              <span>p50 312ms · p95 1.4s · p99 2.8s</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
