"use client";

import React, { useState } from 'react';
import { 
  Building2, Briefcase, MapPin, Calendar, 
  CreditCard, Plus, Trash2, Edit2, Shield,
  ChevronRight, Save, Globe, Landmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useHRM } from '../context/hrm-context';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

type SettingsTab = 'org' | 'branches' | 'payroll-ref' | 'holidays' | 'access';

export default function HRMSettings() {
  const { departments, positions, branches, holidays } = useHRM();
  const [activeTab, setActiveTab] = useState<SettingsTab>('org');

  const renderContent = () => {
    switch (activeTab) {
      case 'org': return <OrgSettings depts={departments} positions={positions} />;
      case 'branches': return <BranchSettings branches={branches} />;
      case 'payroll-ref': return <PayrollReferenceSettings />;
      case 'holidays': return <HolidaySettings holidays={holidays} />;
      case 'access': return <UserAccessSettings />;
      default: return null;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 bg-zinc-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Module Settings</h1>
          <p className="text-muted-foreground mt-1 font-medium text-lg">System configurations and organizational setup.</p>
        </div>
        <Button className="h-12 bg-zinc-900 hover:bg-zinc-800 shadow-xl font-bold rounded-xl px-8">
           <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="w-full lg:w-72 space-y-2 shrink-0">
           <SettingsNavItem 
             icon={<Briefcase className="w-4 h-4" />} 
             label="Organization & Positions" 
             active={activeTab === 'org'} 
             onClick={() => setActiveTab('org')} 
           />
           <SettingsNavItem 
             icon={<MapPin className="w-4 h-4" />} 
             label="Branch Assignments" 
             active={activeTab === 'branches'} 
             onClick={() => setActiveTab('branches')} 
           />
           <SettingsNavItem 
             icon={<Landmark className="w-4 h-4" />} 
             label="Payroll Reference" 
             active={activeTab === 'payroll-ref'} 
             onClick={() => setActiveTab('payroll-ref')} 
           />
           <SettingsNavItem 
             icon={<Globe className="w-4 h-4" />} 
             label="Public Holidays" 
             active={activeTab === 'holidays'} 
             onClick={() => setActiveTab('holidays')} 
           />
           <SettingsNavItem 
             icon={<Shield className="w-4 h-4" />} 
             label="User Access Control" 
             active={activeTab === 'access'} 
             onClick={() => setActiveTab('access')} 
           />
        </aside>

        {/* Settings Content Area */}
        <main className="flex-1">
           {renderContent()}
        </main>
      </div>
    </div>
  );
}

function SettingsNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full justify-start h-12 rounded-xl font-bold px-4 transition-all text-sm",
        active 
          ? "bg-white text-blue-600 shadow-sm border border-zinc-200" 
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
      )}
    >
      <span className={cn("mr-3", active ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-600")}>
        {icon}
      </span>
      {label}
    </Button>
  );
}

