"use client";

import React, { useState } from 'react';
import { 
  BarChart3, Users, Clock, FileCheck, 
  Settings, LogOut, Search, Bell, User as UserIcon,
  ChevronRight, Menu, Layers
} from 'lucide-react';
import { HRMProvider, useHRM } from './context/hrm-context';
import HRDashboard from './views/Dashboard';
import EmployeeList from './views/EmployeeList';
import EmployeeDetails from './views/EmployeeDetails';
import AttendanceHub from './views/AttendanceHub';
import RequestCenter from './views/RequestCenter';
import HRMSettings from './views/HRMSettings';
import ScheduleManager from './views/ScheduleManager';
import FilingForm from './components/FilingForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type HRMView = 'dashboard' | 'directory' | 'attendance' | 'requests' | 'settings' | 'details' | 'shifts';

export default function HRMModule() {
  const [activeView, setActiveView] = useState<HRMView>('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const [isFilingOpen, setIsFilingOpen] = useState(false);
  const [filingType, setFilingType] = useState<'leave' | 'overtime'>('leave');

  const handleFile = (type: 'leave' | 'overtime') => {
    setFilingType(type);
    setIsFilingOpen(true);
  };

  const navigateToDetails = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveView('details');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <HRDashboard />;
      case 'directory': return <EmployeeList />;
      case 'details': return selectedEmployeeId ? (
        <EmployeeDetails 
          employeeId={selectedEmployeeId} 
          onBack={() => setActiveView('directory')} 
        />
      ) : <EmployeeList />;
      case 'attendance': return <AttendanceHub />;
      case 'requests': return <RequestCenter />;
      case 'shifts': return <ScheduleManager />;
      case 'settings': return <HRMSettings />;
      default: return <HRDashboard />;
    }
  };

  return (
    <HRMProvider>
      <div className="flex h-screen bg-zinc-50 font-sans">
        {/* Module Sidebar */}
        <aside className="w-72 bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-800">
          <div className="p-8">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/40">
                  M
               </div>
               <div>
                  <h1 className="text-white font-black tracking-tight leading-none text-lg">MotorERP</h1>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">HR Subsystem</p>
               </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <SidebarItem 
              icon={<BarChart3 className="w-5 h-5" />} 
              label="HR Dashboard" 
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')} 
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label="Employee Directory" 
              active={activeView === 'directory' || activeView === 'details'} 
              onClick={() => setActiveView('directory')} 
            />
            <SidebarItem 
              icon={<Clock className="w-5 h-5" />} 
              label="Time & Attendance" 
              active={activeView === 'attendance'} 
              onClick={() => setActiveView('attendance')} 
            />
            <SidebarItem 
              icon={<Layers className="w-5 h-5" />} 
              label="Shift Roster" 
              active={activeView === 'shifts'} 
              onClick={() => setActiveView('shifts')} 
            />
            <SidebarItem 
              icon={<FileCheck className="w-5 h-5" />} 
              label="Request Center" 
              active={activeView === 'requests'} 
              onClick={() => setActiveView('requests')} 
              badge="5"
            />
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label="Configurations" 
              active={activeView === 'settings'} 
              onClick={() => setActiveView('settings')} 
            />
          </nav>

          <div className="p-6 mt-auto">
             <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
                     <UserIcon className="w-5 h-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">HR Admin User</p>
                      <p className="text-[10px] text-zinc-500 truncate">admin@motorparts.ph</p>
                   </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 h-9 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 justify-start px-3 font-bold text-xs ring-0">
                   <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0">
             <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" className="lg:hidden">
                   <Menu className="w-6 h-6" />
                </Button>
                <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-400">
                   <span>Human Resources</span>
                   <ChevronRight className="w-4 h-4" />
                   <span className="text-zinc-900 capitalize">{activeView.replace('-', ' ')}</span>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="hidden sm:flex gap-2 mr-4">
                   <Button 
                     onClick={() => handleFile('leave')}
                     variant="outline" 
                     className="h-10 rounded-xl border-blue-200 text-blue-600 font-bold px-4 hover:bg-blue-50"
                   >
                      Apply Leave
                   </Button>
                   <Button 
                     onClick={() => handleFile('overtime')}
                     variant="outline" 
                     className="h-10 rounded-xl border-orange-200 text-orange-600 font-bold px-4 hover:bg-orange-50"
                   >
                      File Overtime
                   </Button>
                </div>

                <div className="relative hidden xl:block w-72">
                   <Search className="absolute left-4 top-2.5 h-4 w-4 text-zinc-400" />
                   <Input 
                     placeholder="Search records, employees, or help..." 
                     className="pl-11 bg-zinc-50 border-none rounded-xl h-10 font-medium text-xs focus-visible:ring-1 focus-visible:ring-blue-100" 
                   />
                </div>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-zinc-50 text-zinc-500 hover:bg-zinc-100 ring-0">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                </Button>
                <div className="h-10 w-[1px] bg-zinc-100 mx-2" />
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-zinc-50 text-zinc-500 hover:bg-zinc-100 ring-0">
                   <Settings className="w-5 h-5" />
                </Button>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto">
             {renderView()}
          </div>
        </main>
      </div>

      <FilingForm 
        open={isFilingOpen} 
        onOpenChange={setIsFilingOpen} 
        type={filingType} 
      />
    </div>
  </HRMProvider>
  );
}

function SidebarItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ring-0 outline-none",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
          : "hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-zinc-500 group-hover:text-blue-500")}>
          {icon}
        </span>
        <span className="text-xs font-black tracking-wide uppercase">{label}</span>
      </div>
      {badge && (
        <Badge className={cn("text-[9px] font-black h-5 px-1.5 border-none", active ? "bg-blue-400 text-white" : "bg-blue-600/10 text-blue-500")}>
          {badge}
        </Badge>
      )}
    </button>
  );
}
