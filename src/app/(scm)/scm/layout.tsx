"use client";

import React from "react";
import { SCMProvider } from "@/modules/scm/context/scm-context";
import { ModuleLayout, NavItem } from "@/components/layouts/ModuleLayout";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Truck, 
  Home, 
  Warehouse, 
  Users
} from "lucide-react";

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/scm", icon: Home },
  { name: "Suppliers", href: "/scm/suppliers", icon: Users },
  { name: "Product Catalog", href: "/scm/catalog", icon: Package },
  { name: "Purchase Orders", href: "/scm/pos", icon: ShoppingCart },
  { name: "Shipments", href: "/scm/shipments", icon: Truck },
  { name: "Receiving", href: "/scm/receiving", icon: Truck },
  { name: "Inventory", href: "/scm/inventory", icon: Warehouse },
];

export default function SCMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SCMProvider>
      <ModuleLayout
        moduleName="MotorERP SCM"
        moduleIcon={BarChart3}
        navItems={navItems}
        themeColor="blue"
        searchPlaceholder="Quick search (Supplier, PO#, Part...)"
      >
        {children}
      </ModuleLayout>
    </SCMProvider>
  );
}
