/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import {
  Package,
  DollarSign,
  Shirt,
  PlusCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import ProductDialog from "@/components/add-product-dialog";
import { ProductTable } from "@/components/product-table";
import KPICard from "@/components/kpl-card";

import {
  Card, CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useGetProduct } from "@/hooks/useGetProduct";
import { CATEGORIES } from "@/lib/types/productType";
import type {
  Product,
  ProductCategory,
} from "@/lib/types/productType";
import { useHasMounted } from "@/lib/useHasMounted";

/* ----------------------------------------------------------- */
/* helpers                                                     */
/* ----------------------------------------------------------- */

const stockOf = (p: Product) =>
  p.variants?.reduce(
    (sum, v) => sum + v.sizes.reduce((s, row) => s + row.stock, 0),
    0,
  ) ?? 0;

const valueOf = (p: Product) =>
  p.variants?.reduce(
    (sum, v) =>
      sum + v.sizes.reduce((s, row) => s + row.sellingPrice * row.stock, 0),
    0,
  ) ?? 0;

/* ----------------------------------------------------------- */
/* page component                                              */
/* ----------------------------------------------------------- */

export default function ProductManagementPage() {
  /* fetch --------------------------------------------------- */
  const {
    data: productsList,
    isError,
    isLoading,
  } = useGetProduct();

  /* local state --------------------------------------------- */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  /* always have an array, even while loading ---------------- */
  const safeProducts: Product[] = productsList ?? [];

  /* search / category filter (hook runs in every render) ---- */
  const filtered = useMemo(() => {
    return safeProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [safeProducts, search, category]);

  /* KPI numbers --------------------------------------------- */
  const totalProducts = safeProducts.length;
  const totalStock = safeProducts.reduce((s, p) => s + stockOf(p), 0);
  const totalValue = safeProducts.reduce((s, p) => s + valueOf(p), 0);
  const hasMounted = useHasMounted();

  /* --------------------------------------------------------- */
  /* conditional UI (after all hooks)                          */
  /* --------------------------------------------------------- */
  if (isLoading) {
    return (
      <CenteredGradientCard>
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400" />
        <p className="font-medium text-purple-700 dark:text-purple-300">
          Loading products…
        </p>
      </CenteredGradientCard>
    );
  }

  if (isError) {
    return (
      <CenteredGradientCard error>
        <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
        <p className="font-medium text-red-700 dark:text-red-300">
          Failed to load products
        </p>
      </CenteredGradientCard>
    );
  }

  if (totalProducts === 0) {
    return (
      <CenteredGradientCard>
        <p className="font-medium text-purple-700 dark:text-purple-300 mb-4">
          No products yet – add your first one!
        </p>
        <ProductDialog
          trigger={
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          }
        />
      </CenteredGradientCard>
    );
  }

  /* --------------------------------------------------------- */
  /* render main page                                          */
  /* --------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8
                    bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* heading */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold
                       bg-gradient-to-r from-purple-600 to-purple-400
                       bg-clip-text text-transparent">
          Clothing Product Management
        </h1>
        <p className="text-sm bg-gradient-to-r from-purple-600 to-purple-400
                      bg-clip-text text-transparent">
          Manage your apparel inventory and view product details
        </p>
      </header>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <KPICard
          title="Total Products"
          value={totalProducts}
          icon={<Shirt className="h-9 w-9 text-slate-200" />}
          subtitle={
            filtered.length !== totalProducts
              ? `${filtered.length} matching filters`
              : "All products listed"
          }
        />
        <KPICard
          title="Total Stock"
          value={hasMounted
            ? totalStock.toLocaleString("en-IN")
            : totalStock}
        icon={<Package className="h-9 w-9 text-slate-200" />}
        subtitle="Across all variants"
        />
        <KPICard
          title="Total Inventory Value"
          value={hasMounted
            ? totalValue.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }):totalProducts}
          icon={<DollarSign className="h-9 w-9 text-slate-200" />}
          subtitle="Estimated current value"
        />
      </div>

      {/* filters */}
      <Card className="mb-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10
                       backdrop-blur-sm border-white dark:from-slate-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Input
                type="search"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-white border-white text-slate-800
                           focus-visible:ring-purple-700 dark:text-black"
              />
              <Select
                value={category}
                onValueChange={(v) =>
                  setCategory(v as ProductCategory | "all")}
              >
                <SelectTrigger
                  className="min-w-[9rem] bg-gradient-to-r from-purple-500 to-purple-600
                             border-white text-white ">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent
                  className="bg-gradient-to-r from-violet-400 to-purple-500
                             border-white dark:from-slate-900">
                  <SelectItem value="all" className="text-white">
                    All
                  </SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-white">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ProductDialog
              trigger={
                <Button className="w-full sm:w-auto bg-gradient-to-r
                                   from-purple-500 to-purple-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* table */}
      <div className="overflow-x-auto rounded-lg shadow-inner">
        <ProductTable products={filtered} />
      </div>
    </div>
  );
}

/* ---------- tiny helper to DRY the loading / error / empty UI ---------- */

function CenteredGradientCard({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) {
  const gradient = error
    ? "from-red-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-red-900/30"
    : "from-purple-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30";

  return (
    <div
      className={`flex h-96 items-center justify-center rounded-xl
                  bg-gradient-to-br ${gradient}
                  shadow-lg border
                  ${error
          ? "border-red-100 dark:border-red-800/30"
          : "border-purple-100 dark:border-purple-800/30"}`}
    >
      <div
        className={`flex flex-col items-center space-y-4 rounded-xl
                    bg-white/80 p-8 shadow-xl backdrop-blur-md
                    ${error ? "dark:bg-red-950/50"
            : "dark:bg-slate-800/80"}`}
      >
        {children}
      </div>
    </div>
  );
}
