"use client";

import React, { useState } from "react";
import { useInventory, useProducts } from "../hooks/use-scm";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Warehouse as WarehouseIcon, 
  ArrowRightLeft, 
  AlertTriangle, 
  Search,
  CheckCircle2,
  Clock
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

const InventoryView: React.FC = () => {
  const { inventory, warehouses } = useInventory();
  const { products } = useProducts();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isCountOpen, setIsCountOpen] = useState(false);

  // Form States
  const [transfer, setTransfer] = useState<{
    productId: string;
    fromWarehouseId: string;
    toWarehouseId: string;
    qty: string;
  }>({
    productId: "",
    fromWarehouseId: "",
    toWarehouseId: "",
    qty: "0"
  });

  const [physicalCount, setPhysicalCount] = useState<{
    warehouseId: string;
    countedDate: string;
  }>({
    warehouseId: "",
    countedDate: new Date().toISOString().split("T")[0]
  });

  const getProductName = (id: string) => products.find(p => p.id === id)?.description || id;
  const getProductSku = (id: string) => products.find(p => p.id === id)?.sku || id;
  const getWarehouseName = (id: string) => warehouses.find(w => w.id === id)?.name || id;

  const lowStockItems = inventory.filter(item => item.qtyOnHand <= item.reorderPoint);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouse & Stock</h1>
          <p className="text-muted-foreground">Monitor real-time inventory balances across all Philippine branches.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
            <DialogTrigger render={
              <Button variant="outline">
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Stock Transfer
              </Button>
            } />
            <DialogContent className="sm:max-w-[550px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <ArrowRightLeft className="h-5 w-5" />
                  </div>
                  Inventory Transfer
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Move stock between Philippine branches or transit hubs.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Select Product</label>
                  <Select 
                    value={transfer.productId}
                    onValueChange={(val) => setTransfer(prev => ({ ...prev, productId: val ?? "" }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                      <SelectValue placeholder="Which item are we moving?" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id} className="font-bold text-xs">{p.description}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Source Warehouse</label>
                    <Select 
                      value={transfer.fromWarehouseId}
                      onValueChange={(val) => setTransfer(prev => ({ ...prev, fromWarehouseId: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                        <SelectValue placeholder="From..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                        {warehouses.map(w => (
                          <SelectItem key={w.id} value={w.id} className="font-bold text-xs">{w.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Destination</label>
                    <Select 
                      value={transfer.toWarehouseId}
                      onValueChange={(val) => setTransfer(prev => ({ ...prev, toWarehouseId: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                        <SelectValue placeholder="To..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                        {warehouses.map(w => (
                          <SelectItem key={w.id} value={w.id} className="font-bold text-xs">{w.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Quantity to Transfer</label>
                  <Input 
                    type="number"
                    value={transfer.qty}
                    onChange={(e) => setTransfer(prev => ({ ...prev, qty: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsTransferOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                  onClick={() => setIsTransferOpen(false)}
                >
                  Confirm Transfer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCountOpen} onOpenChange={setIsCountOpen}>
            <DialogTrigger render={<Button>Physical Count</Button>} />
            <DialogContent className="sm:max-w-[500px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  Physical Inventory Count
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Initialize a store-wide stock verification for a specific branch.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Select Warehouse</label>
                  <Select 
                    value={physicalCount.warehouseId}
                    onValueChange={(val) => setPhysicalCount(prev => ({ ...prev, warehouseId: val ?? "" }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                      <SelectValue placeholder="Pick a location to audit" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                      {warehouses.map(w => (
                        <SelectItem key={w.id} value={w.id} className="font-bold text-xs">{w.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Audit Effective Date</label>
                  <Input 
                    type="date"
                    value={physicalCount.countedDate}
                    onChange={(e) => setPhysicalCount(prev => ({ ...prev, countedDate: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] font-medium text-amber-700 leading-relaxed italic">
                  Note: Initializing a count will capture a snapshot of the current &quot;On Hand&quot; ledger for variance calculation.
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsCountOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                  onClick={() => setIsCountOpen(false)}
                >
                  Initialize Audit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Low on Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Requiring immediate reorder</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock in Transit</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100 Units</div>
            <p className="text-xs text-muted-foreground">From Thailand Shipments</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/20 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warehouse Utilization</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Main Hub bin capacity</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Stock Balances</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by product or bin..."
                className="pl-8 bg-background/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>Product / SKU</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Bin Loc.</TableHead>
                <TableHead className="text-right">On Hand</TableHead>
                <TableHead className="text-right">Reserved</TableHead>
                <TableHead className="text-right">In Transit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const isLow = item.qtyOnHand <= item.reorderPoint;
                return (
                  <TableRow key={`${item.productId}-${item.warehouseId}`} className="hover:bg-primary/5 border-primary/5">
                    <TableCell>
                      <div className="font-medium">{getProductName(item.productId)}</div>
                      <div className="text-xs text-muted-foreground">{getProductSku(item.productId)}</div>
                    </TableCell>
                    <TableCell>{getWarehouseName(item.warehouseId)}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded border border-border/50">
                        {item.binLocation || "N/A"}
                      </code>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.qtyOnHand}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.qtyReserved}
                    </TableCell>
                    <TableCell className="text-right text-blue-500 font-medium">
                      {item.qtyInTransit > 0 ? `+${item.qtyInTransit}` : "-"}
                    </TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-500/5">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-500/5">
                          Healthy
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryView;
