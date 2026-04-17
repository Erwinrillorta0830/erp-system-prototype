"use client";

import React from "react";
import { useBIFilters } from "../context/BIFilterContext";
import { SalesChannel } from "../types/bi.types";

export const FilterBar: React.FC = () => {
  const { filters, updateFilter } = useBIFilters();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">From:</label>
        <input 
          type="date" 
          value={filters.date_from}
          onChange={(e) => updateFilter("date_from", e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-md p-1.5 text-sm dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">To:</label>
        <input 
          type="date" 
          value={filters.date_to}
          onChange={(e) => updateFilter("date_to", e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-md p-1.5 text-sm dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Branch:</label>
        <select 
          value={filters.branch_id}
          onChange={(e) => updateFilter("branch_id", e.target.value)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-md p-1.5 text-sm dark:bg-zinc-800 dark:text-zinc-100 min-w-[150px]"
        >
          <option value="all">All Branches</option>
          <option value="br_manila_main">Manila Main</option>
          <option value="br_cebu_hub">Cebu Hub</option>
          <option value="br_davao_branch">Davao Branch</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Channel:</label>
        <select 
          value={filters.sales_channel}
          onChange={(e) => updateFilter("sales_channel", e.target.value as SalesChannel | "all")}
          className="border border-zinc-300 dark:border-zinc-700 rounded-md p-1.5 text-sm dark:bg-zinc-800 dark:text-zinc-100 min-w-[150px]"
        >
          <option value="all">All Channels</option>
          <option value="wholesale">Wholesale</option>
          <option value="retail">Retail</option>
          <option value="walk-in">Walk-in</option>
        </select>
      </div>
    </div>
  );
};
