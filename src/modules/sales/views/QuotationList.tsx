"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, ArrowRight, FileText, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { SalesQuote } from "@/modules/sales/types";

const STATUS_STYLES: Record<SalesQuote["status"], string> = {
  DRAFT:     "bg-zinc-100   text-zinc-600   border-zinc-200",
  SENT:      "bg-blue-50    text-blue-600   border-blue-200",
  ACCEPTED:  "bg-emerald-50 text-emerald-600 border-emerald-200",
  REJECTED:  "bg-rose-50    text-rose-600   border-rose-200",
  EXPIRED:   "bg-orange-50  text-orange-600 border-orange-200",
  CONVERTED: "bg-violet-50  text-violet-600  border-violet-200",
};

export default function QuotationList() {
  const { quotes, customers, convertQuoteToOrder } = useSales();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [converting, setConverting] = useState<string | null>(null);
  const [lastConverted, setLastConverted] = useState<string | null>(null);

  const getCustomer = (id: string) => customers.find(c => c.id === id);

  const filtered = quotes.filter(q => {
    const name = getCustomer(q.customerId)?.businessName ?? "";
    const matchSearch = q.quoteNo.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || q.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleConvert = (quoteId: string) => {
    setConverting(quoteId);
    setTimeout(() => {
      const soNo = convertQuoteToOrder(quoteId);
      setLastConverted(soNo);
      setConverting(null);
      setTimeout(() => setLastConverted(null), 3000);
    }, 600);
  };

  const stats = {
    sent: quotes.filter(q => q.status === "SENT").length,
    accepted: quotes.filter(q => q.status === "ACCEPTED").length,
    expired: quotes.filter(q => q.status === "EXPIRED").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sales Module</p>
          <h1 className="text-3xl font-black tracking-tight">Quotations</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Pre-sale proposals for wholesale and repeat accounts.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" /> New Quotation
        </Button>
      </div>

      {lastConverted && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-black text-emerald-700">Quotation converted to <strong>{lastConverted}</strong> successfully!</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Quotes",  value: quotes.length, color: "text-foreground"   },
          { label: "Awaiting Reply",value: stats.sent,      color: "text-blue-600"    },
          { label: "Accepted",      value: stats.accepted,  color: "text-emerald-600" },
          { label: "Expired",       value: stats.expired,   color: "text-orange-600"  },
        ].map(s => (
          <Card key={s.label} className="border-border/30 bg-card/40 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border/30 bg-card/40 rounded-2xl">
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Quote # or Customer..." className="pl-9 h-10 rounded-xl" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {["ALL", "DRAFT", "SENT", "ACCEPTED", "EXPIRED", "CONVERTED"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`h-9 px-4 text-[10px] font-black uppercase rounded-xl transition-all ${
                  filterStatus === s
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s}
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
              <TableHead className="font-black text-[10px] uppercase tracking-widest pl-6">Quote #</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Customer</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Rep</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Issued</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Valid Until</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Total</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="w-[140px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(q => {
              const cust = getCustomer(q.customerId);
              const isExpired = new Date(q.validUntil) < new Date() && q.status === "SENT";
              return (
                <TableRow key={q.id} className="border-border/20 hover:bg-emerald-500/5 group cursor-pointer transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-black text-emerald-600 group-hover:underline text-xs">{q.quoteNo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-black text-xs">{cust?.businessName}</p>
                    <p className="text-[10px] text-muted-foreground">{cust?.city}</p>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground">{q.assignedSalesRep}</TableCell>
                  <TableCell className="text-[11px] font-bold text-muted-foreground tabular-nums">{q.dateCreated}</TableCell>
                  <TableCell>
                    <span className={`text-[11px] font-bold tabular-nums ${isExpired ? "text-rose-600" : "text-muted-foreground"}`}>
                      {q.validUntil}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-black text-sm">₱{q.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-black uppercase h-5 ${STATUS_STYLES[q.status]}`}>
                      {q.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(q.status === "SENT" || q.status === "ACCEPTED") && (
                        <Button
                          size="sm"
                          onClick={() => handleConvert(q.id)}
                          disabled={converting === q.id}
                          className="h-7 text-[10px] bg-emerald-500 hover:bg-emerald-600 font-black rounded-lg px-3"
                        >
                          {converting === q.id ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : (
                            <><ArrowRight className="h-3 w-3 mr-1" />Convert</>
                          )}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold">View</Button>
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
