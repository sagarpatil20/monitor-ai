import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ChatAssistant } from "./ChatAssistant";
import { ArrowRight, Sparkles } from "lucide-react";

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
  // Hydration safety
  const [isMounted, setIsMounted] = useState(false);

  // Theme management
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Sidebar management
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // User Onboarding management
  const [username, setUsername] = useState<string | null>(null);
  const [loginInput, setLoginInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");

  // Load configuration from local storage
  useEffect(() => {
    setIsMounted(true);
    // Theme
    const savedTheme = localStorage.getItem("dico-monitor-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.className = "dark";
    }

    // Sidebar collapsed
    const savedSidebarState = localStorage.getItem("dico-monitor-sidebar-collapsed");
    if (savedSidebarState === "true") {
      setIsSidebarCollapsed(true);
    } else if (window.innerWidth < 768) {
      // Auto-collapse sidebar on smaller screens initially
      setIsSidebarCollapsed(true);
    }

    // Username onboarding
    const savedName = localStorage.getItem("dico-monitor-username");
    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.className = nextTheme;
    localStorage.setItem("dico-monitor-theme", nextTheme);
  };

  const handleToggleSidebar = () => {
    const nextState = !isSidebarCollapsed;
    setIsSidebarCollapsed(nextState);
    localStorage.setItem("dico-monitor-sidebar-collapsed", String(nextState));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;

    const name = loginInput.trim();
    localStorage.setItem("dico-monitor-username", name);
    setUsername(name);
    setShowWelcome(true);
  };

  // Typing welcome text animation logic
  useEffect(() => {
    if (!showWelcome || !username) return;

    const fullText = `Hello, ${username}.`;
    let currentText = "";
    let index = 0;
    setWelcomeText("");

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setWelcomeText(currentText);
        index++;
      } else {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          setShowWelcome(false);
        }, 1200);
        return () => clearTimeout(timeout);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [showWelcome, username]);

  // Hydration safety gate: renders a blank grid until client mounted to prevent screen flashes
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background bg-grid" />
    );
  }

  // 1. Show Welcome Typing Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center bg-grid relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent pointer-events-none" />
        <div className="z-10 text-center space-y-4 px-6 max-w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight flex items-center justify-center gap-1.5 sm:gap-2 select-none overflow-hidden max-w-full">
            <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent truncate whitespace-nowrap">
              {welcomeText}
            </span>
            <span className="w-1 sm:w-1.5 h-8 sm:h-12 md:h-14 bg-foreground inline-block animate-pulse shrink-0" />
          </h1>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-widest animate-pulse">
            Configuring workspaces...
          </p>
        </div>
      </div>
    );
  }

  // 2. Show Login Screen if no user name has been entered
  if (username === null) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center bg-grid p-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent pointer-events-none" />
        
        {/* Glow behind the login card */}
        <div className="absolute size-96 rounded-full bg-primary/5 blur-3xl -top-10 -left-10 pointer-events-none" />
        <div className="absolute size-96 rounded-full bg-accent/10 blur-3xl -bottom-10 -right-10 pointer-events-none" />

        <div className="w-full max-w-[420px] bg-card/65 backdrop-blur-xl border border-border/80 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6 scale-in-center">
          <div className="space-y-2 text-center">
            <div className="inline-flex size-11 rounded-xl bg-foreground items-center justify-center mb-2 shadow-inner">
              <div className="size-5 rounded-[3px] bg-background" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome to Dico Monitor</h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Enter your name to unlock the LLM evaluation, prompt tracing, and monitoring workspaces.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                Your Name
              </label>
              <input
                id="name-input"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-border bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
        <div className="absolute bottom-6 font-mono text-[10px] text-muted-foreground z-10">
          Dico Monitor · Observability and Evaluation Shell
        </div>
      </div>
    );
  }

  // 3. Render Normal Dashboard Layout
  return (
    <div className="min-h-screen bg-background text-foreground bg-grid transition-colors duration-300">
      <div className="flex relative">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 min-w-0">
          <Topbar
            crumb={crumb}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={handleToggleSidebar}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
          <main className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  {crumb}
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1.5 text-xs md:text-sm text-muted-foreground max-w-xl">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                {actions}
                <span className="size-1.5 rounded-full bg-success pulse-dot" />
                <span className="text-muted-foreground">streaming</span>
              </div>
            </div>
            {children}
            <footer className="pt-4 pb-8 flex items-center justify-between font-mono text-[10px] md:text-[11px] text-muted-foreground border-t border-border">
              <span>Dico Monitor | open-source LLM observability</span>
              <span className="hidden sm:inline">p50 312ms · p95 1.4s · p99 2.8s</span>
            </footer>
          </main>
        </div>
      </div>
      {/* Floating Chat Assistant Bot */}
      <ChatAssistant />
    </div>
  );
}
