"use client"

import { useState, useMemo } from "react"

import { CATEGORIES, type Product, type ProductCategory } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, Shirt, PlusCircle } from "lucide-react"
import { INITIAL_PRODUCTS } from "@/lib/constants"
import ProductDialog from "@/components/add-product-dialog"
import { ProductTable } from "@/components/product-table"
import { Button } from "@/components/ui/button"

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts])
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
    }
  }
  const handleUpdateProduct = (updatedProduct: Product) => {
  setProducts((prevProducts) =>
    prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  );
};


  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((product) => (selectedCategory === "all" ? true : product.category === selectedCategory))
  }, [products, searchTerm, selectedCategory])

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
      <header className="mb-8 ">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text leading-relaxed text-transparent">Clothing Product Management</h1>
        <p className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text leading-relaxed text-transparent">Manage your apparel inventory and view product details.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 ">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600  shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-white text-md font-medium">Total Products</CardTitle>
            <Shirt className="size-10 text-slate-200" />
          </CardHeader>
          <CardContent className="text-slate-200">
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {filteredProducts.length !== totalProducts
                ? `${filteredProducts.length} matching current filters`
                : "All products listed"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600  shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-white">Total Stock</CardTitle>
            <Package className="size-10 text-slate-200" />
          </CardHeader>
          <CardContent className="text-slate-200">
            <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600  shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-white">Total Inventory Value</CardTitle>
            <DollarSign className="size-10 text-slate-200" />
          </CardHeader>
          <CardContent className="text-slate-200">
            <div className="text-2xl font-bold">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Estimated current value</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 bg-gradient-to-r  from-violet-500/10 to-purple-500/10 backdrop-blur-sm dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[300px] bg-white border-white text-slate-800 focus-visible:ring-purple-700 dark:text-black"
              />
              <Select
                value={selectedCategory}
                onValueChange={(value: string) => setSelectedCategory(value as ProductCategory | "all")}
              >
                <SelectTrigger className="w-full md:w-[200px] bg-gradient-to-r border-white text-white from-purple-500 to-purple-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-r  from-violet-300 to-purple-400  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-white">
                  <SelectItem value="all" className="text-white">All Categories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ProductDialog
              trigger={
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              }
              onSave={handleAddProduct}        // your existing add handler
            />

          </div>
        </CardContent>
      </Card>

      <ProductTable products={filteredProducts} onDeleteProduct={handleDeleteProduct} onUpdateProduct={handleUpdateProduct} />
    </div>
  )
}
