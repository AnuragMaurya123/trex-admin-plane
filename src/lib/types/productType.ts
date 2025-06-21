/* ──────────────────────────────────────────────────────────
 *  ENUM‑LIKE LITERALS
 * ──────────────────────────────────────────────────────────*/

export type SleeveLength = "Sleeveless" | "Short Sleeve" | "Long Sleeve" | "3/4 Sleeve";
export type FitType      = "Slim Fit"  | "Regular Fit"   | "Loose Fit";
export type WaistRise    = "Mid Rise"  | "High Rise"     | "Low Rise";

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

export type Style =
  | "A-Line"
  | "Shift"
  | "Bodycon"
  | "Fit & Flare"
  | "Maxi";

export type Neck =
  | "Round Neck"
  | "V-Neck"
  | "Polo"
  | "Turtleneck"
  | "Boat Neck";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";



/* ──────────────────────────────────────────────────────────
 *  CATEGORY / SUBCATEGORY
 * ──────────────────────────────────────────────────────────*/


/* ──────────────────────────────────────────────────────────
 *  SHARED CONSTANT ARRAYS
 * ──────────────────────────────────────────────────────────*/

export const FABRICS   = ["Cotton","Polyester","Silk","Linen","Denim","Wool"] as const;
export const OCCASIONS = ["Casual","Formal","Party","Sportswear","Ethnic"]   as const;

export const PATTERNS = ["Solid","Striped","Checked","Floral","Graphic Print"] as const;
export const STYLES   = ["A-Line","Shift","Bodycon","Fit & Flare","Maxi"]      as const;

export const SLEEVE_LENGTHS = ["Sleeveless","Short Sleeve","Long Sleeve","3/4 Sleeve"] as const;
export const NECKS          = ["Round Neck","V-Neck","Polo","Turtleneck","Boat Neck"]   as const;
export const SIZES          = ["XS","S","M","L","XL","XXL"]                             as const;
export const WAIST_RISES    = ["Mid Rise","High Rise","Low Rise"]                       as const;
export const FIT_TYPES      = ["Slim Fit","Regular Fit","Loose Fit"]                    as const;

/* ──────────────────────────────────────────────────────────
 *  PATTERN / STYLE BY CATEGORY
 * ──────────────────────────────────────────────────────────*/

export const CATEGORIES = ["Men", "Women", "Kids", "Jewellery", "Couples"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SUB_CATEGORIES = {
  Men:       ["T-Shirt", "Shirt", "Checked Shirt", "Pants", "Shorts", "Jacket"],
  Women:     ["Dress", "Top", "Blouse", "Skirt", "Jeans", "Outerwear"],
  Kids:      ["T-Shirt", "Shirt", "Dress", "Pants", "Shorts", "Jacket"],
  Jewellery: ["Necklace", "Earrings", "Bracelet", "Ring"],
  Couples:   ["Matching T-Shirt", "Matching Hoodie", "Couple Set"],
} as const satisfies Record<Category, readonly string[]>;
export type SubCategory = typeof SUB_CATEGORIES[keyof typeof SUB_CATEGORIES][number];
export const getSubCategoryOption = (cat: Category) => SUB_CATEGORIES[cat];
export const ALL_SUBCATEGORIES = Object.values(SUB_CATEGORIES).flat() as [string, ...string[]];

export const PATTERNS_BY_CATEGORY = {
  Men:       ["Solid","Striped","Checked","Graphic Print"],
  Women:     ["Solid","Striped","Checked","Floral","Graphic Print"],
  Kids:      ["Solid","Striped","Graphic Print"],
  Jewellery: ["Solid"],
  Couples:   ["Solid","Graphic Print"],
} as const satisfies Record<Category, readonly PatternAndPrint[]>;

export const STYLES_BY_CATEGORY = {
  Men:       [] as const,
  Women:     ["A-Line","Shift","Bodycon","Fit & Flare","Maxi"],
  Kids:      ["A-Line","Fit & Flare"],
  Jewellery: [] as const,
  Couples:   [] as const,
} as const satisfies Record<Category, readonly Style[]>;

export const getPatternsOption = (cat: Category) => PATTERNS_BY_CATEGORY[cat];
export const getStylesOption   = (cat: Category) => STYLES_BY_CATEGORY[cat];

/* ──────────────────────────────────────────────────────────
 *  VARIANT & PRODUCT TYPES
 * ──────────────────────────────────────────────────────────*/

/** Variant option dimensions that can be toggled globally on a product */
export type VariantOptionType = "neck" | "sleeve" | "fit" | "waistRise";

export type VariantOptions = Partial<{
  neck:      (typeof NECKS)[number];
  sleeve:    (typeof SLEEVE_LENGTHS)[number];
  fit:       (typeof FIT_TYPES)[number];
  waistRise: (typeof WAIST_RISES)[number];
}>;

/* ---- size row ---- */
export interface SizeRow {
  size: (typeof SIZES)[number];
  marketPrice:  number;
  sellingPrice: number;
  stock:        number;
}

/* ---- variant ---- */
export interface ProductVariantType {
  id?:       string;
  color:     string;
  thumbnail?: string;
  gallery?:   string[];
  sizes:     SizeRow[];
}

/* ---- product ---- */
export interface Product {
  id?:               string;
  name:              string;
  description:       string;
  category:          Category;
  subcategory:       SubCategory;
  fabric:            Fabric;
  occasion:          Occasion;
  patternAndPrint:   PatternAndPrint;
  style:             Style;
  dateAdded:         string;          // ISO‑8601
  options?:          VariantOptions;  // global variant dimensions & defaults
  variants?:         ProductVariantType[];
}
