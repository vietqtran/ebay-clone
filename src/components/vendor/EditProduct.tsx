'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import { PlusCircle, Trash2 } from 'lucide-react'
import { Product, ProductVariant, useProduct } from '@/hooks/useProduct'
import { useBrands } from '@/hooks/useBrands'
import { useCategory } from '@/hooks/useCategory'
import { Brand, Category } from '@/types'
import { useAppSelector } from '@/hooks/useRedux'

interface EditProductFormProps {
   setEditId: (id: string) => void
   editId: string
   emitProduct: (product: Product) => void
}

export default function EditProductForm({
   editId,
   setEditId,
   emitProduct
}: EditProductFormProps) {
   const { getBrands } = useBrands()
   const { getCatgories } = useCategory()
   const { getProductById, getVariantsByProductId, updateProduct } =
      useProduct()
   const [product, setProduct] = useState<Product | null>(null)
   const [variants, setVariants] = useState<ProductVariant[]>([])
   const [brands, setBrands] = useState<Brand[]>([])
   const [categories, setCategories] = useState<Category[]>([])
   const [brand, setBrand] = useState<string | null>(null)
   const [category, setCategory] = useState<string | null>(null)
   const [status, setStatus] = useState<string | null>(null)

   useEffect(() => {
      const fetchProduct = async () => {
         const productData = await getProductById(editId)
         if (productData) {
            const variantsData = await getVariantsByProductId(
               productData.product_id!
            )
            setProduct(productData as Product)
            setVariants(variantsData as ProductVariant[])
            setBrand(productData.brand_id)
            setCategory(productData.category_id)
            setStatus(productData.status)
         }
      }
      fetchProduct()
   }, [editId])

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

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const productData = {
         product_id: editId,
         brand_id: formData.get('brand_id') as string,
         category_id: formData.get('category_id') as string,
         name: formData.get('name') as string,
         description: formData.get('description') as string,
         status: formData.get('status') as string,
         price: Number(formData.get('price') as string),
         sku: formData.get('sku') as string
      }
      const newProd = await updateProduct(productData)
      if (newProd) {
         emitProduct(newProd)
      }
      setEditId('')
   }

   return (
      <div
         onClick={() => setEditId('')}
         className="fixed inset-0 z-50 overflow-y-auto grid place-items-center bg-black/50"
      >
         <Card
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl mx-auto"
         >
            <CardHeader>
               <CardTitle>{'Edit Product'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="brand_id" className="text-right">
                        Brand
                     </Label>
                     <Select
                        value={brand ?? ''}
                        onValueChange={value => setBrand(value)}
                        name="brand_id"
                     >
                        <SelectTrigger className="col-span-3" id="brand_id">
                           <SelectValue />
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
                     <Select
                        value={category ?? ''}
                        onValueChange={value => setCategory(value)}
                        name="category_id"
                     >
                        <SelectTrigger className="col-span-3" id="category_id">
                           <SelectValue defaultValue={product?.category_id} />
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
                  <div className="space-y-2">
                     <Label htmlFor="name">Product Name</Label>
                     <Input
                        defaultValue={product?.name}
                        id="name"
                        name="name"
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={product?.description}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                           name="status"
                           value={status ?? ''}
                           onValueChange={value => setStatus(value)}
                        >
                           <SelectTrigger>
                              <SelectValue
                                 defaultValue={product?.status}
                                 placeholder="Select status"
                              />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                           defaultValue={product?.price}
                           id="price"
                           name="price"
                           type="number"
                           step="0.01"
                           required
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="sku">SKU</Label>
                     <Input defaultValue={product?.sku} id="sku" name="sku" />
                  </div>
               </CardContent>
               <CardFooter className="flex justify-between">
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => setEditId('')}
                  >
                     Cancel
                  </Button>
                  <Button type="submit">Save Product</Button>
               </CardFooter>
            </form>
         </Card>
      </div>
   )
}
