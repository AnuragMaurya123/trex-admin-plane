/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CATEGORIES,
  FABRICS,
  OCCASIONS,
  PATTERNS,
  STYLES,
  SLEEVE_LENGTHS,
  NECKS,
  SIZES,
  type Product,
} from "@/lib/types";
import FormSelect from "./form-components/form-select";
import FormInput from "./form-components/form-input";

// ------------------- Schema -------------------
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  subcategory: z.string().optional(),
  description: z.string().optional(),
  category: z.string({ required_error: "Select a category" }),
  fabric: z.string().optional(),
  occasion: z.string().optional(),
  patternAndPrint: z.string().optional(),
  style: z.string().optional(),
  sleeveLength: z.string().optional(),
  neck: z.string().optional(),
  size: z.array(z.string()).optional(),
  price: z.coerce.number().min(0.01, { message: "Price is required" }),
  stock: z.coerce.number().min(0, { message: "Stock is required" }),
  newArrivals: z.boolean(),
  imageUrl: z.string().url().optional(),
});
export type FormValues = z.infer<typeof formSchema>;

// ------------------- Props -------------------
interface ProductDialogProps {
  /**
   * If provided, dialog works in **edit** mode. Otherwise creates new product.
   */
  initialProduct?: Product;
  /**
   * Callback when user saves (add or edit).
   */
  onSave: (product: Product) => void;
  /**
   * Element that triggers the dialog (e.g. a Button).
   */
  trigger: React.ReactNode;
}

/**
 * Reusable dialog for **adding or editing** products.
 * - If `initialProduct` is passed, fields are pre‑filled and the submit button says "Update".
 * - Otherwise acts as an "Add New Product" dialog.
 */
export default function ProductDialog({ initialProduct, onSave, trigger }: ProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEdit = Boolean(initialProduct);

  // ------------------- Form -------------------
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialProduct ?? {
      name: "",
      subcategory: "",
      description: "",
      category: undefined,
      price: 0,
      stock: 0,
      newArrivals: false,
      size: [],
      fabric: "",
      imageUrl: "",
      neck: "",
      occasion: "",
      patternAndPrint: "",
      sleeveLength: "",
      style: "",
    },
  });

  // ------------------- Submit -------------------
  const handleSubmit = (values: FormValues) => {
    const product: Product = {
      ...initialProduct, // keep id/dateAdded when editing
      id: initialProduct?.id ?? `prod_${Date.now()}`,
      dateAdded: initialProduct?.dateAdded ?? new Date().toISOString(),
      imageUrl:
        values.imageUrl ||
        `/placeholder.svg?width=100&height=100&query=${encodeURIComponent(values.name)}`,
      ...values,
    } as Product;

    onSave(product);
    form.reset();
    setIsOpen(false);
  };

  // ------------------- UI -------------------
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] scrollbar-hide overflow-y-auto bg-gradient-to-r from-violet-100 to-purple-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-white">
        <DialogHeader>
          <DialogTitle className="text-purple-700">{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription className="text-purple-700">
            {isEdit ? "Update the product details." : "Fill in the detailed product information."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* ---- Name & Subcategory ---- */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput control={form.control} label="Name*" name="name" placeHolder="Enter Product Name" type="text" className="text-purple-700 font-bold dark:text-white dark:border-white" />
              <FormInput control={form.control} label="Sub Category" name="subcategory" placeHolder="e.g., T‑Shirts, Jeans" type="text" className="text-purple-700 font-bold dark:text-white dark:border-white" />
            </div>

            {/* ---- Description ---- */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 font-bold dark:text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} className="border-purple-700 dark:border-white focus-visible:ring-purple-500" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ---- Selects Row 1 ---- */}
            <div className="grid grid-cols-2 gap-4">
              <FormSelect control={form.control} label="Category*" name="category" options={CATEGORIES} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
              <FormSelect control={form.control} label="Fabric" name="fabric" options={FABRICS} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
            </div>
            {/* ---- Selects Row 2 ---- */}
            <div className="grid grid-cols-2 gap-4">
              <FormSelect control={form.control} label="Occasion" name="occasion" options={OCCASIONS} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
              <FormSelect control={form.control} label="Pattern & Print" name="patternAndPrint" options={PATTERNS} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
            </div>
            {/* ---- Selects Row 3 ---- */}
            <div className="grid grid-cols-2 gap-4">
              <FormSelect control={form.control} label="Style" name="style" options={STYLES} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
              <FormSelect control={form.control} label="Sleeve Length" name="sleeveLength" options={SLEEVE_LENGTHS} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />
            </div>
            {/* ---- Neck ---- */}
            <FormSelect control={form.control} label="Neck" name="neck" options={NECKS} externalClassName="text-purple-700 font-bold dark:text-white dark:border-white" />

            {/* ---- Sizes ---- */}
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 font-bold dark:text-white">Available Sizes</FormLabel>
                  <div className="grid grid-cols-6 gap-2 pt-2">
                    {SIZES.map((sz) => (
                      <div key={sz} className="flex items-center space-x-2">
                        <Checkbox
                          className="text-purple-700 dark:border-white"
                          checked={field.value?.includes(sz)}
                          onCheckedChange={() => {
                            const current = field.value ?? [];
                            field.onChange(current.includes(sz) ? current.filter((s) => s !== sz) : [...current, sz]);
                          }}
                          id={`size-${sz}`}
                        />
                        <FormLabel htmlFor={`size-${sz}`} className="font-normal text-purple-700 dark:text-white">
                          {sz}
                        </FormLabel>
                      </div>
                    ))}
                  </div>
                  <FormDescription className="text-purple-700">Select one or more sizes.</FormDescription>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            {/* ---- Price & Stock ---- */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput control={form.control} label="Price*" name="price" placeHolder="Enter Product Price" type="number" className="text-purple-700 font-bold dark:text-white dark:border-white" />
              <FormInput control={form.control} label="Stock*" name="stock" placeHolder="Enter Product Stock" type="number" className="text-purple-700 font-bold dark:text-white dark:border-white" />
            </div>

            {/* ---- New Arrivals ---- */}
            <FormField
              control={form.control}
              name="newArrivals"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-purple-700 dark:border-white" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-purple-700 font-bold dark:text-white">Mark as New Arrival</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* ---- Actions ---- */}
            <DialogFooter>
              <Button type="button" variant="outline" className="border-red-500 text-red-600" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-700 text-white">
                {isEdit ? "Update Product" : "Save Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
