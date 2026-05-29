import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Copy, Eye } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings - Monitor AI" },
      { name: "description", content: "Workspace, judge and integration settings." },
    ],
  }),
});

const sections = [
  {
    title: "Workspace",
    fields: [
      { label: "Name", value: "production" },
      { label: "Slug", value: "monitor-ai/production", mono: true },
      { label: "Plan", value: "Free / self-hosted" },
    ],
  },
  {
    title: "Judge model",
    fields: [
      { label: "Provider", value: "OpenAI compatible" },
      { label: "Model", value: "gpt-4o-mini", mono: true },
      { label: "Temperature", value: "0.0", mono: true },
    ],
  },
];

function SettingsPage() {
  return (
    <DashboardShell
      crumb="settings / workspace"
      title="Settings"
      subtitle="Configure your workspace, judge model and SDK keys."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.title} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-5 h-12 border-b border-border flex items-center">
              <h3 className="text-sm font-medium">{s.title}</h3>
            </div>
            <div className="divide-y divide-border">
              {s.fields.map((f) => (
                <div key={f.label} className="px-5 py-3 flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className={f.mono ? "font-mono text-[12px]" : ""}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-5 h-12 border-b border-border flex items-center">
          <h3 className="text-sm font-medium">SDK keys</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { name: "production", key: "mon_live_8a91...f02c" },
            { name: "staging", key: "mon_test_2c14...91ab" },
          ].map((k) => (
            <div key={k.name} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-[13px] font-medium">{k.name}</div>
                <div className="font-mono text-[11px] text-muted-foreground mt-0.5">{k.key}</div>
              </div>
              <button className="size-8 rounded-md border border-border hover:bg-accent flex items-center justify-center">
                <Eye className="size-3.5" strokeWidth={1.5} />
              </button>
              <button className="size-8 rounded-md border border-border hover:bg-accent flex items-center justify-center">
                <Copy className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">install</div>
        <pre className="font-mono text-[12px] bg-background border border-border rounded-md p-3 overflow-x-auto">
{`pip install monitor-ai
export MONITOR_API_KEY=mon_live_...

from monitor_ai import trace
@trace(agent="support-bot")
def reply(prompt): ...`}
        </pre>
      </div>
    </DashboardShell>
  );
}
