import { ReactNode } from "react";

export interface PieDatum {
  name: string;
  value: number;
  color: string;
}

export interface PieDiagramProps {
  title?: string;
  className?: string;
  statusData: PieDatum[];
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showIcon?: boolean;
}

export interface ReduxProviderProps {
  children: ReactNode
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  isNew?: boolean;
}

export interface SidebarProps {
  defaultCollapsed?: boolean;
}


export interface EarningsDatum {
  month: string;
  earnings: number;
}


export interface GraphDiagramProps {
  title?: string;
  data: EarningsDatum[];
  xKey?: string;
  yKey?: string;
  className?: string;
  color?: string;
  yFormatter?: (value: number) => string;
}

export interface TopSellProduct  {
  name: string
  totalSell: number
  totalAmount: number
  unitPrice: number
  image: string
}

export interface ProductCarouselProps {
  products: TopSellProduct[]
}


// Main Category
export type ProductCategory = "Men" | "Women" | "Kids"

// Detailed Enums for Clothing
export type Fabric = "Cotton" | "Polyester" | "Silk" | "Linen" | "Denim" | "Wool"
export type Occasion = "Casual" | "Formal" | "Party" | "Sportswear" | "Ethnic"
export type PatternAndPrint = "Solid" | "Striped" | "Checked" | "Floral" | "Graphic Print"
export type Style = "A-Line" | "Shift" | "Bodycon" | "Fit & Flare" | "Maxi" | "T-Shirt"
export type SleeveLength = "Sleeveless" | "Short Sleeve" | "Half Sleeve" | "Full Sleeve"
export type Neck = "Round Neck" | "V-Neck" | "Polo" | "Turtleneck" | "Boat Neck"
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL"

// Exporting arrays for use in select dropdowns
export const CATEGORIES: ProductCategory[] = ["Men", "Women", "Kids"]
export const FABRICS: Fabric[] = ["Cotton", "Polyester", "Silk", "Linen", "Denim", "Wool"]
export const OCCASIONS: Occasion[] = ["Casual", "Formal", "Party", "Sportswear", "Ethnic"]
export const PATTERNS: PatternAndPrint[] = ["Solid", "Striped", "Checked", "Floral", "Graphic Print"]
export const STYLES: Style[] = ["A-Line", "Shift", "Bodycon", "Fit & Flare", "Maxi", "T-Shirt"]
export const SLEEVE_LENGTHS: SleeveLength[] = ["Sleeveless", "Short Sleeve", "Half Sleeve", "Full Sleeve"]
export const NECKS: Neck[] = ["Round Neck", "V-Neck", "Polo", "Turtleneck", "Boat Neck"]
export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"]

// The new, comprehensive Product type
export type Product = {
  id: string
  name: string
  description: string
  newArrivals: boolean
  category: ProductCategory
  subcategory: string // e.g., "T-Shirts", "Jeans", "Dresses"
  fabric: Fabric
  occasion: Occasion
  patternAndPrint: PatternAndPrint
  style: Style
  sleeveLength: SleeveLength
  neck: Neck
  size: Size[] // Products can be available in multiple sizes
  price: number
  stock: number
  imageUrl?: string
  dateAdded: string // ISO string
}

