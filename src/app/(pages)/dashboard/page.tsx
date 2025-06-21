/* app/(pages)/dashboard/page.tsx */
"use client";

import React, { useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Calendar,
  Users,
} from "lucide-react";

import StatCard from "@/components/stat-card";
import PieDiagram from "@/components/pie-diagram";
import GraphDiagram from "@/components/graph-diagram";
import { ProductCarousel } from "@/components/product-carousel";
import {
  rangeOptions,
} from "@/lib/constants/pieDiagramsData";
import { dummyProducts } from "@/lib/constants/dashboardSliderData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeOption } from "@/lib/types/pieDiagramsType";
import { useGetStatsData } from "@/hooks/useGetStatsData";
import { useGetPieStatsData } from "@/hooks/useGetPieStatsData";
import { useGetEarningData } from "@/hooks/useGetEarningData";
import PageError from "@/components/page-error";
import PageLoading from "@/components/page-loading";




export default function Dashboard() {
  const [range, setRange] = useState<RangeOption>("this-week");
  const { data: statsCardData, isError:statsError, isLoading:statsIsLoading } = useGetStatsData();
  const { data: pieStatsData, isError:pieStatsError, isLoading:pieStatsIsLoading } = useGetPieStatsData();
  const { data: earnings, isError:earningDataError, isLoading:earningDataIsLoading } = useGetEarningData();

    if (statsIsLoading || pieStatsIsLoading || earningDataIsLoading) {
    return <PageLoading/>;
  }

  if (statsError || !statsCardData || pieStatsError || !pieStatsData || earningDataError || !earnings) {
    return <PageError/>;
  }

  const pieData = pieStatsData[range];
  const cardData = statsCardData[range];
  const earningsData = earnings[range];

  const xAxisLabelMap: Record<RangeOption, string> = {
    "this-week": "Day",
    "this-month": "Date",
    "this-quarter": "Month",
    "this-year": "Year",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100/40 p-4 sm:p-6 dark:from-slate-900 dark:to-purple-900/40">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Welcome back! Here’s what’s happening with your business today.
            </p>
          </div>

          <Select value={range} onValueChange={(val) => setRange(val as RangeOption)}>
            <SelectTrigger className="inline-flex h-10  items-center justify-start gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-11 sm:max-w-none">
              <Calendar className="h-4 w-4 text-purple-600" />
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option.replace("this-", "This ").replace("-", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </header>

        {/* Stat Cards */}
        {/* Stat Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Orders"
            value={cardData.orders.value}
            numberValue={cardData.orders.total}
            icon={DollarSign}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Sales"
            value={cardData.sales.value}
            numberValue={cardData.sales.total}
            icon={ShoppingCart}
            color="from-purple-600 to-purple-700"
          />
          <StatCard
            title="Products"
            value={cardData.products.value}
            numberValue={cardData.products.total}
            icon={Package}
            color="from-purple-500 to-purple-700"
          />
          <StatCard
            title="Visitors"
            value={cardData.visitors.value}
            numberValue={cardData.visitors.total}
            icon={Users}
            color="from-purple-400 to-purple-600"
          />
        </section>

        {/* Graph Diagram */}
        <section className="pt-2 sm:pt-4">
          <GraphDiagram
            title={`Earnings (${xAxisLabelMap[range]})`}
            data={earningsData}
            xKey="label"
            yKey="earnings"
            color="#8b5cf6"
            yFormatter={(v: number) => `₹${(v / 1_000).toFixed(0)}k`}
          />
        </section>

        {/* Pie‑Charts */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-1 xl:grid-cols-2">
          <PieDiagram
            statusData={pieData.orders}
            title="Orders"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={pieData.complaints}
            title="Complaints"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={pieData.visitors}
            title="Visitors"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={pieData.customers}
            title="Customers"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
        </section>

        {/* Product Carousel */}
        <section className="mt-14">
          <ProductCarousel products={dummyProducts} />
        </section>
      </div>
    </div>
  );
}
