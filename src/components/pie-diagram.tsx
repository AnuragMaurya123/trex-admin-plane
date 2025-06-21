import { PieChart } from "lucide-react";
import {
  Cell,
  Pie,
  ResponsiveContainer,
  Tooltip,
  PieChart as RechartsPieChart,
} from "recharts";
import React from "react";

import CustomTooltip from "./custom-tooltip";
import { PieDiagramProps } from "@/lib/types/pieDiagramsType";

/** Add a new optional prop */
type Size = "sm" | "md" | "lg";

interface Props extends PieDiagramProps {
  /** ‑ `md` by default; pass `"sm"` to shrink it (fits nicely beside the graph) */
  size?: Size;
}

const sizes: Record<Size, { inner: number; outer: number; h: string }> = {
  sm: { inner: 25, outer: 50, h: "h-30 " },    // <‑ compact
  md: { inner: 40, outer: 80, h: "h-64 " },    // current default
  lg: { inner: 55, outer: 100, h: "h-80 " },
};

const PieDiagram: React.FC<Props> = ({
  title,
  className = "",
  statusData = [],
  innerRadius,
  outerRadius,
  showLegend = true,
  showIcon = true,
  size = "md",          // <‑ NEW
}) => {
  const cfg = sizes[size];

  return (
    <div
      className={`
        rounded-2xl border border-slate-200 bg-white/95 p-4 
        shadow-md backdrop-blur-xl transition-all duration-300
        hover:scale-[1.01] hover:shadow-xl
        dark:border-slate-700 dark:bg-slate-800/95
        ${className}
      `}
    >
      {title && (
        <h3 className="mb-4 flex items-center gap-2 text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
          {showIcon && <PieChart className="h-5 w-5" />}
          {title}
        </h3>
      )}

      {/* ⇣ height shrinks when size='sm' */}
      <div className={cfg.h}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius ?? cfg.inner}
              outerRadius={outerRadius ?? cfg.outer}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((d, idx) => (
                <Cell key={`cell-${idx}`} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      {showLegend && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {statusData.map((d, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-[14px]  text-slate-700 dark:text-slate-300">
                {d.name} ({d.value})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieDiagram;
