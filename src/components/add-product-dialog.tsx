/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Accordion } from "@/components/ui/accordion"
import type { Product, SubCategory } from "@/lib/types/productType"
import { productSchema, type ProductFormValues } from "@/validationSchema/productSchema"
import { EMPTY_VARIANT } from "@/lib/constants/productVariantDefaultValue"
import { mapVariantToPayload } from "@/helper/stringOrUndefinedEnum"
import { useCreateProduct } from "@/hooks/useCreateProduct"
import { useUpdateProduct } from "@/hooks/useUpdateProduct"
import ProductBasics from "./form-components/product-basics"
import VariantCard from "./variant-card"
import type { NewProduct } from "@/lib/types/reactComponentsProps"

export default function ProductDialog({
  initialProduct,
  trigger,
}: {
  initialProduct?: Product
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const isEdit = Boolean(initialProduct)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit && initialProduct
  ? {
      ...initialProduct,
      variants: initialProduct.variants?.map((v) => ({
        id: v.id,
        color: v.color,
        thumbnail: v.thumbnail ?? "",
        gallery: v.gallery ?? [],
        sizes: v.sizes ?? [],
      })) ?? [EMPTY_VARIANT],
    }
  : {
      name: "",
      description: "",
      category: "Men",
      subcategory: "T-Shirt", // You might want to dynamically select based on `category`
      fabric: "Cotton",
      occasion: "Casual",
      patternAndPrint: "Solid",
      style: "A-Line",
      variants: [EMPTY_VARIANT],
    }
  })

  const { control, handleSubmit, reset, watch } = form

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
    update: updateVariant,
  } = useFieldArray({
    control,
    name: "variants",
  })

  const watchedVariants = watch("variants")

  const { mutate: createProduct, isPending: creating } = useCreateProduct()
  const { mutate: updateProduct, isPending: updating } = useUpdateProduct()

 const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const variants = data.variants.map(mapVariantToPayload);

    if (isEdit && initialProduct) {
      updateProduct(
        { ...initialProduct, ...data, variants,subcategory:data.subcategory as SubCategory},
        {
          onSuccess: () => {
            setOpen(false);
            reset();
          },
        },
      );
    } else {
      const payload: NewProduct = {
        ...data,
        dateAdded: new Date().toISOString(),
        subcategory:data.subcategory as SubCategory,
        variants,
        description: data.description ?? "",
      };
      createProduct(payload, {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      });
    }
  };

  const onError = (errors: any) => {
  console.log(" validation errors", errors);
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto scrollbar-hide border-0 shadow-xl shadow-purple-300">
        <DialogHeader >
          <DialogTitle>{isEdit ? "Edit Product" : "Create New Product"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the product details and manage its variants."
              : "Fill in the product details and add one or more variants."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit,onError)} className="space-y-8 py-4">
            <ProductBasics control={control} />

            <div>
              <h3 className="text-lg font-medium mb-4">Product Variants</h3>
              <Accordion type="multiple" className="w-full mb-5 space-y-4" defaultValue={["item-0"]}>
                {variantFields.map((variant, idx) => (
                  <VariantCard
                    key={variant.id}
                    index={idx}
                    variant={watchedVariants[idx]}
                    control={control}
                    remove={removeVariant}
                    update={updateVariant}
                  />
                ))}
              </Accordion>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => appendVariant(EMPTY_VARIANT)}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Variant
              </Button>
            </div>

            <DialogFooter>
              <Button
                type="button"
                className="border-red-600 text-red-500 border"
                onClick={() => {
                  setOpen(false)
                  reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={creating || updating}
                className={
                  creating || updating
                    ? "bg-muted text-muted-foreground"
                    : isEdit
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-purple-700 hover:bg-purple-900 text-white"
                }
              >
                {creating || updating
                  ? isEdit
                    ? "Updating…"
                    : "Saving…"
                  : isEdit
                    ? "Save Changes"
                    : "Create Product"}
              </Button>

            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
