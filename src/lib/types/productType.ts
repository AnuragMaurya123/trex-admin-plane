/* ──────────────────────────────────────────────────────────
 *  ENUM‑LIKE LITERALS
 * ──────────────────────────────────────────────────────────*/

export type ProductType =
  | "T-Shirt"
  | "Shirt"
  | "Polo"
  | "Sweatshirt"
  | "Pants"
  | "Shorts"
  | "Jacket"
  | "Kurta"
  | "Skirt";

export type SleeveLength =
  | "Sleeveless"
  | "Short Sleeve"
  | "Long Sleeve"
  | "3/4 Sleeve";
export type FitType = "Slim Fit" | "Regular Fit" | "Loose Fit";
export type WaistRise = "Mid Rise" | "High Rise" | "Low Rise";
export type ProductCategory = "Men" | "Women" | "Kids";
export type Fabric =
  | "Cotton"
  | "Polyester"
  | "Silk"
  | "Linen"
  | "Denim"
  | "Wool";
export type Occasion = "Casual" | "Formal" | "Party" | "Sportswear" | "Ethnic";
export type PatternAndPrint =
  | "Solid"
  | "Striped"
  | "Checked"
  | "Floral"
  | "Graphic Print";
export type Style = "A-Line" | "Shift" | "Bodycon" | "Fit & Flare" | "Maxi";
export type Neck =
  | "Round Neck"
  | "V-Neck"
  | "Polo"
  | "Turtleneck"
  | "Boat Neck";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

/* ──────────────────────────────────────────────────────────
 *  CONSTANTS FOR SELECT INPUTS
 * ──────────────────────────────────────────────────────────*/

export const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
] as const satisfies ProductCategory[];
export const FABRICS = [
  "Cotton",
  "Polyester",
  "Silk",
  "Linen",
  "Denim",
  "Wool",
] as const satisfies Fabric[];
export const OCCASIONS = [
  "Casual",
  "Formal",
  "Party",
  "Sportswear",
  "Ethnic",
] as const satisfies Occasion[];
export const PATTERNS = [
  "Solid",
  "Striped",
  "Checked",
  "Floral",
  "Graphic Print",
] as const satisfies PatternAndPrint[];
export const STYLES = [
  "A-Line",
  "Shift",
  "Bodycon",
  "Fit & Flare",
  "Maxi",
] as const satisfies Style[];
export const SLEEVE_LENGTHS = [
  "Sleeveless",
  "Short Sleeve",
  "Long Sleeve",
  "3/4 Sleeve",
] as const satisfies SleeveLength[];
export const NECKS = [
  "Round Neck",
  "V-Neck",
  "Polo",
  "Turtleneck",
  "Boat Neck",
] as const satisfies Neck[];
export const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
] as const satisfies Size[];
export const WAIST_RISES = [
  "Mid Rise",
  "High Rise",
  "Low Rise",
] as const satisfies WaistRise[];
export const PRODUCT_TYPES = [
  "T-Shirt",
  "Shirt",
  "Polo",
  "Sweatshirt",
  "Pants",
  "Shorts",
  "Jacket",
  "Kurta",
  "Skirt",
] as const satisfies ProductType[];
export const FIT_TYPES = [
  "Slim Fit",
  "Regular Fit",
  "Loose Fit",
] as const satisfies FitType[];

/* ──────────────────────────────────────────────────────────
 *  VARIANT STRUCTURE
 * ──────────────────────────────────────────────────────────*/

/** Only include keys that matter for *this* variant. */
export type VariantOptions = Partial<{
  sleeve: SleeveLength[];
  fit: FitType[];
  waistRise: WaistRise[];
  neck: Neck;
  // ↳ add more dimensions here later (e.g., inseamLength) without touching the rest
}>;

export interface SizeRow {
  size: (typeof SIZES)[number];
  marketPrice: number;
  sellingPrice: number;
  stock: number;
}

export interface ProductVariantType {
  id?: string;
  color: string;
  type: (typeof PRODUCT_TYPES)[number];
  options?: {
    neck?: (typeof NECKS)[number];
    sleeve?: (typeof SLEEVE_LENGTHS)[number][];
    fit?: (typeof FIT_TYPES)[number][];
    waistRise?: (typeof WAIST_RISES)[number][];
  };
  thumbnail?: string;
  gallery?: string[];
  sizes: SizeRow[]; // ✅ array, not VariantSizeMap
}

/* ──────────────────────────────────────────────────────────
 *  MAIN PRODUCT STRUCTURE
 * ──────────────────────────────────────────────────────────*/

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: ProductCategory;
  fabric: Fabric;
  occasion: Occasion;
  patternAndPrint: PatternAndPrint;
  style: Style;
  dateAdded: string; // ISO‑8601 preferred
  variants?: ProductVariantType[];
}
