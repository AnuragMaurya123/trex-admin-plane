export interface User {
  _id?: string
  name: string
  email: string
  phone: string
  password?: string
  refreshToken?: string
  isAdmin: boolean
  createdAt?: string
  lastLoginAt?: string
  totalOrders?: number
  totalSpent?: number
}