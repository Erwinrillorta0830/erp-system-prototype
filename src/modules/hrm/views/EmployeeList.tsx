"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { 
  Search, Filter, UserPlus, 
  MoreVertical, Phone, ArrowRight,
  Briefcase, Building2, BadgeCheck, Mail,
  LayoutGrid, List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useHRM } from '../context/hrm-context';
import { cn } from '@/lib/utils';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../types/hrm.types';

export default function EmployeeList() {
  const { employees, branches, departments, positions } = useHRM();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);

  const handleCreate = () => {
    setEditingEmployee(undefined);
    setIsFormOpen(true);
  };

  const _handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const filteredEmployees = employees.filter(e => 
    e.fullName.toLowerCase().includes(search.toLowerCase()) ||
    e.employeeCode.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Regular': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'Probationary': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Resigned': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      case 'Terminated': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20';
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 bg-zinc-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Employee Directory</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage your workforce, departments, and branch assignments.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white rounded-xl border border-zinc-200 p-1 mr-2">
             <Button 
               variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
               size="icon" 
               className="h-8 w-8 rounded-lg"
               onClick={() => setViewMode('grid')}
             >
               <LayoutGrid className="h-4 w-4" />
             </Button>
             <Button 
               variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
               size="icon" 
               className="h-8 w-8 rounded-lg"
               onClick={() => setViewMode('table')}
             >
               <List className="h-4 w-4" />
             </Button>
          </div>
          <Button 
            onClick={handleCreate}
            className="h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 font-bold rounded-xl px-8 transition-all hover:scale-[1.02] active:scale-95"
          >
            <UserPlus className="mr-2 h-5 w-5" /> Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard label="Total Headcount" value={employees.length} sub="Overall staff count" />
        <StatCard label="Active Staff" value={employees.filter(e => e.status === 'Regular').length} sub="Full-time regular" color="emerald" />
        <StatCard label="Probation" value={employees.filter(e => e.status === 'Probationary').length} sub="Under review" color="amber" />
        <StatCard label="Resigned/Exit" value={employees.filter(e => e.status === 'Resigned').length} sub="YTD Turnover" color="rose" />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm transition-all focus-within:shadow-md">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search by Name, Employee ID, or Email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-muted/20 border-none shadow-none focus-visible:ring-2 focus-visible:ring-blue-100 text-sm font-medium rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 border-zinc-200 bg-white rounded-xl font-bold px-6 hover:bg-zinc-50">
            <Filter className="mr-2 h-4 w-4" /> All Branches
          </Button>
          <Separator orientation="vertical" className="h-12 hidden md:block" />
          <Button variant="ghost" className="h-12 font-bold text-xs uppercase tracking-widest px-4 rounded-xl bg-blue-50 text-blue-700">All</Button>
          <Button variant="ghost" className="h-12 font-bold text-xs uppercase tracking-widest px-4 rounded-xl text-zinc-500 hover:text-blue-600">Active</Button>
          <Button variant="ghost" className="h-12 font-bold text-xs uppercase tracking-widest px-4 rounded-xl text-zinc-500 hover:text-blue-600">Offboarded</Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="group relative overflow-hidden border-zinc-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 rounded-[1.5rem] flex flex-col">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-inner overflow-hidden">
                      {employee.avatarUrl ? (
                         <img src={employee.avatarUrl} alt={employee.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-black text-blue-600">{employee.firstName[0]}{employee.lastName[0]}</span>
                      )}
                    </div>
                    <Badge className={cn("absolute -bottom-1 -right-1 text-[8px] font-bold uppercase tracking-widest border-2 border-white", getStatusColor(employee.status))}>
                      {employee.status}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black tracking-tight group-hover:text-blue-600 transition-colors">{employee.fullName}</CardTitle>
                    <CardDescription className="font-bold text-[10px] uppercase tracking-wider text-blue-500/70">
                      {positions.find(p => p.id === employee.positionId)?.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col pt-0">
                <Separator className="bg-zinc-100" />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-zinc-500">
                    <Building2 className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold">{branches.find(b => b.id === employee.branchId)?.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold">{departments.find(d => d.id === employee.deptId)?.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <Mail className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold truncate">{employee.email}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button 
                    variant="secondary" 
                    className="w-full h-10 rounded-xl bg-zinc-50 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all duration-300 active:scale-95 group/btn"
                  >
                    View 360 Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
              <div className="px-6 pb-4 flex justify-between items-center text-[10px] font-bold text-zinc-400 border-t border-zinc-50 pt-3 bg-zinc-50/30">
                <span>Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
                <span className="font-mono">{employee.employeeCode}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="border-zinc-200 overflow-hidden rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-50 text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Branch</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-xs text-blue-600 overflow-hidden border border-zinc-200">
                           {employee.avatarUrl ? <img alt="" src={employee.avatarUrl} className="w-full h-full object-cover" /> : employee.firstName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none">{employee.fullName}</p>
                          <p className="text-[10px] text-zinc-400 mt-1 font-mono">{employee.employeeCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-zinc-600">{positions.find(p => p.id === employee.positionId)?.title}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{departments.find(d => d.id === employee.deptId)?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-zinc-600">{branches.find(b => b.id === employee.branchId)?.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={cn("text-[9px] font-black uppercase tracking-tighter", getStatusColor(employee.status))}>
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-zinc-600 flex items-center gap-1.5"><Mail className="h-3 w-3" /> {employee.email}</span>
                        <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1.5"><Phone className="h-3 w-3" /> {employee.contactNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <EmployeeForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        employee={editingEmployee} 
      />
    </div>
  );
}

function StatCard({ label, value, sub, color = 'blue' }: { label: string, value: number, sub: string, color?: 'blue' | 'emerald' | 'amber' | 'rose' }) {
  const styles = {
    blue: 'border-blue-100 bg-blue-50/20 text-blue-600',
    emerald: 'border-emerald-100 bg-emerald-50/20 text-emerald-600',
    amber: 'border-amber-100 bg-amber-50/20 text-amber-600',
    rose: 'border-rose-100 bg-rose-50/20 text-rose-600'
  };

  return (
    <Card className="border-zinc-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardDescription className="text-[10px] font-black uppercase tracking-widest">{label}</CardDescription>
        <CardTitle className="text-3xl font-black tracking-tighter flex items-center justify-between">
          {value}
          <div className={cn("p-1.5 rounded-lg border text-xs", styles[color])}>
            <BadgeCheck className="h-3.5 w-3.5" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[10px] font-bold text-zinc-400">{sub}</p>
      </CardContent>
    </Card>
  );
}
