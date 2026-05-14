"use client";

import React from "react";
import { useOpportunities, useCustomers } from "../hooks/use-crm";
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Target, 
  Plus, 
  MoreVertical, 
  Calendar, 
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STAGES = [
  { id: "PROSPECTING", label: "Prospecting" },
  { id: "NEGOTIATION", label: "Negotiation" },
  { id: "QUOTED", label: "Quoted" },
  { id: "WON", label: "Closed Won" },
];

const PipelineBoard: React.FC = () => {
  const { opportunities } = useOpportunities();
  const { customers } = useCustomers();

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.businessName || "Unknown Customer";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Active Funnel</h1>
          <p className="text-muted-foreground mt-1">Manage and move deals across your sales pipeline.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl font-bold border-primary/20">
             Pipeline Analysis
          </Button>
          <Button className="h-12 bg-primary hover:bg-primary/95 shadow-lg shadow-primary/30 font-black rounded-xl px-8">
             <Target className="mr-2 h-5 w-5" /> New Opportunity
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4 h-[calc(100vh-280px)] min-h-[500px]">
        {STAGES.map((stage) => {
          const stageDeals = opportunities.filter(o => o.stage === stage.id || (stage.id === "WON" && o.status === "WON"));
          const stageValue = stageDeals.reduce((acc, d) => acc + d.projectedValue, 0);

          return (
            <div key={stage.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                   <h3 className="font-black text-sm uppercase tracking-widest">{stage.label}</h3>
                   <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-black">{stageDeals.length}</div>
                </div>
                <p className="text-[10px] font-black text-primary/70">₱{(stageValue / 1000).toFixed(0)}k</p>
              </div>

              <div className="flex-1 bg-muted/30 rounded-[2rem] border border-border/50 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="group border-primary/5 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all cursor-pointer rounded-3xl">
                    <CardHeader className="p-5 pb-2 relative">
                       <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><MoreVertical className="h-4 w-4" /></Button>
                       <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">{getCustomerName(deal.customerId)}</p>
                       <CardTitle className="text-sm font-black tracking-tight leading-snug">{deal.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-4 space-y-4">
                       <div className="flex justify-between items-center bg-primary/5 p-3 rounded-2xl">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Value</span>
                          <span className="text-sm font-black text-primary">₱{(deal.projectedValue / 1000).toFixed(0)}k</span>
                       </div>
                       
                       <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                             <Calendar className="h-3 w-3" /> {deal.expectedCloseDate}
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Trophy className="h-3 w-3 text-emerald-500" /> {deal.probability}%
                          </div>
                       </div>

                       <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${deal.probability}%` }}></div>
                       </div>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-border/10 rounded-3xl text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 font-bold transition-all">
                   <Plus className="mr-2 h-4 w-4" /> Add Deal
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineBoard;
