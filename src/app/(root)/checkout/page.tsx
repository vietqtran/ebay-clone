'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Trash2, Lock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { RootState } from '@/stores'
import { useAppSelector } from '@/hooks/useRedux'

export default function CheckoutPageWithCart() {
   const { user } = useAppSelector((state: RootState) => state.auth)
   const [cartItems, setCartItems] = useState<any[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const { push } = useRouter()
   const supabase = createClient()

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
      return cartItems?.reduce((acc, item) => {
         return acc + item.products.price * item.quantity + 30000
      }, 0)
   }, [cartItems])

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading(true)

      try {
         const addressId = await createAddress(user?.id as string, {
            street_address: event.currentTarget.streetAddress.value,
            street_address_2: event.currentTarget.streetAddress2.value,
            city: event.currentTarget.city.value,
            state: event.currentTarget.state.value,
            postal_code: event.currentTarget.zipCode.value,
            country: event.currentTarget.country.value
         })

         const invoiceId = await createInvoice(
            user?.id as string,
            addressId,
            total
         )

         await createInvoiceItems(invoiceId, cartItems)

         await deleteCartItems(cartItems[0].cart_id)

         alert('Order placed successfully!')
         push('/')
      } catch (error) {
         console.error('Error placing order:', error)
         alert('Failed to place order. Please try again later.')
      } finally {
         setIsLoading(false)
      }
   }

   async function createAddress(customerId: string, shippingAddress: any) {
      const { data, error } = await supabase
         .from('addresses')
         .insert({ user_id: customerId, ...shippingAddress })
         .select()
      if (error) throw error
      return data[0].address_id
   }

   async function createInvoice(
      customerId: string,
      addressId: string,
      totalAmount: number
   ) {
      const { data, error } = await supabase
         .from('invoices')
         .insert({
            customer_id: customerId,
            address_id: addressId,
            total_amount: totalAmount,
            status: 'pending'
         })
         .select()
      if (error) throw error
      return data[0].invoice_id
   }

   async function createInvoiceItems(invoiceId: string, cartItems: any[]) {
      for (const item of cartItems) {
         const { error } = await supabase.from('invoice_items').insert({
            invoice_id: invoiceId,
            product_id: item.products.product_id,
            quantity: item.quantity,
            price: item.products.price
         })
         if (error) throw error
      }
   }

   async function deleteCartItems(cartId: string) {
      const { error } = await supabase
         .from('cart_items')
         .delete()
         .eq('cart_id', cartId)
      if (error) throw error
   }

   return (
      <div className="container mx-auto py-10">
         <div className="grid gap-6 md:grid-cols-2">
            <div>
               <Card>
                  <CardHeader>
                     <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                     {cartItems?.map((item, index) => (
                        <React.Fragment key={item.cart_item_id}>
                           <div className="flex items-center py-4">
                              <Image
                                 width={96}
                                 height={96}
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
                                       <Input
                                          type="number"
                                          value={item.quantity}
                                          className="mx-2 w-16 text-center"
                                          disabled
                                          min="1"
                                       />
                                    </div>
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
                  <CardFooter>
                     <div className="w-full">
                        <div className="flex justify-between font-semibold">
                           <span>Shipping cost</span>
                           <span>
                              ${(30000 * cartItems.length).toLocaleString()}
                           </span>
                        </div>
                        <div className="flex justify-between font-semibold">
                           <span>Total</span>
                           <span>${total.toLocaleString()}</span>
                        </div>
                     </div>
                  </CardFooter>
               </Card>
            </div>
            <div>
               <Card>
                  <CardHeader>
                     <CardTitle>Checkout</CardTitle>
                     <CardDescription>
                        Complete your order by providing your payment and
                        shipping details.
                     </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <h3 className="text-lg font-semibold">
                              Payment Information
                           </h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                 <Label htmlFor="cardNumber">Card Number</Label>
                                 <Input
                                    name="cardNumber"
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                 />
                              </div>
                              <div>
                                 <Label htmlFor="expiryDate">Expiry Date</Label>
                                 <Input
                                    name="expiryDate"
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    required
                                 />
                              </div>
                              <div>
                                 <Label htmlFor="cvv">CVV</Label>
                                 <Input
                                    name="cvv"
                                    id="cvv"
                                    placeholder="123"
                                    required
                                 />
                              </div>
                              <div className="col-span-2">
                                 <Label htmlFor="nameOnCard">
                                    Name on Card
                                 </Label>
                                 <Input
                                    name="nameOnCard"
                                    id="nameOnCard"
                                    placeholder="John Doe"
                                    required
                                 />
                              </div>
                           </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                           <h3 className="text-lg font-semibold">
                              Shipping Address
                           </h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                 <Label htmlFor="fullName">Full Name</Label>
                                 <Input
                                    name="fullName"
                                    id="fullName"
                                    placeholder="John Doe"
                                    required
                                 />
                              </div>
                              <div className="col-span-2">
                                 <Label htmlFor="streetAddress">
                                    Street Address
                                 </Label>
                                 <Input
                                    name="streetAddress"
                                    id="streetAddress"
                                    placeholder="123 Main St"
                                    required
                                 />
                              </div>
                              <div className="col-span-2">
                                 <Label htmlFor="streetAddress2">
                                    Street Address 2
                                 </Label>
                                 <Input
                                    name="streetAddress2"
                                    id="streetAddress2"
                                    placeholder="Apt 4B"
                                 />
                              </div>
                              <div>
                                 <Label htmlFor="city">City</Label>
                                 <Input
                                    name="city"
                                    id="city"
                                    placeholder="New York"
                                    required
                                 />
                              </div>
                              <div>
                                 <Label htmlFor="state">State</Label>
                                 <Select name="state" required>
                                    <SelectTrigger id="state">
                                       <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="NY">
                                          New York
                                       </SelectItem>
                                       <SelectItem value="CA">
                                          California
                                       </SelectItem>
                                       <SelectItem value="TX">Texas</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </div>
                              <div>
                                 <Label htmlFor="zipCode">ZIP Code</Label>
                                 <Input
                                    name="zipCode"
                                    id="zipCode"
                                    placeholder="12345"
                                    required
                                 />
                              </div>
                              <div>
                                 <Label htmlFor="country">Country</Label>
                                 <Select name="country" required>
                                    <SelectTrigger id="country">
                                       <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="US">
                                          United States
                                       </SelectItem>
                                       <SelectItem value="CA">
                                          Canada
                                       </SelectItem>
                                       <SelectItem value="UK">
                                          United Kingdom
                                       </SelectItem>
                                       {/* Add more countries as needed */}
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button
                           className="w-full"
                           type="submit"
                           disabled={isLoading}
                        >
                           {isLoading ? (
                              'Processing...'
                           ) : (
                              <>
                                 <Lock className="w-4 h-4 mr-2" />
                                 Pay ${total.toLocaleString()} Now
                              </>
                           )}
                        </Button>
                     </CardFooter>
                  </form>
               </Card>
            </div>
         </div>
      </div>
   )
}