function OrgSettings({ depts, positions }: { depts: any[], positions: any[] }) {
  return (
    <div className="space-y-6">
       <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-zinc-100 p-8 flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-xl font-black">Departments</CardTitle>
                <CardDescription className="font-semibold mt-1">Define your business organizational units.</CardDescription>
             </div>
             <Button size="sm" className="rounded-xl bg-blue-600 font-bold px-4">
                <Plus className="w-4 h-4 mr-2" /> Add Dept
             </Button>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-zinc-100">
                {depts.map(d => (
                   <div key={d.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs uppercase">
                            {d.code}
                         </div>
                         <p className="font-bold text-zinc-900">{d.name}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-zinc-400"><Edit2 className="w-4 h-4" /></Button>
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                   </div>
                ))}
             </div>
          </CardContent>
       </Card>

       <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-zinc-100 p-8 flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-xl font-black">Positions & Roles</CardTitle>
                <CardDescription className="font-semibold mt-1">Standardize job titles and seniority levels.</CardDescription>
             </div>
             <Button size="sm" className="rounded-xl bg-blue-600 font-bold px-4">
                <Plus className="w-4 h-4 mr-2" /> Add Position
             </Button>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-zinc-100">
                {positions.slice(0, 5).map(p => (
                   <div key={p.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                         <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest">{p.level}</Badge>
                         <p className="font-bold text-zinc-900">{p.title}</p>
                      </div>
                      <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-zinc-400"><Edit2 className="w-4 h-4" /></Button>
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                   </div>
                ))}
             </div>
             <Button variant="ghost" className="w-full h-12 text-blue-600 font-bold text-xs">View All {positions.length} Positions <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </CardContent>
       </Card>
    </div>
  );
}

function BranchSettings({ branches }: { branches: any[] }) {
  return (
    <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
       <CardHeader className="p-8">
          <CardTitle className="text-xl font-black">Branches & Locations</CardTitle>
          <CardDescription className="font-semibold">Manage warehouses, liaison offices, and retail showrooms.</CardDescription>
       </CardHeader>
       <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {branches.map(b => (
                <div key={b.id} className="p-6 rounded-3xl border border-zinc-100 bg-zinc-50 flex items-center justify-between hover:border-blue-200 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                         <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="font-black text-zinc-900">{b.name}</p>
                         <p className="text-xs font-bold text-zinc-400">{b.location} • {b.type}</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400"><ChevronRight className="w-5 h-5" /></Button>
                </div>
             ))}
             <div className="p-6 rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 hover:bg-zinc-100 cursor-pointer group py-10">
                <Plus className="w-8 h-8 mb-2 group-hover:text-blue-600 transition-colors" />
                <p className="font-black text-sm text-zinc-900">Add New Branch</p>
             </div>
          </div>
       </CardContent>
    </Card>
  );
}

function PayrollReferenceSettings() {
  return (
    <div className="space-y-6">
       <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8">
             <CardTitle className="text-xl font-black">Earnings & Allowances</CardTitle>
             <CardDescription className="font-semibold">Setup recurring income types for payroll mapping.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
             <ReferenceItem label="Rice Subsidy" category="Taxable" rate="Monthly ₱2,500" />
             <ReferenceItem label="Clothing Allowance" category="Non-Taxable" rate="Monthly ₱1,000" />
             <ReferenceItem label="Hazard Pay" category="Taxable" rate="Per-Day ₱200" />
             <Button variant="outline" className="w-full mt-4 h-11 rounded-2xl border-zinc-200 font-bold border-dashed text-zinc-400">Add Income Type</Button>
          </CardContent>
       </Card>

       <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
          <CardHeader className="p-8">
             <CardTitle className="text-xl font-black">Deduction Rules</CardTitle>
             <CardDescription className="font-semibold">Configure contribution schedules and mandatory deductions.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
             <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                   Government contribution tables (SSS, PhilHealth, Pag-IBIG) are currently using 2024 standard references. Manual overrides allowed in individual payroll profiles.
                </p>
             </div>
             <ReferenceItem label="SSS Contribution" category="Mandatory" rate="Table Based" />
             <ReferenceItem label="PhilHealth" category="Mandatory" rate="Percent Based" />
             <ReferenceItem label="Uniform Charge" category="Company" rate="One-time ₱500" />
          </CardContent>
       </Card>
    </div>
  );
}

function HolidaySettings({ holidays }: { holidays: any[] }) {
  return (
    <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
       <CardHeader className="p-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black">Public Holidays 2024</CardTitle>
            <CardDescription className="font-semibold">Manage regular and special non-working days.</CardDescription>
          </div>
          <Button size="sm" className="rounded-xl bg-blue-600 font-bold px-4">
             <Download className="w-4 h-4 mr-2" /> Sync Gov.
          </Button>
       </CardHeader>
       <CardContent className="p-0">
          <div className="divide-y divide-zinc-100">
             {holidays.map(h => (
                <div key={h.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                   <div className="flex items-center gap-6">
                      <div className="text-center w-12 shrink-0">
                         <p className="text-[10px] font-black text-blue-600 uppercase mb-0.5">{h.date.split('-')[1]}</p>
                         <p className="text-2xl font-black text-zinc-900 leading-none">{h.date.split('-')[2]}</p>
                      </div>
                      <div>
                         <p className="font-black text-zinc-900">{h.name}</p>
                         <Badge variant="secondary" className="text-[9px] font-black uppercase mt-1">{h.type.replace('Special Non-Working', 'Special')}</Badge>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon" className="text-zinc-400"><Trash2 className="w-4 h-4" /></Button>
                </div>
             ))}
          </div>
       </CardContent>
    </Card>
  );
}

function UserAccessSettings() {
  return (
    <Card className="rounded-[2rem] border-zinc-200 shadow-sm overflow-hidden">
       <CardHeader className="p-8">
          <CardTitle className="text-xl font-black">Access Roles Mapping</CardTitle>
          <CardDescription className="font-semibold">Define who can perform HR actions and approvals.</CardDescription>
       </CardHeader>
       <CardContent className="p-8 pt-0 space-y-4">
          <RoleItem role="HR Admin" permissions="Full module access, Global settings, Final approvals" />
          <RoleItem role="HR Manager" permissions="Staff management, Leave/OT approvals, Performance reviews" />
          <RoleItem role="Payroll Staff" permissions="Attendance oversight, Payroll references, Document verification" />
          <RoleItem role="Branch Manager" permissions="Branch-restricted oversight, Attendance viewing" />
          <RoleItem role="Base Employee" permissions="Self-service: Profile, Filings, Personal clock-logs" />
       </CardContent>
    </Card>
  );
}

function ReferenceItem({ label, category, rate }: { label: string, category: string, rate: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-zinc-100 flex items-center justify-between">
       <div>
          <p className="font-black text-zinc-900">{label}</p>
          <p className="text-xs font-bold text-zinc-400">{category}</p>
       </div>
       <div className="text-right">
          <p className="text-sm font-black text-blue-600">{rate}</p>
          <Badge variant="ghost" className="text-[10px] font-black uppercase text-zinc-400 p-0">FIXED REF</Badge>
       </div>
    </div>
  );
}

function RoleItem({ role, permissions }: { role: string, permissions: string }) {
  return (
    <div className="p-6 rounded-3xl border border-zinc-100 bg-white hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
       <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
             <Shield className="w-4 h-4 text-blue-600" />
             <p className="font-black text-zinc-900">{role}</p>
          </div>
          <p className="text-xs font-semibold text-zinc-500">{permissions}</p>
       </div>
       <Button variant="link" className="text-blue-600 font-bold p-0 justify-start">Edit Permissions</Button>
    </div>
  );
}
