'use client'

import { useState } from 'react'
import {
   Star,
   Truck,
   ShieldCheck,
   ArrowLeft,
   ArrowRight,
   ChevronLeft,
   ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export default function EnhancedEbayProductDetails() {
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [currentReviewPage, setCurrentReviewPage] = useState(1)

   const product = {
      name: 'Vintage Leather Messenger Bag',
      condition: 'Pre-owned',
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      shipping: 12.99,
      location: 'New York, United States',
      images: [
         '/placeholder.svg?height=400&width=400',
         '/placeholder.svg?height=400&width=400',
         '/placeholder.svg?height=400&width=400',
         '/placeholder.svg?height=400&width=400'
      ],
      description:
         'This vintage leather messenger bag is perfect for daily use or travel. Made from high-quality leather, it features multiple compartments and an adjustable strap.',
      features: [
         'Genuine leather construction',
         'Multiple interior compartments',
         'Adjustable shoulder strap',
         'Brass hardware',
         'Fits laptops up to 15 inches'
      ],
      seller: {
         name: 'VintageFinds',
         rating: 4.8,
         sales: 1520
      },
      reviews: [
         {
            id: 1,
            user: 'John D.',
            rating: 5,
            comment: 'Excellent quality bag, just as described!',
            date: '2023-05-15'
         },
         {
            id: 2,
            user: 'Sarah M.',
            rating: 4,
            comment: 'Good bag, but slightly smaller than expected.',
            date: '2023-05-10'
         },
         {
            id: 3,
            user: 'Mike R.',
            rating: 5,
            comment: 'Perfect for my daily commute. Highly recommended!',
            date: '2023-05-05'
         },
         {
            id: 4,
            user: 'Emily L.',
            rating: 4,
            comment: 'Beautiful bag, but took longer than expected to arrive.',
            date: '2023-04-30'
         },
         {
            id: 5,
            user: 'Chris P.',
            rating: 5,
            comment: 'Sturdy construction and great look. Very satisfied!',
            date: '2023-04-25'
         }
      ],
      relatedProducts: [
         {
            id: 1,
            name: 'Leather Laptop Backpack',
            price: 109.99,
            image: '/placeholder.svg?height=200&width=200'
         },
         {
            id: 2,
            name: 'Canvas Tote Bag',
            price: 49.99,
            image: '/placeholder.svg?height=200&width=200'
         },
         {
            id: 3,
            name: 'Leather Briefcase',
            price: 149.99,
            image: '/placeholder.svg?height=200&width=200'
         },
         {
            id: 4,
            name: 'Travel Duffel Bag',
            price: 79.99,
            image: '/placeholder.svg?height=200&width=200'
         }
      ]
   }

   const nextImage = () => {
      setCurrentImageIndex(prevIndex =>
         prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      )
   }

   const prevImage = () => {
      setCurrentImageIndex(prevIndex =>
         prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      )
   }

   const reviewsPerPage = 3
   const totalReviewPages = Math.ceil(product.reviews.length / reviewsPerPage)

   const paginatedReviews = product.reviews.slice(
      (currentReviewPage - 1) * reviewsPerPage,
      currentReviewPage * reviewsPerPage
   )

   return (
      <div className="container mx-auto p-4 md:p-6">
         <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
               <div className="relative aspect-square">
                  <img
                     src={product.images[currentImageIndex]}
                     alt={`${product.name} - Image ${currentImageIndex + 1}`}
                     className="h-full w-full rounded-lg object-cover"
                  />
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
               </div>
               <div className="flex justify-center space-x-2">
                  {product.images.map((_, index) => (
                     <Button
                        key={index}
                        variant={
                           index === currentImageIndex ? 'default' : 'outline'
                        }
                        size="icon"
                        onClick={() => setCurrentImageIndex(index)}
                     >
                        {index + 1}
                     </Button>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground">
                     Condition: {product.condition}
                  </p>
               </div>

               <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                     <span className="text-4xl font-bold">
                        ${product.price.toFixed(2)}
                     </span>
                     <span className="text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                     </span>
                     <span className="font-semibold text-green-600">
                        {product.discount}% off
                     </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     + ${product.shipping.toFixed(2)} shipping
                  </p>
               </div>

               <div className="space-y-4">
                  <Button className="w-full">Buy It Now</Button>
                  <Button variant="outline" className="w-full">
                     Add to cart
                  </Button>
                  <Button variant="secondary" className="w-full">
                     Add to watchlist
                  </Button>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">
                        Seller Information
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="flex items-center space-x-2">
                        <Avatar>
                           <AvatarImage src="/placeholder-user.jpg" />
                           <AvatarFallback>
                              {product.seller.name[0]}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="font-semibold">
                              {product.seller.name}
                           </p>
                           <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                              <span className="ml-1 text-sm">
                                 {product.seller.rating} ({product.seller.sales}{' '}
                                 sales)
                              </span>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Located in: {product.location}</span>
               </div>
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

            <Card>
               <CardHeader>
                  <CardTitle>Features</CardTitle>
               </CardHeader>
               <CardContent>
                  <ul className="list-disc space-y-2 pl-6">
                     {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                     ))}
                  </ul>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Shipping</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>Standard shipping: ${product.shipping.toFixed(2)}</p>
                  <p>Estimated delivery: 5-7 business days</p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Reviews</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {paginatedReviews.map(review => (
                        <div key={review.id} className="space-y-2">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                 <Avatar>
                                    <AvatarFallback>
                                       {review.user[0]}
                                    </AvatarFallback>
                                 </Avatar>
                                 <span className="font-semibold">
                                    {review.user}
                                 </span>
                              </div>
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
                           </div>
                           <p>{review.comment}</p>
                           <p className="text-sm text-muted-foreground">
                              {review.date}
                           </p>
                           {review.id !==
                              paginatedReviews[paginatedReviews.length - 1]
                                 .id && <Separator className="my-4" />}
                        </div>
                     ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                     <Button
                        variant="outline"
                        onClick={() =>
                           setCurrentReviewPage(page => Math.max(1, page - 1))
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
               </CardContent>
            </Card>
         </div>

         <Card className="mt-8">
            <CardHeader>
               <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  eBay Money Back Guarantee
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p>Get the item you ordered or get your money back.</p>
            </CardContent>
         </Card>

         <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">You may also like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
               {product.relatedProducts.map(relatedProduct => (
                  <Card key={relatedProduct.id}>
                     <CardContent className="p-4">
                        <img
                           src={relatedProduct.image}
                           alt={relatedProduct.name}
                           className="mb-2 h-40 w-full rounded-md object-cover"
                        />
                        <h3 className="truncate font-semibold">
                           {relatedProduct.name}
                        </h3>
                        <p className="text-sm font-bold">
                           ${relatedProduct.price.toFixed(2)}
                        </p>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   )
}
