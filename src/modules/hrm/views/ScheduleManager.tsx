"use client";

import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, Plus, Save, RefreshCw, Layers,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHRM } from '../context/hrm-context';
import { cn } from '@/lib/utils';

export default function ScheduleManager() {
  const { employees, branches } = useHRM();
  const [activeBranch, setActiveBranch] = useState(branches[0].id);

  const branchStaff = employees.filter(e => e.branchId === activeBranch);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 bg-zinc-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Shift & Roster</h1>
          <p className="text-muted-foreground mt-1 font-medium text-lg">Manage workforce schedules and rotating shifts.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="h-12 border-zinc-200 bg-white font-bold rounded-xl px-6">
              <RefreshCw className="mr-2 h-4 w-4" /> Rotate Roster
           </Button>
           <Button className="h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 font-bold rounded-xl px-8">
              <Save className="mr-2 h-4 w-4" /> Publish Schedule
           </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
         {branches.map(b => (
            <Button
              key={b.id}
              variant={activeBranch === b.id ? 'default' : 'outline'}
              onClick={() => setActiveBranch(b.id)}
              className={cn(
                "h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                activeBranch === b.id ? "bg-zinc-900 border-none shadow-xl scale-105" : "bg-white border-zinc-200 text-zinc-500"
              )}
            >
               <MapPin className="w-4 h-4 mr-2 opacity-50" /> {b.name}
            </Button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Shift Types Definition */}
         <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 px-2 flex items-center justify-between">
               Shift Types
               <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-4 h-4" /></Button>
            </h3>
            <ShiftCard name="Standard Office" time="08:00 AM - 05:00 PM" label="FIXED" color="blue" />
            <ShiftCard name="Warehouse AM" time="06:00 AM - 03:00 PM" label="CORE" color="emerald" />
            <ShiftCard name="Warehouse PM" time="02:00 PM - 11:00 PM" label="LATE" color="indigo" />
            <ShiftCard name="Night Logistics" time="10:00 PM - 07:00 AM" label="NIGHT" color="rose" />
         </div>

         {/* Active Rostering Area */}
         <Card className="lg:col-span-2 rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-zinc-50 flex flex-row justify-between items-center">
               <div>
                  <CardTitle className="text-xl font-black">Weekly Roster</CardTitle>
                  <CardDescription className="font-semibold">Assigning shifts for April 15 - 21, 2024</CardDescription>
               </div>
               <div className="flex bg-zinc-100 p-1 rounded-xl">
                  <Button variant="ghost" className="h-8 px-3 rounded-lg text-xs font-bold bg-white shadow-sm ring-0">Weekly View</Button>
                  <Button variant="ghost" className="h-8 px-3 rounded-lg text-xs font-bold text-zinc-500 ring-0 hover:bg-white/50">Monthly View</Button>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-zinc-50">
                  {branchStaff.slice(0, 8).map(staff => (
                    <div key={staff.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center font-black text-zinc-400 text-xs border border-zinc-200 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                             {staff.firstName[0]}
                          </div>
                          <div>
                             <p className="text-sm font-black text-zinc-900 group-hover:text-blue-600 transition-colors">{staff.fullName}</p>
                             <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{staff.employeeCode}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Current Assignment</p>
                             <Badge variant="outline" className="rounded-lg font-bold text-[10px] border-zinc-200 px-3 h-7">
                                Standard Office
                             </Badge>
                          </div>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-300 opacity-0 group-hover:opacity-100 transition-all"><ChevronRight className="w-5 h-5" /></Button>
                       </div>
                    </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full h-14 font-bold text-xs text-blue-600 uppercase tracking-widest bg-zinc-50/50 hover:bg-zinc-50">View all {branchStaff.length} Team Members</Button>
            </CardContent>
         </Card>
      </div>

      {/* Roster Overview Calendar placeholder */}
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 px-2 mt-8">Recent Schedule Changes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <HistoryItem 
           user="Maria Santos" 
           action="Clock-in Override" 
           date="Today 08:30 AM" 
           status="Manual" 
         />
         <HistoryItem 
           user="Juan Dela Cruz" 
           action="Schedule Changed" 
           date="Yesterday" 
           status="Updated" 
         />
         <HistoryItem 
           user="Ricardo Dalisay" 
           action="Rest Day Swapped" 
           date="April 18" 
           status="Approved" 
         />
         <HistoryItem 
           user="System" 
           action="Auto-Roster Gen" 
           date="April 12" 
           status="Completed" 
         />
      </div>
    </div>
  );
}

function ShiftCard({ name, time, label, color }: { name: string, time: string, label: string, color: 'blue' | 'emerald' | 'indigo' | 'rose' }) {
  const colorStyles = {
    blue: 'border-blue-100 bg-white group-hover:border-blue-300 text-blue-600',
    emerald: 'border-emerald-100 bg-white group-hover:border-emerald-300 text-emerald-600',
    indigo: 'border-indigo-100 bg-white group-hover:border-indigo-300 text-indigo-600',
    rose: 'border-rose-100 bg-white group-hover:border-rose-300 text-rose-600'
  };

  return (
    <div className={cn("p-6 rounded-[2rem] border transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-1 bg-white", colorStyles[color])}>
       <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-zinc-50 group-hover:bg-zinc-100 transition-all">
             <Clock className="w-5 h-5" />
          </div>
          <Badge variant="outline" className={cn("text-[8px] font-black uppercase tracking-tighter border-none px-2", 
            color === 'blue' ? 'bg-blue-50 text-blue-600' : 
            color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
            color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
            'bg-rose-50 text-rose-600'
          )}>
            {label}
          </Badge>
       </div>
       <h4 className="text-zinc-900 font-black text-lg">{name}</h4>
       <p className="text-zinc-400 font-bold text-xs mt-1 mb-4 flex items-center gap-1.5"><Layers className="w-3 h-3" /> {time}</p>
       <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
             {[1,2,3].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                   {i}
                </div>
             ))}
          </div>
          <span className="text-[10px] font-bold text-zinc-400">Assignment: 12 Staff</span>
       </div>
    </div>
  );
}

function HistoryItem({ user, action, date, status }: { user: string, action: string, date: string, status: string }) {
  return (
     <Card className="rounded-3xl border-zinc-100 bg-white p-4 shadow-sm">
        <div className="flex justify-between items-start mb-2">
           <Badge variant="outline" className="text-[8px] font-black tracking-widest uppercase py-0 px-2 h-4 border-zinc-200">{status}</Badge>
           <Clock className="w-3.5 h-3.5 text-zinc-300" />
        </div>
        <p className="text-xs font-black text-zinc-900 leading-tight">{action}</p>
        <div className="flex items-center gap-2 mt-2">
           <div className="h-5 w-5 rounded-full bg-zinc-100 flex items-center justify-center text-[8px] font-bold text-zinc-500 uppercase">{user[0]}</div>
           <p className="text-[10px] font-bold text-zinc-500">{user} • {date}</p>
        </div>
     </Card>
  );
}
