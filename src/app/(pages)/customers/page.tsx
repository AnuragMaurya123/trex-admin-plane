"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Eye,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Package,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useHasMounted } from "@/lib/useHasMounted"
import type { User } from "@/lib/types/userType"
import type { Order } from "@/lib/types/orderType"
import KPICard from "@/components/kpl-card"
import Image from "next/image"

// Mock users data
const mockUsers: User[] = [
  {
    _id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    isAdmin: false,
    createdAt: "2024-01-15T00:00:00Z",
    lastLoginAt: "2024-01-20T10:30:00Z",
    totalOrders: 3,
    totalSpent: 298.34,
  },
  {
    _id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0456",
    isAdmin: false,
    createdAt: "2024-01-10T00:00:00Z",
    lastLoginAt: "2024-01-19T14:15:00Z",
    totalOrders: 5,
    totalSpent: 567.89,
  },
  {
    _id: "user-003",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    phone: "+1-555-0789",
    isAdmin: false,
    createdAt: "2024-01-12T00:00:00Z",
    lastLoginAt: "2024-01-18T09:45:00Z",
    totalOrders: 2,
    totalSpent: 156.17,
  },
  {
    _id: "user-004",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-0321",
    isAdmin: true,
    createdAt: "2024-01-05T00:00:00Z",
    lastLoginAt: "2024-01-21T16:20:00Z",
    totalOrders: 1,
    totalSpent: 89.99,
  },
  {
    _id: "user-005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1-555-0654",
    isAdmin: false,
    createdAt: "2024-01-08T00:00:00Z",
    lastLoginAt: "2024-01-17T11:30:00Z",
    totalOrders: 7,
    totalSpent: 1234.56,
  },
]

// Mock orders data (linking to users)
const mockOrders: Order[] = [
  {
    _id: "order-001",
    orderNumber: "ORD-2024-001",
    customerId: "user-001",
    customerEmail: "john.doe@example.com",
    customerName: "John Doe",
    items: [
      {
        product: {
          _id: "prod-001",
          name: "Classic Cotton T-Shirt",
          description: "Premium cotton t-shirt with modern fit",
          category: "Clothing",
          subcategory: "T-Shirts",
          fabric: "Cotton",
          occasion: "Casual",
          patternAndPrint: "Solid",
          style: "Classic",
          dateAdded: "2024-01-15T00:00:00Z",
          options: { fit: "Regular", neck: "Round" },
        },
        variant: {
          _id: "var-001",
          color: "Navy Blue",
          thumbnail: "/placeholder.svg?height=100&width=100",
          sizes: [{ size: "M", marketPrice: 29.99, sellingPrice: 24.99, stock: 50 }],
        },
        size: "M",
        quantity: 2,
        price: 24.99,
      },
    ],
    subtotal: 49.98,
    tax: 4.5,
    shipping: 5.99,
    total: 60.47,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      fullName: "John Doe",
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      phone: "+1-555-0123",
    },
    orderDate: "2024-01-20T10:30:00Z",
  },
  {
    _id: "order-002",
    orderNumber: "ORD-2024-002",
    customerId: "user-002",
    customerEmail: "jane.smith@example.com",
    customerName: "Jane Smith",
    items: [
      {
        product: {
          _id: "prod-002",
          name: "Elegant Evening Dress",
          description: "Sophisticated evening dress for special occasions",
          category: "Clothing",
          subcategory: "Dresses",
          fabric: "Silk",
          occasion: "Formal",
          patternAndPrint: "Floral",
          style: "Elegant",
          dateAdded: "2024-01-10T00:00:00Z",
          options: { fit: "Slim", waistRise: "High" },
        },
        variant: {
          _id: "var-002",
          color: "Black",
          thumbnail: "/placeholder.svg?height=100&width=100",
          sizes: [{ size: "S", marketPrice: 149.99, sellingPrice: 129.99, stock: 15 }],
        },
        size: "S",
        quantity: 1,
        price: 129.99,
      },
    ],
    subtotal: 129.99,
    tax: 11.7,
    shipping: 0.0,
    total: 141.69,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90210",
      country: "USA",
      phone: "+1-555-0456",
    },
    orderDate: "2024-01-19T14:15:00Z",
  },
  {
    _id: "order-003",
    orderNumber: "ORD-2024-003",
    customerId: "user-003",
    customerEmail: "mike.wilson@example.com",
    customerName: "Mike Wilson",
    items: [
      {
        product: {
          _id: "prod-003",
          name: "Premium Denim Jeans",
          description: "High-quality denim jeans with perfect fit",
          category: "Clothing",
          subcategory: "Jeans",
          fabric: "Denim",
          occasion: "Casual",
          patternAndPrint: "Solid",
          style: "Modern",
          dateAdded: "2024-01-12T00:00:00Z",
          options: { fit: "Slim", waistRise: "Mid" },
        },
        variant: {
          _id: "var-003",
          color: "Dark Blue",
          thumbnail: "/placeholder.svg?height=100&width=100",
          sizes: [{ size: "32", marketPrice: 89.99, sellingPrice: 79.99, stock: 25 }],
        },
        size: "32",
        quantity: 1,
        price: 79.99,
      },
    ],
    subtotal: 79.99,
    tax: 7.2,
    shipping: 8.99,
    total: 96.18,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      fullName: "Mike Wilson",
      addressLine1: "789 Pine St",
      city: "Chicago",
      state: "IL",
      postalCode: "60601",
      country: "USA",
      phone: "+1-555-0789",
    },
    orderDate: "2024-01-18T09:45:00Z",
  },
]

