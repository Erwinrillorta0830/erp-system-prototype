"use client";

import React from "react";
import { SalesProvider } from "@/modules/sales/context/sales-context";
import {
  LayoutDashboard, ShoppingCart, FileText, ClipboardList,
  Truck, RotateCcw, Tag, Bell, Search, UserCircle,
  ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard",     href: "/sales",             icon: LayoutDashboard },
  { name: "POS / Walk-in", href: "/sales/pos",         icon: ShoppingCart    },
  { name: "Quotations",    href: "/sales/quotes",       icon: FileText        },
  { name: "Sales Orders",  href: "/sales/orders",       icon: ClipboardList   },
  { name: "Invoices",      href: "/sales/invoices",     icon: FileText        },
  { name: "Fulfillment",   href: "/sales/fulfillment",  icon: Truck           },
  { name: "Returns",       href: "/sales/returns",      icon: RotateCcw       },
  { name: "Pricing",       href: "/sales/pricing",      icon: Tag             },
];

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <SalesProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out shadow-xl z-20",
          isSidebarOpen ? "w-64" : "w-20"
        )}>
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-black tracking-tighter text-emerald-600">Sales Hub</span>
              </div>
            ) : (
              <Zap className="text-emerald-500 h-8 w-8 mx-auto" />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group active:scale-95",
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                    <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground")} />
                    {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                    {isActive && isSidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Toggle Button */}
          <Button
            variant="ghost" size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-md z-30 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {/* User footer */}
          <div className="p-4 border-t border-border/50">
            <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-muted/50", !isSidebarOpen && "justify-center")}>
              <UserCircle className="h-8 w-8 text-emerald-500" />
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="text-xs font-black">Sales Manager</span>
                  <span className="text-[10px] text-muted-foreground">Full Access</span>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-8 border-b border-border/50 bg-card/60 backdrop-blur-md z-10">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                <input
                  placeholder="Search Sales (SO#, INV#, Customer, Part No...)"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border-none placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-emerald-500/10 rounded-full">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background" />
              </Button>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black">John Sales</p>
                  <p className="text-[10px] text-muted-foreground">Sales Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center font-bold text-white text-xs">JS</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa] dark:bg-zinc-950/20 custom-scrollbar">
            <div className="mx-auto max-w-7xl animate-in fade-in duration-700">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SalesProvider>
  );
}
