"use client";

import React from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, TrendingDown, ShoppingCart, ClipboardList,
  FileText, Truck, RotateCcw, Zap, ArrowRight,
  AlertCircle, Trophy, Users, Package,
} from "lucide-react";

export default function SalesDashboard() {
  const { orders, invoices, posTransactions, returns, quotes, fulfillments } = useSales();

  // ── KPI Calculations ──────────────────────────────────────────────────────
  const today = new Date().toISOString().split("T")[0];
  const todayInvoices = invoices.filter(i => i.issueDate === today);
  const todaySales = todayInvoices.reduce((s, i) => s + i.totalAmount, 0);

  const monthSales = invoices.reduce((s, i) => s + i.totalAmount, 0);
  const wholesaleSales = invoices.filter(i => i.channel === "WHOLESALE").reduce((s, i) => s + i.totalAmount, 0);
  const retailSales    = invoices.filter(i => i.channel === "RETAIL").reduce((s, i) => s + i.totalAmount, 0);
  const walkInSales    = invoices.filter(i => i.channel === "WALKIN").reduce((s, i) => s + i.totalAmount, 0);

  const openQuotes    = quotes.filter(q => q.status === "SENT").length;
  const pendingOrders = orders.filter(o => o.status === "CONFIRMED" || o.status === "PARTIALLY_FULFILLED").length;
  const openReturns   = returns.filter(r => r.status === "FOR_APPROVAL").length;
  const pendingFF     = fulfillments.filter(f => f.status === "PENDING" || f.status === "PREPARING").length;

  const funnelData = [
    { label: "Wholesale", value: wholesaleSales, color: "bg-emerald-500",    width: "w-[85%]" },
    { label: "Retail",    value: retailSales,    color: "bg-emerald-400",    width: "w-[35%]" },
    { label: "Walk-in",   value: walkInSales,    color: "bg-emerald-300",    width: "w-[20%]" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Sales Operations</p>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Sales Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Motor Parts Distributor — Live Operations Overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-emerald-500/20 hover:bg-emerald-500/5">
            Export Report
          </Button>
          <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 font-black shadow-lg shadow-emerald-500/30 px-6">
            <ShoppingCart className="mr-2 h-4 w-4" /> New POS Sale
          </Button>
        </div>
      </div>

      {/* Top KPI Row */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's Sales",   value: `₱${todaySales.toLocaleString()}`,       sub: `${todayInvoices.length} transactions`,    icon: Zap,          color: "text-emerald-500", border: "border-emerald-500/10", bg: "bg-emerald-500/5" },
          { label: "MTD Revenue",     value: `₱${(monthSales/1000).toFixed(0)}k`,     sub: "Across all channels",                      icon: TrendingUp,   color: "text-blue-500",    border: "border-blue-500/10",   bg: "bg-blue-500/5"   },
          { label: "Pending Orders",  value: `${pendingOrders}`,                       sub: "Awaiting fulfillment",                     icon: ClipboardList,color: "text-amber-500",   border: "border-amber-500/10",  bg: "bg-amber-500/5"  },
          { label: "Open Returns",    value: `${openReturns}`,                         sub: "Needs approval",                           icon: RotateCcw,    color: "text-rose-500",    border: "border-rose-500/10",   bg: "bg-rose-500/5"   },
        ].map(k => (
          <Card key={k.label} className={`relative overflow-hidden border ${k.border} ${k.bg} backdrop-blur-sm`}>
            <div className="absolute top-3 right-3 opacity-10">
              <k.icon className="h-12 w-12" />
            </div>
            <CardHeader className="pb-1">
              <CardDescription className="text-[10px] font-black uppercase tracking-widest">{k.label}</CardDescription>
              <CardTitle className={`text-3xl font-black ${k.color}`}>{k.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] font-bold text-muted-foreground">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sales by Channel */}
        <Card className="lg:col-span-2 border-border/40 bg-card/40 backdrop-blur-sm rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black">Revenue by Channel</CardTitle>
              <CardDescription>Month-to-date breakdown</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="font-black text-xs text-emerald-600 uppercase">
              Full Report <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {funnelData.map(f => (
              <div key={f.label} className="space-y-2">
                <div className="flex justify-between text-xs font-black">
                  <span className="uppercase tracking-widest text-muted-foreground">{f.label}</span>
                  <span className="text-foreground">₱{f.value.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${f.color} ${f.width} rounded-full transition-all duration-1000 shadow-sm`} />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
              {[
                { label: "Quotes Open",  value: openQuotes,  color: "text-blue-500"  },
                { label: "FF Pending",   value: pendingFF,   color: "text-amber-500" },
                { label: "Returns",      value: openReturns, color: "text-rose-500"  },
              ].map(s => (
                <div key={s.label} className="text-center p-4 rounded-2xl bg-muted/30">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Panels */}
        <div className="space-y-6">
          {/* Recent POS */}
          <Card className="border-border/30 bg-card/40 rounded-[2rem]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-emerald-500" /> Recent POS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {posTransactions.filter(t => t.status === "CHECKED_OUT").slice(0, 3).map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 group hover:bg-emerald-500/5 transition-all cursor-pointer">
                  <div>
                    <p className="text-xs font-black">{tx.transactionNo}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">{tx.walkInName || "Counter Sale"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-600">₱{tx.totalAmount.toLocaleString()}</p>
                    <Badge variant="outline" className="text-[8px] h-4 px-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">{tx.paymentMethod}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-amber-500/10 bg-amber-500/5 rounded-[2rem]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-black flex items-center gap-2 text-amber-600">
                <AlertCircle className="h-4 w-4" /> Attention Needed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-5">
              <div className="text-[11px] font-medium text-amber-950/70 leading-snug">
                ⚠️ <strong>SO-2026-0088</strong> has 50 pcs of Piston Kit still pending release (backorder from Thailand).
              </div>
              <div className="text-[11px] font-medium text-amber-950/70 leading-snug">
                ⚠️ <strong>QT-2026-0044</strong> expired. Customer Metro Manila Auto hasn't re-ordered yet.
              </div>
              <Button variant="link" className="p-0 h-auto text-amber-600 text-[10px] uppercase font-black mt-1">
                Review All Alerts <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom KPIs */}
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Top Product",    value: "Honda Wave Piston Kit",   sub: "180 units sold", icon: Package, color: "text-emerald-600" },
          { label: "Top Customer",   value: "Metro Manila Auto",        sub: "₱140k MTD",      icon: Users,   color: "text-blue-600"   },
          { label: "Win Rate",       value: "85%",                      sub: "Quote → Order",  icon: Trophy,  color: "text-violet-600" },
          { label: "Avg Order",      value: `₱${Math.round(monthSales / Math.max(orders.length, 1)).toLocaleString()}`, sub: "Per transaction", icon: TrendingUp, color: "text-emerald-600" },
        ].map(k => (
          <Card key={k.label} className="border-border/30 bg-card/30 p-5 flex items-center gap-4 rounded-2xl hover:border-emerald-500/20 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
              <k.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{k.label}</p>
              <p className={`text-sm font-black ${k.color} leading-tight`}>{k.value}</p>
              <p className="text-[10px] text-muted-foreground">{k.sub}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
