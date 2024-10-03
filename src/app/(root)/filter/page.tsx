'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Star, ChevronDown } from 'lucide-react'

export default function FilterProductPage() {
   const [priceRange, setPriceRange] = React.useState([0, 1000])

   const products = [
      {
         id: 1,
         name: 'Vintage Watch',
         price: 199.99,
         rating: 4.5,
         image: '/placeholder.svg?height=200&width=200'
      },
      {
         id: 2,
         name: 'Leather Wallet',
         price: 49.99,
         rating: 4.2,
         image: '/placeholder.svg?height=200&width=200'
      },
      {
         id: 3,
         name: 'Wireless Earbuds',
         price: 79.99,
         rating: 4.7,
         image: '/placeholder.svg?height=200&width=200'
      },
      {
         id: 4,
         name: 'Sunglasses',
         price: 129.99,
         rating: 4.1,
         image: '/placeholder.svg?height=200&width=200'
      },
      {
         id: 5,
         name: 'Backpack',
         price: 89.99,
         rating: 4.6,
         image: '/placeholder.svg?height=200&width=200'
      },
      {
         id: 6,
         name: 'Smartphone',
         price: 599.99,
         rating: 4.8,
         image: '/placeholder.svg?height=200&width=200'
      }
   ]

   return (
      <div className="container mx-auto p-4 md:p-6">
         <h1 className="mb-6 text-3xl font-bold">Product Listings</h1>
         <div className="flex flex-col gap-6 md:flex-row">
            <aside className="w-full md:w-1/4">
               <Card>
                  <CardHeader>
                     <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div>
                        <h3 className="mb-2 font-semibold">Price Range</h3>
                        <Slider
                           min={0}
                           max={1000}
                           step={10}
                           value={priceRange}
                           onValueChange={setPriceRange}
                           className="mb-2"
                        />
                        <div className="flex justify-between">
                           <span>${priceRange[0]}</span>
                           <span>${priceRange[1]}</span>
                        </div>
                     </div>
                     <div>
                        <h3 className="mb-2 font-semibold">Category</h3>
                        <div className="space-y-2">
                           {[
                              'Electronics',
                              'Fashion',
                              'Home & Garden',
                              'Sports'
                           ].map(category => (
                              <div key={category} className="flex items-center">
                                 <Checkbox id={category} />
                                 <Label htmlFor={category} className="ml-2">
                                    {category}
                                 </Label>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="mb-2 font-semibold">Brand</h3>
                        <div className="space-y-2">
                           {['Apple', 'Samsung', 'Sony', 'LG'].map(brand => (
                              <div key={brand} className="flex items-center">
                                 <Checkbox id={brand} />
                                 <Label htmlFor={brand} className="ml-2">
                                    {brand}
                                 </Label>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="mb-2 font-semibold">Condition</h3>
                        <RadioGroup defaultValue="new">
                           {['New', 'Used', 'Refurbished'].map(condition => (
                              <div
                                 key={condition}
                                 className="flex items-center"
                              >
                                 <RadioGroupItem
                                    value={condition.toLowerCase()}
                                    id={condition}
                                 />
                                 <Label htmlFor={condition} className="ml-2">
                                    {condition}
                                 </Label>
                              </div>
                           ))}
                        </RadioGroup>
                     </div>
                  </CardContent>
                  <CardFooter>
                     <Button className="w-full">Apply Filters</Button>
                  </CardFooter>
               </Card>
            </aside>
            <main className="flex-1">
               <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                     {products.length} results
                  </p>
                  <Select defaultValue="relevance">
                     <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low-high">
                           Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high-low">
                           Price: High to Low
                        </SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.map(product => (
                     <Card key={product.id}>
                        <CardHeader>
                           <img
                              src={product.image}
                              alt={product.name}
                              className="h-48 w-full rounded-md object-cover"
                           />
                        </CardHeader>
                        <CardContent>
                           <h3 className="mb-2 text-lg font-semibold">
                              {product.name}
                           </h3>
                           <p className="text-2xl font-bold">
                              ${product.price.toFixed(2)}
                           </p>
                           <div className="mt-2 flex items-center">
                              {Array.from({ length: 5 }).map((_, index) => (
                                 <Star
                                    key={index}
                                    className={`w-4 h-4 ${
                                       index < Math.floor(product.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                    }`}
                                 />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">
                                 {product.rating}
                              </span>
                           </div>
                        </CardContent>
                        <CardFooter>
                           <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                     </Card>
                  ))}
               </div>
               <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                     Show More
                     <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
               </div>
            </main>
         </div>
      </div>
   )
}
