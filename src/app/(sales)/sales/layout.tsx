"use client";

import React from "react";
import { SalesProvider } from "@/modules/sales/context/sales-context";
import { ModuleLayout, NavItem } from "@/components/layouts/ModuleLayout";
import {
  LayoutDashboard, ShoppingCart, FileText, ClipboardList,
  Truck, RotateCcw, Tag, Zap
} from "lucide-react";

const navItems: NavItem[] = [
  { name: "Dashboard",     href: "/sales",             icon: LayoutDashboard },
  { name: "POS / Walk-in", href: "/sales/pos",         icon: ShoppingCart    },
  { name: "Quotations",    href: "/sales/quotes",       icon: FileText        },
  { name: "Sales Orders",  href: "/sales/orders",       icon: ClipboardList   },
  { name: "Invoices",      href: "/sales/invoices",     icon: FileText        },
  { name: "Fulfillment",   href: "/sales/fulfillment",  icon: Truck           },
  { name: "Returns",       href: "/sales/returns",      icon: RotateCcw       },
  { name: "Pricing",       href: "/sales/pricing",      icon: Tag             },
];

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SalesProvider>
      <ModuleLayout
        moduleName="Sales Hub"
        moduleIcon={Zap}
        navItems={navItems}
        themeColor="emerald"
        searchPlaceholder="Search Sales (SO#, INV#, Customer, Part No...)"
      >
        {children}
      </ModuleLayout>
    </SalesProvider>
  );
}
