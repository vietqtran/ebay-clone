'use client'

import { useEffect, useState } from 'react'
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
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { useAppSelector } from '@/hooks/useRedux'
import { RootState } from '@/stores'
import { useBrands } from '@/hooks/useBrands'
import { Brand, Category } from '@/types'
import { useCategory } from '@/hooks/useCategory'
import { Product, ProductVariant, useProduct } from '@/hooks/useProduct'
import Image from 'next/image'
type Props = {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   emitProduct: (product: Product) => void
}

const CreateProduct = ({ isOpen, setIsOpen, emitProduct }: Props) => {
   const { getBrands } = useBrands()
   const { getCatgories } = useCategory()
   const { createProduct, getProductsByVendorId } = useProduct()
   const [brands, setBrands] = useState<Brand[]>([])
   const [categories, setCategories] = useState<Category[]>([])
   const { vendor } = useAppSelector((state: RootState) => state.auth)
   const [currentProduct, setCurrentProduct] = useState(null)
   const [variants, setVariants] = useState<ProductVariant[]>([])
   const [images, setImages] = useState<string[]>([])

   const handleAddVariant = () => {
      setVariants([...variants, { sku: '', price: 0 }])
   }

   const handleVariantChange = (
      index: number,
      field: 'sku' | 'price',
      value: string
   ) => {
      const newVariants = [...variants]
      if (newVariants[index]) {
         newVariants[index] = { ...newVariants[index], [field]: value }
      }
      setVariants(newVariants)
   }

   const handleRemoveVariant = (index: number) => {
      const newVariants = variants.filter((_, i) => i !== index)
      setVariants(newVariants)
   }

   useEffect(() => {
      const fetchBrands = async () => {
         const brands = await getBrands()
         setBrands(brands as any)
      }
      fetchBrands()
   }, [])

   useEffect(() => {
      const fetchCategories = async () => {
         const categories = await getCatgories()
         setCategories(categories as any)
      }
      fetchCategories()
   }, [])

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const vendor_id = vendor?.id!
      const category_id = formData.get('category_id') as string
      const brand_id = formData.get('brand_id') as string
      const name = formData.get('name') as string
      const description = formData.get('description') as string
      const status = formData.get('status') as string
      const price = Number(formData.get('price') as string)
      const sku = formData.get('sku') as string

      const product: Product = {
         vendor_id,
         category_id,
         brand_id,
         name,
         description,
         status,
         price,
         sku
      }
      const createdProduct = await createProduct(product, variants, images)
      if (createdProduct) {
         setCurrentProduct(null)
         setVariants([])
         setIsOpen(false)
         emitProduct(createdProduct)
      }
   }

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
         const newImages = Array.from(files).map(file =>
            URL.createObjectURL(file)
         )
         setImages(newImages)
      }
   }

   const handleRemoveImage = (index: number) => {
      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
   }

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
               <DialogTitle>
                  {currentProduct ? 'Edit Product' : 'Add New Product'}
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="brand_id" className="text-right">
                     Brand
                  </Label>
                  <Select name="brand_id">
                     <SelectTrigger className="col-span-3" id="brand_id">
                        <SelectValue placeholder="Select brand" />
                     </SelectTrigger>
                     <SelectContent>
                        {brands.map(brand => (
                           <SelectItem
                              key={brand.brand_id}
                              value={brand.brand_id}
                           >
                              {brand.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category_id" className="text-right">
                     Category
                  </Label>
                  <Select name="category_id">
                     <SelectTrigger className="col-span-3" id="category_id">
                        <SelectValue placeholder="Select category" />
                     </SelectTrigger>
                     <SelectContent>
                        {categories.map(category => (
                           <SelectItem
                              key={category.category_id}
                              value={category.category_id}
                           >
                              {category.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input name="name" id="name" className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                     Description
                  </Label>
                  <Textarea
                     name="description"
                     id="description"
                     className="col-span-3"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                     Status
                  </Label>
                  <Select name="status">
                     <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                     Price
                  </Label>
                  <Input
                     name="price"
                     id="price"
                     type="number"
                     className="col-span-3"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sku" className="text-right">
                     SKU
                  </Label>
                  <Input name="sku" id="sku" className="col-span-3" />
               </div>

               <div className="col-span-4">
                  <h3 className="text-lg font-semibold mb-2">
                     Product Variants
                  </h3>
                  {variants.map((variant, index) => (
                     <div
                        key={index}
                        className="grid grid-cols-4 items-center gap-4 mb-2"
                     >
                        <Input
                           placeholder="SKU"
                           value={variant.sku}
                           onChange={e =>
                              handleVariantChange(index, 'sku', e.target.value)
                           }
                           className="col-span-2"
                        />
                        <Input
                           placeholder="Price"
                           type="number"
                           value={variant.price}
                           onChange={e =>
                              handleVariantChange(
                                 index,
                                 'price',
                                 e.target.value
                              )
                           }
                        />
                        <Button
                           type="button"
                           variant="outline"
                           size="sm"
                           onClick={() => handleRemoveVariant(index)}
                        >
                           Remove
                        </Button>
                     </div>
                  ))}
                  <Button
                     type="button"
                     onClick={handleAddVariant}
                     className="mt-2"
                  >
                     Add Variant
                  </Button>
               </div>
               <div>
                  <h3>Add Images</h3>
                  <Input
                     onChange={handleImageChange}
                     multiple
                     name="image"
                     type="file"
                     id="image"
                  />
               </div>
               <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                     <div className="relative" key={index}>
                        <div
                           onClick={() => handleRemoveImage(index)}
                           className="absolute cursor-pointer p-1 -top-2 -right-2 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center"
                        >
                           <Trash2 className="size-4" />
                        </div>
                        <Image
                           key={index}
                           src={image}
                           width={100}
                           height={100}
                           alt=""
                           className="w-20 h-28 object-cover"
                        />
                     </div>
                  ))}
               </div>
               <div className="flex justify-end gap-4">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => setIsOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit">Save Product</Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default CreateProduct
