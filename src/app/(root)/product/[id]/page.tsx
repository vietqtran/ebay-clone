'use client'

import { useState, useEffect } from 'react'
import {
   Star,
   ArrowLeft,
   ArrowRight,
   ChevronLeft,
   ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useProduct } from '@/hooks/useProduct'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useAppSelector } from '@/hooks/useRedux'

interface AddToCartParams {
   userId: string
   productId: string
   quantity?: number
}

export default function EnhancedEbayProductDetails() {
   const { id } = useParams()
   const { user } = useAppSelector(state => state.auth)
   const { getProductById, loading, error } = useProduct()
   const [product, setProduct] = useState<any | null>(null)
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [currentReviewPage, setCurrentReviewPage] = useState(1)
   const supabase = createClient()
   const { push } = useRouter()

   useEffect(() => {
      const fetchProduct = async () => {
         const product = await getProductById(id + '')
         setProduct(product)
      }
      fetchProduct()
   }, [id])

   if (loading) {
      return <div>Loading...</div>
   }

   if (error || !product) {
      return <div>Error: {error || 'Product not found'}</div>
   }

   const images = product.product_images?.map((img: any) => img.image_url) || []
   const vendor = product.vendors
   const reviews = product.reviews || []
   const reviewsPerPage = 3
   const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage)

   const paginatedReviews = reviews.slice(
      (currentReviewPage - 1) * reviewsPerPage,
      currentReviewPage * reviewsPerPage
   )

   const nextImage = () => {
      setCurrentImageIndex(prevIndex =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
   }

   const prevImage = () => {
      setCurrentImageIndex(prevIndex =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
   }

   async function addToCart({
      userId,
      productId,
      quantity = 1
   }: AddToCartParams) {
      if (!userId) {
         push('/signin')
      }
      try {
         let { data: cart } = await supabase
            .from('carts')
            .select('cart_id')
            .eq('customer_id', userId)
            .single()

         if (!cart) {
            const { data: newCart, error: newCartError } = await supabase
               .from('carts')
               .insert({ customer_id: userId })
               .select()
               .single()
            if (newCartError) {
               console.log(newCartError)
            }
            cart = newCart
         }

         const existedCartItem = await supabase
            .from('cart_items')
            .select('quantity')
            .eq('cart_id', cart?.cart_id)
            .eq('product_id', productId)
            .single()

         if (existedCartItem.data) {
            const { data: updatedCartItem, error: updatedCartItemError } =
               await supabase
                  .from('cart_items')
                  .update({
                     quantity: existedCartItem.data.quantity + quantity
                  })
                  .eq('cart_id', cart?.cart_id)
                  .eq('product_id', productId)
                  .single()
            if (updatedCartItemError) {
               throw new Error('Error updating cart item')
            }
            return updatedCartItem
         }

         const { data: cartItem, error: cartItemError } = await supabase
            .from('cart_items')
            .upsert({
               cart_id: cart?.cart_id,
               product_id: productId,
               quantity
            })
            .eq('cart_id', cart?.cart_id)
            .eq('product_id', productId)
            .single()

         if (cartItemError) {
            throw new Error('Error adding item to cart')
         }

         return cartItem
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="container mx-auto p-4 md:p-6">
         <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
               <div className="relative aspect-square">
                  {images.length > 0 && (
                     <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${images[currentImageIndex]}`}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        width={500}
                        height={500}
                        className="h-full w-full rounded-lg object-cover"
                     />
                  )}
                  {images.length > 1 && (
                     <>
                        <Button
                           variant="secondary"
                           size="icon"
                           className="absolute left-2 top-1/2 -translate-y-1/2 transform"
                           onClick={prevImage}
                        >
                           <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                           variant="secondary"
                           size="icon"
                           className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                           onClick={nextImage}
                        >
                           <ArrowRight className="h-4 w-4" />
                        </Button>
                     </>
                  )}
               </div>
               {images.length > 1 && (
                  <div className="flex justify-center space-x-2">
                     {images.map((_: any, index: number) => (
                        <Button
                           key={index}
                           variant={
                              index === currentImageIndex
                                 ? 'default'
                                 : 'outline'
                           }
                           size="icon"
                           onClick={() => setCurrentImageIndex(index)}
                        >
                           {index + 1}
                        </Button>
                     ))}
                  </div>
               )}
            </div>

            <div className="space-y-6">
               <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground">
                     Status: {product.status}
                  </p>
               </div>

               <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                     <span className="text-4xl font-bold">
                        ${product.price.toFixed(2)}
                     </span>
                  </div>
                  <p className="text-sm">SKU: {product.sku}</p>
               </div>

               <div className="space-y-4">
                  <Button className="w-full">Buy Now</Button>
                  <Button
                     onClick={() =>
                        addToCart({
                           userId: user?.id ?? '',
                           productId: id + ''
                        })
                     }
                     variant="outline"
                     className="w-full"
                  >
                     Add to cart
                  </Button>
               </div>

               {vendor && (
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-lg">
                           Seller Information
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                           <Avatar>
                              <AvatarImage src={vendor.logo_url || ''} />
                              <AvatarFallback>
                                 {vendor.business_name[0]}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <p className="font-semibold">
                                 {vendor.business_name}
                              </p>
                              {vendor.rating && (
                                 <div className="flex items-center">
                                    <span className="ml-1 text-sm">
                                       {vendor.rating}
                                    </span>
                                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                                 </div>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>

         <div className="mt-8 space-y-8">
            <Card>
               <CardHeader>
                  <CardTitle>Description</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>{product.description}</p>
               </CardContent>
            </Card>

            {reviews.length > 0 && (
               <Card>
                  <CardHeader>
                     <CardTitle>Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {paginatedReviews.map((review: any, index: number) => (
                           <div key={review.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2">
                                    <Avatar>
                                       <AvatarFallback>
                                          {review.user_id?.[0]}
                                       </AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold">
                                       {review.user_id}
                                    </span>
                                 </div>
                                 {review.rating && (
                                    <div className="flex items-center">
                                       {[...Array(5)].map((_, i) => (
                                          <Star
                                             key={i}
                                             className={`w-4 h-4 ${
                                                i < review.rating
                                                   ? 'fill-yellow-400 stroke-yellow-400'
                                                   : 'fill-muted stroke-muted-foreground'
                                             }`}
                                          />
                                       ))}
                                    </div>
                                 )}
                              </div>
                              <p>{review.comment}</p>
                              <p className="text-sm text-muted-foreground">
                                 {new Date(
                                    review.created_at
                                 ).toLocaleDateString()}
                              </p>
                              {index !== paginatedReviews.length - 1 && (
                                 <Separator className="my-4" />
                              )}
                           </div>
                        ))}
                     </div>
                     {totalReviewPages > 1 && (
                        <div className="mt-6 flex items-center justify-between">
                           <Button
                              variant="outline"
                              onClick={() =>
                                 setCurrentReviewPage(page =>
                                    Math.max(1, page - 1)
                                 )
                              }
                              disabled={currentReviewPage === 1}
                           >
                              <ChevronLeft className="mr-2 h-4 w-4" />
                              Previous
                           </Button>
                           <span>
                              {currentReviewPage} of {totalReviewPages}
                           </span>
                           <Button
                              variant="outline"
                              onClick={() =>
                                 setCurrentReviewPage(page =>
                                    Math.min(totalReviewPages, page + 1)
                                 )
                              }
                              disabled={currentReviewPage === totalReviewPages}
                           >
                              Next
                              <ChevronRight className="ml-2 h-4 w-4" />
                           </Button>
                        </div>
                     )}
                  </CardContent>
               </Card>
            )}
         </div>
      </div>
   )
}
