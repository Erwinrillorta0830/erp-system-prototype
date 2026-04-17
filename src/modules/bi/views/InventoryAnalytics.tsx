"use client";

import React from "react";
import { FilterBar } from "../components/FilterBar";
import { KpiCard } from "../components/KpiCard";
import { useInventoryAnalytics } from "../hooks/useInventoryAnalytics";

export const InventoryAnalytics: React.FC = () => {
  const { totalValue, deadStockValue, lowStockCount, outOfStockCount, healthyCount, warehouseDetails } = useInventoryAnalytics();

  const totalSKUs = lowStockCount + outOfStockCount + healthyCount;
  const deadStockPct = totalValue > 0 ? (deadStockValue / totalValue) * 100 : 0;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Inventory Analytics</h1>
          <p className="text-zinc-500 text-sm">Stock valuation, alerts, and warehouse distribution</p>
        </div>
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="md:col-span-2 lg:col-span-2">
            <KpiCard 
              label="Total Locked Capital (Stock Value)" 
              value={`₱ ${(totalValue / 1000000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}m`}
              trend={0.5} trendDirection="down"
              description="Total stock valuation in PHP"
            />
        </div>
        <KpiCard 
          label="Dead Stock Value" 
          value={`₱ ${(deadStockValue / 1000).toLocaleString(undefined, {maximumFractionDigits:0})}k`}
          description={`${deadStockPct.toFixed(1)}% of total value`}
          trend={2} trendDirection="up"
        />
        <KpiCard 
          label="Low / Out of Stock" 
          value={`${lowStockCount} / ${outOfStockCount}`}
          description={`SKUs needing reorder`}
        />
        <KpiCard 
          label="Healthy SKUs" 
          value={healthyCount.toLocaleString()}
          description={`${totalSKUs > 0 ? ((healthyCount/totalSKUs)*100).toFixed(0) : 0}% of catalog`}
        />
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
         <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-4">Warehouse Breakdown</h3>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
               <tr>
                 <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Warehouse ID</th>
                 <th className="px-4 py-3 text-right">Value (₱)</th>
                 <th className="px-4 py-3 text-right">Healthy</th>
                 <th className="px-4 py-3 text-center">Low Stock</th>
                 <th className="px-4 py-3 text-center">Out of Stock</th>
                 <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-right">Dead Stock (₱)</th>
               </tr>
             </thead>
             <tbody>
               {warehouseDetails.map((wh) => (
                 <tr key={wh.warehouse_id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                   <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{wh.warehouse_id}</td>
                   <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">₱ {wh.total_value_php.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</td>
                   <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{wh.healthy_stock_items}</td>
                   <td className="px-4 py-3 text-center text-amber-500 font-medium">{wh.low_stock_items}</td>
                   <td className="px-4 py-3 text-center text-red-500 font-medium">{wh.out_of_stock_items}</td>
                   <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">₱ {wh.dead_stock_value_php.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                 </tr>
               ))}
               {warehouseDetails.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500">No warehouse data for current filters</td></tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};
