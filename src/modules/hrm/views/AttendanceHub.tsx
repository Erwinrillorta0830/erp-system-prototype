"use client";

import React, { useState } from 'react';
import { 
  Calendar, Clock, UserCheck, AlertCircle, 
  Search, Download, Filter, ChevronLeft, ChevronRight,
  MoreVertical, CheckCircle, XCircle, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHRM } from '../context/hrm-context';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function AttendanceHub() {
  const { employees, attendanceLogs, branches } = useHRM();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  
  // Logic to determine attendance status for the day
  const attendanceData = employees.map(emp => {
    const log = attendanceLogs.find(l => l.employeeId === emp.id && l.date === dateStr);
    const branch = branches.find(b => b.id === emp.branchId);
    
    // Simple verification logic
    let status: 'Present' | 'Late' | 'Absent' | 'Rest Day' = 'Absent';
    if (log) {
      const [hours, minutes] = log.timeIn.split(':').map(Number);
      status = (hours > 8 || (hours === 8 && minutes > 15)) ? 'Late' : 'Present';
    }
    
    return {
      employee: emp,
      branch,
      log,
      status
    };
  }).filter(data => {
    const matchesSearch = data.employee.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          data.employee.employeeCode.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter === 'all' || data.employee.branchId === branchFilter;
    return matchesSearch && matchesBranch;
  });

  const stats = {
    present: attendanceData.filter(d => d.status === 'Present' || d.status === 'Late').length,
    late: attendanceData.filter(d => d.status === 'Late').length,
    absent: attendanceData.filter(d => d.status === 'Absent').length,
    total: attendanceData.length
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 bg-zinc-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Attendance Monitoring</h1>
          <p className="text-muted-foreground mt-1 font-medium text-lg">Daily time records and workforce availability.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-zinc-200 bg-white font-bold rounded-xl px-6">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 font-bold rounded-xl px-8">
            <Clock className="mr-2 h-5 w-5" /> Manual Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AttendanceStatCard label="Total Expected" value={stats.total} icon={<Calendar className="w-5 h-5" />} color="zinc" />
        <AttendanceStatCard label="Present Now" value={stats.present} icon={<UserCheck className="w-5 h-5" />} color="emerald" trend={`${Math.round((stats.present/stats.total)*100)}% active`} />
        <AttendanceStatCard label="Lateness Today" value={stats.late} icon={<AlertCircle className="w-5 h-5" />} color="amber" trend="Critical attention" />
        <AttendanceStatCard label="Absenteeism" value={stats.absent} icon={<XCircle className="w-5 h-5" />} color="rose" />
      </div>

      <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-zinc-100 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-4 bg-zinc-100 p-2 rounded-2xl w-full lg:w-auto overflow-hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-600 hover:bg-white rounded-xl shadow-none">
                   <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 px-4 font-black text-zinc-900">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    {format(selectedDate, 'PP')}
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-600 hover:bg-white rounded-xl shadow-none">
                   <ChevronRight className="w-5 h-5" />
                </Button>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative group flex-1 sm:w-64">
                   <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-blue-600" />
                   <Input 
                     placeholder="Search employee..." 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="pl-11 h-11 bg-zinc-50 border-none rounded-xl font-medium" 
                   />
                </div>
                <Select value={branchFilter} onValueChange={(val) => setBranchFilter(val ?? 'all')}>
                   <SelectTrigger className="h-11 w-full sm:w-48 bg-zinc-50 border-none rounded-xl font-bold text-zinc-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <SelectValue placeholder="Filter Branch" />
                      </div>
                   </SelectTrigger>
                   <SelectContent className="rounded-xl border-zinc-200 shadow-xl">
                      <SelectItem value="all">All Branches</SelectItem>
                      {branches.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                   </SelectContent>
                </Select>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                   <tr>
                     <th className="px-8 py-5">Employee Name</th>
                     <th className="px-8 py-5">Branch Assignment</th>
                     <th className="px-8 py-5">Clock In</th>
                     <th className="px-8 py-5">Clock Out</th>
                     <th className="px-8 py-5">Attendance Status</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                   {attendanceData.map(({ employee, branch, log, status }) => (
                     <tr key={employee.id} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200 flex items-center justify-center font-black text-blue-600 shadow-inner">
                                 {employee.avatarUrl ? <img src={employee.avatarUrl} className="w-full h-full object-cover" /> : employee.firstName[0]}
                              </div>
                              <div>
                                 <p className="text-sm font-black text-zinc-900 leading-none">{employee.fullName}</p>
                                 <p className="text-[10px] text-zinc-400 mt-1 font-mono uppercase tracking-tighter">{employee.employeeCode}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <p className="text-xs font-bold text-zinc-600 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 opacity-50" /> {branch?.name}</p>
                        </td>
                        <td className="px-8 py-5">
                           <div className="flex flex-col">
                              <span className={cn("text-xs font-black", log ? "text-emerald-600" : "text-zinc-300")}>{log?.timeIn || '--:--'}</span>
                              {log && <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{log.source}</span>}
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className={cn("text-xs font-black", log?.timeOut ? "text-blue-600" : "text-zinc-300")}>{log?.timeOut || '--:--'}</span>
                        </td>
                        <td className="px-8 py-5">
                           <Badge className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 border-none", 
                              status === 'Present' ? 'bg-emerald-500 text-white' : 
                              status === 'Late' ? 'bg-amber-500 text-white' : 
                              'bg-rose-500 text-white'
                           )}>
                              {status}
                           </Badge>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 rounded-xl transition-all">
                              <MoreVertical className="w-5 h-5" />
                           </Button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
          {attendanceData.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
               <div className="p-8 rounded-full bg-zinc-50 text-zinc-200">
                  <Search className="w-16 h-16" />
               </div>
               <p className="text-xl font-black text-zinc-400">No results found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AttendanceStatCard({ label, value, icon, color, trend }: { label: string, value: number, icon: React.ReactNode, color: string, trend?: string }) {
  const styles = {
    zinc: 'bg-zinc-950 text-white border-zinc-800',
    emerald: 'bg-white text-emerald-600 border-zinc-200',
    amber: 'bg-white text-amber-600 border-zinc-200',
    rose: 'bg-white text-rose-600 border-zinc-200',
  };

  return (
    <Card className={cn("rounded-[2rem] border-none shadow-sm", styles[color as keyof typeof styles])}>
       <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
             <div className={cn("p-2 rounded-xl", color === 'zinc' ? "bg-zinc-800" : "bg-zinc-50")}>
                {icon}
             </div>
             {trend && <Badge className="text-[9px] font-black bg-emerald-50 text-emerald-700 border-none">{trend}</Badge>}
          </div>
          <p className={cn("text-[10px] font-black uppercase tracking-widest", color === 'zinc' ? "text-zinc-400" : "text-zinc-500 text-opacity-70")}>{label}</p>
          <h2 className="text-4xl font-black tracking-tighter mt-1">{value}</h2>
       </CardContent>
    </Card>
  );
}
