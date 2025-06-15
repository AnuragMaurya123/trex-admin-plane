"use client"
import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
} from "lucide-react";


type Trend = "up" | "down";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  icon: LucideIcon;          // pass `DollarSign`, not `<DollarSign />`
  color: string;             // e.g. "from-purple-500 to-purple-600"
}


const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl p-6
      bg-gradient-to-br ${color}
      border border-white/20 backdrop-blur-sm
      shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl
      group
    `}
  >
    <div className="flex items-start justify-between">
      {/* numbers + change */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        <div className="flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-white/80" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-white/80" />
          )}
          <span className="text-sm font-medium text-white/90">{change}</span>
          <span className="text-sm text-white/60">vs yesterday</span>
        </div>
      </div>

      {/* icon */}
      <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>

    {/* decorative blob */}
    <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
  </div>
);

export default StatCard