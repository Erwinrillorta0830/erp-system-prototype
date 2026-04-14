"use client";

import React from "react";
import { useShipments, usePurchaseOrders } from "../hooks/use-scm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Ship, 
  Anchor, 
  MapPin, 
  Calendar, 
  Info,
  ChevronRight,
  Package,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ShipmentTrackingView: React.FC = () => {
  const { shipments } = useShipments();
  const { purchaseOrders } = usePurchaseOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "BOOKED": return <Clock className="h-5 w-5 text-zinc-500" />;
      case "SAILED": return <Ship className="h-5 w-5 text-blue-500" />;
      case "ARRIVED_PORT": return <Anchor className="h-5 w-5 text-amber-500" />;
      case "IN_CUSTOMS": return <Info className="h-5 w-5 text-purple-500" />;
      case "DELIVERED": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default: return <Truck className="h-5 w-5 text-zinc-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SAILED": return "border-blue-500/50 bg-blue-500/10 text-blue-600";
      case "ARRIVED_PORT": return "border-amber-500/50 bg-amber-500/10 text-amber-700";
      case "IN_CUSTOMS": return "border-purple-500/50 bg-purple-500/10 text-purple-700";
      case "DELIVERED": return "border-emerald-500/50 bg-emerald-500/10 text-emerald-700";
      default: return "border-zinc-500/50 bg-zinc-500/10 text-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Import Shipment Tracker</h1>
          <p className="text-muted-foreground">Monitor motor parts in transit from Thailand ports to Manila/Subic.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
            Port Operations Log
          </Button>
          <Button className="bg-primary/95 hover:bg-primary shadow-lg shadow-primary/20">
            Record New Booking
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="border-primary/10 overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${getStatusColor(shipment.status)}`}>
                    {getStatusIcon(shipment.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-bold">{shipment.shipmentNumber}</CardTitle>
                      <Badge variant="outline" className={`${getStatusColor(shipment.status)} uppercase font-bold text-[10px]`}>
                        {shipment.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-1 font-medium">
                      <Ship className="h-3 w-3" /> {shipment.vesselName} • {shipment.carrier}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Est. Arrival</div>
                  <div className="text-lg font-black text-primary">{shipment.eta}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Voyage Progress */}
                <div className="col-span-2 space-y-6">
                  <div className="relative">
                    <div className="absolute top-5 left-5 right-5 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary flex items-center justify-end" style={{ width: '40%' }}>
                        <div className="w-2 h-2 bg-white rounded-full mr-1 ring-4 ring-primary/30 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between relative mt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10 border-4 border-card">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold mt-2 text-center max-w-[80px]">{shipment.portOfLoading}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">{shipment.etd}</span>
                      </div>
                      <div className="flex flex-col items-center opacity-50">
                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold z-10 border-4 border-card">
                          <Anchor className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-bold mt-2 text-center max-w-[80px]">{shipment.portOfDischarge}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">{shipment.eta}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 border border-border/50">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Package className="h-3 w-3" /> Container Number
                      </div>
                      <div className="text-sm font-mono font-bold tracking-wider">{shipment.containerNumber}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 border border-border/50">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-1">
                        <AlertCircle className="h-3 w-3" /> Related POs
                      </div>
                      <div className="text-sm font-bold">{shipment.poIds.join(", ")}</div>
                    </div>
                  </div>
                </div>

                {/* Tracking Milestones */}
                <div className="border-l border-border pl-8 space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Transit Milestones
                  </h4>
                  <div className="space-y-6">
                    <div className="flex gap-4 relative">
                      <div className="absolute top-5 bottom-0 left-2.5 w-px bg-primary/20"></div>
                      <div className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center z-10 ring-4 ring-primary/10">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Vessel Departure</div>
                        <p className="text-[10px] text-muted-foreground">Laem Chabang Terminal B5 • Mar 06</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50 flex-shrink-0 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <div className="text-xs font-bold">In-Transit (South China Sea)</div>
                        <p className="text-[10px] text-muted-foreground">Last Ping: Lat 12.55 N, Lon 113.84 E • Today</p>
                      </div>
                    </div>
                    <div className="flex gap-4 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-muted flex-shrink-0 font-bold text-xs flex items-center justify-center z-10">3</div>
                      <div>
                        <div className="text-xs font-bold">Expected Manila Arrival</div>
                        <p className="text-[10px] text-muted-foreground">Est. Mar 20, 2026</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-[10px] h-8 uppercase tracking-widest font-bold">
                    View Marine Traffic Live <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTrackingView;
