import { Link } from "@tanstack/react-router";
import { Activity, BarChart3, Bot, FileSearch, Gavel, LayoutDashboard, Settings, Workflow } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Overview", to: "/" },
  { icon: Activity, label: "Live Traces", to: "/traces" },
  { icon: Bot, label: "Agents", to: "/agents" },
  { icon: Gavel, label: "Judge", to: "/judge" },
  { icon: FileSearch, label: "Evaluations", to: "/evaluations" },
  { icon: Workflow, label: "Datasets", to: "/datasets" },
  { icon: BarChart3, label: "Analytics", to: "/analytics" },
] as const;

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 md:sticky md:flex flex-col border-r border-border bg-background h-screen transition-[width,transform] duration-300 ease-in-out ${
        isCollapsed
          ? "w-[68px] -translate-x-full md:translate-x-0 md:flex"
          : "w-[220px] translate-x-0 flex"
      } shrink-0`}
    >
      <div className="flex h-14 items-center gap-2.5 px-5 border-b border-border">
        <div className="size-6 rounded-sm bg-foreground flex items-center justify-center shrink-0">
          <div className="size-2.5 rounded-[2px] bg-background" />
        </div>
        {!isCollapsed && (
          <span className="text-sm font-semibold tracking-tight transition-opacity duration-200">
            Dico Monitor
          </span>
        )}
        {!isCollapsed && (
          <span className="ml-auto font-mono text-[10px] text-muted-foreground transition-opacity duration-200">
            v0.1
          </span>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ icon: Icon, label, to }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className={`w-full flex items-center rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-accent/50 [&[data-status=active]]:bg-accent [&[data-status=active]]:text-foreground ${
              isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2 text-[13px]"
            }`}
            title={isCollapsed ? label : undefined}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.5} />
            {!isCollapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <Link
          to="/settings"
          className={`w-full flex items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 [&[data-status=active]]:bg-accent [&[data-status=active]]:text-foreground ${
            isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2 text-[13px]"
          }`}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="size-4 shrink-0" strokeWidth={1.5} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        {!isCollapsed ? (
          <div className="mt-3 px-3 py-2 rounded-md border border-border bg-card/50">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success pulse-dot" />
              <span className="font-mono text-[11px] text-muted-foreground">all systems live</span>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex justify-center">
            <span className="size-1.5 rounded-full bg-success pulse-dot animate-pulse" title="All systems live" />
          </div>
        )}
      </div>
    </aside>
  );
}
