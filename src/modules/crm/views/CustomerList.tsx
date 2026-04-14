"use client";

import React from "react";
import { useCustomers } from "../hooks/use-crm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const CustomerList: React.FC = () => {
  const { customers } = useCustomers();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "INACTIVE": return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
      case "ON_HOLD": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "BLACKLISTED": return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default: return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "WHOLESALE": return <ShieldCheck className="h-4 w-4 text-primary" />;
      case "RETAILER": return <Users className="h-4 w-4 text-blue-500" />;
      default: return <Users className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Customer Master</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage and monitor your B2B and retail customer relationships.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-primary/20 hover:bg-primary/5 font-bold rounded-xl px-6">
            Export CRM Data
          </Button>
          <Button className="h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 font-black rounded-xl px-8">
            <UserPlus className="mr-2 h-5 w-5" /> New Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-primary/5 bg-card/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest">Total Accounts</CardDescription>
            <CardTitle className="text-3xl font-black">{customers.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-emerald-500/5 bg-card/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Now</CardDescription>
            <CardTitle className="text-3xl font-black text-emerald-500">2</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-amber-500/5 bg-card/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-amber-600">On Hold</CardDescription>
            <CardTitle className="text-3xl font-black text-amber-500">1</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-500/5 bg-card/40 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-blue-600">Yearly Growth</CardDescription>
            <CardTitle className="text-3xl font-black text-blue-500">+12%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-border/50 backdrop-blur-md shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by Code, Name, TIN, or Rep..." 
            className="pl-12 h-12 bg-background/50 border-none shadow-none focus-visible:ring-2 focus-visible:ring-primary/20 text-sm font-medium rounded-2xl"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="h-12 border-border/50 bg-background/50 rounded-2xl font-bold px-6">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Separator orientation="vertical" className="h-12 hidden md:block" />
          <div className="flex gap-1">
             <Button variant="ghost" className="h-12 font-black text-[10px] uppercase tracking-widest px-4 rounded-2xl bg-primary/10 text-primary">All</Button>
             <Button variant="ghost" className="h-12 font-black text-[10px] uppercase tracking-widest px-4 rounded-2xl border-none">Wholesale</Button>
             <Button variant="ghost" className="h-12 font-black text-[10px] uppercase tracking-widest px-4 rounded-2xl border-none">Retailer</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.id} className="group relative overflow-hidden border-primary/5 bg-card/30 backdrop-blur-sm hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-[2rem]">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-primary/10 hover:text-primary">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-primary">{customer.businessName.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-black tracking-tight">{customer.businessName}</CardTitle>
                    <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-widest py-0 h-4", getStatusColor(customer.status))}>
                      {customer.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-primary/70">
                    {getTypeIcon(customer.customerType)} {customer.customerType.replace("_", " ")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold leading-tight line-clamp-2">{customer.address}, {customer.city}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground group/link hover:text-primary transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 group-hover/link:bg-primary/10 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black">{customer.contactNo}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/40">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-3 w-3" /> Credit Limit
                  </p>
                  <p className="text-xs font-black">₱{(customer.creditLimit / 1000).toFixed(0)}k</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground flex items-center gap-1">
                    <History className="h-3 w-3" /> YTD Sales
                  </p>
                  <p className="text-xs font-black">₱{(customer.totalSalesYTD / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-[8px]">
                    {customer.assignedSalesRep.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span>Rep: {customer.assignedSalesRep}</span>
                </div>
                <span>ID: {customer.customerCode}</span>
              </div>

              <Button 
                variant="secondary" 
                className="w-full h-11 rounded-2xl bg-muted/50 hover:bg-primary hover:text-primary-foreground font-black text-xs transition-all duration-300 active:scale-95 group/btn"
              >
                View 360 Degree Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {/* Placeholder for "Add New" */}
        <div className="border-2 border-dashed border-border/50 rounded-[2rem] flex flex-col items-center justify-center p-12 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group">
           <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all">
             <UserPlus className="h-8 w-8" />
           </div>
           <p className="font-black text-sm text-foreground">Add New Customer</p>
           <p className="text-xs font-medium text-center mt-2 px-8">Quickly onboard a new wholesale or retail account.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
