import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles, Brain } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I am your Dico Monitor assistant. How can I help you trace, monitor, or evaluate your AI agents today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue.toLowerCase();
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Hello! This feature is under development, but I am excited to help you observe your LLMs soon!";

      if (query.includes("theme") || query.includes("light") || query.includes("dark")) {
        reply = "You can toggle between Dark and Light theme using the Sun/Moon button on the right side of the top navigation bar!";
      } else if (query.includes("sidebar") || query.includes("close") || query.includes("open") || query.includes("dashboard")) {
        reply = "You can collapse or expand the dashboard sidebar using the menu button in the top left corner of the topbar!";
      } else if (query.includes("name") || query.includes("user") || query.includes("hello")) {
        reply = "Hello! Welcome to Dico Monitor. If you want to change your username, you can clear your browser storage or wait for further updates!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group size-16 rounded-full bg-foreground text-background flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Open AI Assistant"
        >
          {/* Pulsing ring animation */}
          <span className="absolute inset-0 rounded-full bg-foreground/10 animate-ping group-hover:animate-none" />
          <Brain className="size-8 group-hover:rotate-6 transition-transform text-background" />
          <div className="absolute top-0.5 right-0.5 size-3.5 bg-success rounded-full border-2 border-background" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[400px] max-w-[calc(100vw-2rem)] h-[560px] bg-card/80 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-border/60 bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-foreground text-background flex items-center justify-center shadow-md">
                <Brain className="size-5 text-background" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
                  Dico Monitor Assistant
                  <Sparkles className="size-3.5 text-warning animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="size-1.5 rounded-full bg-success animate-pulse" />
                  <span className="font-mono text-[10px] text-muted-foreground">Always Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[88%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="size-8 rounded-lg bg-accent/60 flex items-center justify-center shrink-0 border border-border shadow-sm">
                    <Bot className="size-4" />
                  </div>
                )}
                <div
                  className={`p-3 text-[13px] leading-relaxed rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-foreground text-background rounded-tr-none"
                      : "bg-accent/40 text-foreground border border-border/40 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1.5 text-right font-mono ${
                      msg.sender === "user" ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="size-8 rounded-lg bg-accent/60 flex items-center justify-center shrink-0 border border-border shadow-sm">
                  <Bot className="size-4" />
                </div>
                <div className="p-3 bg-accent/40 rounded-2xl rounded-tl-none border border-border/40 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce delay-0" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-border/60 bg-muted/20 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 h-10 px-3.5 text-[13px] rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="size-10 rounded-lg bg-foreground text-background flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all cursor-pointer shrink-0"
            >
              <Send className="size-4 text-background" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
