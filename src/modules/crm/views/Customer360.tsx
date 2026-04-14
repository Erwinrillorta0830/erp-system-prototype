"use client";

import React from "react";
import { 
  useCRM 
} from "../context/crm-context";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  CreditCard, 
  History,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Props {
  customerId: string;
}

const Customer360: React.FC<Props> = ({ customerId }) => {
  const { customers, contacts, activities, complaints, quotations } = useCRM();
  
  const customer = customers.find(c => c.id === customerId);
  const customerContacts = contacts.filter(c => c.customerId === customerId);
  const customerActivities = activities.filter(a => a.customerId === customerId);
  const customerComplaints = complaints.filter(c => c.customerId === customerId);
  const customerQuotes = quotations.filter(q => q.customerId === customerId);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-muted-foreground border-2 border-dashed rounded-[3rem]">
        <Users className="h-20 w-20 mb-6 opacity-10" />
        <h2 className="text-2xl font-black">Customer Not Found</h2>
        <p className="font-medium">The account you are looking for does not exist in our master database.</p>
        <Button variant="link" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Navigation / Breadcrumb-ish */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 hover:bg-primary/5" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-sm font-black uppercase tracking-widest text-primary">Customer 360 Degree View</h1>
          <div className="flex items-center gap-3 mt-1">
             <h2 className="text-3xl font-black tracking-tight">{customer.businessName}</h2>
             <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black uppercase text-[10px] py-0.5 px-3">
               {customer.status}
             </Badge>
          </div>
        </div>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-primary/10 hover:bg-primary/5">Edit Profile</Button>
          <Button className="bg-primary rounded-xl font-black px-8 shadow-lg shadow-primary/20">Record Activity</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-primary/5 bg-card/50 backdrop-blur-md rounded-[2.5rem]">
            <CardHeader className="bg-primary/5 pb-8 relative">
              <div className="h-24 w-24 rounded-[2rem] bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center mx-auto border border-primary/10">
                <span className="text-4xl font-black text-primary">{customer.businessName.charAt(0)}</span>
              </div>
              <div className="text-center mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 mb-1">{customer.customerCode}</p>
                <CardTitle className="text-xl font-black leading-tight">{customer.displayName}</CardTitle>
                <CardDescription className="font-bold flex items-center justify-center gap-1.5 mt-1.5">
                  <ShieldCheck className="h-3 w-3" /> {customer.customerType.replace("_", " ")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50 group hover:border-primary/20 transition-all">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-xs font-bold leading-snug">{customer.address}, {customer.city}, {customer.province}</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-xs font-black">{customer.contactNo}</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-xs font-bold truncate">{customer.email}</span>
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assigned Sales Team</h4>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/10">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-primary-foreground text-xs shadow-md">JS</div>
                   <div className="flex flex-col">
                     <span className="text-xs font-black">{customer.assignedSalesRep}</span>
                     <span className="text-[10px] font-medium text-muted-foreground">Primary Rep</span>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/10 bg-orange-500/5 rounded-[2rem]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-black flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-4 w-4" /> Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-[11px] font-medium text-orange-950/60 leading-snug">
                Customer hasn't ordered in 28 days. Usual frequency is every 14 days. Retention follow-up suggested.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/50 backdrop-blur-sm grid grid-cols-4 h-14">
              <TabsTrigger value="overview" className="rounded-xl font-black text-xs h-full flex gap-2">
                <LayoutDashboard className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="timeline" className="rounded-xl font-black text-xs h-full flex gap-2">
                <Calendar className="h-4 w-4" /> Timeline
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl font-black text-xs h-full flex gap-2">
                <History className="h-4 w-4" /> Purchase History
              </TabsTrigger>
              <TabsTrigger value="credit" className="rounded-xl font-black text-xs h-full flex gap-2">
                <CreditCard className="h-4 w-4" /> Financials
              </TabsTrigger>
            </TabsList>

            <div className="mt-8 space-y-8">
              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Highlight Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-[2rem] bg-card/50 border border-primary/5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-inner">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">YTD Volume</p>
                      <p className="text-2xl font-black tracking-tighter">₱4.5M</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-card/50 border border-emerald-500/5 flex flex-col justify-between shadow-xl shadow-emerald-500/5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-inner">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Acceptance Rate</p>
                      <p className="text-2xl font-black tracking-tighter text-emerald-600">92%</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-card/50 border border-primary/5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-inner">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Quotes</p>
                      <p className="text-2xl font-black tracking-tighter">{customerQuotes.length}</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-card/50 border border-rose-500/5 flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 shadow-inner">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Open Complaints</p>
                      <p className="text-2xl font-black tracking-tighter text-rose-600">{customerComplaints.length}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <Card className="border-primary/5 bg-card/30 rounded-[2.5rem]">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-black">Recent Interactions</CardTitle>
                      <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-widest text-primary">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {customerActivities.map(activity => (
                        <div key={activity.id} className="flex gap-4 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div className="w-px flex-1 bg-border/40 my-2" />
                          </div>
                          <div className="pb-6">
                            <div className="flex items-center gap-2 mb-1">
                               <p className="text-xs font-black">{activity.summary}</p>
                               <Badge variant="outline" className="text-[8px] font-black uppercase py-0 h-4">{activity.type}</Badge>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground">{activity.scheduledDate} • {activity.staffId}</p>
                            {activity.notes && <p className="text-[11px] mt-2 text-muted-foreground leading-relaxed italic">"{activity.notes}"</p>}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Contact Persons */}
                  <Card className="border-primary/5 bg-card/30 rounded-[2.5rem]">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-black">Decision Makers</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><UserPlus className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {customerContacts.map(contact => (
                        <div key={contact.id} className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/40 dark:bg-zinc-900/40 border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center font-black text-primary border border-primary/10">
                            {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black tracking-tight">{contact.firstName} {contact.lastName}</span>
                              {contact.isPrimary && <Badge className="bg-primary/10 text-primary border-none shadow-none font-black text-[8px] uppercase h-4 px-1">Primary</Badge>}
                            </div>
                            <p className="text-[11px] font-bold text-muted-foreground">{contact.role}</p>
                          </div>
                          <div className="flex gap-2">
                             <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                               <Phone className="h-3.5 w-3.5" />
                             </div>
                             <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                               <Mail className="h-3.5 w-3.5" />
                             </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="animate-in fade-in slide-in-from-right-4 duration-500">
                 <Card className="border-primary/5 bg-card/30 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-muted-foreground border-dashed border-2">
                    <History className="h-16 w-16 mb-6 opacity-10" />
                    <h3 className="text-xl font-black text-foreground">Interactive Relationship Timeline</h3>
                    <p className="text-sm font-medium mt-2 max-w-sm text-center">A comprehensive, scrollable audit log of every call, visit, quote, and complaint registered to this account.</p>
                    <Button variant="secondary" className="mt-8 rounded-xl font-bold px-8">Expand Full History</Button>
                 </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Customer360;
