export type SalesChannel = "wholesale" | "retail" | "walk-in";

export interface SalesSummary {
  id: string;
  date: string; // ISO format string YYYY-MM-DD
  branch_id: string;
  channel: SalesChannel;
  customer_id: string;
  total_sales_php: number;
  total_cost_php: number;
  gross_profit_php: number;
  margin_pct: number;
  top_product_id: string;
}

export interface InventoryKpiSummary {
  warehouse_id: string;
  snapshot_date: string;
  total_value_php: number;
  healthy_stock_items: number;
  low_stock_items: number;
  out_of_stock_items: number;
  overstock_items: number;
  dead_stock_value_php: number;
}

export interface SupplierPerformanceSummary {
  supplier_id: string;
  month: string; // YYYY-MM
  total_po_value_thb: number;
  avg_lead_time_days: number;
  on_time_delivery_pct: number;
  discrepancy_rate_pct: number;
  status: "Healthy" | "Delayed" | "Critical";
}

export interface ProductPerformanceSummary {
  product_id: string;
  name: string;
  category: string;
  total_sold: number;
  total_revenue_php: number;
  margin_pct: number;
  movement_status: "Fast-moving" | "Average-moving" | "Slow-moving" | "Non-moving";
}

export interface DashboardFilterState {
  date_from: string;
  date_to: string;
  branch_id?: string;
  sales_channel?: SalesChannel | "all";
}

export interface KpiSnapshot {
  label: string;
  value: string | number;
  trend?: number; // percentage change
  trendDirection?: "up" | "down" | "neutral";
  description?: string;
}
