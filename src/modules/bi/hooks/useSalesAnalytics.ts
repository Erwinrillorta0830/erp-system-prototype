import { useMemo } from "react";
import { useBIFilters } from "../context/BIFilterContext";
import { MOCK_SALES_DATA } from "../data/mockSales";
import { SalesSummary } from "../types/bi.types";

export const useSalesAnalytics = () => {
  const { filters } = useBIFilters();

  const analytics = useMemo(() => {
    let rawData = MOCK_SALES_DATA;

    // Apply Filters
    if (filters.date_from) {
      rawData = rawData.filter(d => d.date >= filters.date_from);
    }
    if (filters.date_to) {
      rawData = rawData.filter(d => d.date <= filters.date_to);
    }
    if (filters.branch_id && filters.branch_id !== "all") {
      rawData = rawData.filter(d => d.branch_id === filters.branch_id);
    }
    if (filters.sales_channel && filters.sales_channel !== "all") {
      rawData = rawData.filter(d => d.channel === filters.sales_channel);
    }

    // 1. Total KPIs
    const totalSales = rawData.reduce((sum, d) => sum + d.total_sales_php, 0);
    const totalCost = rawData.reduce((sum, d) => sum + d.total_cost_php, 0);
    const totalGP = rawData.reduce((sum, d) => sum + d.gross_profit_php, 0);
    const avgMargin = totalSales > 0 ? (totalGP / totalSales) * 100 : 0;

    // 2. Trend by Date
    const trendMap = new Map<string, number>();
    rawData.forEach(d => {
      const current = trendMap.get(d.date) || 0;
      trendMap.set(d.date, current + d.total_sales_php);
    });
    
    // Sort trend map by date
    const trendData = Array.from(trendMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, sales]) => ({ date, sales }));

    // 3. Top Products
    const productMap = new Map<string, { revenue: number; margin: number }>();
    rawData.forEach(d => {
      const current = productMap.get(d.top_product_id) || { revenue: 0, margin: 0 };
      productMap.set(d.top_product_id, {
        revenue: current.revenue + d.total_sales_php,
        margin: (current.margin + d.margin_pct) / 2 // simplified rolling avg for mock
      });
    });

    const topProducts = Array.from(productMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
      
    // 4. Sales by Channel summary
    const channelSales = {
        wholesale: rawData.filter(d => d.channel === 'wholesale').reduce((acc, d) => acc + d.total_sales_php, 0),
        retail: rawData.filter(d => d.channel === 'retail').reduce((acc, d) => acc + d.total_sales_php, 0),
        'walk-in': rawData.filter(d => d.channel === 'walk-in').reduce((acc, d) => acc + d.total_sales_php, 0),
    };

    return {
      totalSales,
      totalCost,
      totalGP,
      avgMargin,
      trendData,
      topProducts,
      channelSales,
      rawDataCount: rawData.length,
    };
  }, [filters]);

  return analytics;
};
