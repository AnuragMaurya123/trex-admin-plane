
import { EarningsDatum, PieDatum, PieStatCategory, RangeOption, StatCardDatum, StatCardKey } from "../types/pieDiagramsType";

export const rangeOptions = ["this-week", "this-month", "this-quarter", "this-year"] as const;
export const pieStatsData: Record<RangeOption, Record<PieStatCategory, PieDatum[]>> = {
  "this-week": {
    orders: [
      { name: "Pending", value: 45, color: "#8b5cf6" },
      { name: "Dispatched", value: 32, color: "#a855f7" },
      { name: "Shipped", value: 78, color: "#c084fc" },
      { name: "Delivered", value: 125, color: "#7c3aed" },
    ],
    complaints: [
      { name: "Open", value: 12, color: "#fb7185" },
      { name: "In Progress", value: 18, color: "#f472b6" },
      { name: "Resolved", value: 40, color: "#ec4899" },
    ],
    visitors: [
      { name: "New", value: 120, color: "#34d399" },
      { name: "Returning", value: 80, color: "#10b981" },
    ],
    customers: [
      { name: "New", value: 30, color: "#fbbf24" },
      { name: "Repeat", value: 70, color: "#f59e0b" },
    ],
  },
  "this-month": {
    orders: [
      { name: "Pending", value: 120, color: "#8b5cf6" },
      { name: "Dispatched", value: 85, color: "#a855f7" },
      { name: "Shipped", value: 150, color: "#c084fc" },
      { name: "Delivered", value: 300, color: "#7c3aed" },
    ],
    complaints: [
      { name: "Open", value: 25, color: "#fb7185" },
      { name: "In Progress", value: 40, color: "#f472b6" },
      { name: "Resolved", value: 130, color: "#ec4899" },
    ],
    visitors: [
      { name: "New", value: 600, color: "#34d399" },
      { name: "Returning", value: 400, color: "#10b981" },
    ],
    customers: [
      { name: "New", value: 110, color: "#fbbf24" },
      { name: "Repeat", value: 290, color: "#f59e0b" },
    ],
  },
  "this-quarter": {
    orders: [
      { name: "Pending", value: 300, color: "#8b5cf6" },
      { name: "Dispatched", value: 190, color: "#a855f7" },
      { name: "Shipped", value: 280, color: "#c084fc" },
      { name: "Delivered", value: 600, color: "#7c3aed" },
    ],
    complaints: [
      { name: "Open", value: 45, color: "#fb7185" },
      { name: "In Progress", value: 65, color: "#f472b6" },
      { name: "Resolved", value: 300, color: "#ec4899" },
    ],
    visitors: [
      { name: "New", value: 1400, color: "#34d399" },
      { name: "Returning", value: 900, color: "#10b981" },
    ],
    customers: [
      { name: "New", value: 300, color: "#fbbf24" },
      { name: "Repeat", value: 700, color: "#f59e0b" },
    ],
  },
  "this-year": {
    orders: [
      { name: "Pending", value: 1200, color: "#8b5cf6" },
      { name: "Dispatched", value: 950, color: "#a855f7" },
      { name: "Shipped", value: 1600, color: "#c084fc" },
      { name: "Delivered", value: 3000, color: "#7c3aed" },
    ],
    complaints: [
      { name: "Open", value: 180, color: "#fb7185" },
      { name: "In Progress", value: 250, color: "#f472b6" },
      { name: "Resolved", value: 900, color: "#ec4899" },
    ],
    visitors: [
      { name: "New", value: 7200, color: "#34d399" },
      { name: "Returning", value: 4300, color: "#10b981" },
    ],
    customers: [
      { name: "New", value: 1200, color: "#fbbf24" },
      { name: "Repeat", value: 2800, color: "#f59e0b" },
    ],
  },
};


export const statsCardData: Record<RangeOption, Record<StatCardKey, StatCardDatum>> = {
  "this-week":   { orders:{value:400,total:500}, sales:{value:400,total:500}, products:{value:400,total:500}, visitors:{value:400,total:500} },
  "this-month":  { orders:{value:300,total:500}, sales:{value:400,total:500}, products:{value:400,total:500}, visitors:{value:400,total:500} },
  "this-quarter":{ orders:{value:300,total:500}, sales:{value:400,total:500}, products:{value:400,total:500}, visitors:{value:400,total:500} },
  "this-year":   { orders:{value:400,total:500}, sales:{value:400,total:500}, products:{value:400,total:500}, visitors:{value:400,total:500} },
};


   /* Area‑chart dataset */

 export const earnings: Record<RangeOption, EarningsDatum[]> = {
  "this-week": [
    { label: "Mon", earnings: 7_000 },
    { label: "Tue", earnings: 8_500 },
    { label: "Wed", earnings: 6_800 },
    { label: "Thu", earnings: 7_200 },
    { label: "Fri", earnings: 9_000 },
    { label: "Sat", earnings: 10_000 },
    { label: "Sun", earnings: 9_500 },
  ],
  "this-month": [
    { label: "1", earnings: 7_000 },
    { label: "2", earnings: 8_500 },
    { label: "3", earnings: 6_800 },
    { label: "4", earnings: 7_200 },
    { label: "5", earnings: 9_000 },
    { label: "6", earnings: 10_000 },
    { label: "8", earnings: 9_500 },
    { label: "9", earnings: 9_500 },
    { label: "10", earnings: 9_500 },
    { label: "11", earnings: 9_500 },
    { label: "12", earnings: 9_500 },
    { label: "13", earnings: 9_500 },
    { label: "14", earnings: 9_500 },
    { label: "15", earnings: 9_500 },
    { label: "16", earnings: 9_500 },
    { label: "17", earnings: 9_500 },
    { label: "19", earnings: 9_500 },
    { label: "20", earnings: 9_500 },
    { label: "21", earnings: 9_500 },
    { label: "22", earnings: 9_500 },
    { label: "23", earnings: 9_500 },
    { label: "24", earnings: 9_500 },
    { label: "25", earnings: 9_500 },
    { label: "26", earnings: 9_500 },
    { label: "27", earnings: 9_500 },
    { label: "28", earnings: 9_500 },
    { label: "29", earnings: 9_500 },
    { label: "30", earnings: 9_500 },
    { label: "31", earnings: 9_500 },
  ],
  "this-quarter": [
   { label: "Jan", earnings: 45_000 },
    { label: "Feb", earnings: 52_000 },
    { label: "Mar", earnings: 48_000 },
    { label: "Apr", earnings: 61_000 },
    { label: "May", earnings: 55_000 },
    { label: "Jun", earnings: 67_000 },
  ],
  "this-year": [
    { label: "2011", earnings: 45_000 },
    { label: "2012", earnings: 52_000 },
    { label: "2014", earnings: 48_000 },
    
  ],
};
