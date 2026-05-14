"use client";

import React, { useState } from "react";
import { usePurchaseOrders, useSuppliers } from "../hooks/use-scm";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { POStatus } from "../types";

const POManagement: React.FC = () => {
  const { purchaseOrders } = usePurchaseOrders();
  const { suppliers } = useSuppliers();
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);

  // Form State
  const [newPO, setNewPO] = useState<{
    supplierId: string;
    orderDate: string;
    expectedDate: string;
    currency: string;
    paymentTerms: string;
  }>({
    supplierId: "",
    orderDate: new Date().toISOString().split("T")[0],
    expectedDate: "",
    currency: "PHP",
    paymentTerms: "COD"
  });

  const getSupplierName = (id: string) => suppliers.find(s => s.id === id)?.name || id;

  const getStatusColor = (status: POStatus) => {
    switch (status) {
      case "DRAFT": return "bg-zinc-500/10 text-zinc-600 border-zinc-200";
      case "SENT": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "CONFIRMED": return "bg-cyan-500/10 text-cyan-600 border-cyan-200";
      case "PARTIAL": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "COMPLETED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "CANCELLED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage procurement requests and tracked orders from Thailand.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Import Pro-forma
          </Button>
          <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
            <DialogTrigger render={
              <Button className="bg-primary">
                <Plus className="mr-2 h-4 w-4" /> Create PO
              </Button>
            } />
            <DialogContent className="sm:max-w-[600px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  New Purchase Request
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Draft a new stock procurement request from international or local suppliers.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Preferred Supplier</label>
                    <Select 
                      value={newPO.supplierId}
                      onValueChange={(val) => setNewPO(prev => ({ ...prev, supplierId: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                        <SelectValue placeholder="Select Vendor" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                        {suppliers.map(s => (
                          <SelectItem key={s.id} value={s.id} className="font-bold text-xs">{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Terms</label>
                    <Select 
                      value={newPO.paymentTerms}
                      onValueChange={(val) => setNewPO(prev => ({ ...prev, paymentTerms: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                        <SelectValue placeholder="Terms" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                        {["COD", "NET 15", "NET 30", "Letter of Credit"].map(t => (
                          <SelectItem key={t} value={t} className="font-bold text-xs">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Order Date</label>
                    <Input 
                      type="date"
                      value={newPO.orderDate}
                      onChange={(e) => setNewPO(prev => ({ ...prev, orderDate: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">ETA in PH Hub</label>
                    <Input 
                      type="date"
                      value={newPO.expectedDate}
                      onChange={(e) => setNewPO(prev => ({ ...prev, expectedDate: e.target.value }))}
                      className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 border-dashed">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Procurement Items</p>
                    <Button variant="link" className="h-auto p-0 text-[9px] font-black underline uppercase text-primary">Add SKU</Button>
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground text-center py-6">
                    Start adding parts to this PO. Costs will automatically reflect last import values.
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsCreatePOOpen(false)}>Save Draft</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                  onClick={() => setIsCreatePOOpen(false)}
                >
                  Submit Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-primary/10">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Active POs</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold">{purchaseOrders.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-primary/10">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-primary/10">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirmed with Supplier</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-primary/10">
          <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">In Transit (Import)</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground">Detailed list of all purchase transactions.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search PO#, Supplier..."
                  className="pl-8 bg-background/50 h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id} className="hover:bg-primary/5 border-primary/5 cursor-pointer">
                  <TableCell className="font-bold text-primary">{po.poNumber}</TableCell>
                  <TableCell className="font-medium text-foreground">{getSupplierName(po.supplierId)}</TableCell>
                  <TableCell className="text-muted-foreground">{po.orderDate}</TableCell>
                  <TableCell className="text-muted-foreground">{po.expectedDate}</TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {po.currency} {po.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(po.status)} font-medium`}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default POManagement;
