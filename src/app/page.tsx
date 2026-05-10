"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  UserCog,
  ShoppingCart,
  Package,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  Layers,
  Zap,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

/* ─── Subsystem definitions ─── */
const subsystems = [
  {
    id: "bi",
    name: "Business Intelligence",
    shortName: "BI",
    description: "Executive dashboards, KPI analytics, and real-time reporting across all business verticals.",
    href: "/bi",
    icon: BarChart3,
    gradient: "from-amber-600 to-yellow-500",
    glowColor: "rgba(245,158,11,0.35)",
    shadowColor: "shadow-amber-500/20",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    stats: [
      { label: "Reports", value: "24" },
      { label: "KPIs", value: "48" },
    ],
  },
  {
    id: "crm",
    name: "Customer Relations",
    shortName: "CRM",
    description: "Lead pipeline management, customer profiles, complaint tracking, and relationship analytics.",
    href: "/crm",
    icon: Users,
    gradient: "from-zinc-700 to-zinc-900",
    glowColor: "rgba(251,191,36,0.25)",
    shadowColor: "shadow-zinc-900/20",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    stats: [
      { label: "Leads", value: "156" },
      { label: "Customers", value: "1.2K" },
    ],
  },
  {
    id: "hrm",
    name: "Human Resources",
    shortName: "HRM",
    description: "Employee management, attendance tracking, payroll processing, and organizational oversight.",
    href: "/hrm",
    icon: UserCog,
    gradient: "from-zinc-800 to-amber-900",
    glowColor: "rgba(245,158,11,0.25)",
    shadowColor: "shadow-amber-900/20",
    accentText: "text-amber-500",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    stats: [
      { label: "Employees", value: "87" },
      { label: "On Duty", value: "72" },
    ],
  },
  {
    id: "sales",
    name: "Sales Management",
    shortName: "Sales",
    description: "POS operations, sales orders, invoicing, fulfillment tracking, pricing, and returns management.",
    href: "/sales",
    icon: ShoppingCart,
    gradient: "from-amber-500 to-yellow-600",
    glowColor: "rgba(251,191,36,0.35)",
    shadowColor: "shadow-amber-500/20",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
    stats: [
      { label: "Orders", value: "340" },
      { label: "Revenue", value: "₱2.1M" },
    ],
  },
  {
    id: "scm",
    name: "Supply Chain",
    shortName: "SCM",
    description: "Product catalog, purchase orders, shipment tracking, receiving, and inventory management.",
    href: "/scm",
    icon: Package,
    gradient: "from-zinc-900 to-zinc-700",
    glowColor: "rgba(251,191,36,0.2)",
    shadowColor: "shadow-zinc-900/30",
    accentText: "text-yellow-500",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
    stats: [
      { label: "Products", value: "4.8K" },
      { label: "POs", value: "62" },
    ],
  },
];

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <Clock className="h-4 w-4" />
        <span className="font-mono tabular-nums tracking-wide">{time}</span>
      </div>
      <div className="h-4 w-px bg-zinc-700" />
      <span className="text-zinc-500">{date}</span>
    </div>
  );
}

/* ─── Animated dots background ─── */
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

/* ─── Main Dashboard Page ─── */
export default function MainDashboard() {
  const router = useRouter();
  const [zoomingModule, setZoomingModule] = useState<string | null>(null);

  const handleModuleClick = (e: React.MouseEvent, href: string, id: string) => {
    e.preventDefault();
    setZoomingModule(id);
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  return (
    <div className={cn(
      "relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground flex flex-col selection:bg-amber-500/30 overflow-hidden transition-colors duration-300",
      zoomingModule ? "pointer-events-none" : ""
    )}>
      {/* Motor Parts Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-repeat"
        style={{ backgroundImage: 'url("/motor_parts_bg.png")', backgroundSize: '400px' }}
      />
      
      <DotGrid />

      {/* Ambient gradient blobs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/[0.04] blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-600/[0.04] blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/60 backdrop-blur-xl bg-background/80">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 opacity-0 blur-md group-hover:opacity-40 transition-opacity" />
                <div className="relative h-12 w-auto flex items-center">
                  <Image 
                    src="/image.png" 
                    alt="MMPA Logo" 
                    width={180} 
                    height={60} 
                    className="h-10 w-auto object-contain"
                    priority
                  />
                  <div className="absolute -right-2 -top-1">
                    <Settings className="h-4 w-4 text-amber-500 animate-gear" />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block ml-2">
                <h1 className="text-2xl font-black tracking-tighter leading-none text-mmpa-gold">
                  MMPA
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
                  Thai Parts & Accessories
                </p>
              </div>
            </Link>
          </div>

          <LiveClock />

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-400">Precision Systems Active</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-amber-500/20">
              <Settings className="h-5 w-5 animate-gear" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl w-full px-8 pt-12 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                  <Zap className="h-3 w-3 text-amber-400" />
                  <span className="text-[11px] font-semibold text-zinc-300">Command Center</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                System Modules
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-lg leading-relaxed">
                Select a module below to access its dashboard and management tools. 
                All subsystems are interconnected for seamless data flow.
              </p>
            </div>

            {/* Quick stats */}
            <div className="hidden lg:flex items-center gap-6">
              <QuickStat
                icon={<Settings className="h-4 w-4 text-amber-400 animate-gear" />}
                label="System Load"
                value="Minimal"
              />
              <div className="h-8 w-px bg-zinc-800" />
              <QuickStat
                icon={<TrendingUp className="h-4 w-4 text-amber-400" />}
                label="Growth Index"
                value="+24%"
              />
            </div>
          </div>
        </section>

        {/* Module Cards Grid */}
        <section className="mx-auto max-w-7xl w-full px-8 py-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subsystems.map((mod, i) => (
              <a
                key={mod.id}
                href={mod.href}
                onClick={(e) => handleModuleClick(e, mod.href, mod.id)}
                className={`
                  group relative flex flex-col rounded-2xl border border-border/60
                  bg-card/50 backdrop-blur-sm
                  transition-all duration-500 ease-out
                  hover:border-amber-500/50 hover:bg-card/80
                  hover:shadow-2xl hover:-translate-y-1
                  ${mod.shadowColor}
                  ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                  ${zoomingModule === mod.id ? "animate-module-zoom z-50 shadow-[0_0_100px_rgba(251,191,36,0.5)]" : ""}
                  ${zoomingModule && zoomingModule !== mod.id ? "opacity-20 scale-95 blur-sm" : ""}
                `}
                style={{
                  animationDelay: zoomingModule ? "0ms" : `${i * 80}ms`,
                  transitionDuration: zoomingModule ? "600ms" : "500ms",
                }}
                id={`module-card-${mod.id}`}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${mod.glowColor} 0%, transparent 50%, transparent 100%)`,
                  }}
                />

                {/* Top gradient accent bar */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${mod.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                {/* Card content */}
                <div className="relative flex flex-col flex-1 p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          relative w-12 h-12 rounded-xl flex items-center justify-center
                          bg-gradient-to-br ${mod.gradient}
                          shadow-lg ${mod.shadowColor}
                          transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                        `}
                      >
                        <mod.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-amber-500 transition-colors">
                          {mod.name}
                        </h3>
                        <span className={`text-xs font-semibold ${mod.accentText} uppercase tracking-widest`}>
                          {mod.shortName}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${mod.accentBg} border ${mod.accentBorder}
                      transition-all duration-300
                      group-hover:translate-x-1 group-hover:scale-110
                    `}>
                      <ArrowRight className={`h-4 w-4 ${mod.accentText}`} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 transition-colors">
                    {mod.description}
                  </p>

                  {/* Stats pills */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border/60">
                    {mod.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${mod.accentBg} border ${mod.accentBorder}`}
                      >
                        <span className={`text-xs font-bold ${mod.accentText} tabular-nums`}>
                          {stat.value}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[11px] font-semibold text-zinc-500">
                        Open Module →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-7xl w-full px-8 py-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="/image.png" 
                alt="Logo" 
                width={16} 
                height={16} 
                className="opacity-40 grayscale"
              />
              <span className="text-xs text-zinc-600 font-medium">
                MMPA ERP v1.0 — Motor Parts Distribution Platform
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-600">
              <span>5 Modules Active</span>
              <div className="h-3 w-px bg-zinc-800" />
              <span>Next.js 16</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ─── Quick Stat mini-component ─── */
function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-bold tabular-nums text-foreground">{value}</p>
      </div>
    </div>
  );
}
