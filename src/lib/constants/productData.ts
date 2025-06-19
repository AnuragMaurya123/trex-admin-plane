import type { Product } from "@/lib/types/productType";

export const dummyProducts: Product[] = [
  {
    name: "Classic Navy Polo",
    description: "A timeless navy polo perfect for casual outings.",
    category: "Men",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "A-Line",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Navy Blue",
        type: "Polo",
        options: {
          neck: "Polo",
          sleeve: ["Short Sleeve"],
          fit: ["Regular Fit"],
        },
        sizes: [
          { size: "M", marketPrice: 999, sellingPrice: 799, stock: 10 },
          { size: "L", marketPrice: 999, sellingPrice: 799, stock: 5 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: ["/placeholder.svg","/placeholder.svg","/placeholder.svg","/placeholder.svg"],
      },
    ],
  },
  {
    name: "Women's V-Neck Tee",
    description: "Soft cotton V-neck tee for everyday comfort.",
    category: "Women",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Graphic Print",
    style: "Shift",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "White",
        type: "T-Shirt",
        options: {
          neck: "V-Neck",
          sleeve: ["Short Sleeve"],
        },
        sizes: [
          { size: "S", marketPrice: 699, sellingPrice: 599, stock: 8 },
          { size: "M", marketPrice: 699, sellingPrice: 599, stock: 4 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Turtleneck Winterwear",
    description: "Warm woolen turtleneck for chilly days.",
    category: "Women",
    fabric: "Wool",
    occasion: "Formal",
    patternAndPrint: "Solid",
    style: "Bodycon",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Maroon",
        type: "Sweatshirt",
        options: {
          neck: "Turtleneck",
          sleeve: ["Long Sleeve"],
          fit: ["Slim Fit"],
        },
        sizes: [
          { size: "M", marketPrice: 1499, sellingPrice: 1199, stock: 3 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Striped Polo Tee",
    description: "Stylish striped polo for sporty look.",
    category: "Men",
    fabric: "Polyester",
    occasion: "Sportswear",
    patternAndPrint: "Striped",
    style: "Fit & Flare",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Green",
        type: "Polo",
        options: {
          neck: "Polo",
          sleeve: ["Short Sleeve"],
        },
        sizes: [
          { size: "L", marketPrice: 899, sellingPrice: 749, stock: 6 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Round Neck Graphic Tee",
    description: "Cool and comfy round neck graphic tee.",
    category: "Men",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Graphic Print",
    style: "Shift",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Black",
        type: "T-Shirt",
        options: {
          neck: "Round Neck",
          sleeve: ["Short Sleeve"],
        },
        sizes: [
          { size: "M", marketPrice: 599, sellingPrice: 499, stock: 9 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Formal Silk Shirt",
    description: "Elegant silk shirt for parties and events.",
    category: "Women",
    fabric: "Silk",
    occasion: "Party",
    patternAndPrint: "Floral",
    style: "Maxi",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Pink",
        type: "Shirt",
        options: {
          neck: "Boat Neck",
          fit: ["Regular Fit"],
        },
        sizes: [
          { size: "S", marketPrice: 1599, sellingPrice: 1399, stock: 5 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Ethnic Kurta",
    description: "Traditional cotton kurta with checked design.",
    category: "Women",
    fabric: "Cotton",
    occasion: "Ethnic",
    patternAndPrint: "Checked",
    style: "Fit & Flare",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Red",
        type: "Kurta",
        options: {
          neck: "Round Neck",
        },
        sizes: [
          { size: "M", marketPrice: 1099, sellingPrice: 899, stock: 7 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Loose Fit Linen Shorts",
    description: "Breathable linen shorts for summer comfort.",
    category: "Men",
    fabric: "Linen",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "A-Line",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Beige",
        type: "Shorts",
        options: {
          fit: ["Loose Fit"],
          waistRise: ["Mid Rise"],
        },
        sizes: [
          { size: "M", marketPrice: 799, sellingPrice: 649, stock: 10 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Checked Denim Skirt",
    description: "Stylish skirt in checked denim for trendy looks.",
    category: "Women",
    fabric: "Denim",
    occasion: "Casual",
    patternAndPrint: "Checked",
    style: "A-Line",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Blue",
        type: "Skirt",
        options: {
          waistRise: ["High Rise"],
        },
        sizes: [
          { size: "S", marketPrice: 1299, sellingPrice: 1099, stock: 3 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
  {
    name: "Boys' Graphic Tee",
    description: "Fun cartoon print tee for kids.",
    category: "Kids",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Graphic Print",
    style: "Shift",
    dateAdded: "2025-06-19",
    variants: [
      {
        color: "Yellow",
        type: "T-Shirt",
        options: {
          neck: "Round Neck",
          sleeve: ["Short Sleeve"],
        },
        sizes: [
          { size: "S", marketPrice: 499, sellingPrice: 399, stock: 15 },
        ],
        thumbnail: "/placeholder.svg",
        gallery: [],
      },
    ],
  },
];
