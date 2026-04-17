"use client";

import React from 'react';
import { 
  Users, UserCheck, Clock, Calendar, 
  ArrowUpRight, FileText, AlertCircle 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHRM } from '../context/hrm-context';

export default function HRDashboard() {
  const { employees, attendanceLogs, leaveRequests, overtimeRequests, branches } = useHRM();

  // Computations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Regular' || e.status === 'Probationary').length;
  const pendingLeaves = leaveRequests.filter(r => r.status === 'Pending').length;
  const pendingOT = overtimeRequests.filter(o => o.status === 'Pending').length;

  // Chart Data: Employees per Branch
  const branchData = branches.map(b => ({
    name: b.name,
    count: employees.filter(e => e.branchId === b.id).length
  }));

  // Chart Data: Status Distribution
  const statusData = [
    { name: 'Regular', value: employees.filter(e => e.status === 'Regular').length, color: '#10b981' },
    { name: 'Probation', value: employees.filter(e => e.status === 'Probationary').length, color: '#f59e0b' },
    { name: 'Resigned', value: employees.filter(e => e.status === 'Resigned').length, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-6 bg-zinc-50/50 min-h-screen">
      <div className="flex justify-between items-center text-black">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Management</h1>
          <p className="text-muted-foreground">Workforce overview and monitoring dashboard.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1 bg-white">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            {new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIItem 
          title="Total Headcount" 
          value={totalEmployees} 
          icon={<Users className="w-5 h-5" />} 
          trend="+2 this month"
          color="blue"
        />
        <KPIItem 
          title="Active Staff" 
          value={activeEmployees} 
          icon={<UserCheck className="w-5 h-5" />} 
          trend="92% of total"
          color="green"
        />
        <KPIItem 
          title="Pending Leaves" 
          value={pendingLeaves} 
          icon={<Calendar className="w-5 h-5" />} 
          trend="Needs approval"
          color="orange"
        />
        <KPIItem 
          title="Manual Logs" 
          value={attendanceLogs.length} 
          icon={<ArrowUpRight className="w-5 h-5" />} 
          trend="Today's total"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Distribution Chart */}
        <Card className="lg:col-span-2 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-blue-500" />
              Staff Distribution by Branch
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Employment Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-zinc-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Pending Requests */}
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">{pendingLeaves + pendingOT} Total</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.filter(r => r.status === 'Pending').slice(0, 3).map(request => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                      {employees.find(e => e.id === request.employeeId)?.firstName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{employees.find(e => e.id === request.employeeId)?.fullName}</p>
                      <p className="text-xs text-zinc-500">{request.leaveType} Leave • {request.startDate}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Review</Badge>
                </div>
              ))}
              {pendingLeaves === 0 && <p className="text-sm text-center text-zinc-400 py-4">No pending leave requests.</p>}
            </div>
          </CardContent>
        </Card>

        {/* HR Alerts */}
        <Card className="shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <AlertItem 
                title="8 Employees with Expiring Documents" 
                subtitle="NBI and Health Certificates due this month."
                icon={<FileText className="w-4 h-4" />}
                type="warning"
              />
              <AlertItem 
                title="Shift Conflict in Warehouse" 
                subtitle="Overlap detected for 3 employees on Sunday shift."
                icon={<Calendar className="w-4 h-4" />}
                type="danger"
              />
              <AlertItem 
                title="Review Probationary Staff" 
                subtitle="5 staff members up for regularization review."
                icon={<UserCheck className="w-4 h-4" />}
                type="info"
              />
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPIItem({ title, value, icon, trend, color }: { title: string, value: number, icon: React.ReactNode, trend: string, color: 'blue' | 'green' | 'orange' | 'purple' }) {
  const colorMaps = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <Card className="shadow-sm border-zinc-200">
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-xl border ${colorMaps[color]}`}>
            {icon}
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">{trend}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ title, subtitle, icon, type }: { title: string, subtitle: string, icon: React.ReactNode, type: 'warning' | 'danger' | 'info' }) {
  const styles = {
    warning: 'bg-orange-50 text-orange-700 border-orange-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <li className={`p-3 rounded-lg border ${styles[type]} flex gap-3 items-start`}>
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-xs opacity-80 mt-1">{subtitle}</p>
      </div>
    </li>
  );
}
