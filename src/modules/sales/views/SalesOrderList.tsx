"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Truck, Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SalesOrder } from "@/modules/sales/types";

const STATUS_STYLE: Record<SalesOrder["status"], string> = {
  DRAFT:                "bg-zinc-100  text-zinc-600   border-zinc-200",
  CONFIRMED:            "bg-blue-50   text-blue-600   border-blue-200",
  PARTIALLY_FULFILLED:  "bg-amber-50  text-amber-600  border-amber-200",
  FULFILLED:            "bg-emerald-50 text-emerald-600 border-emerald-200",
  CANCELLED:            "bg-rose-50   text-rose-600   border-rose-200",
};

const CHANNEL_STYLE: Record<string, string> = {
  WHOLESALE: "bg-violet-50 text-violet-600 border-violet-200",
  RETAIL:    "bg-blue-50   text-blue-600   border-blue-200",
  WALKIN:    "bg-emerald-50 text-emerald-600 border-emerald-200",
  COUNTER:   "bg-zinc-50   text-zinc-600   border-zinc-200",
};

export default function SalesOrderList() {
  const { orders, customers, updateOrderStatus } = useSales();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterChannel, setFilterChannel] = useState("ALL");

  const getCustomer = (id: string) => customers.find(c => c.id === id);

  const filtered = orders.filter(o => {
    const name = getCustomer(o.customerId)?.businessName ?? "";
    const matchSearch = o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase());
    const matchStatus  = filterStatus  === "ALL" || o.status  === filterStatus;
    const matchChannel = filterChannel === "ALL" || o.channel === filterChannel;
    return matchSearch && matchStatus && matchChannel;
  });

  const getFulfillmentPct = (order: SalesOrder) => {
    const ordered  = order.lines.reduce((s, l) => s + l.orderedQty, 0);
    const released = order.lines.reduce((s, l) => s + l.releasedQty, 0);
    return ordered > 0 ? Math.round((released / ordered) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Sales Orders</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage wholesale, retail, and counter orders.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" /> New Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: "Total",      value: orders.length,                                         color: "text-foreground"   },
          { label: "Confirmed",  value: orders.filter(o => o.status === "CONFIRMED").length,   color: "text-blue-600"     },
          { label: "Partial",    value: orders.filter(o => o.status === "PARTIALLY_FULFILLED").length, color: "text-amber-600" },
          { label: "Fulfilled",  value: orders.filter(o => o.status === "FULFILLED").length,   color: "text-emerald-600"  },
          { label: "Cancelled",  value: orders.filter(o => o.status === "CANCELLED").length,   color: "text-rose-600"     },
        ].map(s => (
          <Card key={s.label} className="border-border/30 bg-card/40 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filter bar */}
      <Card className="border-border/30 bg-card/40 rounded-2xl">
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="SO # or Customer..." className="pl-9 h-10 rounded-xl" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {["ALL", "CONFIRMED", "PARTIALLY_FULFILLED", "FULFILLED", "CANCELLED"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`h-9 px-3 text-[9px] font-black uppercase rounded-xl transition-all ${
                  filterStatus === s ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {["ALL", "WHOLESALE", "RETAIL", "WALKIN"].map(c => (
              <button key={c} onClick={() => setFilterChannel(c)}
                className={`h-9 px-3 text-[9px] font-black uppercase rounded-xl transition-all ${
                  filterChannel === c ? "bg-violet-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/30 bg-card/30 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Order #</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Customer</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Channel</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Date</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Fulfillment</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Total</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="w-[120px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => {
              const cust = getCustomer(order.customerId);
              const pct  = getFulfillmentPct(order);
              return (
                <TableRow key={order.id} className="border-border/20 hover:bg-emerald-500/5 group cursor-pointer transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      {order.status === "PARTIALLY_FULFILLED" && <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                      {order.status === "FULFILLED" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                      <span className="font-black text-xs group-hover:text-emerald-600 transition-colors">{order.orderNo}</span>
                    </div>
                    {order.quotationRef && <p className="text-[9px] text-muted-foreground font-bold mt-0.5">Ref: {order.quotationRef}</p>}
                  </TableCell>
                  <TableCell>
                    <p className="font-black text-xs">{cust?.businessName}</p>
                    <p className="text-[10px] text-muted-foreground">{order.paymentTerm}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${CHANNEL_STYLE[order.channel]}`}>
                      {order.channel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[11px] font-bold text-muted-foreground tabular-nums">{order.transactionDate}</TableCell>
                  <TableCell className="w-36">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>Release</span><span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1.5 bg-muted [&>div]:bg-emerald-500" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-black text-sm">₱{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${STATUS_STYLE[order.status]}`}>
                      {order.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold hover:text-emerald-600">
                        <Truck className="h-3 w-3 mr-1" /> Fulfill
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
