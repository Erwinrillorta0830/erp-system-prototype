"use client";

import React from "react";
import { FilterBar } from "../components/FilterBar";
import { KpiCard } from "../components/KpiCard";
import { useSupplierAnalytics } from "../hooks/useSupplierAnalytics";

export const SupplierPerformance: React.FC = () => {
  const { totalPoValue, avgLeadTime, delayedCount, criticalCount, healthyCount, supplierDetails } = useSupplierAnalytics();

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Supplier Performance Analytics</h1>
          <p className="text-zinc-500 text-sm">Monitor lead times, delivery rates, and reliability of Thailand suppliers</p>
        </div>
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label="Total Open PO Value" 
          value={`฿ ${(totalPoValue / 1000).toLocaleString(undefined, {maximumFractionDigits:0})}k`}
          description="In Thailand Baht (THB)"
        />
        <KpiCard 
          label="Avg Lead Time" 
          value={`${avgLeadTime} Days`}
          description="From PO placement to receipt in PH"
          trend={1.2} trendDirection="down"
        />
        <KpiCard 
          label="Delayed Shipments" 
          value={delayedCount.toString()}
          description={`${criticalCount} Critical (>7 days late)`}
        />
        <KpiCard 
          label="Healthy Suppliers" 
          value={healthyCount.toString()}
          description={`Out of ${supplierDetails.length} total active`}
        />
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
         <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-4">Supplier Scorecards</h3>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
               <tr>
                 <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Supplier ID</th>
                 <th className="px-4 py-3 text-right">PO Value (THB)</th>
                 <th className="px-4 py-3 text-center">Avg Lead Time</th>
                 <th className="px-4 py-3 text-center">On-Time Delivery %</th>
                 <th className="px-4 py-3 text-center">Discrepancy Rate</th>
                 <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-center">Status</th>
               </tr>
             </thead>
             <tbody>
               {supplierDetails.map((sup) => (
                 <tr key={sup.supplier_id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                   <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{sup.supplier_id}</td>
                   <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">฿ {sup.total_po_value_thb.toLocaleString()}</td>
                   <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400 font-medium">{sup.avg_lead_time_days} days</td>
                   <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400 font-medium">{sup.on_time_delivery_pct.toFixed(1)}%</td>
                   <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400 font-medium">{sup.discrepancy_rate_pct.toFixed(2)}%</td>
                   <td className="px-4 py-3 text-center">
                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        sup.status === 'Healthy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        sup.status === 'Delayed' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                     }`}>
                       {sup.status}
                     </span>
                   </td>
                 </tr>
               ))}
               {supplierDetails.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">No supplier data for current filters</td></tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};
