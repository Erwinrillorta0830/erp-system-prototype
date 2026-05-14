"use client";

import React from "react";
import { FilterBar } from "../components/FilterBar";
import { KpiCard } from "../components/KpiCard";
import { TrendChart } from "../components/TrendChart";
import { useSalesAnalytics } from "../hooks/useSalesAnalytics";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const SalesAnalytics: React.FC = () => {
  const { totalSales, totalGP, avgMargin, trendData, channelSales, rawDataCount } = useSalesAnalytics();

  const pieData = [
    { name: 'Wholesale', value: channelSales.wholesale },
    { name: 'Retail', value: channelSales.retail },
    { name: 'Walk-in', value: channelSales['walk-in'] },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Sales Analytics</h1>
          <p className="text-zinc-500 text-sm">Revenue performance, channels, and margins</p>
        </div>
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label="Total Revenue" 
          value={`₱ ${(totalSales / 1000).toLocaleString()}k`}
          trend={8.5} trendDirection="up"
        />
        <KpiCard 
          label="Gross Profit" 
          value={`₱ ${(totalGP / 1000).toLocaleString()}k`}
          trend={3.2} trendDirection="up"
        />
        <KpiCard 
          label="Blended Margin" 
          value={`${avgMargin.toFixed(2)}%`}
          trend={0.8} trendDirection="down"
        />
        <KpiCard 
          label="Transactions Count" 
          value={rawDataCount.toLocaleString()}
          description="In period"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrendChart 
            title="Sales Trend (PHP)"
            data={trendData}
            xKey="date"
            yKey="sales"
            color="#10b981"
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-4">Revenue by Channel</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry: { name: string, value: number }, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => `₱ ${Number(value ?? 0).toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((c: { name: string, value: number }, i: number) => (
                <div key={c.name} className="flex justify-between items-center text-sm border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                        <span className="text-zinc-600 dark:text-zinc-400">{c.name}</span>
                    </div>
                    <span className="font-medium dark:text-zinc-200">₱ {c.value.toLocaleString()}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
