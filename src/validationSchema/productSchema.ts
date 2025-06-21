// validationSchema/productSchema.ts
import { z } from "zod";
import {
  /* constants */
  CATEGORIES,
  FABRICS,
  OCCASIONS,
  PATTERNS,
  STYLES,
  NECKS,
  SLEEVE_LENGTHS,
  FIT_TYPES,
  WAIST_RISES,
  SIZES,
  ALL_SUBCATEGORIES,
} from "@/lib/types/productType";

/* helper: readonly string[] ➜ z.enum(...) */
const litEnum = <T extends readonly [string, ...string[]]>(arr: T) =>
  z.enum(arr);

/* ───── enums ───── */
const CategoryEnum    = litEnum(CATEGORIES);
const SubCategoryEnum = litEnum(ALL_SUBCATEGORIES);
const FabricEnum      = litEnum(FABRICS);
const OccasionEnum    = litEnum(OCCASIONS);
const PatternEnum     = litEnum(PATTERNS);
const StyleEnum       = litEnum(STYLES);
const NeckEnum        = litEnum(NECKS);
const SleeveEnum      = litEnum(SLEEVE_LENGTHS);
const FitEnum         = litEnum(FIT_TYPES);
const WaistRiseEnum   = litEnum(WAIST_RISES);
const SizeEnum        = litEnum(SIZES);

/* ───── size row ───── */
export const variantSizeSchema = z.object({
  size: SizeEnum  ,
  marketPrice:  z.number().min(1,  { message: "MRP must be ≥ 1" }),
  sellingPrice: z.number().min(1,  { message: "Price must be ≥ 1" }),
  stock:        z.number().min(1,  { message: "Stock must be ≥ 1" }),
});

/* ───── variant (no option fields) ───── */
export const variantSchema = z.object({
  id: z.string().optional(),
  color:     z.string().min(1, { message: "Colour is required" }),
  sizes:     z.array(variantSizeSchema)
               .min(1, { message: "Add at least one size row" }),
  thumbnail: z.string().url({ message: "Thumbnail URL is required" }),
  gallery:   z.array(z.string().url({ message: "Invalid image URL" }))
               .max(4, { message: "Up to 4 gallery images" })
               .optional(),
});

/* ───── product‑level variant options (all optional) ───── */
export const variantOptionsSchema = z.object({
  neck:      NeckEnum.optional(),
  sleeve:    SleeveEnum.optional(),
  fit:       FitEnum.optional(),
  waistRise: WaistRiseEnum.optional(),
});

/* ───── product ───── */
export const productSchema = z.object({
  id:          z.string().optional(),
  name:        z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category:    CategoryEnum,
  subcategory: SubCategoryEnum,
  fabric:      FabricEnum,
  occasion:    OccasionEnum,
  patternAndPrint: PatternEnum,
  style:       StyleEnum,

  dateAdded: z.string().datetime().optional(),

  options:  variantOptionsSchema.optional(),
  variants: z.array(variantSchema)
              .min(1, { message: "Add at least one variant" }),
});

/* inferred types */
export type VariantFormValues = z.infer<typeof variantSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
