import { EarningsDatum, PieDatum, Product, TopSellProduct } from "./types";

  /* Pie‑chart datasets */
   export const orderStatusData: PieDatum[] = [
    { name: "Pending", value: 45, color: "#8b5cf6" },
    { name: "Dispatched", value: 32, color: "#a855f7" },
    { name: "Shipped", value: 78, color: "#c084fc" },
    { name: "Delivered", value: 125, color: "#7c3aed" },
  ];

   export const complaintStatusData: PieDatum[] = [
    { name: "Solved", value: 89, color: "#8b5cf6" },
    { name: "Pending", value: 23, color: "#a855f7" },
    { name: "Unsolved", value: 12, color: "#c084fc" },
  ];
   export const visitorsStatusData: PieDatum[] = [
    { name: "Deskstops", value: 89, color: "#8b5cf6" },
    { name: "Mobiles", value: 23, color: "#a855f7" },
    { name: "tablets", value: 12, color: "#c084fc" },
  ];
   export const customersStatusData: PieDatum[] = [
    { name: "New", value: 89, color: "#8b5cf6" },
    { name: "Returning", value: 23, color: "#a855f7" },
    { name: "Inactive", value: 12, color: "#c084fc" },
  ];

   /* Area‑chart dataset */
  export const yearlyEarnings: EarningsDatum[] = [
    { month: "Jan", earnings: 45_000 },
    { month: "Feb", earnings: 52_000 },
    { month: "Mar", earnings: 48_000 },
    { month: "Apr", earnings: 61_000 },
    { month: "May", earnings: 55_000 },
    { month: "Jun", earnings: 67_000 },
    { month: "Jul", earnings: 71_000 },
    { month: "Aug", earnings: 69_000 },
    { month: "Sep", earnings: 75_000 },
    { month: "Oct", earnings: 82_000 },
    { month: "Nov", earnings: 88_000 },
    { month: "Dec", earnings: 95_000 },
  ];



export const dummyProducts: TopSellProduct[] = [
  {
    name: "Wireless Mouse",
    totalSell: 120,
    unitPrice: 499,
    totalAmount: 120 * 499,
    image: "https://via.placeholder.com/60x60.png?text=Mouse",
  },
  {
    name: "Bluetooth Headphones",
    totalSell: 80,
    unitPrice: 999,
    totalAmount: 80 * 999,
    image: "https://via.placeholder.com/60x60.png?text=Headphones",
  },
  {
    name: "Mechanical Keyboard",
    totalSell: 45,
    unitPrice: 1799,
    totalAmount: 45 * 1799,
    image: "https://via.placeholder.com/60x60.png?text=Keyboard",
  },
  {
    name: "Smart Watch",
    totalSell: 60,
    unitPrice: 2499,
    totalAmount: 60 * 2499,
    image: "https://via.placeholder.com/60x60.png?text=Watch",
  },
  {
    name: "USB-C Cable",
    totalSell: 200,
    unitPrice: 199,
    totalAmount: 200 * 199,
    image: "https://via.placeholder.com/60x60.png?text=Cable",
  },
];


export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod_cl_1",
    name: "Classic Cotton Polo",
    description: "A timeless polo shirt made from 100% premium cotton. Perfect for a smart-casual look.",
    newArrivals: true,
    category: "Men",
    subcategory: "T-Shirts",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "T-Shirt",
    sleeveLength: "Short Sleeve",
    neck: "Polo",
    size: ["S", "M", "L", "XL"],
    price: 45.0,
    stock: 150,
    imageUrl: "/placeholder.svg?width=100&height=100",
    dateAdded: new Date("2024-07-10T10:00:00Z").toISOString(),
  },
  {
    id: "prod_cl_2",
    name: "Floral A-Line Dress",
    description: "A beautiful and breezy floral dress, perfect for summer parties and outings.",
    newArrivals: true,
    category: "Women",
    subcategory: "Dresses",
    fabric: "Polyester",
    occasion: "Party",
    patternAndPrint: "Floral",
    style: "A-Line",
    sleeveLength: "Sleeveless",
    neck: "V-Neck",
    size: ["XS", "S", "M"],
    price: 79.99,
    stock: 80,
    imageUrl: "/placeholder.svg?width=100&height=100",
    dateAdded: new Date("2024-07-01T11:30:00Z").toISOString(),
  },
  {
    id: "prod_cl_3",
    name: "Men's Slim-Fit Denim Jeans",
    description: "Modern slim-fit jeans crafted from durable stretch-denim for all-day comfort.",
    newArrivals: false,
    category: "Men",
    subcategory: "Jeans",
    fabric: "Denim",
    occasion: "Casual",
    patternAndPrint: "Solid",
    style: "Fit & Flare", // This doesn't quite fit, but using for example
    sleeveLength: "Sleeveless", // Not applicable
    neck: "Round Neck", // Not applicable
    size: ["M", "L", "XL"],
    price: 89.9,
    stock: 120,
    imageUrl: "/placeholder.svg?width=100&height=100",
    dateAdded: new Date("2024-05-15T09:00:00Z").toISOString(),
  },
  {
    id: "prod_cl_4",
    name: "Kids Graphic Print Tee",
    description: "A fun and comfortable t-shirt for kids with a cool dinosaur graphic.",
    newArrivals: false,
    category: "Kids",
    subcategory: "T-Shirts",
    fabric: "Cotton",
    occasion: "Casual",
    patternAndPrint: "Graphic Print",
    style: "T-Shirt",
    sleeveLength: "Short Sleeve",
    neck: "Round Neck",
    size: ["XS", "S", "M"],
    price: 19.99,
    stock: 250,
    imageUrl: "/placeholder.svg?width=100&height=100",
    dateAdded: new Date("2024-06-20T14:00:00Z").toISOString(),
  },
]