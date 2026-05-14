"use client";

import React, { useState } from "react";
import { useInventory, useProducts } from "../hooks/use-scm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  AlertCircle,
  CheckCircle2,
  Table as TableIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PhysicalInventory: React.FC = () => {
  const { products } = useProducts();
  const { inventory, warehouses } = useInventory();
  
  const [selectedWarehouse] = useState("wh-main");

  // Mock physical count sessions
  const mockSessions = [
    { id: "sess-001", date: "2026-04-14", warehouse: "Main Hub", status: "ONGOING", startedBy: "juan.admin", itemsCounted: 45, totalItems: 120 },
    { id: "sess-002", date: "2026-03-31", warehouse: "Cebu Branch", status: "COMPLETED", startedBy: "maria.wh", itemsCounted: 88, totalItems: 88 },
  ];

  const getWHName = (id: string) => warehouses.find(w => w.id === id)?.name || id;

  const currentWHInventory = inventory.filter(i => i.warehouseId === selectedWarehouse);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <ClipboardCheck className="h-8 w-8 text-primary" /> Physical Inventory Count
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Conduct periodic stock-takes and reconcile physical counts with system records.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 border-primary/20 font-bold px-6">
            <Download className="mr-2 h-4 w-4" /> Print Count Sheets
          </Button>
          <Button className="h-11 bg-primary hover:bg-primary/90 px-8 border-none shadow-lg shadow-primary/20 font-black tracking-tight">
            <Plus className="mr-2 h-4 w-4" /> New Count Session
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Active Sessions Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Count Sessions</h3>
          {mockSessions.map((session) => (
            <Card key={session.id} className={`cursor-pointer transition-all border-primary/5 hover:border-primary/30 ${session.status === 'ONGOING' ? 'ring-2 ring-primary/20 bg-primary/5' : 'bg-card/50'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary">{session.date}</div>
                  <Badge variant="outline" className={`text-[8px] font-black uppercase tracking-widest py-0 h-4 border-none ${session.status === 'ONGOING' ? 'bg-primary text-primary-foreground' : 'bg-emerald-500/10 text-emerald-600'}`}>
                    {session.status}
                  </Badge>
                </div>
                <h4 className="font-black text-sm mb-1">{session.warehouse}</h4>
                <div className="text-[10px] font-bold text-muted-foreground mb-3 flex items-center gap-1">
                  Started by: <span className="text-foreground">{session.startedBy}</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(session.itemsCounted / session.totalItems) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] font-black mt-1.5 opacity-60">
                  <span>{session.itemsCounted} items tallied</span>
                  <span>{session.totalItems} total</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Count Workspace */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-primary/10 bg-card/10 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TableIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">Tallied Items Ledger</CardTitle>
                  <CardDescription className="text-xs font-medium">Entering physical counts for {getWHName(selectedWarehouse)}.</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-56">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Find SKU/Bin..." className="pl-8 bg-background/50 h-9 text-xs" />
                </div>
                <Button variant="outline" size="sm" className="h-9 font-bold bg-white/50">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-[1.5rem] border border-border/30 overflow-hidden bg-background/40">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-border/20">
                      <TableHead className="font-black text-[10px] uppercase tracking-widest py-4">Part Details</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Bin</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">System Qty</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-center w-[120px]">Physical Count</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentWHInventory.map((item, idx) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <TableRow key={idx} className="hover:bg-primary/5 border-border/10 transition-colors group">
                          <TableCell>
                            <div className="font-black text-xs group-hover:text-primary transition-colors">{product?.description}</div>
                            <div className="text-[10px] font-bold text-muted-foreground">{product?.sku}</div>
                          </TableCell>
                          <TableCell>
                            <code className="text-[10px] font-black bg-muted px-1.5 py-0.5 rounded border border-border/50 opacity-70">
                              {item.binLocation || "???"}
                            </code>
                          </TableCell>
                          <TableCell className="text-right font-black tabular-nums opacity-60">
                            {item.qtyOnHand}
                          </TableCell>
                          <TableCell className="text-center px-4">
                            <Input 
                              type="number" 
                              placeholder="0" 
                              className="h-8 text-center font-black bg-white/80 dark:bg-black/80 border-primary/20 focus-visible:ring-primary shadow-sm"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="text-[9px] font-black border-dashed border-muted text-muted-foreground">
                              PENDING
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-black text-amber-700 text-sm">Discrepancy Guard</h5>
                    <p className="text-[11px] font-medium text-amber-900/60 leading-snug mt-1">
                      If variance exceeds 15% of system value, an automated audit request will be sent to the Inventory Controller for manual verification.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-black text-primary text-sm">Cycle Count Success</h5>
                    <p className="text-[11px] font-medium text-primary/60 leading-snug mt-1">
                      Blind counting is enabled. System quantities are hidden for staff roles to ensure 100% accuracy in physical tallies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhysicalInventory;
