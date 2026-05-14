"use client";

import React from "react";
import { usePurchaseOrders, useInventory } from "../hooks/use-scm";
import { PurchaseOrder } from "../types";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowDownToLine,
  Truck,
  Plus,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ReceivingView: React.FC = () => {
  const { purchaseOrders, updatePOStatus } = usePurchaseOrders();
  const { updateInventory } = useInventory();

  // For simulation, we'll consider CONFIRMED or PARTIAL POs as ready for receiving
  const receivablePOs = purchaseOrders.filter((po) => 
    po.status === "CONFIRMED" || po.status === "PARTIAL"
  );

  const handleQuickReceive = (poId: string) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;

    // Simulate receiving all lines
    po.lines.forEach(line => {
      updateInventory(line.productId, "wh-main", line.qtyOrdered);
    });

    updatePOStatus(poId, "COMPLETED");
    alert(`Successfully received all items from PO ${po.poNumber} into Manila Main Hub.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receiving Management</h1>
          <p className="text-muted-foreground">Process incoming shipments and verify goods against Purchase Orders.</p>
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> New Receiving Record
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Truck className="h-5 w-5" />
              <CardTitle>Expected Deliveries</CardTitle>
            </div>
            <CardDescription>Orders confirmed by Thai suppliers and currently in transit or at port.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {receivablePOs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                <CheckCircle2 className="h-10 w-10 mb-2 opacity-20" />
                <p>No pending receipts found.</p>
              </div>
            ) : (
              receivablePOs.map((po: PurchaseOrder) => (
                <div key={po.id} className="p-4 rounded-xl border border-border bg-background/50 hover:border-primary/30 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-black text-primary group-hover:underline">{po.poNumber}</div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">ETA: {po.expectedDate}</div>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold text-[10px]">
                      {po.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {po.lines.map((line, idx) => (
                      <div key={idx} className="flex justify-between text-xs items-center p-2 bg-muted/30 rounded-lg">
                        <span className="font-medium">Item Code #{line.productId.slice(-3)}</span>
                        <span className="font-bold">{line.qtyOrdered} units</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 h-9 text-xs font-bold bg-primary hover:bg-primary/90"
                      onClick={() => handleQuickReceive(po.id)}
                    >
                      <ArrowDownToLine className="mr-2 h-3.5 w-3.5" /> Quick Receive All
                    </Button>
                    <Button variant="outline" className="h-9 text-xs font-bold border-primary/20 hover:bg-primary/5">
                      Manual Tally <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-5 w-5" />
              <CardTitle>QC & Discrepancies</CardTitle>
            </div>
            <CardDescription>Items flagged for damage or incorrect quantities during receiving.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="font-medium text-foreground">All clear!</p>
            <p className="text-sm">No active discrepancies reported in the last 7 days.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceivingView;
