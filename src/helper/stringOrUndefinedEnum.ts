import { VariantFormValues } from "@/validationSchema/productSchema";
import { ProductVariantType } from "@/lib/types/productType";

/**
 * Converts RHF form variant (VariantFormValues) to payload (ProductVariantType)
 * for saving to backend / database.
 */
export function mapVariantToPayload(v: VariantFormValues): ProductVariantType {
  return {
    id: v.id ?? undefined, // optional
    color: v.color,
    thumbnail: v.thumbnail || "/placeholder.svg",
    gallery: v.gallery?.length ? v.gallery : [],
    sizes: v.sizes,
  };
}
