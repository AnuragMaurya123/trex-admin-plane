import { VariantFormValues } from "@/validationSchema/productSchema";

/** Blank variant ready for RHF `append()` */
export const EMPTY_VARIANT: VariantFormValues = {
  color: "",
  variantType: undefined,   // single select
  neck: undefined,          // single select
  sleeve: [],               // multi select arrays
  fit: [],
  waistRise: [],
  sizes: [],

  thumbnail: "",
  gallery: [],

  selectedOptionTypes: [],
};
