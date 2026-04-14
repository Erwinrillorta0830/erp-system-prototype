"use client";

import React from "react";
import { 
  useCustomers, useLeads, useOpportunities, 
  useActivities, useComplaints, useQuotations 
} from "../hooks/use-crm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText,
  Calendar,
  MessageSquare,
  ArrowRight,
  TrendingDown,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CRMDashboard: React.FC = () => {
  const { customers } = useCustomers();
  const { leads } = useLeads();
  const { opportunities } = useOpportunities();
  const { activities } = useActivities();
  const { complaints } = useComplaints();
  const { quotations } = useQuotations();

  const totalPipelineValue = opportunities.reduce((acc, op) => acc + op.projectedValue, 0);
  const openComplaints = complaints.filter(c => c.status === "OPEN" || c.status === "UNDER_REVIEW").length;
  const activeQuotesValue = quotations.filter(q => q.status === "SENT" || q.status === "VIEWED").reduce((acc, q) => acc + q.totalAmount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            CRM Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights into your customer relationships and sales funnel.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-full px-6 bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all font-black">
            <UserPlus className="mr-2 h-4 w-4" /> New Customer
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-primary/10 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-black uppercase tracking-widest text-[10px]">Active Customers</CardDescription>
            <CardTitle className="text-3xl font-black">{customers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-500 flex items-center gap-1 font-bold">
              <TrendingUp className="h-3 w-3" /> +4 vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-blue-500/10 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500">
            <Target className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-black uppercase tracking-widest text-[10px]">Pipeline Value</CardDescription>
            <CardTitle className="text-3xl font-black text-blue-500">₱{(totalPipelineValue / 1000000).toFixed(1)}M</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-medium">{opportunities.length} Total Opportunities</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-amber-500/10 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500">
            <FileText className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-black uppercase tracking-widest text-[10px]">Open Quotations</CardDescription>
            <CardTitle className="text-3xl font-black text-amber-500">₱{(activeQuotesValue / 1000).toFixed(0)}k</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-amber-600 font-bold underline cursor-pointer">85% Win Probability</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-rose-500/10 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-rose-500">
            <MessageSquare className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-black uppercase tracking-widest text-[10px]">Open Complaints</CardDescription>
            <CardTitle className="text-3xl font-black text-rose-600">{openComplaints}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
               <AlertCircle className="h-3 w-3" /> Needs Attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sales Funnel Summary */}
        <Card className="lg:col-span-2 border-primary/5 bg-card/30 backdrop-blur-lg rounded-[2.5rem]">
           <CardHeader className="flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-xl font-black">Sales Funnel Activity</CardTitle>
                 <CardDescription>Opportunity movement this month.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="font-black text-xs uppercase text-primary">Full Pipeline <ArrowRight className="ml-2 h-4 w-4" /></Button>
           </CardHeader>
           <CardContent className="space-y-6 pt-2">
              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground">Prospecting</span>
                    <span className="text-xs font-black">₱850k</span>
                 </div>
                 <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/40 w-[60%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.2)]"></div>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground">Quoted</span>
                    <span className="text-xs font-black">₱125k</span>
                 </div>
                 <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/70 w-[35%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"></div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground">Negotiation</span>
                    <span className="text-xs font-black">₱1.5M</span>
                 </div>
                 <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all duration-1000"></div>
                 </div>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-border/50">
                 <div className="p-4 rounded-3xl bg-emerald-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Conversion Rate</p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black">42%</span>
                       <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                 </div>
                 <div className="p-4 rounded-3xl bg-rose-500/5 group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Cycle Time</p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black text-rose-600">18d</span>
                       <Clock className="h-4 w-4 text-rose-500" />
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Immediate Follow-ups */}
        <Card className="border-primary/5 bg-card/30 backdrop-blur-lg rounded-[2.5rem]">
           <CardHeader>
              <CardTitle className="text-xl font-black">Daily Agenda</CardTitle>
              <CardDescription>Scheduled visits and follow-ups.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              {activities.slice(0, 3).map(activity => (
                <div key={activity.id} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black leading-tight group-hover:text-primary transition-colors">{activity.summary}</h5>
                    <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{activity.scheduledDate} • {activity.staffId}</p>
                  </div>
                </div>
              ))}
              
              <Separator className="bg-border/40" />
              
              <div>
                 <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Retention Alerts</h5>
                 <div className="p-5 rounded-[2rem] bg-orange-500/5 border border-orange-500/10">
                    <div className="flex items-center gap-3 text-orange-600 mb-2">
                       <TrendingDown className="h-5 w-5" />
                       <span className="text-xs font-black uppercase tracking-wider">Churn Risk</span>
                    </div>
                    <p className="text-[11px] font-medium text-orange-950/60 leading-snug">
                       <strong>Davao Parts Center</strong> hasn't purchased in 45 days. 
                    </p>
                    <Button variant="link" className="p-0 h-auto text-orange-600 font-bold text-[10px] uppercase mt-2">Schedule Rescue Call <ArrowRight className="ml-1 h-3 w-3" /></Button>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRMDashboard;
