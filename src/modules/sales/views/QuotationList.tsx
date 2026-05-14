"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, ArrowRight, FileText, CheckCircle2, RefreshCw, ClipboardList, Printer } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesQuote } from "@/modules/sales/types";
import DocumentDetailModal, { printDocument } from "@/modules/sales/components/DocumentDetailModal";

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
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<SalesQuote | null>(null);

  // Form State
  const [newQuote, setNewQuote] = useState<{
    customerId: string;
    validUntil: string;
    assignedSalesRep: string;
  }>(() => ({
    customerId: "",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    assignedSalesRep: "Current User",
  }));

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
        <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
          <DialogTrigger render={
            <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
              <Plus className="mr-2 h-4 w-4" /> New Quotation
            </Button>
          } />
          <DialogContent className="sm:max-w-[550px] border-emerald-500/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight text-emerald-600 flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <ClipboardList className="h-5 w-5" />
                </div>
                New Proposal
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Draft a new price quotation for specialized motor parts from Thailand.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target Customer</label>
                <Select 
                  value={newQuote.customerId} 
                  onValueChange={(val) => setNewQuote(prev => ({ ...prev, customerId: val ?? "" }))}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus:ring-emerald-500/20">
                    <SelectValue placeholder="Select Customer Account" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-emerald-500/10 bg-card/95 backdrop-blur-xl">
                    {customers.map(c => (
                      <SelectItem key={c.id} value={c.id} className="font-bold text-xs">
                        {c.businessName} <span className="text-[9px] text-muted-foreground font-normal ml-2">({c.customerCode})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Valid Until</label>
                  <Input 
                    type="date"
                    value={newQuote.validUntil}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, validUntil: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/20 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Sales Representative</label>
                  <Input 
                    disabled
                    value={newQuote.assignedSalesRep}
                    className="h-12 rounded-xl bg-muted/50 border-emerald-500/10 font-bold"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 border-dashed">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Estimate Items</p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Enter SKU or Part Number..." className="h-10 text-xs rounded-lg border-emerald-500/10 bg-white/50" />
                    <Button size="icon" className="h-10 w-10 bg-emerald-500 rounded-lg shrink-0"><Plus className="h-4 w-4" /></Button>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic ml-1">Price will be pulled from current Thailand Import specs.</p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsNewQuoteOpen(false)}>Discard</Button>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl px-8 shadow-lg shadow-emerald-500/20"
                onClick={() => setIsNewQuoteOpen(false)}
              >
                Send Proposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            {filtered.map((q: SalesQuote) => {
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
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold" onClick={() => setSelectedQuote(q)}>View</Button>
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold" onClick={() => printDocument('quote', q, getCustomer(q.customerId))}>
                        <Printer className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <DocumentDetailModal
        open={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        type="quote"
        doc={selectedQuote}
        customer={selectedQuote ? getCustomer(selectedQuote.customerId) : undefined}
      />
    </div>
  );
}
