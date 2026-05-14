"use client";

import React, { useState } from 'react';
import { 
  Calendar, Clock, 
  Search, Filter, ThumbsUp, ThumbsDown,
  ChevronRight, FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { useHRM } from '../context/hrm-context';
import { RequestStatus } from '../types/hrm.types';

export default function RequestCenter() {
  const { 
    leaveRequests, overtimeRequests, employees, branches, 
    approveLeave, rejectLeave, updateRequestStatus 
  } = useHRM();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Form State
  const [newRequest, setNewRequest] = useState({
    employeeId: "",
    type: "LEAVE",
    leaveType: "Sick Leave",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    reason: "",
    hours: "1", // for OT
  });

  const filteredLeaves = leaveRequests.filter(r => {
    const emp = employees.find(e => e.id === r.employeeId);
    const matchesSearch = emp?.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          emp?.employeeCode.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());

  const filteredOT = overtimeRequests.filter(r => {
    const emp = employees.find(e => e.id === r.employeeId);
    const matchesSearch = emp?.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          emp?.employeeCode.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Approved': return <Badge className="bg-emerald-500 text-white border-none uppercase text-[10px] font-black">Approved</Badge>;
      case 'Rejected': return <Badge className="bg-rose-500 text-white border-none uppercase text-[10px] font-black">Rejected</Badge>;
      case 'Pending': return <Badge className="bg-amber-500 text-white border-none uppercase text-[10px] font-black animate-pulse">Pending</Badge>;
      default: return <Badge variant="outline" className="uppercase text-[10px] font-black">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 bg-zinc-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Request Center</h1>
          <p className="text-muted-foreground mt-1 font-medium text-lg">Approve or review employee leaves and overtime.</p>
        </div>
        <div className="flex gap-4 p-2 bg-white rounded-2xl border border-zinc-200">
           <div className="px-4 py-2 border-r border-zinc-100 flex flex-col items-center">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Pending</span>
              <span className="text-lg font-black text-amber-600">
                 {leaveRequests.filter(r => r.status === 'Pending').length + overtimeRequests.filter(o => o.status === 'Pending').length}
              </span>
           </div>
           <div className="px-4 py-2 flex flex-col items-center">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total YTD</span>
              <span className="text-lg font-black text-zinc-900">
                 {leaveRequests.length + overtimeRequests.length}
              </span>
           </div>
           <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
            <DialogTrigger render={
              <Button className="h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-black rounded-xl px-8 ml-2 group">
                <FileText className="mr-2 h-5 w-5 text-blue-400" /> 
                File New Request
              </Button>
            } />
            <DialogContent className="sm:max-w-[550px] border-zinc-200 bg-card/95 backdrop-blur-xl rounded-[2.5rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-white shadow-lg shadow-zinc-200">
                    <FileText className="h-5 w-5" />
                  </div>
                  Request Filing
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground">
                  Submit a formal request for leave or overtime for administrative approval.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Staff Member</label>
                    <Select 
                      value={newRequest.employeeId}
                      onValueChange={(val) => setNewRequest(prev => ({ ...prev, employeeId: val ?? "" }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none font-bold">
                        <SelectValue placeholder="Select Requester" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-zinc-200 shadow-2xl">
                        {employees.map(e => (
                          <SelectItem key={e.id} value={e.id} className="font-bold text-xs">{e.fullName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Request Category</label>
                      <Select 
                        value={newRequest.type}
                        onValueChange={(val) => setNewRequest(prev => ({ ...prev, type: (val as "LEAVE" | "OT") ?? "LEAVE" }))}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none font-bold">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-zinc-200 shadow-2xl">
                          <SelectItem value="LEAVE" className="font-bold text-xs text-orange-600">Leave Absence</SelectItem>
                          <SelectItem value="OT" className="font-bold text-xs text-blue-600">Overtime / Undertime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newRequest.type === "LEAVE" ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Leave Classification</label>
                        <Select 
                          value={newRequest.leaveType}
                          onValueChange={(val) => setNewRequest(prev => ({ ...prev, leaveType: val ?? "" }))}
                        >
                          <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none font-bold">
                            <SelectValue placeholder="Classification" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-zinc-200 shadow-2xl">
                            {["Sick Leave", "Vacation Leave", "Emergency Leave", "Paternity/Maternity"].map(t => (
                              <SelectItem key={t} value={t} className="font-bold text-xs">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Duration (Hours)</label>
                        <Input 
                          type="number"
                          value={newRequest.hours}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, hours: e.target.value }))}
                          className="h-12 rounded-xl bg-zinc-50 border-none font-bold"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Starting From</label>
                      <Input 
                        type="date"
                        value={newRequest.startDate}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, startDate: e.target.value }))}
                        className="h-12 rounded-xl bg-zinc-50 border-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Ending On</label>
                      <Input 
                        type="date"
                        value={newRequest.endDate}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, endDate: e.target.value }))}
                        className="h-12 rounded-xl bg-zinc-50 border-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Justification / Remarks</label>
                    <Input 
                      placeholder="State the reason for this request..."
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, reason: e.target.value }))}
                      className="h-12 rounded-xl bg-zinc-50 border-none font-bold"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 px-0 pb-0">
                <Button variant="ghost" className="h-12 font-black rounded-xl px-6" onClick={() => setIsNewRequestOpen(false)}>Cancel Filing</Button>
                <Button 
                  className="h-12 bg-blue-600 hover:bg-blue-700 font-black rounded-xl px-10 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  onClick={() => setIsNewRequestOpen(false)}
                >
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] border border-zinc-200 shadow-sm">
        <div className="relative group flex-1">
           <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
           <Input 
             placeholder="Search requester name or code..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="pl-12 h-12 bg-zinc-50 border-none rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-blue-50" 
           />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as RequestStatus | 'ALL')}>
           <SelectTrigger className="h-12 w-full md:w-48 bg-zinc-50 border-none rounded-xl font-bold text-zinc-600">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Status" />
              </div>
           </SelectTrigger>
           <SelectContent className="rounded-xl border-zinc-200 shadow-xl">
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
           </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="leaves" className="w-full">
        <TabsList className="bg-transparent h-auto p-0 gap-6 border-b border-zinc-200 w-full justify-start rounded-none">
          <TabsTrigger value="leaves" className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 font-bold text-lg h-full transition-all">
             Leave Requests
          </TabsTrigger>
          <TabsTrigger value="ot" className="rounded-none border-b-2 border-transparent px-4 pb-4 pt-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 font-bold text-lg h-full transition-all">
             Overtime / Undertime
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="leaves" className="space-y-6">
            <div className="grid gap-4">
              {filteredLeaves.map((request) => {
                const emp = employees.find(e => e.id === request.employeeId);
                const branch = branches.find(b => b.id === emp?.branchId);
                
                return (
                  <Card key={request.id} className="rounded-[2.5rem] border-zinc-200 overflow-hidden hover:border-blue-300 transition-all group hover:shadow-xl hover:shadow-blue-50">
                    <CardContent className="p-0">
                       <div className="flex flex-col lg:flex-row">
                          {/* Employee Side */}
                          <div className="lg:w-1/3 p-8 border-r border-zinc-100 bg-white group-hover:bg-blue-50/50 transition-colors">
                             <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-black text-xl text-blue-700 shadow-inner">
                                   {emp?.firstName[0]}
                                </div>
                                <div>
                                   <p className="text-lg font-black text-zinc-900 leading-tight">{emp?.fullName}</p>
                                   <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">{branch?.name}</p>
                                   <p className="text-[10px] font-mono text-blue-500 mt-1">{emp?.employeeCode}</p>
                                </div>
                             </div>
                          </div>
                          
                          {/* Request Details Side */}
                          <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                             <div className="space-y-4 flex-1">
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Duration</p>
                                      <div className="flex items-center gap-2 font-bold text-zinc-800">
                                         <Calendar className="w-4 h-4 text-blue-600" />
                                         {request.startDate} <ChevronRight className="w-3 h-3" /> {request.endDate}
                                      </div>
                                   </div>
                                   <div className="space-y-1">
                                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Leave Type</p>
                                      <div className="flex items-center gap-2 font-bold text-zinc-800">
                                         <FileText className="w-4 h-4 text-orange-600" />
                                         {request.leaveType}
                                      </div>
                                   </div>
                                </div>
                                <div className="p-4 bg-zinc-50 rounded-2xl italic text-xs text-zinc-600 border border-zinc-100">
                                   &quot;{request.reason}&quot;
                                </div>
                             </div>

                             <div className="flex flex-col items-center lg:items-end gap-3 min-w-[150px]">
                                {getStatusBadge(request.status)}
                                <p className="text-[9px] font-bold text-zinc-400 uppercase">Filed on {request.appliedDate}</p>
                                
                                {request.status === 'Pending' && (
                                  <div className="flex gap-2 mt-2">
                                     <Button 
                                       onClick={() => approveLeave(request.id, 'Manager Admin')}
                                       size="sm" 
                                       className="rounded-xl bg-emerald-600 hover:bg-emerald-700 h-10 px-4 font-bold"
                                     >
                                        <ThumbsUp className="w-4 h-4 mr-2" /> Approve
                                     </Button>
                                     <Button 
                                       onClick={() => rejectLeave(request.id)}
                                       size="sm" 
                                       variant="ghost" 
                                       className="rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 h-10 px-4 font-bold"
                                     >
                                        <ThumbsDown className="w-4 h-4 mr-2" /> Reject
                                     </Button>
                                  </div>
                                )}
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filteredLeaves.length === 0 && <p className="text-center py-20 text-zinc-400 font-bold">No leave requests found.</p>}
            </div>
          </TabsContent>

          <TabsContent value="ot" className="space-y-6">
             <div className="grid gap-4">
                {filteredOT.map(ot => {
                   const emp = employees.find(e => e.id === ot.employeeId);
                   return (
                     <Card key={ot.id} className="rounded-[2.5rem] border-zinc-200 overflow-hidden hover:border-blue-300 transition-all">
                        <CardContent className="p-8 flex items-center justify-between">
                           <div className="flex items-center gap-6">
                              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                                 <Clock className="w-8 h-8" />
                              </div>
                              <div>
                                 <p className="text-lg font-black text-zinc-900">{emp?.fullName}</p>
                                 <div className="flex items-center gap-3 mt-1 text-xs font-semibold text-zinc-500">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {ot.date}</span>
                                    <span className="flex items-center gap-1 text-blue-600"><Clock className="w-3.5 h-3.5" /> {ot.hours} Hours</span>
                                 </div>
                                 <p className="text-[11px] mt-2 italic text-zinc-400">&quot;{ot.reason}&quot;</p>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-4">
                              {getStatusBadge(ot.status)}
                              {ot.status === 'Pending' && (
                                <div className="flex gap-2">
                                   <Button 
                                     onClick={() => updateRequestStatus('overtime', ot.id, 'Approved')}
                                     variant="ghost" 
                                     className="h-10 w-10 p-0 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                   >
                                      <ThumbsUp className="w-5 h-5" />
                                   </Button>
                                   <Button 
                                     onClick={() => updateRequestStatus('overtime', ot.id, 'Rejected')}
                                     variant="ghost" 
                                     className="h-10 w-10 p-0 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100"
                                   >
                                      <ThumbsDown className="w-5 h-5" />
                                   </Button>
                                </div>
                              )}
                           </div>
                        </CardContent>
                     </Card>
                   );
                })}
                {filteredOT.length === 0 && <p className="text-center py-20 text-zinc-400 font-bold">No overtime requests found.</p>}
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
