'use client'
import React, { useEffect, useMemo } from 'react'
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
import { useAppSelector } from '@/hooks/useRedux'
import { RootState } from '@/stores'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CartPage() {
   const [cartItems, setCartItems] = React.useState<any[]>([])
   const { user } = useAppSelector((state: RootState) => state.auth)
   const supabase = createClient()
   const { push } = useRouter()
   useEffect(() => {
      const fetchCartItems = async () => {
         try {
            const { data: cartData } = await supabase
               .from('carts')
               .select('*')
               .eq('customer_id', user?.id)
            const { data: items } = await supabase
               .from('cart_items')
               .select('*, products(*, product_images(*))')
               .eq('cart_id', cartData?.[0]?.cart_id)
            setCartItems(items as any[])
         } catch (error) {
            console.error(error)
         }
      }
      fetchCartItems()
   }, [])

   const total = useMemo(() => {
      return cartItems.reduce((acc, item) => {
         return acc + parseInt(item.products.price) * parseInt(item.quantity)
      }, 0)
   }, [cartItems])

   const updateQuantity = async (id: string, newQuantity: number) => {
      if (newQuantity < 1) return
      await supabase
         .from('cart_items')
         .update({ quantity: newQuantity })
         .eq('cart_item_id', id)
      setCartItems(
         cartItems.map(item =>
            item.cart_item_id === id
               ? { ...item, quantity: Math.max(1, newQuantity) }
               : item
         )
      )
   }

   const removeItem = async (id: string) => {
      await supabase.from('cart_items').delete().eq('cart_item_id', id)
      setCartItems(cartItems.filter(item => item.cart_item_id !== id))
   }

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
                        <React.Fragment key={item.cart_item_id}>
                           <div className="flex items-center py-4">
                              <Image
                                 width={200}
                                 height={200}
                                 src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.products?.product_images[0]?.image_url}`}
                                 alt={item.products.name}
                                 className="mr-4 h-24 w-24 rounded-md object-cover"
                              />
                              <div className="flex-grow">
                                 <h3 className="font-semibold">
                                    {item.products.name}
                                 </h3>
                                 <p className="text-sm text-muted-foreground">
                                    Item {item.products.product_id}
                                 </p>
                                 <div className="mt-2 flex items-center">
                                    <div className="flex items-center">
                                       <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={async () =>
                                             await updateQuantity(
                                                item.cart_item_id,
                                                item.quantity - 1
                                             )
                                          }
                                          aria-label={`Decrease quantity of ${item.products.name}`}
                                       >
                                          <Minus className="h-4 w-4" />
                                       </Button>
                                       <Input
                                          type="number"
                                          value={item.quantity}
                                          onChange={async e =>
                                             await updateQuantity(
                                                item.cart_item_id,
                                                parseInt(e.target.value) || 1
                                             )
                                          }
                                          className="mx-2 w-16 text-center"
                                          min="1"
                                       />
                                       <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={async () =>
                                             await updateQuantity(
                                                item.cart_item_id,
                                                item.quantity + 1
                                             )
                                          }
                                          aria-label={`Increase quantity of ${item.products.name}`}
                                       >
                                          <Plus className="h-4 w-4" />
                                       </Button>
                                    </div>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       className="ml-4 text-red-500"
                                       onClick={async () =>
                                          await removeItem(item.cart_item_id)
                                       }
                                    >
                                       <Trash2 className="mr-2 h-4 w-4" />
                                       Remove
                                    </Button>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-semibold">
                                    $
                                    {(
                                       item.products.price * item.quantity
                                    ).toLocaleString()}
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    ${item.products.price.toLocaleString()} each
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
                           <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           <span>
                              ${(cartItems.length * 30000).toLocaleString()}
                           </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                           <span>Total</span>
                           <span>
                              $
                              {(
                                 cartItems.length * 30000 +
                                 total
                              ).toLocaleString()}
                           </span>
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                     <Button
                        onClick={() => push('/checkout')}
                        className="mb-2 w-full"
                     >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Checkout
                     </Button>
                     <Button
                        onClick={() => push('/')}
                        variant="outline"
                        className="w-full"
                     >
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
