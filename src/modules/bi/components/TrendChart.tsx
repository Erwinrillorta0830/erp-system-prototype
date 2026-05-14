"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TrendChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  title: string;
  color?: string;
  height?: number;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  color = "#3b82f6", // blue-500
  height = 300,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-6">{title}</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color${yKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
            <XAxis 
              dataKey={xKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`₱ ${Number(value ?? 0).toLocaleString()}`, "Value"]}
            />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#color${yKey})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