// Helper function to get user's last order
const getUserLastOrder = (userId: string): Order | undefined => {
  return mockOrders
    .filter((order) => order.customerId === userId)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())[0]
}

// Helper function to get user's order history
const getUserOrders = (userId: string): Order[] => {
  return mockOrders
    .filter((order) => order.customerId === userId)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
}

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
    case "confirmed":
      return "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
    case "processing":
      return "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
    case "shipped":
      return "bg-gradient-to-r from-purple-400 to-purple-500 text-white"
    case "delivered":
      return "bg-gradient-to-r from-green-400 to-green-500 text-white"
    case "cancelled":
      return "bg-gradient-to-r from-red-400 to-red-500 text-white"
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
  }
}

export default function CustomersPage() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const hasMounted = useHasMounted()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesType =
      userTypeFilter === "all" ||
      (userTypeFilter === "customer" && !user.isAdmin)
    const isNotAdmin = !user.isAdmin // Only show non-admin users
    return matchesSearch && matchesType && isNotAdmin
  })

  const totalCustomers = users.filter((user) => !user.isAdmin).length
  const totalRevenue = users.reduce((sum, user) => sum + (user.totalSpent || 0), 0)
  const avgOrderValue = totalRevenue / users.reduce((sum, user) => sum + (user.totalOrders || 0), 0) || 0

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Customer Management
        </h1>
        <p className="text-sm bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Manage customer accounts and view order history
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <KPICard
          title="Total Customers"
          value={totalCustomers}
          icon={<Users className="h-9 w-9 text-slate-200" />}
          subtitle={
            filteredUsers.length !== users.length ? `${filteredUsers.length} matching filters` : "All customers listed"
          }
          color="from-purple-500 to-purple-600"
        />
        <KPICard
          title="Total Revenue"
          value={
            hasMounted
              ? totalRevenue.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })
              : `$${totalRevenue.toFixed(2)}`
          }
          icon={<DollarSign className="h-9 w-9 text-slate-200" />}
          subtitle="From all customers"
          color="from-green-500 to-emerald-600"
        />
        
        <KPICard
          title="Avg Order Value"
          value={
            hasMounted
              ? avgOrderValue.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })
              : `$${avgOrderValue.toFixed(2)}`
          }
          icon={<TrendingUp className="h-9 w-9 text-slate-200" />}
          subtitle="Per customer order"
          color="from-blue-500 to-cyan-600"
        />
      </div>

      {/* Filters */}
      <Card className="mb-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm border-white dark:from-slate-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-white text-slate-800 focus-visible:ring-purple-700 dark:text-black"
                />
              </div>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="min-w-[9rem] bg-gradient-to-r from-purple-500 to-purple-600 border-white text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-r from-violet-400 to-purple-500 border-white dark:from-slate-900">
                  <SelectItem value="all" className="text-white">
                    All Customers
                  </SelectItem>
                  <SelectItem value="customer" className="text-white">
                    Regular Customers
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="bg-gradient-to-r from-violet-500/5 to-purple-500/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Customer Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-200/50">
                  <TableHead className="text-purple-700 font-semibold">Customer</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Contact</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Type</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Orders</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Total Spent</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Last Order</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const lastOrder = getUserLastOrder(user._id as string)
                  return (
                    <TableRow key={user._id as string} className="border-purple-100/50 hover:bg-purple-50/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-purple-900">{user.name}</div>
                          <div className="text-sm text-purple-600">
                            Joined {user.createdAt && new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-purple-800">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-purple-600">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">Customer</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-purple-800">
                          <Package className="h-4 w-4" />
                          {user.totalOrders || 0}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-purple-900">
                        ${(user.totalSpent || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {lastOrder ? (
                          <div>
                            <div className="font-medium text-purple-900">{lastOrder.orderNumber}</div>
                            <div className="text-sm text-purple-600">
                              {new Date(lastOrder.orderDate).toLocaleDateString()}
                            </div>
                            <Badge className={`${getStatusColor(lastOrder.status)} text-xs mt-1`}>
                              {lastOrder.status.charAt(0).toUpperCase() + lastOrder.status.slice(1)}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">No orders</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 hover:from-purple-600 hover:to-purple-700"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                            <DialogHeader>
                              <DialogTitle className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                                Customer Details - {user.name}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-6">
                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                                    <CardHeader>
                                      <CardTitle className="text-purple-800 text-lg flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Customer Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <strong className="text-purple-700">Name:</strong>
                                        <span>{selectedUser.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-purple-600" />
                                        <strong className="text-purple-700">Email:</strong>
                                        <span>{selectedUser.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-purple-600" />
                                        <strong className="text-purple-700">Phone:</strong>
                                        <span>{selectedUser.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-purple-600" />
                                        <strong className="text-purple-700">Joined:</strong>
                                        <span>
                                          {selectedUser.createdAt &&
                                            new Date(selectedUser.createdAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                                    <CardHeader>
                                      <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Order Statistics
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-green-700">Total Orders:</span>
                                        <span className="font-medium">{selectedUser.totalOrders || 0}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-green-700">Total Spent:</span>
                                        <span className="font-medium">
                                          ${(selectedUser.totalSpent || 0).toFixed(2)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-green-700">Average Order:</span>
                                        <span className="font-medium">
                                          $
                                          {((selectedUser.totalSpent || 0) / (selectedUser.totalOrders || 1)).toFixed(
                                            2,
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-green-700">Last Login:</span>
                                        <span className="font-medium">
                                          {selectedUser.lastLoginAt &&
                                            new Date(selectedUser.lastLoginAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <Separator className="bg-purple-200" />

                                {/* Order History */}
                                <div>
                                  <h3 className="font-semibold mb-4 text-purple-800 text-lg flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order History ({getUserOrders(selectedUser._id as string).length})
                                  </h3>
                                  <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {getUserOrders(selectedUser._id as string).map((order) => (
                                      <Card
                                        key={order._id}
                                        className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200"
                                      >
                                        <CardContent className="p-4">
                                          <div className="flex justify-between items-start mb-3">
                                            <div>
                                              <h4 className="font-semibold text-purple-900">{order.orderNumber}</h4>
                                              <p className="text-sm text-purple-600">
                                                {new Date(order.orderDate).toLocaleDateString()}
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <Badge className={getStatusColor(order.status)}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                              </Badge>
                                              <p className="text-sm font-semibold text-purple-900 mt-1">
                                                ${order.total.toFixed(2)}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-4">
                                            {order.items.slice(0, 3).map((item, index) => (
                                              <div key={index} className="flex items-center gap-2">
                                                <div className="relative w-12 h-12">
                                                  <Image
                                                    src={
                                                      item.variant.thumbnail || "/placeholder.svg?height=48&width=48"
                                                    }
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover rounded border border-purple-200"
                                                  />
                                                </div>
                                                <div className="text-xs">
                                                  <p className="font-medium text-purple-900 truncate max-w-20">
                                                    {item.product.name}
                                                  </p>
                                                  <p className="text-purple-600">
                                                    {item.variant.color} • {item.size}
                                                  </p>
                                                </div>
                                              </div>
                                            ))}
                                            {order.items.length > 3 && (
                                              <div className="flex items-center text-sm text-purple-600">
                                                +{order.items.length - 3} more
                                              </div>
                                            )}
                                          </div>
                                          <div className="mt-3 flex justify-between items-center text-sm">
                                            <span className="text-purple-600">
                                              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                            </span>
                                            <div className="flex items-center gap-2 text-purple-600">
                                              <MapPin className="h-3 w-3" />
                                              {order.shippingAddress.city}, {order.shippingAddress.state}
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                    {getUserOrders(selectedUser._id as string).length === 0 && (
                                      <div className="text-center py-8 text-gray-500">
                                        <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        <p>No orders found for this customer</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
