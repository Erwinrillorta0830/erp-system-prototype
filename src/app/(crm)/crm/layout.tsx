"use client";

import React from "react";
import { CRMProvider } from "@/modules/crm/context/crm-context";
import { ModuleLayout, NavItem } from "@/components/layouts/ModuleLayout";
import { 
  Users, 
  LayoutDashboard, 
  Target, 
  FileText, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  UserPlus
} from "lucide-react";

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { name: "Customers", href: "/crm/customers", icon: Users },
  { name: "Leads", href: "/crm/leads", icon: UserPlus },
  { name: "Pipeline", href: "/crm/pipeline", icon: Target },
  { name: "Quotations", href: "/crm/quotes", icon: FileText },
  { name: "Activities", href: "/crm/activities", icon: Calendar },
  { name: "Complaints", href: "/crm/complaints", icon: MessageSquare },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <CRMProvider>
      <ModuleLayout
        moduleName="CRM Pro"
        moduleIcon={TrendingUp}
        navItems={navItems}
        themeColor="indigo"
        searchPlaceholder="Universal CRM Search (Customer, Quote#, Lead...)"
      >
        {children}
      </ModuleLayout>
    </CRMProvider>
  );
}
