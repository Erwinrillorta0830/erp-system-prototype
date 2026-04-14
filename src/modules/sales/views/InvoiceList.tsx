"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { SalesInvoice } from "@/modules/sales/types";

const STATUS_STYLE: Record<SalesInvoice["status"], string> = {
  DRAFT:          "bg-zinc-100   text-zinc-600   border-zinc-200",
  ISSUED:         "bg-blue-50    text-blue-600   border-blue-200",
  PARTIALLY_PAID: "bg-amber-50   text-amber-600  border-amber-200",
  PAID:           "bg-emerald-50 text-emerald-600 border-emerald-200",
  VOIDED:         "bg-rose-50    text-rose-600   border-rose-200",
};

export default function InvoiceList() {
  const { invoices, customers } = useSales();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const getCustomer = (id?: string) => id ? customers.find(c => c.id === id) : undefined;

  const filtered = invoices.filter(inv => {
    const name = getCustomer(inv.customerId)?.businessName ?? inv.walkInName ?? "";
    const matchSearch = inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalReceivable = invoices.filter(i => i.status !== "VOIDED").reduce((s, i) => s + i.balance, 0);
  const totalPaid = invoices.filter(i => i.status === "PAID").reduce((s, i) => s + i.totalAmount, 0);
  const partialCount = invoices.filter(i => i.status === "PARTIALLY_PAID").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Sales Invoices</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track billing, payments, and outstanding balances.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
          <FileText className="mr-2 h-4 w-4" /> New Invoice
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-rose-500/10 bg-rose-500/5 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Outstanding A/R</p>
          <p className="text-2xl font-black text-rose-600">₱{totalReceivable.toLocaleString()}</p>
          <p className="text-[10px] font-bold text-muted-foreground mt-1">{partialCount} invoices partially paid</p>
        </Card>
        <Card className="border-emerald-500/10 bg-emerald-500/5 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Collected (MTD)</p>
          <p className="text-2xl font-black text-emerald-600">₱{totalPaid.toLocaleString()}</p>
        </Card>
        <Card className="border-border/30 bg-card/40 px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Invoices</p>
          <p className="text-2xl font-black">{invoices.length}</p>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/40 rounded-2xl">
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Invoice # or Customer..." className="pl-9 h-10 rounded-xl" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {["ALL", "ISSUED", "PARTIALLY_PAID", "PAID", "VOIDED"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`h-9 px-3 text-[9px] font-black uppercase rounded-xl transition-all ${
                  filterStatus === s ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/30 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Invoice #</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Customer / Walk-in</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Channel</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Issued</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Due</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Total</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Balance</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(inv => {
              const cust = getCustomer(inv.customerId);
              const isOverdue = inv.dueDate && new Date(inv.dueDate) < new Date() && inv.status !== "PAID";
              return (
                <TableRow key={inv.id} className="border-border/20 hover:bg-emerald-500/5 group cursor-pointer transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-black text-xs text-emerald-600">{inv.invoiceNo}</span>
                    </div>
                    {inv.salesOrderRef && <p className="text-[9px] text-muted-foreground mt-0.5">SO: {inv.salesOrderRef}</p>}
                  </TableCell>
                  <TableCell>
                    <p className="font-black text-xs">{cust?.businessName ?? inv.walkInName ?? "Walk-in"}</p>
                    {cust && <p className="text-[10px] text-muted-foreground">{cust.city}</p>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-black uppercase h-5 border-border/40">{inv.channel}</Badge>
                  </TableCell>
                  <TableCell className="text-[11px] font-bold text-muted-foreground tabular-nums">{inv.issueDate}</TableCell>
                  <TableCell>
                    {inv.dueDate ? (
                      <span className={`text-[11px] font-bold tabular-nums ${isOverdue ? "text-rose-600 font-black" : "text-muted-foreground"}`}>
                        {isOverdue && <AlertCircle className="inline h-3 w-3 mr-1" />}
                        {inv.dueDate}
                      </span>
                    ) : <span className="text-[10px] text-muted-foreground">COD</span>}
                  </TableCell>
                  <TableCell className="text-right font-black text-sm">₱{inv.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-sm font-black ${inv.balance > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {inv.balance > 0 ? `₱${inv.balance.toLocaleString()}` : "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${STATUS_STYLE[inv.status]}`}>
                      {inv.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 hover:text-emerald-600">
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
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
