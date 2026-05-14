"use client";

import React from "react";
import { 
  useProducts, 
  useInventory, 
  usePurchaseOrders, 
  useShipments
} from "../hooks/use-scm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Package, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  Warehouse,
  ArrowRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SCMDashboard: React.FC = () => {
  const { products } = useProducts();
  const { inventory } = useInventory();
  const { purchaseOrders } = usePurchaseOrders();
  const { shipments } = useShipments();

  const totalStockValue = purchaseOrders.reduce((acc, po) => acc + (po.totalAmount * po.exchangeRate), 0);
  const lowStockCount = inventory.filter((i) => i.qtyOnHand <= i.reorderPoint).length;
  const activeShipments = shipments.filter((s) => s.status !== "DELIVERED").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            SCM Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time supply chain intelligence for motor parts imports.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-full px-6 bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all">
            <Plus className="mr-2 h-4 w-4" /> New Requisition
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium uppercase tracking-wider text-[10px]">SCM Pipeline Value</CardDescription>
            <CardTitle className="text-3xl font-black">₱{(totalStockValue / 1000000).toFixed(2)}M</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-500 flex items-center gap-1 font-bold">
              <TrendingUp className="h-3 w-3" /> +12.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Package className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium uppercase tracking-wider text-[10px]">Total Active SKUs</CardDescription>
            <CardTitle className="text-3xl font-black">{products.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-medium">85% In-Stock Availability</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-orange-500/10 bg-card/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-500">
            <AlertCircle className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium uppercase tracking-wider text-[10px]">Low Stock Alerts</CardDescription>
            <CardTitle className="text-3xl font-black text-orange-500">{lowStockCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-orange-500/80 font-bold underline cursor-pointer">View Reorder List</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-blue-500/10 bg-card/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500">
            <Truck className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium uppercase tracking-wider text-[10px]">Active Shipments</CardDescription>
            <CardTitle className="text-3xl font-black text-blue-500">{activeShipments}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-500 font-bold">Next arrival in 6 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Logistics Status */}
        <Card className="border-primary/5 bg-card/30 backdrop-blur-md flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Import Logistics</CardTitle>
                <CardDescription>Transit status from Thailand ports.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold">
                Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {shipments.map(s => (
              <div key={s.id} className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-black tracking-tight">{s.shipmentNumber}</span>
                  <Badge variant="outline" className="border-blue-500/20 bg-blue-500/5 text-blue-600 font-bold text-[10px]">
                    {s.status}
                  </Badge>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  <span>Laem Chabang</span>
                  <span>{s.eta}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Inventory Distribution */}
        <Card className="border-primary/5 bg-card/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Warehouse Stocks</CardTitle>
            <CardDescription>Inventory value distribution across branches.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Warehouse className="text-primary h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>Manila Main Hub</span>
                  <span>72%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-2">
                  <div className="h-full bg-primary w-[72%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Warehouse className="text-orange-500 h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm">
                  <span>Cebu Distribution</span>
                  <span>28%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-2">
                  <div className="h-full bg-orange-500 w-[28%] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="p-4 rounded-2xl border border-dashed border-primary/20 bg-primary/5 flex items-center justify-between">
                <div className="text-xs font-bold text-primary tracking-tight">System-wide valuation report for Q2 is ready.</div>
                <Button variant="link" size="sm" className="text-primary font-black text-xs uppercase p-0">View Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SCMDashboard;
