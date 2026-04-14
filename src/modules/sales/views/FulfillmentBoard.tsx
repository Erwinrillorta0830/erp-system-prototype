"use client";

import React from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Truck, Package, CheckCircle2, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { FulfillmentRecord } from "@/modules/sales/types";

const STATUS_CONFIG: Record<FulfillmentRecord["status"], { label: string; color: string; icon: React.ReactNode }> = {
  PENDING:   { label: "Pending",   color: "bg-amber-50  text-amber-600  border-amber-200",  icon: <Clock className="h-4 w-4 text-amber-500" />    },
  PREPARING: { label: "Preparing", color: "bg-blue-50   text-blue-600   border-blue-200",   icon: <Package className="h-4 w-4 text-blue-500" />   },
  RELEASED:  { label: "Released",  color: "bg-violet-50 text-violet-600 border-violet-200", icon: <Truck className="h-4 w-4 text-violet-500" />   },
  COMPLETED: { label: "Completed", color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
  CANCELLED: { label: "Cancelled", color: "bg-rose-50   text-rose-600   border-rose-200",   icon: <AlertTriangle className="h-4 w-4 text-rose-500" /> },
};

export default function FulfillmentBoard() {
  const { fulfillments, customers, orders } = useSales();

  const getCustomer = (id: string) => customers.find(c => c.id === id);
  const getOrder    = (ref: string) => orders.find(o => o.orderNo === ref);

  const grouped = (["PENDING", "PREPARING", "RELEASED", "COMPLETED"] as const).map(s => ({
    status: s,
    config: STATUS_CONFIG[s],
    items: fulfillments.filter(f => f.status === s),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Fulfillment Board</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track stock release and delivery coordination.</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {grouped.map(g => (
          <Card key={g.status} className={`border px-5 py-4 ${g.config.color.replace("border-", "border-").replace("text-", "").replace("bg-", "bg-")}`}>
            <div className="flex items-center gap-3 mb-2">{g.config.icon}
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{g.config.label}</p>
            </div>
            <p className="text-3xl font-black">{g.items.length}</p>
          </Card>
        ))}
      </div>

      {/* Kanban-style board */}
      <div className="grid gap-6 lg:grid-cols-4 min-h-[400px]">
        {grouped.map(g => (
          <div key={g.status} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1">
              {g.config.icon}
              <h3 className="font-black text-sm uppercase tracking-widest">{g.config.label}</h3>
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-black">{g.items.length}</div>
            </div>
            <div className="flex-1 bg-muted/20 rounded-[2rem] border border-border/30 p-4 space-y-4">
              {g.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground opacity-50">
                  <Package className="h-8 w-8 mb-2" />
                  <p className="text-xs font-bold">No items</p>
                </div>
              ) : g.items.map(ff => {
                const cust  = getCustomer(ff.customerId);
                const order = getOrder(ff.salesOrderRef);
                const totalOrdered  = ff.lines.reduce((s, l) => s + l.orderedQty, 0);
                const totalReleased = ff.lines.reduce((s, l) => s + l.releasedQty, 0);
                const pct = totalOrdered > 0 ? Math.round((totalReleased / totalOrdered) * 100) : 0;
                return (
                  <Card key={ff.id} className="border-border/30 bg-card/80 rounded-3xl shadow-sm hover:shadow-lg hover:border-emerald-400/30 transition-all cursor-pointer group">
                    <CardHeader className="p-4 pb-2">
                      <p className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">{ff.fulfillmentNo}</p>
                      <p className="text-xs font-black">{cust?.businessName}</p>
                      <p className="text-[10px] text-muted-foreground">SO: {ff.salesOrderRef}</p>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 space-y-3">
                      <div className="text-[10px] font-bold text-muted-foreground">
                        {ff.lines.length} line item{ff.lines.length > 1 ? "s" : ""}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black">
                          <span>Release Progress</span><span>{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-1.5 [&>div]:bg-emerald-500" />
                      </div>
                      {ff.status === "PENDING" && (
                        <Button size="sm" className="w-full h-8 text-[10px] font-black rounded-xl bg-emerald-500 hover:bg-emerald-600">
                          Start Preparing <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                      {ff.status === "PREPARING" && (
                        <Button size="sm" className="w-full h-8 text-[10px] font-black rounded-xl bg-violet-500 hover:bg-violet-600 text-white">
                          Mark Released <Truck className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
