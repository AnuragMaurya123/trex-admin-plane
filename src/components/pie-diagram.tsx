import { PieChart } from "lucide-react";
import { Cell, Pie, ResponsiveContainer, Tooltip, PieChart as RechartsPieChart } from "recharts";
import CustomTooltip from "./custom-tooltip";
import React from "react";
import { PieDiagramProps } from "@/lib/types/pieDiagramsType";



const PieDiagram: React.FC<PieDiagramProps> = ({
  title,
  className = "",
  statusData = [],
  innerRadius = 40,
  outerRadius = 80,
  showLegend = true,
  showIcon = true,
}) => (
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
        {showIcon && <PieChart className="h-5 w-5" />}
        {title}
      </h3>
    )}

    <div className="h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            dataKey="value"
          >
            {statusData && statusData.map((d, idx) => (
              <Cell key={`cell-${idx}`} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>

    {showLegend && (
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
        {statusData.map((d, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {d.name} ({d.value})
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PieDiagram;
