/* app/(pages)/dashboard/page.tsx */
"use client";

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
  complaintStatusData,
  customersStatusData,
  dummyProducts,
  orderStatusData,
  visitorsStatusData,
  yearlyEarnings,
} from "@/lib/constants";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100/40 dark:from-slate-900 dark:to-purple-900/40 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Welcome back! Here’s what’s happening with your business today.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-purple-200 bg-white/90 px-4 py-2 shadow backdrop-blur-sm dark:border-purple-700 dark:bg-slate-800/90">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Orders"
            value="₹12,450"
            change="+12.5%"
            trend="up"
            icon={DollarSign}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Sales"
            value="156"
            change="+8.2%"
            trend="up"
            icon={ShoppingCart}
            color="from-purple-600 to-purple-700"
          />
          <StatCard
            title="Products"
            value="280"
            change="+15.3%"
            trend="up"
            icon={Package}
            color="from-purple-500 to-purple-700"
          />
          <StatCard
            title="Visitors"
            value="1,245"
            change="-2.1%"
            trend="down"
            icon={Users}
            color="from-purple-400 to-purple-600"
          />
        </section>

        {/* Earnings chart */}
        <section className="grid grid-cols-1 gap-4">
          <GraphDiagram
            title="Yearly Earnings"
            data={yearlyEarnings}
            xKey="month"
            yKey="earnings"
            color="#8b5cf6"
            yFormatter={(v) => `₹${(v / 1_000).toFixed(0)}k`}
          />
        </section>

        {/* Pie charts */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PieDiagram
            statusData={orderStatusData}
            title="Orders"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={complaintStatusData}
            title="Complaint Status"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={visitorsStatusData}
            title="Visitors Status"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
          <PieDiagram
            statusData={customersStatusData}
            title="Customers Status"
            innerRadius={50}
            outerRadius={100}
            showLegend
            showIcon
          />
        </section>

        {/* Product carousel */}
        <section className="mt-10">
          <ProductCarousel products={dummyProducts} />
        </section>
      </div>
    </div>
  );
}
