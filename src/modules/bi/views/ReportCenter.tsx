"use client";

import React, { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { FileText, Download, Filter } from "lucide-react";
import { useSalesAnalytics } from "../hooks/useSalesAnalytics";

const REPORTS = [
  { id: "rp_sales_daily", name: "Daily Sales Report", desc: "Detailed transaction log grouped by day", type: "Sales" },
  { id: "rp_sku_movement", name: "Slow-Moving Inventory", desc: "List of SKUs with < 5 sales in 90 days", type: "Inventory" },
  { id: "rp_stock_aging", name: "Stock Aging Report", desc: "Capital locked across 30/60/90+ day buckets", type: "Inventory" },
  { id: "rp_sup_scorecard", name: "Supplier Scorecard", desc: "Lead times and discrepancies by vendor", type: "Procurement" },
  { id: "rp_ar_summary", name: "Receivables Summary", desc: "Outstanding AP/AR balances by customer", type: "Finance" },
  { id: "rp_gross_profit", name: "Gross Profit Summary", desc: "Margin analysis by channel and branch", type: "Sales" },
];

export const ReportCenter: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("rp_sales_daily");
  
  // Example integration: Pulling raw data count from existing hooks
  const { rawDataCount } = useSalesAnalytics();

  const handleExport = (reportId: string) => {
    // In a real app we would use PapaParse or build CSV blob here
    alert(`Mock Export triggered for ${reportId}. In production, this would download a CSV respecting the current FilterBar state.`);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Report Center</h1>
          <p className="text-zinc-500 text-sm">Generate and export tabular datasets</p>
        </div>
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-3">Available Reports</h3>
            <div className="space-y-1">
              {REPORTS.map(r => (
                <button 
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedReport === r.id 
                    ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-400" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
           {REPORTS.filter(r => r.id === selectedReport).map(report => (
             <div key={report.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col pt-8">
               
               <div className="flex items-start justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                 <div className="flex gap-4 items-start">
                   <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{report.name}</h2>
                     <p className="text-zinc-500 dark:text-zinc-400 mt-1">{report.desc}</p>
                     <div className="mt-3 flex gap-2">
                       <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-medium rounded text-zinc-600 dark:text-zinc-300">
                         {report.type} Domain
                       </span>
                     </div>
                   </div>
                 </div>

                 <button 
                   onClick={() => handleExport(report.id)}
                   className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                 >
                   <Download className="w-4 h-4" />
                   Export CSV
                 </button>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <Filter className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
                 <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-1">Ready to Generate</h3>
                 <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
                   This report will be generated using the filters applied in the top filter bar. 
                   <br/>
                   <br/>
                   {report.type === "Sales" ? `Currently matched rows: ${rawDataCount}` : "Calculation applied at runtime."}
                 </p>
                 <button 
                   onClick={() => handleExport(report.id)}
                   className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                 >
                   Download {report.name} immediately &rarr;
                 </button>
               </div>

             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
