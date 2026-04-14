"use client";

import React from "react";
import { SCMProvider } from "@/modules/scm/context/scm-context";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Truck, 
  Home, 
  Warehouse, 
  Settings,
  Users,
  ChevronLeft,
  Search,
  Bell,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { name: "Dashboard", href: "/scm", icon: Home },
  { name: "Suppliers", href: "/scm/suppliers", icon: Users },
  { name: "Product Catalog", href: "/scm/catalog", icon: Package },
  { name: "Purchase Orders", href: "/scm/pos", icon: ShoppingCart },
  { name: "Shipments", href: "/scm/shipments", icon: Truck },
  { name: "Receiving", href: "/scm/receiving", icon: Truck },
  { name: "Inventory", href: "/scm/inventory", icon: Warehouse },
];

export default function SCMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SCMProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">MotorERP SCM</span>
          </div>
          
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Quick search..."
                className="pl-8 bg-background/50 border-border/50 h-9 text-sm"
              />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              href="/scm/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>SCM Module</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-foreground font-medium">Motor Parts Thailand-PH</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-card"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
            {children}
          </div>
        </main>
      </div>
    </SCMProvider>
  );
}
