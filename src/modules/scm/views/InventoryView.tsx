"use client";

import React from "react";
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

const InventoryView: React.FC = () => {
  const { inventory, warehouses } = useInventory();
  const { products } = useProducts();

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
          <Button variant="outline">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Stock Transfer
          </Button>
          <Button>Physical Count</Button>
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
              {inventory.map((item, idx) => {
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
