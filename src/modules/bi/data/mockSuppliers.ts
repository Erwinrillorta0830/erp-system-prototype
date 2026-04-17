import { SupplierPerformanceSummary } from "../types/bi.types";
import { addMonths, format } from "date-fns";

const suppliers = [
  "sup_bkk_thai_motor_parts",
  "sup_ayutthaya_auto_supply",
  "sup_yamaha_regional",
  "sup_honda_th_export",
  "sup_local_distributor_ph"
];

export const generateMockSuppliers = (): SupplierPerformanceSummary[] => {
  const supplierData: SupplierPerformanceSummary[] = [];
  const baseDate = new Date("2025-10-01");

  // Generate 8 months of data
  for (let i = 0; i < 8; i++) {
    const currentMonth = addMonths(baseDate, i);
    const monthStr = format(currentMonth, "yyyy-MM");

    for (const sup of suppliers) {
      const isLocal = sup === "sup_local_distributor_ph";
      const leadTime = isLocal ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 15) + 14; 
      
      let status: "Healthy" | "Delayed" | "Critical" = "Healthy";
      const delayChance = Math.random();
      if (!isLocal) {
        if (delayChance > 0.85) status = "Critical";
        else if (delayChance > 0.6) status = "Delayed";
      }

      supplierData.push({
        supplier_id: sup,
        month: monthStr,
        total_po_value_thb: isLocal ? 0 : Math.floor(Math.random() * 2000000) + 500000,
        avg_lead_time_days: leadTime,
        on_time_delivery_pct: status === "Healthy" ? 90 + Math.random() * 10 : status === "Delayed" ? 70 + Math.random() * 15 : 40 + Math.random() * 20,
        discrepancy_rate_pct: parseFloat((Math.random() * 3).toFixed(2)),
        status
      });
    }
  }

  return supplierData;
};

export const MOCK_SUPPLIER_DATA = generateMockSuppliers();
