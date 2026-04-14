"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RotateCcw, Plus, Check, X, AlertTriangle } from "lucide-react";
import { SalesReturn } from "@/modules/sales/types";

const STATUS_STYLE: Record<SalesReturn["status"], string> = {
  DRAFT:        "bg-zinc-100  text-zinc-600   border-zinc-200",
  FOR_APPROVAL: "bg-amber-50  text-amber-600  border-amber-200",
  APPROVED:     "bg-emerald-50 text-emerald-600 border-emerald-200",
  REJECTED:     "bg-rose-50   text-rose-600   border-rose-200",
  COMPLETED:    "bg-blue-50   text-blue-600   border-blue-200",
};

const REASON_LABELS: Record<string, string> = {
  WRONG_PART:   "Wrong Part",
  WRONG_FITMENT:"Wrong Fitment",
  DAMAGED:      "Damaged / Defective",
  OVER_PURCHASE:"Over-purchase",
  OTHER:        "Other",
};

const RESOLUTION_STYLE: Record<string, string> = {
  REPLACEMENT:  "bg-blue-50   text-blue-600   border-blue-200",
  CREDIT_MEMO:  "bg-violet-50 text-violet-600 border-violet-200",
  REFUND:       "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function SalesReturnList() {
  const { returns, customers } = useSales();
  const [filterStatus, setFilterStatus] = useState("ALL");

  const getCustomer = (id: string) => customers.find(c => c.id === id);

  const filtered = returns.filter(r => filterStatus === "ALL" || r.status === filterStatus);

  const pending   = returns.filter(r => r.status === "FOR_APPROVAL").length;
  const approved  = returns.filter(r => r.status === "APPROVED").length;
  const totalAmt  = returns.reduce((s, r) => s + r.totalReturnAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Sales Returns</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage post-sale returns, replacements, and credit memos.</p>
        </div>
        <Button className="bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 font-black rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" /> Log Return
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-amber-500/10 bg-amber-500/5 px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Pending Approval</p>
          </div>
          <p className="text-2xl font-black text-amber-600">{pending}</p>
        </Card>
        <Card className="border-emerald-500/10 bg-emerald-500/5 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Approved / Resolved</p>
          <p className="text-2xl font-black text-emerald-600">{approved}</p>
        </Card>
        <Card className="border-rose-500/10 bg-rose-500/5 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Total Return Value</p>
          <p className="text-2xl font-black text-rose-600">₱{totalAmt.toLocaleString()}</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", "FOR_APPROVAL", "APPROVED", "REJECTED", "COMPLETED"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`h-9 px-4 text-[9px] font-black uppercase rounded-xl transition-all ${
              filterStatus === s ? "bg-rose-500 text-white shadow-md shadow-rose-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}>
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border/30 bg-card/30 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Return #</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Customer</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Invoice Ref</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Reason</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Resolution</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Amount</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Date</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(ret => {
              const cust = getCustomer(ret.customerId);
              const primaryReason = ret.lines[0]?.reason ?? "OTHER";
              return (
                <TableRow key={ret.id} className="border-border/20 hover:bg-rose-500/5 group cursor-pointer transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-black text-xs text-rose-600">{ret.returnNo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-black text-xs">{cust?.businessName}</p>
                  </TableCell>
                  <TableCell className="text-[11px] font-bold text-muted-foreground">{ret.invoiceRef}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-black uppercase h-5 border-rose-200 text-rose-600 bg-rose-50">
                      {REASON_LABELS[primaryReason]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${RESOLUTION_STYLE[ret.resolutionType]}`}>
                      {ret.resolutionType.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-black text-sm text-rose-600">
                    ₱{ret.totalReturnAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-[11px] font-bold text-muted-foreground tabular-nums">{ret.dateLogged}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${STATUS_STYLE[ret.status]}`}>
                      {ret.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {ret.status === "FOR_APPROVAL" && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="h-6 w-6 p-0 bg-emerald-500 hover:bg-emerald-600 rounded-lg">
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="h-6 w-6 p-0 bg-rose-500 hover:bg-rose-600 rounded-lg" variant="destructive">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
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
