// components/product-basics.tsx
"use client";
import { useWatch, type Control} from "react-hook-form";
import type { ProductFormValues } from "@/validationSchema/productSchema";
import {
  CATEGORIES,
  FABRICS,
  OCCASIONS,
  getPatternsOption,
  getStylesOption,
  getSubCategoryOption,
} from "@/lib/types/productType";

import FormInput from "./form-input";
import FormSelect from "./form-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ProductBasics({
  control,
}: {
  control: Control<ProductFormValues>;
}) {
  /* Watch the category so we can cascade‑reset subcategory when it changes */
  const category = useWatch({ control, name: "category" });
  /* If category changes and current subcategory is no longer valid, reset it */
  const patterns = getPatternsOption(category);    
  const styles = getStylesOption(category);
  const subcategoryOptions= getSubCategoryOption(category)

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-lg px-6 py-4">
        <CardTitle className="text-white">Product Basics</CardTitle>
        <CardDescription className="text-purple-100">
          Enter the fundamental details for your product.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ───────────────────────────── */}
        {/*  Row 1 – Name + Category      */}
        {/* ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            control={control}
            name="name"
            label="Product Name*"
            placeHolder="e.g. Classic Cotton Tee"
          />
            <FormSelect
            control={control}
            name="fabric"
            label="Fabric"
            options={FABRICS}
          />
</div>

          <FormSelect
            control={control}
            name="category"
            label="Category*"
            options={CATEGORIES}
          />


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            control={control}
            name="subcategory"
            label="Subcategory*"
            options={subcategoryOptions}
            disabled={!category ? true : false}
            placeholder={category ? "Select…" : "Choose category first"}
          />
         
         
          <FormSelect
            control={control}
            name="occasion"
            label="Occasion"
            options={OCCASIONS}
          />
          <FormSelect
            control={control}
            name="patternAndPrint"
            label="Pattern & Print"
            options={patterns}
          />
          <FormSelect
            control={control}
            name="style"
            label="Style"
            options={styles}
            disabled={!styles.length}   // disable if empty
          />
     
        </div>

        {/* ───────────────────────────── */}
        {/*  Description textarea         */}
        {/* ───────────────────────────── */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe the product, its features, and what makes it special..."
                  {...field}
                />
              </FormControl>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />

        {/* ───────────────────────────── */}
        {/*  Fabric ▸ Style 4‑up grid     */}
        {/* ───────────────────────────── */}
        
      </CardContent>
    </Card>
  );
}
