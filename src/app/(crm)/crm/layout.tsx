"use client";

import React from "react";
import { CRMProvider } from "@/modules/crm/context/crm-context";
import { 
  Users, 
  LayoutDashboard, 
  Target, 
  FileText, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Search,
  Bell,
  UserCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { name: "Customers", href: "/crm/customers", icon: Users },
  { name: "Leads", href: "/crm/leads", icon: UserPlus },
  { name: "Pipeline", href: "/crm/pipeline", icon: Target },
  { name: "Quotations", href: "/crm/quotes", icon: FileText },
  { name: "Activities", href: "/crm/activities", icon: Calendar },
  { name: "Complaints", href: "/crm/complaints", icon: MessageSquare },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <CRMProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out shadow-xl z-20",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          {/* Logo Section */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <TrendingUp className="text-primary-foreground h-5 w-5" />
                </div>
                <span className="text-xl font-black tracking-tighter text-primary">CRM Pro</span>
              </div>
            ) : (
              <TrendingUp className="text-primary h-8 w-8 mx-auto" />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div 
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group active:scale-95",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                    {isActive && isSidebarOpen && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />
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
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-md z-30 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {/* User Section at Bottom */}
          <div className="p-4 border-t border-border/50">
            <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-muted/50 transition-all", !isSidebarOpen && "justify-center")}>
              <UserCircle className="h-8 w-8 text-primary" />
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="text-xs font-black">Sales Manager</span>
                  <span className="text-[10px] text-muted-foreground">Premium Account</span>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-8 border-b border-border/50 bg-card/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  placeholder="Universal CRM Search (Customer, Quote#, Lead...)" 
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none ring-0 placeholder:text-muted-foreground text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background" />
              </Button>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black">John Sales</p>
                  <p className="text-[10px] text-muted-foreground">Admin Access</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm">
                   <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary to-primary/30 flex items-center justify-center font-bold text-primary-foreground text-xs">JS</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#fdfdfd] dark:bg-zinc-950/20  custom-scrollbar">
            <div className="mx-auto max-w-7xl animate-in fade-in duration-700">
              {children}
            </div>
          </div>
        </main>
      </div>
    </CRMProvider>
  );
}
