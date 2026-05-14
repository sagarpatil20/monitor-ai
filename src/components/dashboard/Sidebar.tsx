import { Activity, BarChart3, Bot, FileSearch, Gavel, LayoutDashboard, Settings, Workflow } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Activity, label: "Live Traces" },
  { icon: Bot, label: "Agents" },
  { icon: Gavel, label: "Judge" },
  { icon: FileSearch, label: "Evaluations" },
  { icon: Workflow, label: "Datasets" },
  { icon: BarChart3, label: "Analytics" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-border bg-background">
      <div className="flex h-14 items-center gap-2 px-5 border-b border-border">
        <div className="size-6 rounded-sm bg-foreground flex items-center justify-center">
          <div className="size-2.5 rounded-[2px] bg-background" />
        </div>
        <span className="text-sm font-semibold tracking-tight">obsidian</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">v0.1</span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] rounded-md transition-colors ${
              active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Icon className="size-4" strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-[13px] rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50">
          <Settings className="size-4" strokeWidth={1.5} />
          Settings
        </button>
        <div className="mt-3 px-3 py-2 rounded-md border border-border bg-card/50">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-success pulse-dot" />
            <span className="font-mono text-[11px] text-muted-foreground">all systems live</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
