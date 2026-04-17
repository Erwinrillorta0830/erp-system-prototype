import { InventoryKpiSummary } from "../types/bi.types";
import { format, subDays, addDays } from "date-fns";

const warehouses = ["wh_manila_main", "wh_valenzuela_hub", "wh_cebu_hub", "wh_davao_hub"];

export const generateMockInventory = (): InventoryKpiSummary[] => {
  const inventoryData: InventoryKpiSummary[] = [];
  const baseDate = new Date("2026-01-01");

  // Track state so it looks realistic over time
  const currentState: Record<string, any> = {};

  warehouses.forEach(wh => {
    currentState[wh] = {
      baseValue: Math.floor(Math.random() * 5000000) + 10000000, // 10m to 15m
      healthyItems: 800 + Math.floor(Math.random() * 400),
      lowStock: 20 + Math.floor(Math.random() * 50),
      outOfStock: Math.floor(Math.random() * 15),
      overstock: 40 + Math.floor(Math.random() * 100),
      deadStockValue: 200000 + Math.floor(Math.random() * 500000)
    };
  });

  // Generate 120 days of rolling inventory stats
  for (let i = 0; i < 120; i++) {
    const currentDate = addDays(baseDate, i);
    const dateStr = format(currentDate, "yyyy-MM-dd");

    for (const wh of warehouses) {
      const state = currentState[wh];
      
      // Simulate random fluctuations (-2% to +2% daily change in value)
      const valueChange = 1 + (Math.random() * 0.04 - 0.02);
      state.baseValue *= valueChange;

      // Every 15 days, simulate a container delivery (big spike in stock, drop in out-of-stock)
      if (i > 0 && i % 15 === 0) {
        state.baseValue += 1500000;
        state.outOfStock = Math.max(0, state.outOfStock - 10);
        state.lowStock = Math.max(0, Math.floor(state.lowStock * 0.5));
      } else {
        // Daily depletion
        state.lowStock += Math.random() > 0.7 ? 1 : 0;
        state.outOfStock += Math.random() > 0.9 ? 1 : 0;
      }

      inventoryData.push({
        warehouse_id: wh,
        snapshot_date: dateStr,
        total_value_php: parseFloat(state.baseValue.toFixed(2)),
        healthy_stock_items: state.healthyItems,
        low_stock_items: Math.floor(state.lowStock),
        out_of_stock_items: Math.floor(state.outOfStock),
        overstock_items: state.overstock,
        dead_stock_value_php: parseFloat(state.deadStockValue.toFixed(2))
      });
    }
  }

  return inventoryData;
};

export const MOCK_INVENTORY_DATA = generateMockInventory();
