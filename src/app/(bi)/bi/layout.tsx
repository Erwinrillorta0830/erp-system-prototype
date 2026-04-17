import React from "react";
import { BIFilterProvider } from "@/modules/bi/context/BIFilterContext";
import Link from "next/link";
import { BarChart3, TrendingUp, Package, Truck, Users, LayoutDashboard, FileSpreadsheet } from "lucide-react";

export default function BILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* BI Sidebar Navigation */}
      <div className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <BarChart3 className="text-blue-600" />
            BI & Analytics
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 mt-4 ml-2">Core Dashboards</div>
          <Link href="/bi" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Executive
          </Link>
          <Link href="/bi/sales" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
            <TrendingUp className="w-4 h-4" /> Sales
          </Link>
          <Link href="/bi/inventory" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
            <Package className="w-4 h-4" /> Inventory
          </Link>
          <Link href="/bi/suppliers" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
            <Truck className="w-4 h-4" /> Suppliers
          </Link>

          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 mt-8 ml-2">Tools</div>
          <Link href="/bi/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors">
            <FileSpreadsheet className="w-4 h-4" /> Report Center
          </Link>
        </div>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
           <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center justify-center py-2 px-4 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              &larr; Back to ERP
           </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
         <BIFilterProvider>
           {children}
         </BIFilterProvider>
      </div>
    </div>
  );
}
