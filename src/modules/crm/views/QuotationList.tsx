"use client";

import React, { useState } from "react";
import { useQuotations, useCustomers } from "../hooks/use-crm";
import { Quotation } from "../types";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const QuotationList: React.FC = () => {
  const { quotations } = useQuotations();
  const { customers } = useCustomers();
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);

  // Form State
  const [newQuote, setNewQuote] = useState<{
    customerId: string;
    validUntil: string;
    assignedSalesRep: string;
    notes: string;
  }>({
    customerId: "",
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    assignedSalesRep: "Current User",
    notes: "",
  });

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.businessName || "Unknown Customer";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT": return "bg-zinc-500/10 text-zinc-600 border-zinc-200";
      case "SENT": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "VIEWED": return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "ACCEPTED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "REJECTED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "EXPIRED": return "bg-orange-500/10 text-orange-600 border-orange-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations & Estimates</h1>
          <p className="text-muted-foreground">Manage and track sent proposals for wholesale accounts.</p>
        </div>
        <Dialog open={isNewQuoteOpen} onOpenChange={setIsNewQuoteOpen}>
          <DialogTrigger render={
            <Button className="bg-primary px-6 shadow-lg shadow-primary/20 font-black rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> New Quotation
            </Button>
          } />
          <DialogContent className="sm:max-w-[550px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <FileText className="h-5 w-5" />
                </div>
                Create Estimate
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Draft a new price proposal for specialized motor part bulk orders.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target Account</label>
                  <Select 
                    value={newQuote.customerId}
                    onValueChange={(val) => setNewQuote(prev => ({ ...prev, customerId: val ?? "" }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                      <SelectValue placeholder="Select Customer" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                      {customers.map(c => (
                        <SelectItem key={c.id} value={c.id} className="font-bold text-xs">{c.businessName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                    <Input 
                      type="date"
                      value={newQuote.validUntil}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, validUntil: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Account Manager</label>
                    <Input 
                      disabled
                      value={newQuote.assignedSalesRep}
                      className="h-12 rounded-xl bg-muted/50 border-primary/10 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Special Instructions / Notes</label>
                  <Input 
                    placeholder="e.g. Thailand Import Lead time adjustment..."
                    value={newQuote.notes}
                    onChange={(e) => setNewQuote(prev => ({ ...prev, notes: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 border-dashed">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Estimate Line Items</p>
                  <Button variant="link" className="h-auto p-0 text-[9px] font-black underline uppercase text-primary">Browse Parts</Button>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground text-center py-4">
                  0 Items added to estimate. Add parts from catalog to calculate totals.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsNewQuoteOpen(false)}>Cancel</Button>
              <Button 
                className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                onClick={() => setIsNewQuoteOpen(false)}
              >
                Issue Estimate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/5 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Quotes (MTD)</p>
           <p className="text-2xl font-black">{quotations.length}</p>
        </Card>
        <Card className="border-blue-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Awaiting Response</p>
           <p className="text-2xl font-black text-blue-600">1</p>
        </Card>
        <Card className="border-emerald-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Acceptance Rate</p>
           <p className="text-2xl font-black text-emerald-600">85%</p>
        </Card>
        <Card className="border-primary/5 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Quoted Value</p>
           <p className="text-2xl font-black text-primary">₱125k</p>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-72">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search Quote # or Customer..." className="pl-8 bg-background/50 h-10 rounded-xl" />
            </div>
            <Button variant="outline" className="h-10 font-bold border-primary/20 rounded-xl">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>Quote Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quote: Quotation) => (
                <TableRow key={quote.id} className="hover:bg-primary/5 border-primary/5 group cursor-pointer">
                  <TableCell className="font-black text-primary group-hover:underline">{quote.quoteNo}</TableCell>
                  <TableCell className="font-bold text-xs">{getCustomerName(quote.customerId)}</TableCell>
                  <TableCell className="text-[10px] font-bold text-muted-foreground">{quote.dateCreated}</TableCell>
                  <TableCell className="text-[10px] font-bold text-rose-500">{quote.validUntil}</TableCell>
                  <TableCell className="text-right font-black tracking-tight text-xs">₱{quote.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(quote.status)} text-[10px] font-black uppercase h-5`}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Eye className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Mail className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><ExternalLink className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
         <Card className="border-primary/5 bg-primary/5 rounded-[2rem] p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
               <Clock className="h-8 w-8" />
            </div>
            <div>
               <h4 className="font-black text-lg leading-tight">Quotes Expiring Soon</h4>
               <p className="text-xs font-medium text-muted-foreground mt-1">There are 3 quotes from the provincial cluster expiring in the next 48 hours.</p>
               <Button variant="link" className="p-0 h-auto text-primary font-bold text-[10px] uppercase mt-2">Remind All Reps <ArrowRight className="ml-1 h-3 w-3" /></Button>
            </div>
         </Card>

         <Card className="border-emerald-500/10 bg-emerald-500/5 rounded-[2rem] p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
               <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
               <h4 className="font-black text-lg leading-tight">Accepted Estimates</h4>
               <p className="text-xs font-medium text-muted-foreground mt-1">₱450k worth of quotes were accepted this week. Ready to be converted to Sales Orders.</p>
               <Button variant="link" className="p-0 h-auto text-emerald-600 font-bold text-[10px] uppercase mt-2">Open Orders Hub <ArrowRight className="ml-1 h-3 w-3" /></Button>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default QuotationList;
