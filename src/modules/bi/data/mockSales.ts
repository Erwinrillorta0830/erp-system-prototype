import { SalesSummary } from "../types/bi.types";
import { addDays, format } from "date-fns";

// Realistic constants for a motor parts business
const branches = ["br_manila_main", "br_cebu_hub", "br_davao_branch"];
const channels: ("wholesale" | "retail" | "walk-in")[] = ["wholesale", "retail", "walk-in"];
const topProducts = [
  "prd_yamaha_nmax_vbelt",
  "prd_honda_xrm_sprocket",
  "prd_suzuki_raider_brake_pads",
  "prd_motul_oil_1w40",
  "prd_ngk_spark_plug",
  "prd_mio_fairings_black"
];

const customers = [
  "cust_moto_city_ph",
  "cust_visayas_dealers_inc",
  "cust_davao_auto_supply",
  "cust_walkin_general",
  "cust_retail_direct"
];

export const generateMockSales = (): SalesSummary[] => {
  const salesData: SalesSummary[] = [];
  const baseDate = new Date("2026-01-01");

  let idCounter = 1;

  // Generate 120 days of data
  for (let i = 0; i < 120; i++) {
    const currentDate = addDays(baseDate, i);
    const dateStr = format(currentDate, "yyyy-MM-dd");

    // Random noise to simulate weekends or holidays
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const volumeMultiplier = isWeekend ? 1.5 : 1.0; // Higher sales on weekends

    for (const branch of branches) {
      for (const channel of channels) {
        // Generate base sales, wholesale is higher value, walk-in is lowest
        let baseSales = Math.floor(Math.random() * 50000) + 10000;
        let marginRange = 0;

        if (channel === "wholesale") {
          baseSales *= 5 * volumeMultiplier; // 50k to 300k
          marginRange = Math.random() * (0.25 - 0.15) + 0.15; // 15% to 25% margin
        } else if (channel === "retail") {
          baseSales *= 2 * volumeMultiplier; // 20k to 120k
          marginRange = Math.random() * (0.35 - 0.25) + 0.25; // 25% to 35% margin
        } else {
          baseSales *= 0.5 * volumeMultiplier; // 5k to 30k
          marginRange = Math.random() * (0.45 - 0.35) + 0.35; // 35% to 45% margin
        }

        const totalCost = baseSales * (1 - marginRange);
        const grossProfit = baseSales - totalCost;

        salesData.push({
          id: `ss_${idCounter++}`,
          date: dateStr,
          branch_id: branch,
          channel: channel,
          customer_id: channel === "wholesale" 
            ? customers[Math.floor(Math.random() * 3)] 
            : channel === "retail" ? customers[4] : customers[3],
          total_sales_php: parseFloat(baseSales.toFixed(2)),
          total_cost_php: parseFloat(totalCost.toFixed(2)),
          gross_profit_php: parseFloat(grossProfit.toFixed(2)),
          margin_pct: parseFloat((marginRange * 100).toFixed(2)),
          top_product_id: topProducts[Math.floor(Math.random() * topProducts.length)]
        });
      }
    }
  }

  return salesData;
};

export const MOCK_SALES_DATA = generateMockSales();
