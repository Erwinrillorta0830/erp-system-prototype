"use client";

import React from "react";
import { HRMProvider } from "@/modules/hrm/context/hrm-context";
import { ModuleLayout, NavItem } from "@/components/layouts/ModuleLayout";
import { 
  BarChart3, 
  Users, 
  Clock, 
  FileCheck, 
  Settings, 
  Layers,
  Fingerprint
} from 'lucide-react';

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/hrm", icon: BarChart3 },
  { name: "Employee Directory", href: "/hrm/directory", icon: Users },
  { name: "Time & Attendance", href: "/hrm/attendance", icon: Clock },
  { name: "Shift Roster", href: "/hrm/shifts", icon: Layers },
  { name: "Request Center", href: "/hrm/requests", icon: FileCheck },
  { name: "Configurations", href: "/hrm/settings", icon: Settings },
];

export default function HRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <HRMProvider>
      <ModuleLayout
        moduleName="HRM Hub"
        moduleIcon={Fingerprint}
        navItems={navItems}
        themeColor="blue"
        searchPlaceholder="Search employees, records, or help..."
      >
        {children}
      </ModuleLayout>
    </HRMProvider>
  );
}
