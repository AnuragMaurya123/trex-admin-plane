
export type VariantOptions = Partial<{
  neck:      string;
  sleeve:    string;
  fit:       string;
  waistRise: string;
}>;

export interface ProductVariantType {
  id?:       string;
  color:     string;
  thumbnail?: string;
  gallery?:   string[];
   sizes: {
    size: string;
    marketPrice: number;
    sellingPrice: number;
    stock: number;
  }[];
}

/* ---- product ---- */
export interface Product {
  id?:               string;
  name:              string;
  description:       string;
  category:          string;
  subcategory:       string;
  fabric:            string;
  occasion:          string;
  patternAndPrint:   string;
  style:             string;
  dateAdded:         string;          // ISO‑8601
  options?:          VariantOptions;  // global variant dimensions & defaults
  variants?:         ProductVariantType[];
}
