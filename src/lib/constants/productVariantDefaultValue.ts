
import { VariantFormValues } from "@/validationSchema/productSchema";

/** Blank variant ready for RHF `append()` */
export const EMPTY_VARIANT = {
  color: "",
  sizes: [],
  thumbnail: "/placeholder.svg", // ← required default string
  gallery: [],
} satisfies VariantFormValues; // Or inline type if needed