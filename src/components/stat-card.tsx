"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  today: number;
  yesterday: number;
  week: number;
  month: number;
  icon: LucideIcon;
  color?: string; // e.g. "from-purple-500 to-purple-600"
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  today,
  yesterday,
  week,
  month,
  icon: Icon,
  color = "from-purple-500 to-purple-600",
}) => (
  <div
    className={[
      "relative grid grid-cols-[auto_1fr] items-start gap-4  rounded-2xl p-4 sm:p-6",
      "bg-gradient-to-br",
      color,
      "border border-white/15 backdrop-blur-md",
      "shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
      "min-h-[160px] text-white",
    ].join(" ")}
  >
    {/* Icon */}
    

    {/* Numbers + labels */}
  <div className="grid   gap-y-1">
  <p className="text-sm font-medium   text-white/90">
    {title}
  </p>
  <p className="text-3xl sm:text-4xl font-bold">{today}</p>
</div>
<div className="rounded-full bg-white/15 p-4 w-fit backdrop-blur-sm flex items-start justify-start ml-auto">
      <Icon className=" " size={35}/>
    </div>
    <div className="grid grid-rows-3   text-xs sm:text-sm">
    <span className="whitespace-nowrap lowercase">
      YESTERDAY’S <span className="font-semibold">{yesterday}</span>
    </span>
    <span className="whitespace-nowrap lowercase">
      WEEK <span className="font-semibold">{week}</span>
    </span>
    <span className="whitespace-nowrap lowercase">
      MONTH <span className="font-semibold">{month}</span>
    </span>
  </div>
    {/* Decorative blob */}
    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-white/10 sm:h-32 sm:w-32 sm:-translate-y-16 sm:translate-x-16" />
  </div>
);

export default StatCard;
