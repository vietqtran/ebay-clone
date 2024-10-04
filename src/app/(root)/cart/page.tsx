'use client'
import React from 'react'
import { ShoppingCart, Trash2, ChevronLeft, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
   const [cartItems, setCartItems] = React.useState([
      {
         id: 1,
         name: 'Vintage Leather Messenger Bag',
         price: 89.99,
         quantity: 1,
         image: '/placeholder.svg?height=100&width=100'
      },
      {
         id: 2,
         name: 'Wireless Bluetooth Headphones',
         price: 59.99,
         quantity: 2,
         image: '/placeholder.svg?height=100&width=100'
      },
      {
         id: 3,
         name: 'Stainless Steel Water Bottle',
         price: 24.99,
         quantity: 1,
         image: '/placeholder.svg?height=100&width=100'
      }
   ])

   const updateQuantity = (id: number, newQuantity: number) => {
      setCartItems(
         cartItems.map(item =>
            item.id === id
               ? { ...item, quantity: Math.max(1, newQuantity) }
               : item
         )
      )
   }

   const removeItem = (id: number) => {
      setCartItems(cartItems.filter(item => item.id !== id))
   }

   const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   )
   const shipping = 8.99
   const tax = subtotal * 0.08
   const total = subtotal + shipping + tax

   return (
      <div className="container mx-auto p-4 md:p-6">
         <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
         <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                     {cartItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                           <div className="flex items-center py-4">
                              <img
                                 src={item.image}
                                 alt={item.name}
                                 className="mr-4 h-24 w-24 rounded-md object-cover"
                              />
                              <div className="flex-grow">
                                 <h3 className="font-semibold">{item.name}</h3>
                                 <p className="text-sm text-muted-foreground">
                                    Item #{item.id}
                                 </p>
                                 <div className="mt-2 flex items-center">
                                    <div className="flex items-center">
                                       <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() =>
                                             updateQuantity(
                                                item.id,
                                                item.quantity - 1
                                             )
                                          }
                                          aria-label={`Decrease quantity of ${item.name}`}
                                       >
                                          <Minus className="h-4 w-4" />
                                       </Button>
                                       <Input
                                          type="number"
                                          value={item.quantity}
                                          onChange={e =>
                                             updateQuantity(
                                                item.id,
                                                parseInt(e.target.value) || 1
                                             )
                                          }
                                          className="mx-2 w-16 text-center"
                                          min="1"
                                       />
                                       <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() =>
                                             updateQuantity(
                                                item.id,
                                                item.quantity + 1
                                             )
                                          }
                                          aria-label={`Increase quantity of ${item.name}`}
                                       >
                                          <Plus className="h-4 w-4" />
                                       </Button>
                                    </div>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       className="ml-4 text-red-500"
                                       onClick={() => removeItem(item.id)}
                                    >
                                       <Trash2 className="mr-2 h-4 w-4" />
                                       Remove
                                    </Button>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    ${item.price.toFixed(2)} each
                                 </p>
                              </div>
                           </div>
                           {index < cartItems.length - 1 && <Separator />}
                        </React.Fragment>
                     ))}
                  </CardContent>
               </Card>
            </div>
            <div>
               <Card>
                  <CardHeader>
                     <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-2">
                        <div className="flex justify-between">
                           <span>Subtotal</span>
                           <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Estimated tax</span>
                           <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                           <span>Total</span>
                           <span>${total.toFixed(2)}</span>
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                     <Button className="mb-2 w-full">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Checkout
                     </Button>
                     <Button variant="outline" className="w-full">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                     </Button>
                  </CardFooter>
               </Card>
               <Card className="mt-4">
                  <CardHeader>
                     <CardTitle>Have a coupon?</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="flex space-x-2">
                        <Input placeholder="Enter code" />
                        <Button>Apply</Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}