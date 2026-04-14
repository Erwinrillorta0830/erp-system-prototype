"use client";

import React from "react";
import { useComplaints, useCustomers } from "../hooks/use-crm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  User,
  ArrowRight,
  MoreVertical,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ComplaintsHub: React.FC = () => {
  const { complaints } = useComplaints();
  const { customers } = useCustomers();

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.businessName || "Unknown Customer";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "UNDER_REVIEW": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "RESOLVED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "CLOSED": return "bg-zinc-500/10 text-zinc-600 border-zinc-200";
      default: return "";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "HIGH": return <Flag className="h-3 w-3 text-rose-500 fill-current" />;
      case "MEDIUM": return <Flag className="h-3 w-3 text-amber-500" />;
      case "LOW": return <Flag className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Complaints</h1>
          <p className="text-muted-foreground">Manage ticket resolutions and after-sales satisfaction.</p>
        </div>
        <Button className="bg-primary px-6 shadow-lg shadow-primary/20 font-black rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Log Complaint
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-rose-500/10 bg-rose-500/5 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-1">Open Tickets</p>
           <p className="text-2xl font-black text-rose-600">1</p>
        </Card>
        <Card className="border-amber-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Under Review</p>
           <p className="text-2xl font-black text-amber-600">1</p>
        </Card>
        <Card className="border-emerald-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Resolved (MTD)</p>
           <p className="text-2xl font-black text-emerald-600">0</p>
        </Card>
        <Card className="border-primary/5 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Resolution Time</p>
           <p className="text-2xl font-black italic">---</p>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/10 backdrop-blur-sm rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/20 pb-6 border-b border-border/50 px-8 py-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
             </div>
             <div>
                <CardTitle className="text-lg font-black">Complaint Ticket Log</CardTitle>
                <CardDescription className="text-xs">Tracking after-sales issues for B2B accounts.</CardDescription>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search Tickets..." className="pl-8 h-9 rounded-lg" />
             </div>
             <Button variant="outline" size="sm" className="h-9 font-bold border-primary/20 bg-background/50">
                <Filter className="mr-2 h-3.5 w-3.5" /> Filter
             </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest">Customer</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Category</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Issue Description</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Priority</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Logged</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id} className="hover:bg-primary/5 border-border/20 group cursor-pointer">
                  <TableCell className="px-8">
                    <p className="font-black text-xs text-primary">{getCustomerName(complaint.customerId)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-black uppercase py-0 h-4 border-primary/20 bg-primary/5 text-primary/70">{complaint.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs xl:max-w-md">
                    <p className="text-[11px] font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap" title={complaint.description}>
                      {complaint.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                       {getPriorityIcon(complaint.priority)}
                       <span className="text-[9px] font-black uppercase text-muted-foreground">{complaint.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(complaint.status)} text-[10px] font-black uppercase h-5`}>
                      {complaint.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[10px] font-bold text-muted-foreground tabular-nums">{complaint.dateLogged}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5"><ArrowRight className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="p-6 rounded-[2rem] bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-between group overflow-hidden relative shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-5">
             <AlertCircle className="h-24 w-24" />
         </div>
         <div className="flex gap-6 items-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
               <AlertCircle className="h-7 w-7" />
            </div>
            <div>
               <h3 className="text-xl font-black">Escalation Protocol Enabled</h3>
               <p className="text-xs font-medium opacity-60 mt-1 max-w-sm">Tickets categorized as "Damaged" or "Wrong Part" are automatically flagged to the Sales Manager if not resolved within 48 hours.</p>
            </div>
         </div>
         <Button className="rounded-xl font-black px-8 bg-zinc-700 text-white hover:bg-zinc-600 dark:bg-zinc-100 dark:text-black transition-all">Review Escalations</Button>
      </div>
    </div>
  );
};

export default ComplaintsHub;
