"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AreaChart as AreaChartIcon } from "lucide-react";
import CustomTooltip from "./custom-tooltip";
import { GraphDiagramProps } from "@/lib/types/pieDiagramsType";

const GraphDiagram: React.FC<GraphDiagramProps> = ({
  title,
  data,
  xKey,
  yKey,
  className,
  color,
  yFormatter,
}) => {
  const gradientId = React.useId();

  const defaultFormatter = (v: number) => {
    if (v >= 100000) return `${(v / 100000).toFixed(2)}L`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
    return v.toString();
  };

  return (
    <div
      className={`
        rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6
        shadow-md backdrop-blur-xl transition-all duration-300
        hover:scale-[1.01] hover:shadow-xl
        dark:border-slate-700 dark:bg-slate-800/95 h-[650px]
        ${className}
      `}
    >
      {title && (
        <h3 className="mb-4 flex items-center gap-2 text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
          <AreaChartIcon className="h-5 w-5" />
          {title}
        </h3>
      )}

      <div className="h-[550px]">
        <ResponsiveContainer width="100%" height="100%" className="h-[650px]">
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke={color} className="opacity-10" />
            <XAxis
              dataKey={xKey}
              stroke={color}
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis
              stroke={color}
              className="text-slate-600 dark:text-slate-400"
              domain={[0, 500000]}                  // 0 → 5 L
              ticks={[                               // 25 k steps
                0, 25000, 50000, 75000, 100000,
                125000, 150000, 175000, 200000,
                225000, 250000, 275000, 300000,
                325000, 350000, 375000, 400000,
                425000, 450000, 475000, 500000,
              ]}
              tickFormatter={yFormatter ?? defaultFormatter}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={yKey as string}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              className="h-[650px]"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphDiagram;