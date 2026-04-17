import { useMemo } from "react";
import { useBIFilters } from "../context/BIFilterContext";
import { MOCK_INVENTORY_DATA } from "../data/mockInventory";

export const useInventoryAnalytics = () => {
  const { filters } = useBIFilters();

  const analytics = useMemo(() => {
    // We only care about the latest snapshot that matches the date_to filter, 
    // or the exact date selected if looking at historical.
    // For simplicity, we find the data matching `date_to`.
    const targetDate = filters.date_to;
    
    let rawData = MOCK_INVENTORY_DATA.filter(d => d.snapshot_date === targetDate);
    
    // If no data for exact date, just take the latest available in mock
    if (rawData.length === 0) {
       const latestDate = MOCK_INVENTORY_DATA[MOCK_INVENTORY_DATA.length - 1].snapshot_date;
       rawData = MOCK_INVENTORY_DATA.filter(d => d.snapshot_date === latestDate);
    }

    if (filters.branch_id && filters.branch_id !== "all") {
        // Simple mapping from branch to warehouse for mock purposes
        const whMap: Record<string, string> = {
            "br_manila_main": "wh_manila_main",
            "br_cebu_hub": "wh_cebu_hub",
            "br_davao_branch": "wh_davao_hub"
        };
        const mappedWh = whMap[filters.branch_id];
        if (mappedWh) {
            rawData = rawData.filter(d => d.warehouse_id === mappedWh);
        }
    }

    const totalValue = rawData.reduce((sum, d) => sum + d.total_value_php, 0);
    const deadStockValue = rawData.reduce((sum, d) => sum + d.dead_stock_value_php, 0);
    const lowStockCount = rawData.reduce((sum, d) => sum + d.low_stock_items, 0);
    const outOfStockCount = rawData.reduce((sum, d) => sum + d.out_of_stock_items, 0);
    const healthyCount = rawData.reduce((sum, d) => sum + d.healthy_stock_items, 0);

    return {
      totalValue,
      deadStockValue,
      lowStockCount,
      outOfStockCount,
      healthyCount,
      warehouseDetails: rawData
    };
  }, [filters.date_to, filters.branch_id]);

  return analytics;
};
