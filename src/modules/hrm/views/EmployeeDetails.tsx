"use client";

import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Briefcase, Building2, CreditCard, FileText, 
  History, ShieldAlert, CheckCircle2, XCircle,
  Clock, Download, ChevronRight, AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useHRM } from '../context/hrm-context';
import { cn } from '@/lib/utils';
import { Employee } from '../types/hrm.types';

interface EmployeeDetailsProps {
  employeeId: string;
  onBack?: () => void;
}

export default function EmployeeDetails({ employeeId, onBack }: EmployeeDetailsProps) {
  const { 
    employees, branches, departments, positions, 
    attendanceLogs, leaveRequests, overtimeRequests, incidents 
  } = useHRM();

  const employee = employees.find(e => e.id === employeeId);
  const employeeLeaves = leaveRequests.filter(r => r.employeeId === employeeId);
  const employeeOT = overtimeRequests.filter(o => o.employeeId === employeeId);
  const employeeIncidents = incidents.filter(i => i.employeeId === employeeId);
  const employeeLogs = attendanceLogs.filter(l => l.employeeId === employeeId);

  if (!employee) return <div className="p-8 text-center">Employee not found.</div>;

  const branch = branches.find(b => b.id === employee.branchId);
  const dept = departments.find(d => d.id === employee.deptId);
  const pos = positions.find(p => p.id === employee.positionId);

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500 bg-zinc-50/50 min-h-screen">
      {/* Header Profile Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10 w-full">
          <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-xl shadow-blue-200">
            <div className="w-full h-full rounded-[2.3rem] bg-white flex items-center justify-center overflow-hidden">
              {employee.avatarUrl ? (
                <img src={employee.avatarUrl} alt={employee.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-blue-600">{employee.firstName[0]}{employee.lastName[0]}</span>
              )}
            </div>
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-black tracking-tight text-zinc-900">{employee.fullName}</h1>
                <Badge className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1", 
                  employee.status === 'Regular' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white')}>
                  {employee.status}
                </Badge>
              </div>
              <p className="text-xl font-bold text-blue-600 mt-1">{pos?.title}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm text-zinc-500 font-semibold">
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {branch?.name}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {dept?.name}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button size="sm" variant="outline" className="rounded-xl font-bold border-zinc-200 hover:bg-zinc-50">
                <Mail className="w-4 h-4 mr-2" /> Email
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl font-bold border-zinc-200 hover:bg-zinc-50">
                <Phone className="w-4 h-4 mr-2" /> Message
              </Button>
              <Button size="sm" className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700">
                Edit Information
              </Button>
            </div>
          </div>

          <div className="lg:border-l lg:pl-8 space-y-4 min-w-[200px] w-full lg:w-auto">
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Employee ID</p>
               <p className="text-lg font-black text-zinc-900 font-mono">{employee.employeeCode}</p>
             </div>
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Next Review</p>
               <p className="text-sm font-bold text-zinc-600">June 15, 2024</p>
             </div>
             <Progress value={85} className="h-2 bg-zinc-100" />
             <p className="text-[9px] font-bold text-zinc-400">PROFILE COMPLETION 85%</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white border border-zinc-200 p-1 h-14 rounded-2xl w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile" className="rounded-xl px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold h-full">Profile 360</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-xl px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold h-full">Attendance Log</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold h-full">Documents</TabsTrigger>
          <TabsTrigger value="performance" className="rounded-xl px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold h-full">Performance</TabsTrigger>
          <TabsTrigger value="requests" className="rounded-xl px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold h-full">Requests</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
                  <CardTitle className="text-lg font-black">Personal & Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                     <DetailItem label="Full Legal Name" value={employee.fullName} icon={<User className="w-4 h-4" />} />
                     <DetailItem label="Official Email" value={employee.email} icon={<Mail className="w-4 h-4" />} />
                     <DetailItem label="Contact Number" value={employee.contactNo} icon={<Phone className="w-4 h-4" />} />
                     <DetailItem label="Current Address" value="Lot 4, Block 2, Greenpark Village, Pasig City" icon={<MapPin className="w-4 h-4" />} />
                     <DetailItem label="Emergency Contact" value={employee.emergencyContact || 'Maria D. (Spouse) - 0917-000-0000'} icon={<ShieldAlert className="w-4 h-4" />} />
                     <DetailItem label="Manager / Supervisor" value="HR Manager" icon={<User className="w-4 h-4" />} />
                  </div>
                  
                  <Separator className="my-10" />
                  
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-6">Government & Payroll Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <DetailItem label="SSS Number" value={employee.sssNo || 'N/A'} icon={<CreditCard className="w-4 h-4" />} />
                     <DetailItem label="PhilHealth No." value={employee.philHealthNo || 'N/A'} icon={<CreditCard className="w-4 h-4" />} />
                     <DetailItem label="Pag-IBIG No." value={employee.pagibigNo || 'N/A'} icon={<CreditCard className="w-4 h-4" />} />
                     <DetailItem label="TIN" value={employee.tin || 'N/A'} icon={<FileText className="w-4 h-4" />} />
                     <DetailItem label="Monthly Base" value={`₱${employee.monthlyRate.toLocaleString()}`} icon={<CreditCard className="w-4 h-4" />} />
                     <DetailItem label="Daily Rate" value={`₱${employee.dailyRate.toLocaleString()}`} icon={<CreditCard className="w-4 h-4" />} />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
                 <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 text-center">
                    <CardTitle className="text-lg font-black">Leave Balance</CardTitle>
                 </CardHeader>
                 <CardContent className="p-8 space-y-6">
                    <LeaveBalanceItem label="Vacation Leave" value={12} total={15} color="blue" />
                    <LeaveBalanceItem label="Sick Leave" value={8} total={10} color="emerald" />
                    <LeaveBalanceItem label="Emergency Leave" value={3} total={5} color="orange" />
                    <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center text-center mt-6">
                       <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Total Available</p>
                       <h2 className="text-3xl font-black text-blue-900">23 Days</h2>
                    </div>
                 </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
             <Card className="rounded-[2rem] border-zinc-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                   <div>
                     <CardTitle className="text-lg font-black">Weekly Attendance Activity</CardTitle>
                     <CardDescription className="font-semibold">Review clock-in and clock-out logs.</CardDescription>
                   </div>
                   <Button variant="outline" className="rounded-xl font-bold border-zinc-200">
                      <Download className="w-4 h-4 mr-2" /> Export DTR
                   </Button>
                </CardHeader>
                <CardContent>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <StatItem label="Lateness" value="0.5h" sub="Last 30 days" icon={<Clock className="w-4 h-4 text-orange-500" />} />
                      <StatItem label="Overtime" value="4.2h" sub="Approved total" icon={<History className="w-4 h-4 text-blue-500" />} />
                      <StatItem label="Absences" value="1" sub="Unplanned" icon={<XCircle className="w-4 h-4 text-red-500" />} />
                      <StatItem label="Perfect Days" value="18" sub="Current month" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} />
                   </div>
                   
                   <div className="border border-zinc-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                           <tr>
                             <th className="px-6 py-4">Date</th>
                             <th className="px-6 py-4">Time In</th>
                             <th className="px-6 py-4">Time Out</th>
                             <th className="px-6 py-4">Source</th>
                             <th className="px-6 py-4">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                           {employeeLogs.length > 0 ? employeeLogs.map(log => (
                             <tr key={log.id} className="text-sm font-semibold text-zinc-600 hover:bg-zinc-50/50">
                               <td className="px-6 py-4">{log.date}</td>
                               <td className="px-6 py-4 text-emerald-600">{log.timeIn}</td>
                               <td className="px-6 py-4 text-blue-600">{log.timeOut || '--:--'}</td>
                               <td className="px-6 py-4"><Badge variant="outline" className="text-[10px]">{log.source}</Badge></td>
                               <td className="px-6 py-4"><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 uppercase text-[9px]">Present</Badge></td>
                             </tr>
                           )) : (
                             <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-400">No logs found for this period.</td></tr>
                           )}
                        </tbody>
                      </table>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="documents">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocumentCard title="NBI Clearance" status="Verified" date="Expires: Oct 2024" />
                <DocumentCard title="Health Certificate" status="Verified" date="Expires: Jan 2025" />
                <DocumentCard title="Employment Contract" status="Verified" date="Signed: 2022-06-20" />
                <DocumentCard title="BIR Form 2316" status="Verified" date="Tax Year 2023" />
                <DocumentCard title="Birth Certificate" status="Verified" date="Certified True Copy" />
                <div className="border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center p-8 text-zinc-400 hover:bg-zinc-50 cursor-pointer group">
                   <div className="p-4 rounded-full bg-zinc-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      <Download className="w-8 h-8" />
                   </div>
                   <p className="font-black text-sm mt-4 text-zinc-900">Upload New Document</p>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="performance">
             <div className="space-y-6">
                {employeeIncidents.length > 0 ? employeeIncidents.map(incident => (
                  <Card key={incident.id} className="rounded-[2rem] border-zinc-200 overflow-hidden shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-4 bg-zinc-50/50">
                       <div className={cn("p-3 rounded-2xl", 
                         incident.type === 'Commendation' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600')}>
                         {incident.type === 'Commendation' ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                       </div>
                       <div className="flex-1">
                          <CardTitle className="text-lg font-black">{incident.type}</CardTitle>
                          <CardDescription className="font-bold">{incident.date} • {incident.severity} Severity</CardDescription>
                       </div>
                       <Badge className="bg-white text-zinc-600 border border-zinc-200">{incident.status}</Badge>
                    </CardHeader>
                    <CardContent className="p-6">
                       <p className="text-sm font-semibold text-zinc-600 leading-relaxed">{incident.description}</p>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="rounded-[2rem] border-zinc-200 p-12 text-center flex flex-col items-center">
                     <AlertCircle className="w-12 h-12 text-zinc-200 mb-4" />
                     <p className="text-zinc-400 font-bold">No performance records or incidents on file.</p>
                  </Card>
                )}
             </div>
          </TabsContent>

          <TabsContent value="requests">
             <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-black">History of Requests</CardTitle>
                  <CardDescription className="font-bold">Leave and Overtime filing history.</CardDescription>
                </CardHeader>
                <div className="divide-y divide-zinc-100">
                   {employeeLeaves.map(leave => (
                     <div key={leave.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                              <Calendar className="w-6 h-6" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-zinc-900">{leave.leaveType} Leave</p>
                              <p className="text-xs font-semibold text-zinc-500">{leave.startDate} to {leave.endDate} • {leave.reason}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</p>
                              <Badge variant="outline" className={cn("mt-1 text-[9px] font-black uppercase",
                                leave.status === 'Approved' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 
                                leave.status === 'Pending' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-zinc-200')}>
                                {leave.status}
                              </Badge>
                           </div>
                           <ChevronRight className="w-5 h-5 text-zinc-300" />
                        </div>
                     </div>
                   ))}
                   {employeeOT.map(ot => (
                     <div key={ot.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                              <Clock className="w-6 h-6" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-zinc-900">Overtime: {ot.hours} Hours</p>
                              <p className="text-xs font-semibold text-zinc-500">{ot.date} • {ot.reason}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</p>
                              <Badge variant="outline" className="mt-1 text-[9px] font-black uppercase border-amber-200 text-amber-600 bg-amber-50">
                                {ot.status}
                              </Badge>
                           </div>
                           <ChevronRight className="w-5 h-5 text-zinc-300" />
                        </div>
                     </div>
                   ))}
                </div>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function DetailItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5 min-w-0">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 flex items-center gap-2">
        {icon} {label}
      </p>
      <p className="text-sm font-bold text-zinc-800 break-words">{value}</p>
    </div>
  );
}

function LeaveBalanceItem({ label, value, total, color }: { label: string, value: number, total: number, color: 'blue' | 'emerald' | 'orange' }) {
  const barColors = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    orange: 'bg-orange-600'
  };
  
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-xs font-black">
          <span className="text-zinc-500 uppercase tracking-widest">{label}</span>
          <span className="text-zinc-900">{value} / {total}</span>
       </div>
       <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-1000", barColors[color])} style={{ width: `${(value/total)*100}%` }} />
       </div>
    </div>
  );
}

function StatItem({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 flex flex-col gap-1">
       <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400">
         {icon} {label}
       </div>
       <div className="text-2xl font-black text-zinc-900">{value}</div>
       <div className="text-[10px] font-bold text-zinc-400">{sub}</div>
    </div>
  );
}

function DocumentCard({ title, status, date }: { title: string, status: string, date: string }) {
  return (
    <Card className="rounded-[2rem] border-zinc-200 overflow-hidden group hover:border-blue-300 transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className="p-3 rounded-2xl bg-zinc-100 text-zinc-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FileText className="w-6 h-6" />
             </div>
             <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 uppercase text-[8px] font-black">{status}</Badge>
          </div>
          <h4 className="text-sm font-black text-zinc-900">{title}</h4>
          <p className="text-[11px] font-bold text-zinc-400 mt-1">{date}</p>
          <div className="flex gap-2 mt-4">
             <Button variant="ghost" size="sm" className="flex-1 rounded-xl text-[10px] font-black bg-zinc-50 hover:bg-zinc-100 h-8">VIEW</Button>
             <Button variant="ghost" size="sm" className="rounded-xl bg-zinc-50 hover:bg-zinc-100 h-8 w-8 p-0"><Download className="w-3.5 h-3.5" /></Button>
          </div>
       </CardContent>
    </Card>
  );
}
