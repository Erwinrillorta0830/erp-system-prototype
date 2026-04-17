import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { KpiSnapshot } from "../types/bi.types";

export const KpiCard: React.FC<KpiSnapshot> = ({ label, value, trend, trendDirection, description }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">{label}</h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
        
        {trendDirection && trend !== undefined && (
          <div className={`flex items-center text-sm font-medium ${
            trendDirection === 'up' ? 'text-green-600 dark:text-green-400' :
            trendDirection === 'down' ? 'text-red-600 dark:text-red-400' :
            'text-zinc-500 dark:text-zinc-400'
          }`}>
            {trendDirection === 'up' && <ArrowUpRight className="w-4 h-4 mr-1" />}
            {trendDirection === 'down' && <ArrowDownRight className="w-4 h-4 mr-1" />}
            {trendDirection === 'neutral' && <Minus className="w-4 h-4 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      {description && <p className="text-zinc-400 text-xs mt-3">{description}</p>}
    </div>
  );
};
