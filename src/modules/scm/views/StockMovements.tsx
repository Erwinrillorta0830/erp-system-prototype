"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRightLeft, 
  Settings2, 
  Plus, 
  Search, 
  Warehouse, 
  ArrowRight,
  History,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StockMovements: React.FC = () => {

  const mockTransfers = [
    { id: "trf-001", number: "TRF-2026-001", from: "Main Hub", to: "Cebu Branch", date: "2026-04-12", status: "IN_TRANSIT", items: 15 },
    { id: "trf-002", number: "TRF-2026-002", from: "Cebu Branch", to: "Main Hub", date: "2026-04-10", status: "RECEIVED", items: 4 },
  ];

  const mockAdjustments = [
    { id: "adj-001", number: "ADJ-2026-001", warehouse: "Main Hub", type: "LOSS", reason: "Damaged in Warehouse", date: "2026-04-13", qty: -2, status: "POSTED" },
    { id: "adj-002", number: "ADJ-2026-002", warehouse: "Main Hub", type: "GAIN", reason: "Found during Cycle Count", date: "2026-04-14", qty: 5, status: "DRAFT" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Internal Stock Movements</h1>
          <p className="text-muted-foreground">Manage transfers between locations and manual inventory adjustments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/20">
            <History className="mr-2 h-4 w-4" /> Movement History
          </Button>
          <Button className="bg-primary">
            <Plus className="mr-2 h-4 w-4" /> Create New Movement
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transfers" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl border border-border/50">
          <TabsTrigger value="transfers" className="rounded-lg font-bold px-6">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Stock Transfers
          </TabsTrigger>
          <TabsTrigger value="adjustments" className="rounded-lg font-bold px-6">
            <Settings2 className="mr-2 h-4 w-4" /> Stock Adjustments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transfers" className="mt-6 space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transfer Ledger</CardTitle>
                <CardDescription>Track state of goods moving between warehouses.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search TRF#..." className="pl-8 bg-background/50" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-primary/10">
                    <TableHead>Transfer #</TableHead>
                    <TableHead>Route (From → To)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransfers.map((trf) => (
                    <TableRow key={trf.id} className="hover:bg-primary/5 border-primary/5 cursor-pointer group">
                      <TableCell className="font-black text-primary uppercase">{trf.number}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <span className="bg-muted px-2 py-1 rounded">{trf.from}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="bg-primary/5 text-primary px-2 py-1 rounded">{trf.to}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground">{trf.date}</TableCell>
                      <TableCell className="text-right font-black">{trf.items}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${trf.status === 'IN_TRANSIT' ? 'border-amber-500 text-amber-600 bg-amber-50' : 'border-emerald-500 text-emerald-600 bg-emerald-50'} text-[10px] font-black uppercase`}>
                          {trf.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowRight className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments" className="mt-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Adjustment Ledger</CardTitle>
                <CardDescription>Records of manual stock corrections and write-offs.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search ADJ#..." className="pl-8 bg-background/50" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-primary/10">
                    <TableHead>Adj #</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Type / Reason</TableHead>
                    <TableHead className="text-right">Net Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdjustments.map((adj) => (
                    <TableRow key={adj.id} className="hover:bg-primary/5 border-primary/5 cursor-pointer">
                      <TableCell className="font-black text-primary uppercase">{adj.number}</TableCell>
                      <TableCell className="font-bold text-xs">{adj.warehouse}</TableCell>
                      <TableCell title={adj.reason}>
                        <div className="flex flex-col">
                          <Badge variant="outline" className={`w-fit text-[9px] font-black mb-1 ${adj.type === 'LOSS' ? 'border-rose-500 text-rose-600' : 'border-emerald-500 text-emerald-600'}`}>
                            {adj.type}
                          </Badge>
                          <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[150px]">{adj.reason}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`text-right font-black ${adj.qty < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {adj.qty > 0 ? `+${adj.qty}` : adj.qty}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${adj.status === 'POSTED' ? 'border-zinc-500 bg-zinc-50' : 'border-blue-500 text-blue-600'} text-[10px] font-black uppercase`}>
                          {adj.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><CheckCircle2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-4">
          <div className="flex items-center gap-3 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
            <h4 className="font-black text-lg">System Flag: Transit Delay</h4>
          </div>
          <p className="text-sm text-amber-700/80 font-medium">
            Shipment <strong>TRF-2026-001</strong> to Cebu Branch is currently overdue by 48 hours. Please check with logistics provider.
          </p>
          <Button variant="outline" className="border-amber-500/20 text-amber-700 hover:bg-amber-500/10 font-bold h-9 bg-white/50">
            Track Location
          </Button>
        </div>

        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Warehouse className="h-6 w-6" />
            <h4 className="font-black text-lg">Quick Tip: Zone Mapping</h4>
          </div>
          <p className="text-sm text-primary/80 font-medium">
            Remember to specify the Target Zone and Bin during adjustments to ensure pick-list accuracy.
          </p>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 font-bold h-9 bg-white/50">
            View Bin Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StockMovements;
