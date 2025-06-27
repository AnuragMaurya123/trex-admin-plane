"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  ShoppingCart,
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
import { Order } from "@/lib/types/orderType"
import KPICard from "@/components/kpl-card"
import Image from "next/image"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    _id: "1",
    orderNumber: "ORD-2024-001",
    customerId: "cust-001",
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
          sizes: [
            { size: "M", marketPrice: 29.99, sellingPrice: 24.99, stock: 50 },
            { size: "L", marketPrice: 29.99, sellingPrice: 24.99, stock: 30 },
          ],
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
    status: "processing",
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
    estimatedDelivery: "2024-01-25T00:00:00Z",
  },
  {
    _id: "2",
    orderNumber: "ORD-2024-002",
    customerId: "cust-002",
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
          sizes: [
            { size: "S", marketPrice: 149.99, sellingPrice: 129.99, stock: 15 },
            { size: "M", marketPrice: 149.99, sellingPrice: 129.99, stock: 20 },
          ],
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
    orderDate: "2024-01-18T14:15:00Z",
    estimatedDelivery: "2024-01-23T00:00:00Z",
    trackingNumber: "TRK123456789",
  },
  {
    _id: "3",
    orderNumber: "ORD-2024-003",
    customerId: "cust-003",
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
          sizes: [
            { size: "32", marketPrice: 89.99, sellingPrice: 79.99, stock: 25 },
            { size: "34", marketPrice: 89.99, sellingPrice: 79.99, stock: 30 },
          ],
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
    orderDate: "2024-01-16T09:45:00Z",
    estimatedDelivery: "2024-01-21T00:00:00Z",
    trackingNumber: "TRK987654321",
  },
]



