
import { Product } from "../types/productType";

export const dummyProducts: Product[] = [
  /* ─────────────────────────────────────────────── 1 */
  {
    name: "Classic White T‑Shirt",
    description: "Versatile cotton tee for daily wear.",
    category: "Men",
    subcategory: "T-Shirt",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "Bodycon",
    dateAdded: new Date().toISOString(),
    options: {
      neck: "Round Neck",
      sleeve: "Short Sleeve",   // ✅ single string
      fit: "Loose Fit",           // ✅ single string
    },
    variants: [
      {
        id: "mtee‑wht",
        color: "White",
        thumbnail: "/img/tee-white.jpg",
        gallery: ["/img/tee-white-front.jpg", "/img/tee-white-back.jpg"],
        sizes: [
          { size: "S",  marketPrice: 499, sellingPrice: 399, stock: 10 },
          { size: "M",  marketPrice: 499, sellingPrice: 399, stock: 15 },
        ],
      },
      {
        id: "mtee‑blk",
        color: "Black",
        thumbnail: "/img/tee-black.jpg",
        sizes: [
          { size: "S",  marketPrice: 499, sellingPrice: 399, stock: 12 },
          { size: "M",  marketPrice: 499, sellingPrice: 399, stock: 14 },
        ],
      },
      {
        id: "mtee‑gry",
        color: "Grey",
        thumbnail: "/img/tee-grey.jpg",
        sizes: [
          { size: "L",  marketPrice: 549, sellingPrice: 429, stock: 8 },
          { size: "XL", marketPrice: 549, sellingPrice: 429, stock: 6 },
        ],
      },
      {
        id: "mtee‑nav",
        color: "Navy",
        thumbnail: "/img/tee-navy.jpg",
        sizes: [
          { size: "M",  marketPrice: 549, sellingPrice: 449, stock: 9 },
          { size: "L",  marketPrice: 549, sellingPrice: 449, stock: 9 },
        ],
      },
      {
        id: "mtee‑olv",
        color: "Olive",
        thumbnail: "/img/tee-olive.jpg",
        sizes: [
          { size: "S",  marketPrice: 549, sellingPrice: 449, stock: 7 },
          { size: "M",  marketPrice: 549, sellingPrice: 449, stock: 7 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 2 */
  {
    name: "Floral Summer Dress",
    description: "Lightweight silk dress perfect for summer.",
    category: "Women",
    subcategory: "Dress",
    fabric: "Silk",
    occasion: "Party",
    patternAndPrint: "Floral",
    style: "A-Line",
    dateAdded: new Date().toISOString(),
    options: {
      neck: "V-Neck",
      sleeve: "Sleeveless",
      fit: "Regular Fit",
    },
    variants: [
      {
        id: "wdr‑pnk",
        color: "Pink",
        thumbnail: "/img/dress-pink.jpg",
        sizes: [
          { size: "S", marketPrice: 1299, sellingPrice: 999, stock: 8 },
          { size: "M", marketPrice: 1299, sellingPrice: 999, stock: 6 },
        ],
      },
      {
        id: "wdr‑ylw",
        color: "Yellow",
        thumbnail: "/img/dress-yellow.jpg",
        sizes: [
          { size: "L", marketPrice: 1299, sellingPrice: 1049, stock: 4 },
          { size: "XL", marketPrice: 1299, sellingPrice: 1049, stock: 3 },
        ],
      },
      {
        id: "wdr‑blu",
        color: "Sky Blue",
        thumbnail: "/img/dress-blue.jpg",
        sizes: [
          { size: "M", marketPrice: 1349, sellingPrice: 1049, stock: 5 },
          { size: "L", marketPrice: 1349, sellingPrice: 1049, stock: 5 },
        ],
      },
      {
        id: "wdr‑lav",
        color: "Lavender",
        thumbnail: "/img/dress-lavender.jpg",
        sizes: [
          { size: "S", marketPrice: 1349, sellingPrice: 1049, stock: 7 },
          { size: "M", marketPrice: 1349, sellingPrice: 1049, stock: 6 },
        ],
      },
      {
        id: "wdr‑grn",
        color: "Mint Green",
        thumbnail: "/img/dress-mint.jpg",
        sizes: [
          { size: "M", marketPrice: 1349, sellingPrice: 1049, stock: 5 },
          { size: "L", marketPrice: 1349, sellingPrice: 1049, stock: 4 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 3 */
  {
    name: "Kids Cotton Shirt",
    description: "Durable striped shirt for active kids.",
    category: "Kids",
    subcategory: "Shirt",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Striped",
    style: "Fit & Flare",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "ksh‑blu",
        color: "Blue Stripe",
        thumbnail: "/img/kids-shirt-blue.jpg",
        sizes: [
          { size: "XS", marketPrice: 699, sellingPrice: 549, stock: 5 },
          { size: "S",  marketPrice: 699, sellingPrice: 549, stock: 7 },
        ],
      },
      {
        id: "ksh‑grn",
        color: "Green Stripe",
        thumbnail: "/img/kids-shirt-green.jpg",
        sizes: [
          { size: "XS", marketPrice: 699, sellingPrice: 549, stock: 6 },
          { size: "S",  marketPrice: 699, sellingPrice: 549, stock: 6 },
        ],
      },
      {
        id: "ksh‑pnk",
        color: "Pink Stripe",
        thumbnail: "/img/kids-shirt-pink.jpg",
        sizes: [
          { size: "M", marketPrice: 749, sellingPrice: 599, stock: 4 },
          { size: "L", marketPrice: 749, sellingPrice: 599, stock: 4 },
        ],
      },
      {
        id: "ksh‑ylw",
        color: "Yellow Stripe",
        thumbnail: "/img/kids-shirt-yellow.jpg",
        sizes: [
          { size: "XS", marketPrice: 749, sellingPrice: 599, stock: 5 },
          { size: "S",  marketPrice: 749, sellingPrice: 599, stock: 5 },
        ],
      },
      {
        id: "ksh‑org",
        color: "Orange Stripe",
        thumbnail: "/img/kids-shirt-orange.jpg",
        sizes: [
          { size: "M", marketPrice: 749, sellingPrice: 599, stock: 3 },
          { size: "L", marketPrice: 749, sellingPrice: 599, stock: 3 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 4 */
  {
    name: "Denim Jeans",
    description: "Classic straight‑fit jeans.",
    category: "Women",
    subcategory: "Jeans",
    fabric: "Denim",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "Bodycon",
    dateAdded: new Date().toISOString(),
    options: { waistRise: "Mid Rise" },
    variants: [
      {
        id: "wje‑dblu",
        color: "Dark Blue",
        thumbnail: "/img/jeans-darkblue.jpg",
        sizes: [
          { size: "M", marketPrice: 1599, sellingPrice: 1399, stock: 10 },
          { size: "L", marketPrice: 1599, sellingPrice: 1399, stock: 10 },
        ],
      },
      {
        id: "wje‑lblu",
        color: "Light Blue",
        thumbnail: "/img/jeans-lightblue.jpg",
        sizes: [
          { size: "S", marketPrice: 1599, sellingPrice: 1399, stock: 8 },
          { size: "M", marketPrice: 1599, sellingPrice: 1399, stock: 8 },
        ],
      },
      {
        id: "wje‑blk",
        color: "Black",
        thumbnail: "/img/jeans-black.jpg",
        sizes: [
          { size: "L",  marketPrice: 1599, sellingPrice: 1399, stock: 6 },
          { size: "XL", marketPrice: 1599, sellingPrice: 1399, stock: 6 },
        ],
      },
      {
        id: "wje‑gry",
        color: "Grey",
        thumbnail: "/img/jeans-grey.jpg",
        sizes: [
          { size: "M", marketPrice: 1650, sellingPrice: 1450, stock: 5 },
          { size: "L", marketPrice: 1650, sellingPrice: 1450, stock: 5 },
        ],
      },
      {
        id: "wje‑sky",
        color: "Sky Blue",
        thumbnail: "/img/jeans-skyblue.jpg",
        sizes: [
          { size: "S", marketPrice: 1650, sellingPrice: 1450, stock: 4 },
          { size: "M", marketPrice: 1650, sellingPrice: 1450, stock: 4 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 5 */
  {
    name: "Men’s Casual Jacket",
    description: "Warm wool jacket for winter.",
    category: "Men",
    subcategory: "Jacket",
    fabric: "Wool",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "Bodycon",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "mjak‑nav",
        color: "Navy",
        thumbnail: "/img/jacket-navy.jpg",
        sizes: [
          { size: "M", marketPrice: 2499, sellingPrice: 2199, stock: 4 },
          { size: "L", marketPrice: 2499, sellingPrice: 2199, stock: 2 },
        ],
      },
      {
        id: "mjak‑blk",
        color: "Black",
        thumbnail: "/img/jacket-black.jpg",
        sizes: [
          { size: "M", marketPrice: 2599, sellingPrice: 2299, stock: 5 },
          { size: "L", marketPrice: 2599, sellingPrice: 2299, stock: 3 },
        ],
      },
      {
        id: "mjak‑grn",
        color: "Olive",
        thumbnail: "/img/jacket-olive.jpg",
        sizes: [
          { size: "L",  marketPrice: 2599, sellingPrice: 2299, stock: 4 },
          { size: "XL", marketPrice: 2599, sellingPrice: 2299, stock: 2 },
        ],
      },
      {
        id: "mjak‑brw",
        color: "Brown",
        thumbnail: "/img/jacket-brown.jpg",
        sizes: [
          { size: "M", marketPrice: 2599, sellingPrice: 2299, stock: 3 },
          { size: "L", marketPrice: 2599, sellingPrice: 2299, stock: 3 },
        ],
      },
      {
        id: "mjak‑gry",
        color: "Grey",
        thumbnail: "/img/jacket-grey.jpg",
        sizes: [
          { size: "M", marketPrice: 2599, sellingPrice: 2299, stock: 4 },
          { size: "L", marketPrice: 2599, sellingPrice: 2299, stock: 4 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 6 */
  {
    name: "Couple Hoodie Set",
    description: "Matching hoodies for couples.",
    category: "Couples",
    subcategory: "Matching Hoodie",
    fabric: "Polyester",
    occasion: "Casual",
    patternAndPrint: "Floral",
    style: "Maxi",
    dateAdded: new Date().toISOString(),
    options: { sleeve: "Long Sleeve" },
    variants: [
      {
        id: "coup‑gry",
        color: "Grey",
        thumbnail: "/img/couple-hoodie-grey.jpg",
        sizes: [
          { size: "M", marketPrice: 2999, sellingPrice: 2699, stock: 6 },
          { size: "L", marketPrice: 2999, sellingPrice: 2699, stock: 6 },
        ],
      },
      {
        id: "coup‑pnk",
        color: "Pink",
        thumbnail: "/img/couple-hoodie-pink.jpg",
        sizes: [
          { size: "M", marketPrice: 2999, sellingPrice: 2699, stock: 5 },
          { size: "L", marketPrice: 2999, sellingPrice: 2699, stock: 5 },
        ],
      },
      {
        id: "coup‑blk",
        color: "Black",
        thumbnail: "/img/couple-hoodie-black.jpg",
        sizes: [
          { size: "M", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
          { size: "L", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
        ],
      },
      {
        id: "coup‑nav",
        color: "Navy",
        thumbnail: "/img/couple-hoodie-navy.jpg",
        sizes: [
          { size: "M", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
          { size: "L", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
        ],
      },
      {
        id: "coup‑beige",
        color: "Beige",
        thumbnail: "/img/couple-hoodie-beige.jpg",
        sizes: [
          { size: "M", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
          { size: "L", marketPrice: 2999, sellingPrice: 2699, stock: 4 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 7 */
  {
    name: "Gold‑Plated Necklace",
    description: "Elegant necklace for special occasions.",
    category: "Jewellery",
    subcategory: "Necklace",
    fabric: "Silk",
    occasion: "Party",
    patternAndPrint: "Solid",
    style: "A-Line",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "jew‑gold",
        color: "Gold",
        thumbnail: "/img/necklace-gold.jpg",
        sizes: [
          { size: "M", marketPrice: 1499, sellingPrice: 1399, stock: 10 },
        ],
      },
      {
        id: "jew‑rose",
        color: "Rose Gold",
        thumbnail: "/img/necklace-rose.jpg",
        sizes: [
          { size: "M", marketPrice: 1599, sellingPrice: 1499, stock: 8 },
        ],
      },
      {
        id: "jew‑silv",
        color: "Silver",
        thumbnail: "/img/necklace-silver.jpg",
        sizes: [
          { size: "M", marketPrice: 1399, sellingPrice: 1299, stock: 10 },
        ],
      },
      {
        id: "jew‑plat",
        color: "Platinum",
        thumbnail: "/img/necklace-platinum.jpg",
        sizes: [
          { size: "M", marketPrice: 1699, sellingPrice: 1599, stock: 5 },
        ],
      },
      {
        id: "jew‑copp",
        color: "Copper",
        thumbnail: "/img/necklace-copper.jpg",
        sizes: [
          { size: "M", marketPrice: 1299, sellingPrice: 1199, stock: 9 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 8 */
  {
    name: "Blouse with Ruffles",
    description: "Silk blouse perfect for office & formal events.",
    category: "Women",
    subcategory: "Blouse",
    fabric: "Silk",
    occasion: "Formal",
    patternAndPrint: "Solid",
    style: "Bodycon",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "wbl‑wht",
        color: "White",
        thumbnail: "/img/blouse-white.jpg",
        sizes: [
          { size: "S", marketPrice: 899,  sellingPrice: 799, stock: 10 },
          { size: "M", marketPrice: 899,  sellingPrice: 799, stock: 8 },
        ],
      },
      {
        id: "wbl‑blk",
        color: "Black",
        thumbnail: "/img/blouse-black.jpg",
        sizes: [
          { size: "M", marketPrice: 949, sellingPrice: 849, stock: 8 },
          { size: "L", marketPrice: 949, sellingPrice: 849, stock: 6 },
        ],
      },
      {
        id: "wbl‑nav",
        color: "Navy",
        thumbnail: "/img/blouse-navy.jpg",
        sizes: [
          { size: "M", marketPrice: 949, sellingPrice: 849, stock: 7 },
          { size: "L", marketPrice: 949, sellingPrice: 849, stock: 5 },
        ],
      },
      {
        id: "wbl‑pnk",
        color: "Rose Pink",
        thumbnail: "/img/blouse-rose.jpg",
        sizes: [
          { size: "S", marketPrice: 949, sellingPrice: 849, stock: 7 },
          { size: "M", marketPrice: 949, sellingPrice: 849, stock: 6 },
        ],
      },
      {
        id: "wbl‑sky",
        color: "Sky Blue",
        thumbnail: "/img/blouse-sky.jpg",
        sizes: [
          { size: "S", marketPrice: 949, sellingPrice: 849, stock: 6 },
          { size: "M", marketPrice: 949, sellingPrice: 849, stock: 5 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 9 */
  {
    name: "Men Checkered Shirt",
    description: "Trendy red‑and‑black check pattern.",
    category: "Men",
    subcategory: "Checked Shirt",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Checked",
    style: "Maxi",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "mchk‑rbk",
        color: "Red & Black",
        thumbnail: "/img/check-shirt-red.jpg",
        sizes: [
          { size: "M", marketPrice: 899, sellingPrice: 799, stock: 10 },
          { size: "L", marketPrice: 899, sellingPrice: 799, stock: 6 },
        ],
      },
      {
        id: "mchk‑grn",
        color: "Green Checks",
        thumbnail: "/img/check-shirt-green.jpg",
        sizes: [
          { size: "M", marketPrice: 899, sellingPrice: 799, stock: 8 },
          { size: "L", marketPrice: 899, sellingPrice: 799, stock: 5 },
        ],
      },
      {
        id: "mchk‑blu",
        color: "Blue Checks",
        thumbnail: "/img/check-shirt-blue.jpg",
        sizes: [
          { size: "S", marketPrice: 899, sellingPrice: 799, stock: 10 },
          { size: "M", marketPrice: 899, sellingPrice: 799, stock: 7 },
        ],
      },
      {
        id: "mchk‑gry",
        color: "Grey Checks",
        thumbnail: "/img/check-shirt-grey.jpg",
        sizes: [
          { size: "M", marketPrice: 899, sellingPrice: 799, stock: 6 },
          { size: "L", marketPrice: 899, sellingPrice: 799, stock: 4 },
        ],
      },
      {
        id: "mchk‑dbr",
        color: "Dark Brown",
        thumbnail: "/img/check-shirt-brown.jpg",
        sizes: [
          { size: "L",  marketPrice: 899, sellingPrice: 799, stock: 5 },
          { size: "XL", marketPrice: 899, sellingPrice: 799, stock: 3 },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────── 10 */
  {
    name: "Kids Printed Shorts",
    description: "Breathable shorts with fun prints.",
    category: "Kids",
    subcategory: "Shorts",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Floral",
    style: "Bodycon",
    dateAdded: new Date().toISOString(),
    variants: [
      {
        id: "kshr‑grn",
        color: "Green Dino",
        thumbnail: "/img/shorts-green.jpg",
        sizes: [{ size: "XS", marketPrice: 399, sellingPrice: 349, stock: 15 }],
      },
      {
        id: "kshr‑blu",
        color: "Blue Ocean",
        thumbnail: "/img/shorts-blue.jpg",
        sizes: [{ size: "XS", marketPrice: 399, sellingPrice: 349, stock: 12 }],
      },
      {
        id: "kshr‑ylw",
        color: "Yellow Star",
        thumbnail: "/img/shorts-yellow.jpg",
        sizes: [{ size: "XS", marketPrice: 399, sellingPrice: 349, stock: 14 }],
      },
      {
        id: "kshr‑pnk",
        color: "Pink Candy",
        thumbnail: "/img/shorts-pink.jpg",
        sizes: [{ size: "XS", marketPrice: 399, sellingPrice: 349, stock: 13 }],
      },
      {
        id: "kshr‑prt",
        color: "Purple Rocket",
        thumbnail: "/img/shorts-purple.jpg",
        sizes: [{ size: "XS", marketPrice: 399, sellingPrice: 349, stock: 10 }],
      },
    ],
  },
];
