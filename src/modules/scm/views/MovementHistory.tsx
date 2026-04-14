"use client";

import React from "react";
import { useInventory, useProducts } from "../hooks/use-scm";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  RefreshCcw,
  User,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MovementHistory: React.FC = () => {
  const { products } = useProducts();
  const { inventory, warehouses } = useInventory();

  // Mock movement data
  const mockHistory = [
    { id: "hist-001", date: "2026-04-14 10:30 AM", type: "IN", productId: "prod-001", warehouseId: "wh-main", qty: 100, reference: "PO-2026-001", user: "juan.admin", balance: 154 },
    { id: "hist-002", date: "2026-04-13 02:15 PM", type: "OUT", productId: "prod-002", warehouseId: "wh-main", qty: -10, reference: "SO-99221", user: "maria.wh", balance: 45 },
    { id: "hist-003", date: "2026-04-12 11:00 AM", type: "TRF", productId: "prod-001", warehouseId: "wh-cebu", qty: 20, reference: "TRF-2026-001", user: "juan.admin", balance: 20 },
    { id: "hist-004", date: "2026-04-11 04:45 PM", type: "ADJ", productId: "prod-003", warehouseId: "wh-main", qty: -2, reference: "ADJ-2026-001", user: "inventory.ctrl", balance: 98 },
  ];

  const getProductName = (id: string) => products.find(p => p.id === id)?.description || id;
  const getProductSku = (id: string) => products.find(p => p.id === id)?.sku || id;
  const getWHName = (id: string) => warehouses.find(w => w.id === id)?.name || id;

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "IN": return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] font-black"><ArrowUpCircle className="mr-1 h-3 w-3" /> STOCK IN</Badge>;
      case "OUT": return <Badge variant="destructive" className="text-[10px] font-black"><ArrowDownCircle className="mr-1 h-3 w-3" /> STOCK OUT</Badge>;
      case "TRF": return <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] font-black"><RefreshCcw className="mr-1 h-3 w-3" /> TRANSFER</Badge>;
      case "ADJ": return <Badge variant="outline" className="text-[10px] font-black border-amber-500 text-amber-600 bg-amber-50"><AlertTriangle className="mr-1 h-3 w-3" /> ADJUST</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <History className="h-8 w-8 text-primary" /> Stock Audit Ledger
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Traceable history of every motor part movement across the entire supply chain.</p>
        </div>
        <Button variant="outline" className="border-primary/20 font-bold h-11 px-6">
          <ExternalLink className="mr-2 h-4 w-4" /> Export Ledger (CSV)
        </Button>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="flex gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter by SKU, PO#, or User..." className="pl-8 bg-background/50 border-border/50 h-10" />
            </div>
            <Button variant="secondary" className="font-bold h-10">
              <Filter className="mr-2 h-4 w-4" /> Advanced Filters
            </Button>
          </div>
          <div className="text-xs font-bold text-muted-foreground flex gap-4">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Adds</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Deductions</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-border/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/30">
                  <TableHead className="font-black text-[10px] uppercase tracking-widest py-4">Timestamp</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Type</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Product / SKU</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Warehouse</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Qty</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Balance After</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Reference</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistory.map((hist) => (
                  <TableRow key={hist.id} className="hover:bg-primary/5 border-border/20 transition-colors">
                    <TableCell className="text-[11px] font-bold text-muted-foreground tabular-nums">
                      {hist.date}
                    </TableCell>
                    <TableCell>{getMovementBadge(hist.type)}</TableCell>
                    <TableCell>
                      <div className="font-black text-xs">{getProductName(hist.productId)}</div>
                      <div className="text-[10px] font-bold text-primary/70">{getProductSku(hist.productId)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-bold border-border/50 bg-background/50">
                        {getWHName(hist.warehouseId)}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-black ${hist.qty > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {hist.qty > 0 ? `+${hist.qty}` : hist.qty}
                    </TableCell>
                    <TableCell className="text-right font-black tabular-nums text-xs">
                      {hist.balance}
                    </TableCell>
                    <TableCell>
                      <span className="text-[11px] font-black text-primary/80 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                        {hist.reference}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                        <User className="h-3 w-3" /> {hist.user}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="p-8 rounded-[2rem] bg-zinc-900 text-white dark:bg-white dark:text-black shadow-2xl overflow-hidden relative group border border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">Data Integrity Guarantee</h3>
            <p className="text-sm font-medium opacity-60 max-w-lg">
              Every inventory delta is hashed and recorded with a user timestamp. Our SCM ledger provides a 100% auditable trail for Philippine customs and internal audits.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-4xl font-black tabular-nums tracking-tighter">1,280</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Movements tracked this month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementHistory;
