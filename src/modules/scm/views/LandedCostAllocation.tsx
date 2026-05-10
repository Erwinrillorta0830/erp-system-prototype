"use client";

import React, { useState } from "react";
import { useShipments, usePurchaseOrders, useProducts } from "../hooks/use-scm";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Calculator, 
  Settings2, 
  DollarSign, 
  Truck, 
  FileCheck,
  Percent,
  ChevronRight,
  Save,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const LandedCostAllocation: React.FC = () => {
  const { shipments } = useShipments();
  const { purchaseOrders } = usePurchaseOrders();
  const { products } = useProducts();

  const [selectedShipmentId, setSelectedShipmentId] = useState(shipments[0]?.id || "");
  const [allocationMethod, setAllocationMethod] = useState("VALUE"); // VALUE, WEIGHT, VOLUME

  // Mock costs for the selected shipment
  const [freightCost, setFreightCost] = useState(25000); // PHP
  const [customsDuty, setCustomsDuty] = useState(12500); // PHP
  const [brokerageFee, setBrokerageFee] = useState(5000); // PHP
  
  const totalBurden = freightCost + customsDuty + brokerageFee;

  const currentShipment = shipments.find(s => s.id === selectedShipmentId);
  const relatedPOs = purchaseOrders.filter((po) => currentShipment?.poIds.includes(po.id));
  
  // Aggregate all items from related POs
  const shipmentItems = relatedPOs.flatMap((po) => 
    po.lines.map((line) => ({
      ...line,
      poNumber: po.poNumber,
      productName: products.find(p => p.id === line.productId)?.description || "Unknown Part",
      sku: products.find(p => p.id === line.productId)?.sku || "Unknown SKU",
      weight: products.find(p => p.id === line.productId)?.weight || 1
    }))
  );

  const totalValue = shipmentItems.reduce((acc, item) => acc + (item.unitCost * item.qtyOrdered * (relatedPOs.find(p => p.poNumber === item.poNumber)?.exchangeRate || 1)), 0);
  const totalWeight = shipmentItems.reduce((acc, item) => acc + (item.weight * item.qtyOrdered), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Landed Cost Allocation</h1>
          <p className="text-muted-foreground mt-1 font-medium">Distribute import costs across shipment line items to calculate true unit cost.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 border-primary/20 hover:bg-primary/5 font-bold">
            Download Tally
          </Button>
          <Button className="h-11 bg-primary hover:bg-primary/90 px-8 shadow-lg shadow-primary/20 font-bold">
            <Save className="mr-2 h-4 w-4" /> Posted to Inventory
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cost Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" /> Configuration
              </CardTitle>
              <CardDescription className="font-medium text-xs">Select shipment and define actual costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shipment Target</label>
                <Select value={selectedShipmentId} onValueChange={(val) => setSelectedShipmentId(val ?? "")}>
                  <SelectTrigger className="bg-background/50 h-11 transition-all focus:ring-1 focus:ring-primary border-border/50">
                    <SelectValue placeholder="Select Shipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {shipments.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.shipmentNumber} ({s.vesselName})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Allocation Logic</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={allocationMethod === "VALUE" ? "default" : "outline"} 
                    className="h-10 text-[10px] font-black uppercase tracking-wider"
                    onClick={() => setAllocationMethod("VALUE")}
                  >By Value</Button>
                  <Button 
                    variant={allocationMethod === "WEIGHT" ? "default" : "outline"}
                    className="h-10 text-[10px] font-black uppercase tracking-wider"
                    onClick={() => setAllocationMethod("WEIGHT")}
                  >By Weight</Button>
                  <Button 
                    variant={allocationMethod === "VOLUME" ? "default" : "outline"}
                    className="h-10 text-[10px] font-black uppercase tracking-wider"
                    onClick={() => setAllocationMethod("VOLUME")}
                  >By Vol</Button>
                </div>
              </div>

              <Separator className="bg-border/30" />

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                    <span>Freight Cost</span>
                    <span className="text-primary font-bold">PHP</span>
                  </label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      value={freightCost} 
                      onChange={(e) => setFreightCost(Number(e.target.value))}
                      className="pl-10 h-11 bg-background/50 border-border/50 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                    <span>Customs & Duties</span>
                    <span className="text-primary font-bold">PHP</span>
                  </label>
                  <div className="relative">
                    <FileCheck className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      value={customsDuty} 
                      onChange={(e) => setCustomsDuty(Number(e.target.value))}
                      className="pl-10 h-11 bg-background/50 border-border/50 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                    <span>Brokerage Fees</span>
                    <span className="text-primary font-bold">PHP</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      value={brokerageFee} 
                      onChange={(e) => setBrokerageFee(Number(e.target.value))}
                      className="pl-10 h-11 bg-background/50 border-border/50 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Calculator className="h-12 w-12 text-primary" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary/70">Total Burden</div>
                <div className="text-2xl font-black text-primary">₱{totalBurden.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Allocation Tally */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-black">Shipment Tally & Distribution</CardTitle>
                <CardDescription className="font-medium text-xs">Calculated burden per line item based on "{allocationMethod}" method.</CardDescription>
              </div>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-black uppercase text-[10px] tracking-widest py-1">
                {currentShipment?.shipmentNumber}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-border/40 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-border/30">
                      <TableHead className="font-black text-[10px] uppercase tracking-widest py-4">Item (SKU / PO#)</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Orig. Unit Cost</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Burden Allocation</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Final Landed Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipmentItems.map((item, idx) => {
                      const exchangeRate = relatedPOs.find(p => p.poNumber === item.poNumber)?.exchangeRate || 1;
                      const origCostPhp = item.unitCost * exchangeRate;
                      
                      let burdenPerUnit = 0;
                      if (allocationMethod === "VALUE") {
                        const itemTotalValue = origCostPhp * item.qtyOrdered;
                        const shareRatio = itemTotalValue / totalValue;
                        burdenPerUnit = (totalBurden * shareRatio) / item.qtyOrdered;
                      } else if (allocationMethod === "WEIGHT") {
                        const itemTotalWeight = item.weight * item.qtyOrdered;
                        const shareRatio = itemTotalWeight / totalWeight;
                        burdenPerUnit = (totalBurden * shareRatio) / item.qtyOrdered;
                      }

                      const finalLandedCost = origCostPhp + burdenPerUnit;
                      const liftPercent = (burdenPerUnit / origCostPhp) * 100;

                      return (
                        <TableRow key={idx} className="hover:bg-primary/5 border-border/20 group transition-colors">
                          <TableCell className="max-w-[200px]">
                            <div className="font-black text-xs leading-tight">{item.productName}</div>
                            <div className="text-[10px] flex items-center gap-2 mt-1 font-bold text-muted-foreground">
                              <span className="bg-muted px-1 rounded">{item.sku}</span>
                              <span className="text-primary/70">{item.poNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="text-xs font-black">₱{origCostPhp.toLocaleString()}</div>
                            <div className="text-[9px] text-muted-foreground font-bold">Qty: {item.qtyOrdered}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="text-xs font-black text-amber-600">+₱{burdenPerUnit.toFixed(2)}</div>
                            <div className="text-[9px] flex items-center justify-end gap-1 text-amber-500 font-bold">
                              <Percent className="h-2 w-2" /> {liftPercent.toFixed(1)}% Lift
                            </div>
                          </TableCell>
                          <TableCell className="text-right bg-primary/5 group-hover:bg-primary/10 transition-colors">
                            <div className="text-sm font-black text-primary tracking-tight">₱{finalLandedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <Badge variant="outline" className="text-[8px] h-4 font-black uppercase py-0 border-primary/20 bg-card">Ready</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-zinc-900 text-white dark:bg-white dark:text-black shadow-2xl overflow-hidden relative group">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center border border-white/20">
                      <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest opacity-70">Total Shipment Valuation</h4>
                      <p className="text-xs font-medium opacity-50">Combined FOB Cost + Allocated Burden</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black">₱{(totalValue + totalBurden).toLocaleString()}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">All costs verified</div>
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

export default LandedCostAllocation;
