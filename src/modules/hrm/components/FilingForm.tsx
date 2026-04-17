"use client";

import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHRM } from '../context/hrm-context';
import { Calendar, Clock, FileText, Send } from 'lucide-react';

interface FilingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'leave' | 'overtime';
}

export default function FilingForm({ open, onOpenChange, type }: FilingFormProps) {
  const { employees, leaveRequests, overtimeRequests, updateRequestStatus, addOvertime } = useHRM();
  
  // For mock simulation, we assume user is the first regular employee
  const mockUser = employees.find(e => e.status === 'Regular');

  const [formData, setFormData] = useState({
    leaveType: 'Vacation',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
    hours: '1',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockUser) return;

    if (type === 'leave') {
      addLeave({
        id: `leave-${Date.now()}`,
        employeeId: mockUser.id,
        leaveType: formData.leaveType as any,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        status: 'Pending',
        appliedDate: new Date().toISOString().split('T')[0]
      });
    } else {
      addOvertime({
        id: `ot-${Date.now()}`,
        employeeId: mockUser.id,
        date: formData.date,
        hours: parseFloat(formData.hours),
        reason: formData.reason,
        status: 'Pending'
      });
    }
    
    onOpenChange(false);
    setFormData({
      leaveType: 'Vacation',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: '',
      hours: '1',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className={cn("p-8 text-white", type === 'leave' ? 'bg-blue-600' : 'bg-orange-600')}>
            <DialogTitle className="text-2xl font-black">
               {type === 'leave' ? 'Apply for Leave' : 'File Overtime'}
            </DialogTitle>
            <p className="text-white/70 font-medium mt-1">
               {type === 'leave' ? 'Submit your absence request for approval.' : 'Request compensation for extended hours.'}
            </p>
          </DialogHeader>

          <div className="p-8 space-y-6 bg-white">
            {type === 'leave' ? (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Leave Type</label>
                  <Select 
                    value={formData.leaveType} 
                    onValueChange={v => setFormData({...formData, leaveType: v})}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-zinc-200">
                      <SelectItem value="Vacation">Vacation Leave</SelectItem>
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Emergency">Emergency Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Start Date</label>
                    <Input 
                      type="date"
                      value={formData.startDate} 
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">End Date</label>
                    <Input 
                      type="date"
                      value={formData.endDate} 
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                      className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">OT Date</label>
                    <Input 
                      type="date"
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hours</label>
                    <Input 
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={formData.hours} 
                      onChange={e => setFormData({...formData, hours: e.target.value})}
                      className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Reason / Remarks</label>
              <textarea 
                required
                value={formData.reason} 
                onChange={e => setFormData({...formData, reason: e.target.value})}
                className="w-full p-4 rounded-xl bg-zinc-50 border-zinc-100 font-medium text-sm focus:outline-blue-200 min-h-[100px]" 
                placeholder="Explain the reason for this request..."
              />
            </div>
          </div>

          <DialogFooter className="p-6 bg-zinc-50 flex items-center gap-3">
             <DialogClose asChild>
                <Button type="button" variant="ghost" className="rounded-xl font-bold h-12 px-6">Discard</Button>
             </DialogClose>
             <Button type="submit" className={cn("rounded-xl font-black h-12 px-8 shadow-lg", 
                type === 'leave' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-100')}>
                <Send className="w-4 h-4 mr-2" /> Submit Request
             </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { cn } from '@/lib/utils';
