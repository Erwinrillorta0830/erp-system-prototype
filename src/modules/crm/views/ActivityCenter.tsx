"use client";

import React from "react";
import { useActivities, useCustomers } from "../hooks/use-crm";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Plus, 
  Filter, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreVertical,
  Activity as ActivityIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ActivityCenter: React.FC = () => {
  const { activities } = useActivities();
  const { customers } = useCustomers();

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.businessName || "Unknown Customer";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLANNED": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "COMPLETED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "CANCELLED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "MISSED": return "bg-orange-500/10 text-orange-600 border-orange-200";
      default: return "";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "VISIT": return <MapPin className="h-4 w-4" />;
      case "CALL": return <Phone className="h-4 w-4" />;
      case "VIBER": return <MessageSquare className="h-4 w-4" />;
      case "EMAIL": return <Mail className="h-4 w-4" />;
      default: return <ActivityIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interaction Hub</h1>
          <p className="text-muted-foreground">Log and schedule all calls, visits, and follow-ups.</p>
        </div>
        <Button className="bg-primary px-6 shadow-lg shadow-primary/20 font-black rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Log Interaction
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main List */}
        <div className="flex-1 space-y-4">
           <Card className="border-primary/5 bg-card/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-4">
                 <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search activities..." className="pl-8 h-9 rounded-lg" />
                 </div>
                 <Button variant="outline" size="sm" className="h-9 font-bold border-primary/20">
                    <Filter className="mr-2 h-3.5 w-3.5" /> Filter
                 </Button>
              </div>
           </Card>

           <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="group border-primary/5 bg-card/40 hover:bg-card/80 hover:border-primary/20 transition-all cursor-pointer rounded-2xl">
                   <CardContent className="p-5 flex gap-5">
                      <div className="flex flex-col items-center">
                         <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            {getIcon(activity.type)}
                         </div>
                         <div className="w-px flex-1 bg-border/20 my-2" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <div>
                               <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">{getCustomerName(activity.customerId)}</p>
                               <h3 className="text-sm font-black tracking-tight">{activity.summary}</h3>
                            </div>
                            <Badge variant="outline" className={`${getStatusColor(activity.status)} text-[10px] font-black uppercase py-0 h-4`}>
                               {activity.status}
                            </Badge>
                         </div>
                         <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                               <Calendar className="h-3 w-3" /> {activity.scheduledDate}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                               <Clock className="h-3 w-3" /> Scheduled
                            </div>
                         </div>
                         {activity.notes && (
                            <p className="text-[11px] mt-2 text-muted-foreground italic leading-relaxed border-l-2 border-primary/20 pl-3">
                               &quot;{activity.notes}&quot;
                            </p>
                         )}
                      </div>
                      <div className="flex flex-col justify-between items-end opacity-20 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><MoreVertical className="h-4 w-4" /></Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="w-full md:w-80 space-y-6">
           <Card className="border-primary/5 bg-card/60 rounded-[2rem]">
              <CardHeader>
                 <CardTitle className="text-sm font-black uppercase tracking-widest">Upcoming Agenda</CardTitle>
                 <CardDescription className="text-xs">Your next 24-hour activities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-black uppercase text-primary">tomorrow, 09:00 AM</span>
                       <Badge className="bg-primary text-white text-[8px] h-4">HIGH</Badge>
                    </div>
                    <p className="text-xs font-black">Call Ricardo re: NMAX Quotes</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">Metro Manila Auto Supply</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 opacity-60">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-black uppercase text-muted-foreground">tomorrow, 02:30 PM</span>
                    </div>
                    <p className="text-xs font-bold">Follow-up: Cebu Logistics</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">Internal Review</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-emerald-500/10 bg-emerald-500/5 rounded-[2rem] p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                 <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-black text-sm">Interaction Score: 98%</h4>
              <p className="text-[10px] font-medium text-emerald-900/60 mt-1 leading-snug">
                 Excellent discipline! You have completed all scheduled visits this week. Keep up the high engagement with your B2B accounts.
              </p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityCenter;
