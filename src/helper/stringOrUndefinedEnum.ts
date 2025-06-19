import { VariantFormValues } from "@/validationSchema/productSchema";
import { ProductVariantType } from "@/lib/types/productType";

export function mapVariantToPayload(v: VariantFormValues): ProductVariantType {

  return {
    ...(v.id ? { id: v.id } : {}),
    color: v.color,
    type: v.variantType!, // already guaranteed by Zod
    options: {
    neck: v.neck ?? undefined,
      sleeve: v.sleeve?.length ? v.sleeve : undefined,
      fit: v.fit?.length ? v.fit : undefined,
      waistRise: v.waistRise?.length ? v.waistRise : undefined,
    },
    thumbnail: v.thumbnail ?? "/placeholder.svg",
    gallery: v.gallery ?? [],
    sizes: v.sizes, // size rows already valid
  };
}
