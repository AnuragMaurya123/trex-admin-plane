import type { VariantFormValues, ProductFormValues } from "@/validationSchema/productSchema";
import { GripVertical, Trash2 } from "lucide-react";
import {
  useFieldArray,
  type Control,
  type UseFieldArrayUpdate,
} from "react-hook-form";

import { AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import FormInput from "./form-components/form-input";
import FormSelect from "./form-components/form-select";
import OptionSelector from "./form-components/option-selector";
import CheckboxGroup from "./form-components/checkbox-group";
import SizeSection from "./form-components/size-section";
import ThumbnailUpload from "./form-components/thumbnail-upload";
import { GalleryUpload } from "./form-components/gallery-upload";

import {
  FIT_TYPES,
  NECKS,
  PRODUCT_TYPES,
  SLEEVE_LENGTHS,
  WAIST_RISES,
} from "@/lib/types/productType";

/**
 * Single Variant Card inside ProductDialog.
 *
 * 1. Header row is a **flex container** holding:
 *    – drag‑handle icon  •  variant title (colour)  •  type badge  •  delete button
 * 2. Header row is **outside** the accordion trigger button to avoid nesting buttons.
 */
export default function VariantCard({
  index,
  variant,
  control,
  remove,
  update,
}: {
  index: number;
  variant: VariantFormValues;
  control: Control<ProductFormValues>;
  remove: (idx: number) => void;
  update: UseFieldArrayUpdate<ProductFormValues, "variants">;
}) {
  /* ────────────────────────────────────────────────────────── */
  /* Size field‑array                                           */
  /* ────────────────────────────────────────────────────────── */
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `variants.${index}.sizes`,
  });

  /* ────────────────────────────────────────────────────────── */
  /* Option toggle helper                                       */
  /* ────────────────────────────────────────────────────────── */
  const toggleOption = (option: "sleeve" | "fit" | "waistRise") => {
    const opts = variant.selectedOptionTypes ?? [];
    const isActive = opts.includes(option);
    update(index, {
      ...variant,
      selectedOptionTypes: isActive
        ? opts.filter((o) => o !== option)
        : [...opts, option],
      ...(isActive && { [option]: [] }),
    } as VariantFormValues);
  };

  /* ────────────────────────────────────────────────────────── */
  /* Render                                                     */
  /* ────────────────────────────────────────────────────────── */
  return (
    <AccordionItem value={`item-${index}`} className="rounded-lg border bg-slate-50 dark:bg-slate-800/40 overflow-hidden">
      {/* ---------- Header row (NOT inside <button>) ---------- */}
      <div className="flex  items-center gap-4 px-4 py-3 text-white border-b bg-gradient-to-r from-purple-500 to-purple-600 dark:border-slate-700/50 justify-between ">
        {/* drag handle + trigger (expands content) */}
        <AccordionTrigger className="flex items-center gap-4 flex-1 hover:no-underline p-0">
          <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex-1 text-left">
            <p className="font-semibold">
              Variant {index + 1}
              {variant.color && (
                <span className="font-normal text-muted-foreground"> – {variant.color}</span>
              )}
            </p>
          </div>
        </AccordionTrigger>

        {/* delete variant button – outside trigger */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => remove(index)}
          className="ml-2 hover:bg-destructive/10 rounded-full"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>

      </div>

      {/* ---------- Body ---------- */}
      <AccordionContent className="p-4 space-y-6">
        {/* --- two column grid on md+ --- */}
        <div className="grid md:grid-cols-1 gap-6">
          {/* ------ left column ------ */}
          <div className="space-y-6">
            {/* Core */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500 py-3 to-purple-600 text-white">
                <CardTitle className="text-base">Core Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    control={control}
                    name={`variants.${index}.color`}
                    label="Colour*"
                    placeHolder="e.g., Navy Blue"
                  />
                  <FormSelect
                    control={control}
                    name={`variants.${index}.variantType`}
                    label="Product Type*"
                    options={PRODUCT_TYPES}
                  />
                </div>
                <FormSelect
                  control={control}
                  name={`variants.${index}.neck`}
                  label="Neck"
                  options={NECKS}
                />
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500 py-3 to-purple-600 text-white">
                <CardTitle className="text-base">Custom Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <OptionSelector
                  control={control}
                  idx={index}
                  value={variant.selectedOptionTypes}
                  toggle={toggleOption}
                />

                {variant.selectedOptionTypes?.length ? <Separator /> : null}
                {variant.selectedOptionTypes?.includes("sleeve") && (
                  <CheckboxGroup control={control} idx={index} option="sleeve" items={SLEEVE_LENGTHS} />
                )}
                {variant.selectedOptionTypes?.includes("fit") && (
                  <CheckboxGroup control={control} idx={index} option="fit" items={FIT_TYPES} />
                )}
                {variant.selectedOptionTypes?.includes("waistRise") && (
                  <CheckboxGroup control={control} idx={index} option="waistRise" items={WAIST_RISES} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* ------ right column ------ */}
          <div className="space-y-6">
            {/* Size / stock */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500 py-3 to-purple-600 text-white">
                <CardTitle className="text-base">Sizing & Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <SizeSection
                  idx={index}
                  sizeFields={sizeFields}
                  appendSize={appendSize}
                  removeSize={removeSize}
                  control={control}
                />
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-500 py-3 to-purple-600 text-white">
                <CardTitle className="text-base">Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
                  <ThumbnailUpload control={control} name={`variants.${index}.thumbnail`} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image Gallery</label>
                  <GalleryUpload control={control} name={`variants.${index}.gallery`} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
