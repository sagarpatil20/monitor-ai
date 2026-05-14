import { Command, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 border-b border-border flex items-center px-6 gap-4 bg-background/80 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center gap-2 text-[13px] font-mono text-muted-foreground">
        <span>workspace</span>
        <span className="opacity-40">/</span>
        <span className="text-foreground">production</span>
        <span className="opacity-40">/</span>
        <span className="text-foreground">overview</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-[13px] text-muted-foreground w-72">
          <Search className="size-3.5" strokeWidth={1.5} />
          <span>Search traces, agents, runs…</span>
          <kbd className="ml-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground/70">
            <Command className="size-3" /> K
          </kbd>
        </div>
        <button className="h-9 px-3 rounded-md border border-border bg-card text-[12px] font-mono hover:bg-accent transition-colors">
          last 24h
        </button>
        <button className="h-9 px-3 rounded-md bg-foreground text-background text-[12px] font-medium hover:opacity-90 transition-opacity">
          Run eval
        </button>
      </div>
    </header>
  );
}
