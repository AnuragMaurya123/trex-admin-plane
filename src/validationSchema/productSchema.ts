import { z } from "zod";
import {
  PRODUCT_TYPES,
  NECKS,
  SLEEVE_LENGTHS,
  FIT_TYPES,
  WAIST_RISES,
  SIZES,
} from "@/lib/types/productType";

/* ---------- helper: size row ---------- */
export const variantSizeSchema = z.object({
  size: z.enum(SIZES),
  marketPrice: z.number().min(0),
  sellingPrice: z.number().min(0),
  stock: z.number().min(0),
});

/* ---------- Variant ---------- */
export const variantSchema = z.object({
  id: z.string().optional(),
  color: z.string().min(1),
  /* single‑select */
  variantType: z.enum(PRODUCT_TYPES).optional(),
  /* multi‑select check‑boxes */
  neck: z.enum(NECKS).optional(),
  sleeve: z.array(z.enum(SLEEVE_LENGTHS)).optional(),
  fit: z.array(z.enum(FIT_TYPES)).optional(),
  waistRise: z.array(z.enum(WAIST_RISES)).optional(),

  /* sizes array ⚠ */
  sizes: z.array(variantSizeSchema).min(1),

  thumbnail: z.string().url().optional(),
  gallery: z.array(z.string().url()).max(4).optional(),

  /* used by UI to toggle option groups */
  selectedOptionTypes: z
    .array(z.enum(["sleeve", "fit", "waistRise"]))
    .optional(),
});

/* ---------- Product ---------- */
export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["Men", "Women", "Kids"]),
  fabric: z.enum([
    "Cotton",
    "Polyester",
    "Silk",
    "Linen",
    "Denim",
    "Wool",
  ]),
  occasion: z.enum(["Casual", "Formal", "Party", "Sportswear", "Ethnic"]),
  patternAndPrint: z.enum([
    "Solid",
    "Striped",
    "Checked",
    "Floral",
    "Graphic Print",
  ]),
  style: z.enum(["A-Line", "Shift", "Bodycon", "Fit & Flare", "Maxi"]),

  newArrivals: z.boolean().optional(),
  variants: z.array(variantSchema).min(1),
});

/* ---------- inferred TS types ---------- */
export type VariantFormValues = z.infer<typeof variantSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
