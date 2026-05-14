"use client";

import React, { useState } from "react";
import { useLeads } from "../hooks/use-crm";
import { Lead } from "../types";
import { 
  Card, CardContent, CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2,
  Flag,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const LeadsList: React.FC = () => {
  const { leads } = useLeads();
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Form State
  const [newLead, setNewLead] = useState<{
    prospectName: string;
    businessName: string;
    email: string;
    phone: string;
    source: string;
    interestLevel: string;
    assignedTo: string;
  }>({
    prospectName: "",
    businessName: "",
    email: "",
    phone: "",
    source: "WEBSITE",
    interestLevel: "MEDIUM",
    assignedTo: "Current User"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "CONTACTED": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "QUALIFIED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "UNQUALIFIED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "CONVERTED": return "bg-purple-500/10 text-purple-600 border-purple-200";
      default: return "";
    }
  };

  const getInterestColor = (level: string) => {
    switch (level) {
      case "HIGH": return "text-rose-500";
      case "MEDIUM": return "text-amber-500";
      case "LOW": return "text-blue-500";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads & Prospects</h1>
          <p className="text-muted-foreground">Capture and qualify potential motor parts buyers.</p>
        </div>
        <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
          <DialogTrigger render={
            <Button className="bg-primary px-6 shadow-lg shadow-primary/20">
              <UserPlus className="mr-2 h-4 w-4" /> Add Lead
            </Button>
          } />
          <DialogContent className="sm:max-w-[550px] border-primary/20 bg-card/95 backdrop-blur-xl rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <UserPlus className="h-5 w-5" />
                </div>
                New Discovery
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Capture a new potential business partner or repeat retail prospect.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Prospect Name</label>
                  <Input 
                    placeholder="e.g. Juan De La Cruz"
                    value={newLead.prospectName}
                    onChange={(e) => setNewLead(prev => ({ ...prev, prospectName: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Associated Business</label>
                  <Input 
                    placeholder="e.g. JDL Motor Shop"
                    value={newLead.businessName}
                    onChange={(e) => setNewLead(prev => ({ ...prev, businessName: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 focus-visible:ring-primary/20 font-bold"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Phone</label>
                  <Input 
                    placeholder="+63 9xx xxxx xxx"
                    value={newLead.phone}
                    onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12 rounded-xl bg-background/50 border-primary/10 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Lead Source</label>
                  <Select 
                    value={newLead.source}
                    onValueChange={(val) => setNewLead(prev => ({ ...prev, source: val ?? "" }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-background/50 border-primary/10">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/10 bg-card/95 backdrop-blur-xl">
                      {["WEBSITE", "REFERRAL", "SOCIAL_MEDIA", "EXHIBITION", "COLD_CALL"].map(s => (
                        <SelectItem key={s} value={s} className="font-bold text-xs">{s.replace("_", " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Initial Interest Rating</label>
                <div className="flex gap-2">
                  {["LOW", "MEDIUM", "HIGH"].map(level => (
                    <button
                      key={level}
                      onClick={() => setNewLead(prev => ({ ...prev, interestLevel: level }))}
                      className={`flex-1 h-12 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                        newLead.interestLevel === level
                          ? level === "HIGH" ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20"
                            : level === "MEDIUM" ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20"
                            : "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                          : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="ghost" className="font-bold rounded-xl" onClick={() => setIsAddLeadOpen(false)}>Discard</Button>
              <Button 
                className="bg-primary hover:bg-primary/90 font-black rounded-xl px-8 shadow-lg shadow-primary/20"
                onClick={() => setIsAddLeadOpen(false)}
              >
                Register Prospect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/5 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Leads</p>
           <p className="text-2xl font-black">{leads.length}</p>
        </Card>
        <Card className="border-blue-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">New This Week</p>
           <p className="text-2xl font-black text-blue-600">1</p>
        </Card>
        <Card className="border-emerald-500/10 bg-card/50 px-6 py-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Qualified</p>
           <p className="text-2xl font-black text-emerald-600">0</p>
        </Card>
        <Card className="border-primary/5 bg-card/50 px-6 py-4 text-center group cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Conversion Rate</p>
           <p className="text-2xl font-black">---</p>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-72">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search Leads..." className="pl-8 bg-background/50 h-10" />
            </div>
            <Button variant="outline" className="h-10 font-bold border-primary/20">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead>Prospect Name / Business</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead: Lead) => (
                <TableRow key={lead.id} className="hover:bg-primary/5 border-primary/5 group cursor-pointer">
                  <TableCell>
                    <div className="font-black text-xs">{lead.prospectName}</div>
                    <div className="text-[10px] text-muted-foreground font-bold">{lead.businessName || "Individual"}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[9px] font-black uppercase h-4 px-1.5">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                       <Flag className={`h-3 w-3 ${getInterestColor(lead.interestLevel)} fill-current`} />
                       <span className="text-[10px] font-black uppercase tracking-widest">{lead.interestLevel}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground">{lead.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(lead.status)} text-[10px] font-black uppercase`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[10px] font-bold text-muted-foreground">{lead.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 transition-opacity opacity-40 group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="p-8 rounded-[2rem] bg-gradient-to-r from-primary/10 to-transparent border border-primary/10 flex items-center justify-between group overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
             <CheckCircle2 className="h-24 w-24" />
         </div>
         <div className="flex gap-6 items-center relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
               <UserPlus className="h-8 w-8" />
            </div>
            <div>
               <h3 className="text-xl font-black">Lead Conversion Wizard</h3>
               <p className="text-sm font-medium text-muted-foreground mt-1">Ready to onboard a new business account? Our wizard helps you map lead data to customer profile instantly.</p>
            </div>
         </div>
         <Button className="rounded-xl font-black px-8 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">Start Wizard</Button>
      </div>
    </div>
  );
};

export default LeadsList;
