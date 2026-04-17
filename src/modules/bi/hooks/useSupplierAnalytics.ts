import { useMemo } from "react";
import { useBIFilters } from "../context/BIFilterContext";
import { MOCK_SUPPLIER_DATA } from "../data/mockSuppliers";

export const useSupplierAnalytics = () => {
  const { filters } = useBIFilters();

  const analytics = useMemo(() => {
    // Suppliers usually tracked by month. Use `date_to` to find the target month
    const targetMonth = filters.date_to.substring(0, 7); // yyyy-mm
    
    let rawData = MOCK_SUPPLIER_DATA.filter(d => d.month === targetMonth);
    
    if (rawData.length === 0) {
       // Fallback to latest available month
       const latestMonth = MOCK_SUPPLIER_DATA[MOCK_SUPPLIER_DATA.length - 1].month;
       rawData = MOCK_SUPPLIER_DATA.filter(d => d.month === latestMonth);
    }

    const totalPoValue = rawData.reduce((sum, d) => sum + d.total_po_value_thb, 0);
    const avgLeadTime = rawData.reduce((sum, d) => sum + d.avg_lead_time_days, 0) / (rawData.length || 1);
    
    const delayedCount = rawData.filter(d => d.status === "Delayed").length;
    const criticalCount = rawData.filter(d => d.status === "Critical").length;
    const healthyCount = rawData.filter(d => d.status === "Healthy").length;

    return {
      totalPoValue,
      avgLeadTime: parseFloat(avgLeadTime.toFixed(1)),
      delayedCount,
      criticalCount,
      healthyCount,
      supplierDetails: rawData.sort((a, b) => b.total_po_value_thb - a.total_po_value_thb) // Sort by PO value
    };
  }, [filters.date_to]);

  return analytics;
};