const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />
    case "processing":
      return <Package className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
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

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const hasMounted = useHasMounted()

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Order Management System
        </h1>
        <p className="text-sm bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Track and manage all customer orders efficiently
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KPICard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart className="h-9 w-9 text-slate-200" />}
          subtitle={
            filteredOrders.length !== totalOrders ? `${filteredOrders.length} matching filters` : "All orders listed"
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
          subtitle="Total sales value"
          color="from-green-500 to-emerald-600"
        />
        <KPICard
          title="Pending Orders"
          value={pendingOrders}
          icon={<Clock className="h-9 w-9 text-slate-200" />}
          subtitle="Awaiting processing"
          color="from-yellow-500 to-orange-600"
        />
        <KPICard
          title="Delivered Orders"
          value={deliveredOrders}
          icon={<CheckCircle className="h-9 w-9 text-slate-200" />}
          subtitle="Successfully completed"
          color="from-blue-500 to-cyan-600"
        />
      </div>

      {/* Filters */}
      <Card className="mb-6  bg-gradient-to-r  from-violet-500/10 to-purple-500/10 backdrop-blur-sm border-white dark:from-slate-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-white text-slate-800 focus-visible:ring-purple-700 dark:text-black"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="min-w-[9rem] bg-gradient-to-r from-purple-500 to-purple-600 border-white text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-r from-violet-400 to-purple-500 border-white dark:from-slate-900">
                  <SelectItem value="all" className="text-white">
                    All Status
                  </SelectItem>
                  <SelectItem value="pending" className="text-white">
                    Pending
                  </SelectItem>
                  <SelectItem value="confirmed" className="text-white">
                    Confirmed
                  </SelectItem>
                  <SelectItem value="processing" className="text-white">
                    Processing
                  </SelectItem>
                  <SelectItem value="shipped" className="text-white">
                    Shipped
                  </SelectItem>
                  <SelectItem value="delivered" className="text-white">
                    Delivered
                  </SelectItem>
                  <SelectItem value="cancelled" className="text-white">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gradient-to-r from-violet-500/5 to-purple-500/5 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Orders Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-200/50">
                  <TableHead className="text-purple-700 font-semibold">Order</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Customer</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Date</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Status</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Total</TableHead>
                  <TableHead className="text-purple-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} className="border-purple-100/50 hover:bg-purple-50/30">
                    <TableCell>
                      <div>
                        <div className="font-medium text-purple-900">{order.orderNumber}</div>
                        <div className="text-sm text-purple-600">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-purple-900">{order.customerName}</div>
                        <div className="text-sm text-purple-600">{order.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-purple-800">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} border-0`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-purple-900">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 hover:from-purple-600 hover:to-purple-700"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white ">
                          <DialogHeader>
                            <DialogTitle className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                              Order Details - {order.orderNumber}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Order Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                                  <CardHeader>
                                    <CardTitle className="text-purple-800 text-lg flex items-center gap-2">
                                      <Users className="h-5 w-5" />
                                      Customer Information
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2 text-sm">
                                    <p>
                                      <strong className="text-purple-700">Name:</strong> {selectedOrder.customerName}
                                    </p>
                                    <p>
                                      <strong className="text-purple-700">Email:</strong> {selectedOrder.customerEmail}
                                    </p>
                                    <p>
                                      <strong className="text-purple-700">Order Date:</strong>{" "}
                                      {new Date(selectedOrder.orderDate).toLocaleString()}
                                    </p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                                  <CardHeader>
                                    <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                                      <Package className="h-5 w-5" />
                                      Order Status
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-2">
                                    <Badge className={getStatusColor(selectedOrder.status)}>
                                      <div className="flex items-center gap-1">
                                        {getStatusIcon(selectedOrder.status)}
                                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                      </div>
                                    </Badge>
                                    <p className="text-sm">
                                      <strong className="text-blue-700">Payment:</strong> {selectedOrder.paymentStatus}
                                    </p>
                                    {selectedOrder.trackingNumber && (
                                      <p className="text-sm">
                                        <strong className="text-blue-700">Tracking:</strong>{" "}
                                        {selectedOrder.trackingNumber}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>

                              <Separator className="bg-purple-200" />

                              {/* Shipping Address */}
                              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                                <CardHeader>
                                  <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                                    <Truck className="h-5 w-5" />
                                    Shipping Address
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                  <p>{selectedOrder.shippingAddress.fullName}</p>
                                  <p>{selectedOrder.shippingAddress.addressLine1}</p>
                                  {selectedOrder.shippingAddress.addressLine2 && (
                                    <p>{selectedOrder.shippingAddress.addressLine2}</p>
                                  )}
                                  <p>
                                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                                    {selectedOrder.shippingAddress.postalCode}
                                  </p>
                                  <p>{selectedOrder.shippingAddress.country}</p>
                                  <p>{selectedOrder.shippingAddress.phone}</p>
                                </CardContent>
                              </Card>

                              <Separator className="bg-purple-200" />

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-4 text-purple-800 text-lg flex items-center gap-2">
                                  <Package className="h-5 w-5" />
                                  Order Items
                                </h3>
                                <div className="space-y-4">
                                  {selectedOrder.items.map((item, index) => (
                                    <Card
                                      key={index}
                                      className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200"
                                    >
                                      <CardContent className="p-4">
                                        <div className="flex gap-4">
                                          <Image
                                            src={item.variant.thumbnail || "/placeholder.svg?height=80&width=80"}
                                            alt={item.product.name}
                                            fill
                                            className="w-20 h-20 object-cover rounded-lg border-2 border-purple-200"
                                          />
                                          <div className="flex-1">
                                            <h4 className="font-semibold text-purple-900">{item.product.name}</h4>
                                            <div className="text-sm text-slate-600 space-y-1 mt-2">
                                              <p>
                                                <strong>Color:</strong> {item.variant.color}
                                              </p>
                                              <p>
                                                <strong>Size:</strong> {item.size}
                                              </p>
                                              <p>
                                                <strong>Category:</strong> {item.product.category} -{" "}
                                                {item.product.subcategory}
                                              </p>
                                              <p>
                                                <strong>Fabric:</strong> {item.product.fabric}
                                              </p>
                                              <p>
                                                <strong>Style:</strong> {item.product.style}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold text-purple-900">
                                              ${item.price.toFixed(2)} × {item.quantity}
                                            </p>
                                            <p className="text-sm text-purple-600 font-medium">
                                              Total: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>

                              <Separator className="bg-purple-200" />

                              {/* Order Summary */}
                              <Card className="bg-gradient-to-r from-purple-100 to-violet-100 border-purple-300">
                                <CardHeader>
                                  <CardTitle className="text-purple-800 text-lg flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Order Summary
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-purple-700">Subtotal:</span>
                                    <span className="font-medium">${selectedOrder.subtotal.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-purple-700">Tax:</span>
                                    <span className="font-medium">${selectedOrder.tax.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-purple-700">Shipping:</span>
                                    <span className="font-medium">${selectedOrder.shipping.toFixed(2)}</span>
                                  </div>
                                  <Separator className="bg-purple-300" />
                                  <div className="flex justify-between font-bold text-lg text-purple-900">
                                    <span>Total:</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
