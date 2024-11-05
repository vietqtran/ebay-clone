'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Search } from 'lucide-react'

// Mock data for demonstration
const mockOrders = [
   {
      id: 1,
      customer: 'John Doe',
      date: '2023-05-01',
      total: 99.99,
      status: 'Pending'
   },
   {
      id: 2,
      customer: 'Jane Smith',
      date: '2023-05-02',
      total: 149.99,
      status: 'Shipped'
   },
   {
      id: 3,
      customer: 'Bob Johnson',
      date: '2023-05-03',
      total: 199.99,
      status: 'Delivered'
   },
   {
      id: 4,
      customer: 'Alice Brown',
      date: '2023-05-04',
      total: 79.99,
      status: 'Cancelled'
   },
   {
      id: 5,
      customer: 'Charlie Davis',
      date: '2023-05-05',
      total: 129.99,
      status: 'Processing'
   }
]

const orderStatuses = [
   'Pending',
   'Processing',
   'Shipped',
   'Delivered',
   'Cancelled'
]

interface OrderDetails {
   id: number
   customer: string
   date: string
   total: number
   status: string
   items: { name: string; quantity: number; price: number }[]
   shippingAddress: string
   billingAddress: string
}

export default function OrdersManagement() {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null)
   const [searchTerm, setSearchTerm] = useState('')

   const handleOpenModal = (orderId: number) => {
      // In a real application, you would fetch the order details from an API
      const orderDetails: OrderDetails = {
         ...mockOrders.find(order => order.id === orderId)!,
         items: [
            { name: 'Product 1', quantity: 2, price: 29.99 },
            { name: 'Product 2', quantity: 1, price: 39.99 }
         ],
         shippingAddress: '123 Main St, Anytown, AN 12345',
         billingAddress: '456 Oak Rd, Somewhere, SW 67890'
      }
      setCurrentOrder(orderDetails)
      setIsModalOpen(true)
   }

   const handleStatusChange = (newStatus: string) => {
      if (currentOrder) {
         setCurrentOrder({ ...currentOrder, status: newStatus })
         // In a real application, you would update the status via an API call here
      }
   }

   const filteredOrders = mockOrders.filter(
      order =>
         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.id.toString().includes(searchTerm)
   )

   return (
      <div className="container mx-auto py-10">
         <Card className="mb-6">
            <CardHeader>
               <CardTitle>Orders Management</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center space-x-2">
                  <Input
                     placeholder="Search orders..."
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                     className="max-w-sm"
                  />
                  <Button variant="outline">
                     <Search className="h-4 w-4 mr-2" />
                     Search
                  </Button>
               </div>
            </CardContent>
         </Card>

         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredOrders.map(order => (
                  <TableRow key={order.id}>
                     <TableCell>{order.id}</TableCell>
                     <TableCell>{order.customer}</TableCell>
                     <TableCell>{order.date}</TableCell>
                     <TableCell>${order.total.toFixed(2)}</TableCell>
                     <TableCell>{order.status}</TableCell>
                     <TableCell>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleOpenModal(order.id)}
                        >
                           <Eye className="h-4 w-4 mr-2" />
                           View
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[625px]">
               <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
               </DialogHeader>
               {currentOrder && (
                  <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Order ID</Label>
                        <div className="col-span-3">{currentOrder.id}</div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Customer</Label>
                        <div className="col-span-3">
                           {currentOrder.customer}
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Date</Label>
                        <div className="col-span-3">{currentOrder.date}</div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Total</Label>
                        <div className="col-span-3">
                           ${currentOrder.total.toFixed(2)}
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                           Status
                        </Label>
                        <Select
                           value={currentOrder.status}
                           onValueChange={handleStatusChange}
                        >
                           <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select status" />
                           </SelectTrigger>
                           <SelectContent>
                              {orderStatuses.map(status => (
                                 <SelectItem key={status} value={status}>
                                    {status}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Items</Label>
                        <div className="col-span-3">
                           {currentOrder.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                 <span>
                                    {item.name} (x{item.quantity})
                                 </span>
                                 <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Shipping Address</Label>
                        <div className="col-span-3">
                           {currentOrder.shippingAddress}
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Billing Address</Label>
                        <div className="col-span-3">
                           {currentOrder.billingAddress}
                        </div>
                     </div>
                  </div>
               )}
            </DialogContent>
         </Dialog>
      </div>
   )
}
