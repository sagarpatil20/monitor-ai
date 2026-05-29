import { Command, Menu, Moon, Search, Sun } from "lucide-react";

interface TopbarProps {
  crumb: string;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Topbar({
  crumb,
  isSidebarCollapsed,
  onToggleSidebar,
  theme,
  onToggleTheme,
}: TopbarProps) {
  const parts = crumb.split("·").map((p) => p.trim()).filter(Boolean);
  return (
    <header className="h-14 border-b border-border flex items-center px-4 md:px-6 gap-4 bg-background/80 backdrop-blur sticky top-0 z-10">
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggleSidebar}
        className="size-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <Menu className="size-4" strokeWidth={1.5} />
      </button>

      <div className="flex items-center gap-2 text-[13px] font-mono text-muted-foreground overflow-hidden whitespace-nowrap">
        <span className="hidden sm:inline">workspace</span>
        <span className="hidden sm:inline opacity-40">/</span>
        <span className="text-foreground">production</span>
        {parts.length > 0 && (
          <>
            <span className="opacity-40">/</span>
            <span className="text-foreground truncate">{parts[0]}</span>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-[13px] text-muted-foreground w-64 shrink-0">
          <Search className="size-3.5" strokeWidth={1.5} />
          <span className="truncate">Search traces, agents…</span>
          <kbd className="ml-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground/70">
            <Command className="size-3" /> K
          </kbd>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="size-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="size-4 text-warning" strokeWidth={1.5} />
          ) : (
            <Moon className="size-4 text-primary" strokeWidth={1.5} />
          )}
        </button>

        <button className="h-9 px-3 rounded-md border border-border bg-card text-[12px] font-mono hover:bg-accent transition-colors shrink-0">
          last 24h
        </button>
        <button className="h-9 px-3 rounded-md bg-foreground text-background text-[12px] font-medium hover:opacity-90 transition-opacity shrink-0">
          Run eval
        </button>
      </div>
    </header>
  );
}
