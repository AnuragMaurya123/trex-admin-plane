import type { ProductFormValues } from "@/validationSchema/productSchema"
import type { Control } from "react-hook-form"
import FormInput from "./form-input"
import FormSelect from "./form-select"
import { CATEGORIES, FABRICS, OCCASIONS, PATTERNS, STYLES } from "@/lib/types/productType"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function ProductBasics({ control }: { control: Control<ProductFormValues> }) {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-lg px-6 py-4">
  <CardTitle className="text-white">Product Basics</CardTitle>
  <CardDescription className="text-purple-100">
    Enter the fundamental details for your product.
  </CardDescription>
</CardHeader> 
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput control={control} name="name" label="Product Name*" placeHolder="e.g. Classic Cotton Tee" />
          <FormSelect control={control} name="category" label="Category*" options={CATEGORIES} />
        </div>

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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <FormSelect control={control} name="fabric" label="Fabric" options={FABRICS} />
          <FormSelect control={control} name="occasion" label="Occasion" options={OCCASIONS} />
          <FormSelect control={control} name="patternAndPrint" label="Pattern & Print" options={PATTERNS} />
          <FormSelect control={control} name="style" label="Style" options={STYLES} />
        </div>
      </CardContent>
    </Card>
  )
}
