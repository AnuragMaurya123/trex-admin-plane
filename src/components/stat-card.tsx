"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  numberValue: number;
  icon: LucideIcon;
  color: string; // e.g. "from-purple-500 to-purple-600"
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  numberValue,
  icon: Icon,
  color,
}) => (
  <div
    className={`
      relative rounded-2xl p-4 sm:p-5 md:p-6
      bg-gradient-to-br ${color}
      border border-white/20 backdrop-blur-sm
      shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
      group grid grid-cols-2 gap-4 justify-between items-start min-h-[160px]
    `}
  >
    {/* Numbers + change */}
    <div className="space-y-1 sm:space-y-2">
      <p className="text-sm sm:text-base font-medium text-white/80">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="text-sm font-medium text-white/90">{numberValue}</span>
        <span className="text-xs sm:text-sm text-white/60 whitespace-nowrap">All Number of {title}</span>
      </div>
    </div>

    {/* Icon */}
    <div className="shrink-0 ml-auto rounded-xl bg-white/20 w-fit  p-2 sm:p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
    </div>

    {/* Decorative blob */}
    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 sm:h-32 sm:w-32 -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
  </div>
);

export default StatCard;
