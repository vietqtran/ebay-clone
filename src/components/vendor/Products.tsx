'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { useAppSelector } from '@/hooks/useRedux'
import { RootState } from '@/stores'
import { useBrands } from '@/hooks/useBrands'
import { Brand, Category } from '@/types'
import { useCategory } from '@/hooks/useCategory'
import { Product, useProduct } from '@/hooks/useProduct'
import CreateProduct from './CreateProduct'
import EditProductForm from './EditProduct'

export default function ProductsManagement() {
   const { getProductsByVendorId, deleteProduct } = useProduct()
   const { getBrands } = useBrands()
   const { getCatgories } = useCategory()
   const { vendor } = useAppSelector((state: RootState) => state.auth)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [products, setProducts] = useState<Product[]>([])
   const [editId, setEditId] = useState('')
   const [brands, setBrands] = useState<Brand[]>([])
   const [categories, setCategories] = useState<Category[]>([])

   useEffect(() => {
      const fetchCategories = async () => {
         const categories = await getCatgories()
         setCategories(categories as any)
      }
      fetchCategories()
   }, [])

   useEffect(() => {
      const fetchBrands = async () => {
         const brands = await getBrands()
         setBrands(brands as any)
      }
      fetchBrands()
   }, [])

   const handleOpenModal = () => {
      setIsModalOpen(true)
   }

   const handleOpenEdit = (product_id: string) => {
      setEditId(product_id)
   }

   useEffect(() => {
      const fetchProducts = async () => {
         const products = await getProductsByVendorId(vendor?.id!)
         setProducts(products as Product[])
      }
      fetchProducts()
   }, [])

   const handleDelete = async (product_id: string) => {
      const deletedProductId = await deleteProduct(product_id)
      if (deletedProductId) {
         setProducts(prev =>
            prev.filter(p => p.product_id !== deletedProductId)
         )
      }
   }

   return (
      <div className="container mx-auto py-10">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products Management</h1>
            <Button onClick={() => handleOpenModal()}>
               <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
         </div>

         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {products.map(product => (
                  <TableRow key={product.product_id}>
                     <TableCell>{product.name}</TableCell>
                     <TableCell>
                        {
                           brands.find(
                              brand => brand.brand_id === product.brand_id
                           )?.name
                        }
                     </TableCell>
                     <TableCell>
                        {
                           categories.find(
                              category =>
                                 category.category_id === product.category_id
                           )?.name
                        }
                     </TableCell>
                     <TableCell>
                        <span
                           className={`${product.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full text-white px-2 py-1 text-sm`}
                        >
                           {product.status}
                        </span>
                     </TableCell>
                     <TableCell>${product.price.toFixed(2)}</TableCell>
                     <TableCell>{product.sku}</TableCell>
                     <TableCell>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleOpenEdit(product.product_id!)}
                        >
                           <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                           onClick={() => handleDelete(product.product_id!)}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <CreateProduct
            emitProduct={product => setProducts(prev => [...prev, product])}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
         />
         {editId && (
            <EditProductForm
               emitProduct={product =>
                  setProducts(prev =>
                     prev.map(p =>
                        p.product_id === product.product_id ? product : p
                     )
                  )
               }
               editId={editId}
               setEditId={setEditId}
            />
         )}
      </div>
   )
}
