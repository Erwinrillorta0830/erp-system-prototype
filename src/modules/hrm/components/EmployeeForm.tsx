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
import { Employee, EmploymentStatus } from '../types/hrm.types';
import { User, Mail, Phone, Building2, Briefcase, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee; // If provided, we are editing
}

export default function EmployeeForm({ open, onOpenChange, employee }: EmployeeFormProps) {
  const { addEmployee, updateEmployee, branches, departments, positions } = useHRM();
  
  const [formData, setFormData] = useState<Partial<Employee>>(() => employee || {
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    branchId: '',
    deptId: '',
    positionId: '',
    status: 'Probationary',
    hireDate: new Date().toISOString().split('T')[0],
    employeeCode: `EMP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullEmployee = {
      ...formData,
      id: employee?.id || `emp-${Date.now()}`,
      fullName: `${formData.firstName} ${formData.lastName}`
    } as Employee;

    if (employee) {
      updateEmployee(fullEmployee);
    } else {
      addEmployee(fullEmployee);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-8 bg-zinc-900 text-white">
            <DialogTitle className="text-2xl font-black">{employee ? 'Edit Employee Profile' : 'Onboard New Employee'}</DialogTitle>
            <p className="text-zinc-400 font-medium mt-1">Fill in the official details for the employee record.</p>
          </DialogHeader>

          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <User className="w-3 h-3" /> First Name
                </label>
                <Input 
                  required
                  value={formData.firstName} 
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <User className="w-3 h-3" /> Last Name
                </label>
                <Input 
                  required
                  value={formData.lastName} 
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <Input 
                  type="email"
                  required
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Contact Number
                </label>
                <Input 
                  required
                  value={formData.contactNo} 
                  onChange={e => setFormData({...formData, contactNo: e.target.value})}
                  className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold" 
                />
              </div>
            </div>

            <Separator className="bg-zinc-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Branch Assignment
                </label>
                <Select 
                  value={formData.branchId} 
                  onValueChange={v => setFormData({...formData, branchId: v ?? ""})}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200">
                    {branches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Department
                </label>
                <Select 
                  value={formData.deptId} 
                  onValueChange={v => setFormData({...formData, deptId: v ?? ""})}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold">
                    <SelectValue placeholder="Select Dept" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200">
                    {departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Position
                </label>
                <Select 
                  value={formData.positionId} 
                  onValueChange={v => setFormData({...formData, positionId: v ?? ""})}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold">
                    <SelectValue placeholder="Select Position" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200">
                    {positions.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <CreditCard className="w-3 h-3" /> Employment Status
                </label>
                <Select 
                  value={formData.status} 
                  onValueChange={v => setFormData({...formData, status: (v as EmploymentStatus) ?? "Probationary"})}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100 font-bold">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-200">
                    <SelectItem value="Probationary">Probationary</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Contractual">Contractual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 bg-zinc-50 flex items-center gap-3">
             <DialogClose render={
                <Button type="button" variant="ghost" className="rounded-xl font-bold h-12 px-6">Cancel</Button>
             } />
             <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700 font-black h-12 px-8 shadow-lg shadow-blue-100">
                {employee ? 'Update Record' : 'Complete Onboarding'}
             </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
