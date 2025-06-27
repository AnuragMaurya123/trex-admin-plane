

import { Product, ProductVariantType } from "./productType";
export interface OrderItem {
  product: Product
  variant: ProductVariantType
  size: string
  quantity: number
  price: number
}

export interface ShippingAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface Order {
  _id: string
  orderNumber: string
  customerId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: string
  shippingAddress: ShippingAddress
  orderDate: string
  estimatedDelivery?: string
  trackingNumber?: string
  notes?: string
}
