"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import ProductDialog from "./add-product-dialog";

interface ProductTableProps {
  products: Product[];
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (updated: Product) => void;
}

export function ProductTable({ products, onDeleteProduct, onUpdateProduct }: ProductTableProps) {
  const stockBadgeVariant = (stock: number): "default" | "secondary" | "destructive" => {
    if (stock === 0) return "destructive";
    if (stock < 20) return "secondary";
    return "default";
  };

  return (
    <div className="rounded-md bg-card overflow-x-auto">
      <Table className="min-w-[1200px]">
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Fabric</TableHead>
            <TableHead>New Arrival</TableHead>
            <TableHead className="text-right">Price ($)</TableHead>
            <TableHead>Pattern / Print</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Sleeve</TableHead>
            <TableHead>Neck</TableHead>
            <TableHead>Occasion</TableHead>
            <TableHead>Sizes</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-gradient-to-r from-violet-500/10 to-purple-500/10">
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={15} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Image
                    src={p.imageUrl || "/placeholder.svg?width=50&height=50&query=product"}
                    alt={p.name}
                    width={50}
                    height={50}
                    className="rounded-sm object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>{p.name}</div>
                  {p.subcategory && (
                    <div className="text-xs text-muted-foreground">{p.subcategory}</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{p.category}</Badge>
                </TableCell>
                <TableCell>{p.fabric}</TableCell>
                <TableCell>
                  {p.newArrivals ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell className="text-right">{p.price.toFixed(2)}</TableCell>
                <TableCell>{p.patternAndPrint}</TableCell>
                <TableCell>
                  <Badge variant={stockBadgeVariant(p.stock)}>{p.stock}</Badge>
                </TableCell>
                <TableCell>{p.style}</TableCell>
                <TableCell>{p.sleeveLength}</TableCell>
                <TableCell>{p.neck}</TableCell>
                <TableCell>{p.occasion}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {p.size.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(p.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gradient-to-r from-violet-300 to-purple-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-white">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <div className=" py-1">
                        <ProductDialog
                          initialProduct={p}
                          onSave={onUpdateProduct}
                          trigger={
                            <Button variant="ghost" className="w-full justify-start text-sm">
                              <Edit3 className="mr-2 h-4 w-4" /> Edit
                            </Button>
                          }
                        />
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteProduct(p.id)}
                        className="text-red-600 hover:!text-red-600 hover:!bg-red-100 dark:hover:!bg-red-900/50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
