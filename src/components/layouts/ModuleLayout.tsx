"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  UserCircle,
  LucideIcon,
  LayoutGrid,
  Settings
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface ThemeClasses {
  bg: string;
  text: string;
  shadow: string;
  ring: string;
  hover: string;
  gradient: string;
}

const THEMES: Record<string, ThemeClasses> = {
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    shadow: "shadow-blue-500/25",
    ring: "focus:ring-blue-400/30",
    hover: "hover:bg-blue-500/10",
    gradient: "from-blue-600 to-blue-400",
  },
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    shadow: "shadow-emerald-500/25",
    ring: "focus:ring-emerald-400/30",
    hover: "hover:bg-emerald-500/10",
    gradient: "from-emerald-500 to-emerald-300",
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600",
    shadow: "shadow-indigo-500/25",
    ring: "focus:ring-indigo-400/30",
    hover: "hover:bg-indigo-500/10",
    gradient: "from-indigo-600 to-indigo-400",
  },
  rose: {
    bg: "bg-rose-500",
    text: "text-rose-600",
    shadow: "shadow-rose-500/25",
    ring: "focus:ring-rose-400/30",
    hover: "hover:bg-rose-500/10",
    gradient: "from-rose-500 to-rose-300",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-600",
    shadow: "shadow-orange-500/25",
    ring: "focus:ring-orange-400/30",
    hover: "hover:bg-orange-500/10",
    gradient: "from-orange-500 to-orange-300",
  },
  zinc: {
    bg: "bg-zinc-800",
    text: "text-zinc-800",
    shadow: "shadow-zinc-500/25",
    ring: "focus:ring-zinc-400/30",
    hover: "hover:bg-zinc-500/10",
    gradient: "from-zinc-800 to-zinc-600",
  },
  primary: {
    bg: "bg-amber-600",
    text: "text-amber-600",
    shadow: "shadow-amber-500/20",
    ring: "focus:ring-amber-400/20",
    hover: "hover:bg-amber-500/5",
    gradient: "from-amber-600 to-yellow-500",
  },
  mmpa: {
    bg: "bg-zinc-800",
    text: "text-amber-500",
    shadow: "shadow-amber-500/20",
    ring: "focus:ring-amber-400/20",
    hover: "hover:bg-amber-500/5",
    gradient: "from-zinc-800 to-zinc-600",
  }
};

interface ModuleLayoutProps {
  children: React.ReactNode;
  moduleName: string;
  moduleIcon: LucideIcon;
  navItems: NavItem[];
  themeColor?: keyof typeof THEMES;
  searchPlaceholder?: string;
}

export function ModuleLayout({
  children,
  moduleName,
  moduleIcon: Icon,
  navItems,
  themeColor = "primary",
  searchPlaceholder = "Search...",
}: ModuleLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = THEMES[themeColor];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out shadow-xl z-20",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/50 bg-muted/20">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm border border-border/50">
                <Image 
                  src="/image.png" 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
                <div className="absolute -right-1 -top-1">
                  <Settings className="h-3 w-3 text-amber-500 animate-gear" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={cn("text-lg font-black tracking-tighter leading-none text-mmpa-gold")}>
                  MMPA
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  {moduleName}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative h-10 w-10 mx-auto flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm border border-border/50">
              <Image 
                src="/image.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="object-contain"
              />
              <div className="absolute -right-1 -top-1">
                <Settings className="h-3 w-3 text-amber-500 animate-gear" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            // If the item is just the base path (e.g., /scm), only count as active if it's exact match
            // or if we're deeper in that module. This is slightly imperfect but works for ERP structure.
            const isBaseActive = item.href.split('/').length <= 2 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group active:scale-95",
                    isBaseActive 
                      ? cn(theme.bg, "text-white shadow-lg scale-[1.02]", theme.shadow) 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isBaseActive ? "text-white" : "text-muted-foreground")} />
                  {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                  {isBaseActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-md z-30 transition-colors",
            "hover:text-white",
            themeColor !== "primary" ? `hover:${theme.bg}` : "hover:bg-primary"
          )}
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        {/* Back to Home & User Section at Bottom */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95",
                !isSidebarOpen && "justify-center"
              )}
            >
              <LayoutGrid className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Back to Home</span>}
            </Button>
          </Link>

          <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-muted/50 transition-all", !isSidebarOpen && "justify-center")}>
            <UserCircle className={cn("h-8 w-8", theme.text)} />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xs font-black">User Account</span>
                <span className="text-[10px] text-muted-foreground">Premium Access</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative transition-colors duration-300">
        {/* Motor Parts Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
          style={{ backgroundImage: 'url("/motor_parts_bg.png")', backgroundSize: '400px' }}
        />
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border/50 bg-card/50 backdrop-blur-md z-10 transition-colors duration-300">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className={cn("absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:", theme.text)} />
              <input 
                placeholder={searchPlaceholder} 
                className={cn(
                  "w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none placeholder:text-muted-foreground text-sm font-medium transition-all focus:outline-none focus:ring-2",
                  theme.ring
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className={cn("relative rounded-full", theme.hover)}>
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background" />
            </Button>
            <div className="h-8 w-px bg-border/50" />
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black">John Doe</p>
                <p className="text-[10px] text-muted-foreground">Administrator</p>
              </div>
              <div className={cn("w-10 h-10 rounded-full border-2 p-0.5 shadow-sm", theme.text.replace('text-', 'border-').replace('600', '500/30'))}>
                 <div className={cn("w-full h-full rounded-full bg-gradient-to-tr flex items-center justify-center font-bold text-white text-xs", theme.gradient)}>JD</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-transparent custom-scrollbar z-10 relative">
          <div className="mx-auto max-w-7xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
