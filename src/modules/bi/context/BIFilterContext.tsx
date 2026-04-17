"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { DashboardFilterState, SalesChannel } from "../types/bi.types";
import { format, subDays } from "date-fns";

interface BIFilterContextValue {
  filters: DashboardFilterState;
  setFilters: React.Dispatch<React.SetStateAction<DashboardFilterState>>;
  updateFilter: <K extends keyof DashboardFilterState>(key: K, value: DashboardFilterState[K]) => void;
}

const defaultFilters: DashboardFilterState = {
  date_from: format(subDays(new Date("2026-04-14"), 30), "yyyy-MM-dd"), // 30 days ago from base date
  date_to: "2026-04-14",
  branch_id: "all",
  sales_channel: "all",
};

const BIFilterContext = createContext<BIFilterContextValue | undefined>(undefined);

export const BIFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<DashboardFilterState>(defaultFilters);

  const updateFilter = <K extends keyof DashboardFilterState>(key: K, value: DashboardFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <BIFilterContext.Provider value={{ filters, setFilters, updateFilter }}>
      {children}
    </BIFilterContext.Provider>
  );
};

export const useBIFilters = () => {
  const context = useContext(BIFilterContext);
  if (!context) {
    throw new Error("useBIFilters must be used within a BIFilterProvider");
  }
  return context;
};
