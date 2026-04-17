"use client";

import React from "react";
import { FilterBar } from "../components/FilterBar";
import { KpiCard } from "../components/KpiCard";
import { TrendChart } from "../components/TrendChart";
import { useSalesAnalytics } from "../hooks/useSalesAnalytics";
import { useInventoryAnalytics } from "../hooks/useInventoryAnalytics";
import { MOCK_FINANCE_SUMMARY, MOCK_ALERTS } from "../data/mockFinanceAlerts";

export const ExecutiveDashboard: React.FC = () => {
  const { totalSales, totalGP, avgMargin, trendData, topProducts } = useSalesAnalytics();
  const { totalValue, lowStockCount, outOfStockCount } = useInventoryAnalytics();

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Executive Dashboard</h1>
          <p className="text-zinc-500 text-sm">Real-time overview of business performance</p>
        </div>
        <FilterBar />
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label="Total Sales (Filtered)" 
          value={`₱ ${(totalSales / 1000).toFixed(1)}k`}
          trend={12} trendDirection="up"
        />
        <KpiCard 
          label="Gross Margin Estimate" 
          value={`${avgMargin.toFixed(1)}%`}
          description={`₱ ${(totalGP / 1000).toFixed(1)}k Gross Profit`}
          trend={1.2} trendDirection="up"
        />
        <KpiCard 
          label="Total Inventory Value" 
          value={`₱ ${(totalValue / 1000000).toFixed(2)}m`}
          trend={0.5} trendDirection="up"
        />
        <KpiCard 
          label="Overdue Receivables" 
          value={`₱ ${(MOCK_FINANCE_SUMMARY.overdueReceivables / 1000).toFixed(1)}k`}
          trend={5} trendDirection="down"
          description="Action required for AR > 60 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrendChart 
            title="Sales Trend (PHP)"
            data={trendData}
            xKey="date"
            yKey="sales"
          />
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
             <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-4">Top Performing Products (Revenue)</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                 <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-800/50">
                   <tr>
                     <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Product SKU</th>
                     <th className="px-4 py-3">Total Revenue</th>
                     <th className="px-4 py-3 rounded-tr-lg rounded-br-lg text-right">Avg Margin</th>
                   </tr>
                 </thead>
                 <tbody>
                   {topProducts.map((p, idx) => (
                     <tr key={p.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                       <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{p.id}</td>
                       <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">₱ {p.revenue.toLocaleString()}</td>
                       <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{p.margin.toFixed(1)}%</td>
                     </tr>
                   ))}
                   {topProducts.length === 0 && (
                      <tr><td colSpan={3} className="px-4 py-8 text-center text-zinc-500">No data available for current filters</td></tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
             <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold flex items-center mb-4">
                Operational Alerts 
                <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{MOCK_ALERTS.length}</span>
             </h3>
             <div className="space-y-3">
               {MOCK_ALERTS.map(alert => (
                 <div key={alert.id} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg">
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-xs font-bold uppercase text-red-600 dark:text-red-400">{alert.severity}</span>
                     <span className="text-xs text-zinc-500 dark:text-zinc-400">&bull; {alert.type}</span>
                   </div>
                   <p className="text-sm text-zinc-800 dark:text-zinc-200">{alert.message}</p>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-4">Inventory Quick Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Value Locked</span>
                <span className="font-semibold dark:text-zinc-200">₱ {(totalValue / 1000000).toFixed(2)}M</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Low Stock SKUs</span>
                <span className="font-semibold text-amber-500">{lowStockCount}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Out of Stock SKUs</span>
                <span className="font-semibold text-red-500">{outOfStockCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
