"use client";

import { useState, useMemo } from "react";
import {
  CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  DollarSign,
  Shirt,
  PlusCircle,
} from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/constants";
import ProductDialog from "@/components/add-product-dialog";
import { ProductTable } from "@/components/product-table";
import { Button } from "@/components/ui/button";

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | "all">("all");

  /* ────────────────── CRUD handlers ────────────────── */
  const handleAddProduct = (newP: Product) =>
    setProducts((prev) => [newP, ...prev]);

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpdateProduct = (updated: Product) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );

  /* ────────────────── Derived data ────────────────── */
  const filtered = useMemo(
    () =>
      products
        .filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((p) =>
          selectedCategory === "all" ? true : p.category === selectedCategory
        ),
    [products, searchTerm, selectedCategory]
  );

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  /* ────────────────── UI ────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Clothing Product Management
        </h1>
        <p className="text-sm sm:text-base bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Manage your apparel inventory and view product details.
        </p>
      </header>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatsCard
          title="Total Products"
          icon={<Shirt className="size-8 text-slate-200" />}
          value={totalProducts}
          subtitle={
            filtered.length !== totalProducts
              ? `${filtered.length} matching current filters`
              : "All products listed"
          }
        />

        <StatsCard
          title="Total Stock"
          icon={<Package className="size-8 text-slate-200" />}
          value={totalStock.toLocaleString()}
          subtitle="Across all products"
        />

        <StatsCard
          title="Total Inventory Value"
          icon={<DollarSign className="size-8 text-slate-200" />}
          value={`$${totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Estimated current value"
        />
      </div>

      {/* Filter bar */}
      <Card className="mb-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-slate-800/40">
  <CardContent className="p-4 sm:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      
      {/* Search + category select */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto flex-1">
        <Input
          type="search"
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[260px] bg-white text-slate-800"
        />

        <Select
          value={selectedCategory}
          onValueChange={(v) =>
            setSelectedCategory(v as ProductCategory | "all")
          }
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <SelectValue placeholder="Filter category" />
          </SelectTrigger>
          <SelectContent className="bg-violet-500 text-white">
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Button wrapper to fix alignment */}
      <div className="w-full sm:w-auto">
        <ProductDialog
          trigger={
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          }
          onSave={handleAddProduct}
        />
      </div>
    </div>
  </CardContent>
</Card>


      {/* Data table */}
      <ProductTable
        products={filtered}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}

/* ──────── StatsCard sub‑component ──────── */
const StatsCard = ({
  title,
  icon,
  value,
  subtitle,
}: {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  subtitle?: string;
}) => (
  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg hover:shadow-2xl transition-transform hover:scale-[1.03] border-0">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-white text-sm">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className="text-slate-200">
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && (
        <p className="text-xs mt-1 text-slate-300">{subtitle}</p>
      )}
    </CardContent>
  </Card>
);
