"use client";

import React, { useState } from "react";
import { useSales } from "@/modules/sales/context/sales-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Eye, AlertCircle, Receipt, Printer } from "lucide-react";
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
import { SalesInvoice } from "@/modules/sales/types";
import DocumentDetailModal, { printDocument } from "@/modules/sales/components/DocumentDetailModal";

const STATUS_STYLE: Record<SalesInvoice["status"], string> = {
  DRAFT:          "bg-zinc-100   text-zinc-600   border-zinc-200",
  ISSUED:         "bg-blue-50    text-blue-600   border-blue-200",
  PARTIALLY_PAID: "bg-amber-50   text-amber-600  border-amber-200",
  PAID:           "bg-emerald-50 text-emerald-600 border-emerald-200",
  VOIDED:         "bg-rose-50    text-rose-600   border-rose-200"
};

export default function InvoiceList() {
  const { invoices, customers } = useSales();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<SalesInvoice | null>(null);

  // Form State
  const [newInvoice, setNewInvoice] = useState<{
    customerId: string;
    salesOrderRef: string;
    issueDate: string;
    dueDate: string;
    channel: string;
  }>({
    customerId: "",
    salesOrderRef: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    channel: "WHOLESALE"
  });

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
        <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
          <DialogTrigger render={
            <Button className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-black rounded-xl px-6">
              <FileText className="mr-2 h-4 w-4" /> New Invoice
            </Button>
          } />
          <DialogContent className="sm:max-w-[550px] border-emerald-500/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight text-emerald-600 flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Receipt className="h-5 w-5" />
                </div>
                Generate Invoice
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Issue a new billing statement for confirmed sales or walk-in transactions.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Billed To</label>
                  <Select 
                    value={newInvoice.customerId} 
                    onValueChange={(val) => setNewInvoice(prev => ({ ...prev, customerId: val ?? "" }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus:ring-emerald-500/20">
                      <SelectValue placeholder="Select Customer (or Walk-in)" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-emerald-500/10 bg-card/95 backdrop-blur-xl">
                      <SelectItem value="walkin" className="font-bold text-xs italic text-emerald-600">-- Walk-in Transaction --</SelectItem>
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Reference SO#</label>
                    <Input 
                      placeholder="e.g. SO-2024-001"
                      value={newInvoice.salesOrderRef}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, salesOrderRef: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/20 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Channel</label>
                    <Select 
                      value={newInvoice.channel} 
                      onValueChange={(val) => setNewInvoice(prev => ({ ...prev, channel: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus:ring-emerald-500/20">
                        <SelectValue placeholder="Select Channel" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-emerald-500/10 bg-card/95 backdrop-blur-xl">
                        {["WHOLESALE", "RETAIL", "WALKIN"].map(ch => (
                          <SelectItem key={ch} value={ch} className="font-bold text-xs">{ch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Billing Date</label>
                    <Input 
                      type="date"
                      value={newInvoice.issueDate}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/20 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Due Date</label>
                    <Input 
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-emerald-500/10 focus-visible:ring-emerald-500/20 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 border-dashed">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">Import Items from SO</p>
                  <Button variant="link" className="h-auto p-0 text-[9px] font-black underline uppercase">Clear All</Button>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground text-center py-4 border border-emerald-500/5 rounded-xl bg-white/30">
                  Select a Sales Order to automatically pull line items and taxes.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsNewInvoiceOpen(false)}>Cancel</Button>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl px-8 shadow-lg shadow-emerald-500/20"
                onClick={() => setIsNewInvoiceOpen(false)}
              >
                Finalize & Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            {filtered.map((inv: SalesInvoice) => {
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
                    <Badge variant="outline" className={`text-[9px] font-black uppercase h-5 ${STATUS_STYLE[inv.status as SalesInvoice["status"]]}`}>
                      {inv.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold hover:text-emerald-600" onClick={() => setSelectedInvoice(inv)}>
                        <Eye className="h-3 w-3 mr-1" /> View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold" onClick={() => printDocument('invoice', inv, getCustomer(inv.customerId))}>
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
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        type="invoice"
        doc={selectedInvoice}
        customer={selectedInvoice ? getCustomer(selectedInvoice.customerId) : undefined}
      />
    </div>
  );
}
