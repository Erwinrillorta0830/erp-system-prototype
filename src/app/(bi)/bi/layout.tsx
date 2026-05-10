"use client";

import React from "react";
import { BIFilterProvider } from "@/modules/bi/context/BIFilterContext";
import { ModuleLayout, NavItem } from "@/components/layouts/ModuleLayout";
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Truck, 
  LayoutDashboard, 
  FileSpreadsheet 
} from "lucide-react";

const navItems: NavItem[] = [
  { name: "Executive", href: "/bi", icon: LayoutDashboard },
  { name: "Sales Analytics", href: "/bi/sales", icon: TrendingUp },
  { name: "Inventory Analytics", href: "/bi/inventory", icon: Package },
  { name: "Supplier Performance", href: "/bi/suppliers", icon: Truck },
  { name: "Report Center", href: "/bi/reports", icon: FileSpreadsheet },
];

export default function BILayout({ children }: { children: React.ReactNode }) {
  return (
    <BIFilterProvider>
      <ModuleLayout
        moduleName="BI & Analytics"
        moduleIcon={BarChart3}
        navItems={navItems}
        themeColor="blue"
        searchPlaceholder="Search reports and dashboards..."
      >
        {children}
      </ModuleLayout>
    </BIFilterProvider>
  );
}
