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
  xKey = "month",
  yKey = "earnings",
  className = "",
  color = "#8b5cf6", // Tailwind violet‑600
  yFormatter,
}) => {
  // Build unique gradient id so multiple charts can coexist
  const gradientId = React.useId();
  const defaultFormatter = (v: number) => v.toLocaleString();

  return (
    <div
      className={`
        rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6
        shadow-md backdrop-blur-xl transition-all duration-300
        hover:scale-[1.01] hover:shadow-xl
        dark:border-slate-700 dark:bg-slate-800/95
        ${className}
      `}
    >
      {title && (
        <h3 className="mb-4 flex items-center gap-2 text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
          <AreaChartIcon className="h-5 w-5" />
          {title}
        </h3>
      )}

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={color} className="opacity-10" />
            <XAxis dataKey={xKey} stroke={color} className="text-slate-600 dark:text-slate-400" />
            <YAxis
              stroke={color}
              className="text-slate-600 dark:text-slate-400"
              tickFormatter={yFormatter ?? defaultFormatter}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphDiagram;
