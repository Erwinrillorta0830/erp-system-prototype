"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

/* ─── Subsystem definitions ─── */
const subsystems = [
  {
    id: "bi",
    name: "Business Intelligence",
    shortName: "BI",
    description: "Executive dashboards, KPI analytics, and real-time reporting across all business verticals.",
    href: "/bi",
    icon: BarChart3,
    gradient: "from-violet-600 to-indigo-600",
    glowColor: "rgba(139,92,246,0.35)",
    shadowColor: "shadow-violet-500/20",
    accentText: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
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
    gradient: "from-sky-500 to-cyan-500",
    glowColor: "rgba(14,165,233,0.35)",
    shadowColor: "shadow-sky-500/20",
    accentText: "text-sky-400",
    accentBg: "bg-sky-500/10",
    accentBorder: "border-sky-500/20",
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
    gradient: "from-amber-500 to-orange-500",
    glowColor: "rgba(245,158,11,0.35)",
    shadowColor: "shadow-amber-500/20",
    accentText: "text-amber-400",
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
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16,185,129,0.35)",
    shadowColor: "shadow-emerald-500/20",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
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
    gradient: "from-rose-500 to-pink-500",
    glowColor: "rgba(244,63,94,0.35)",
    shadowColor: "shadow-rose-500/20",
    accentText: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
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
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-violet-500/30">
      <DotGrid />

      {/* Ambient gradient blobs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/[0.04] blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/60 backdrop-blur-xl bg-zinc-950/80">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 h-16">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800">
                <Layers className="h-5 w-5 text-violet-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">
                Motor<span className="text-violet-400">ERP</span>
              </h1>
              <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                Enterprise Platform
              </p>
            </div>
          </div>

          <LiveClock />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">All Systems Online</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-violet-500/20">
              A
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
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
                System Modules
              </h2>
              <p className="mt-2 text-sm text-zinc-500 max-w-lg leading-relaxed">
                Select a module below to access its dashboard and management tools. 
                All subsystems are interconnected for seamless data flow.
              </p>
            </div>

            {/* Quick stats */}
            <div className="hidden lg:flex items-center gap-6">
              <QuickStat
                icon={<Activity className="h-4 w-4 text-emerald-400" />}
                label="Active Sessions"
                value="12"
              />
              <div className="h-8 w-px bg-zinc-800" />
              <QuickStat
                icon={<TrendingUp className="h-4 w-4 text-violet-400" />}
                label="System Uptime"
                value="99.9%"
              />
            </div>
          </div>
        </section>

        {/* Module Cards Grid */}
        <section className="mx-auto max-w-7xl w-full px-8 py-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subsystems.map((mod, i) => (
              <Link
                key={mod.id}
                href={mod.href}
                className={`
                  group relative flex flex-col rounded-2xl border border-zinc-800/60
                  bg-zinc-900/50 backdrop-blur-sm
                  transition-all duration-500 ease-out
                  hover:border-zinc-700/80 hover:bg-zinc-900/80
                  hover:shadow-2xl hover:-translate-y-1
                  ${mod.shadowColor}
                  ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                `}
                style={{
                  animationDelay: `${i * 80}ms`,
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
                        <h3 className="text-base font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
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
                  <p className="text-sm text-zinc-500 leading-relaxed flex-1 group-hover:text-zinc-400 transition-colors">
                    {mod.description}
                  </p>

                  {/* Stats pills */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-zinc-800/60">
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
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-7xl w-full px-8 py-6 border-t border-zinc-800/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-600" />
              <span className="text-xs text-zinc-600 font-medium">
                MotorERP v1.0 — Motor Parts Distribution Platform
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
      <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-zinc-500 font-medium">{label}</p>
        <p className="text-sm font-bold tabular-nums text-zinc-200">{value}</p>
      </div>
    </div>
  );
}
