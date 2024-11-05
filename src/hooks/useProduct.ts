'use client'

import { createClient } from '@/utils/supabase/client'
import { useUpload } from './useUpload'
import { useEffect, useState } from 'react'

export interface Product {
   product_id?: string
   vendor_id?: string
   category_id: string
   brand_id: string
   name: string
   status: string
   description: string
   price: number
   sku: string
}

export interface ProductView {
   product_id?: string
   vendor_id?: string
   category_id: string
   brand_id: string
   name: string
   status: string
   description: string
   price: number
   sku: string
   product_images: { image_url: string }[]
}

export interface ProductVariant {
   variant_id?: string
   product_id?: string
   sku: string
   price: number
}

export const useProduct = () => {
   const { uploadMultipleFiles } = useUpload()
   const supabase = createClient()
   const [products, setProducts] = useState<ProductView[]>([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchProducts = async () => {
         const products = await getProductViews()
         setProducts(products)
      }
      fetchProducts()
   }, [])

   const getProductViews = async () => {
      try {
         const { data, error } = await supabase
            .from('products')
            .select('*, product_images(image_url)')
         if (error) {
            console.error('Error getting product views', error)
            return []
         }
         return data as ProductView[]
      } catch (error) {
         console.error('Error getting product views', error)
         return []
      }
   }

   const getAllProducts = async () => {
      try {
         const { data, error } = await supabase.from('products').select('*')
         if (error) {
            console.error('Error getting products', error)
            return []
         }
         return data as Product[]
      } catch (error) {
         console.error('Error getting products', error)
         return []
      }
   }

   const createProduct = async (
      product: Product,
      variants: ProductVariant[],
      images: string[]
   ) => {
      try {
         const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select('*')
         if (error) {
            console.error('Error creating product', error)
            return null
         }

         const variantRows = [
            ...variants,
            {
               product_id: data[0].product_id,
               sku: product.sku,
               price: product.price
            }
         ]
            .filter(variant => variant.sku && variant.price > 0)
            .map(variant => ({
               ...variant,
               product_id: data[0].product_id
            }))

         await supabase.from('product_variants').insert(variantRows)

         const uploadResults = await uploadMultipleFiles(
            'images',
            images,
            '/public/products'
         )

         await supabase.from('product_images').insert(
            uploadResults.map(result => ({
               product_id: data[0].product_id,
               image_url: result.data?.fullPath
            }))
         )

         return data?.[0] as Product | null
      } catch (error) {
         console.error('Error creating product', error)
         return null
      }
   }

   const getProductsByVendorId = async (vendor_id: string) => {
      try {
         const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('vendor_id', vendor_id)
            .throwOnError()
         if (error) {
            console.error('Error getting products by vendor id', error)
            return []
         }
         return data as Product[]
      } catch (error) {
         console.error('Error getting products by vendor id', error)
         return []
      }
   }

   const updateProduct = async (product: Product) => {
      try {
         const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('product_id', product.product_id)
            .select('*')
         if (error) {
            console.error('Error updating product', error)
            return null
         }

         return data?.[0] as Product | null
      } catch (error) {
         console.error('Error updating product', error)
         return null
      }
   }

   const getProductById = async (product_id: string) => {
      try {
         const { data, error } = await supabase
            .from('products')
            .select(
               '*, product_images(image_url), reviews(*), vendors(*), categories(*), brands(*)'
            )
            .eq('product_id', product_id)
            .throwOnError()
         if (error) {
            console.error('Error getting product by id', error)
            return null
         }
         return data[0] as Product
      } catch (error) {
         console.error('Error getting product by id', error)
         return null
      }
   }

   const getVariantsByProductId = async (product_id: string) => {
      try {
         const { data, error } = await supabase
            .from('product_variants')
            .select('*')
            .eq('product_id', product_id)
            .throwOnError()
         if (error) {
            console.error('Error getting variants by product id', error)
            return []
         }
         return data as ProductVariant[]
      } catch (error) {
         console.error('Error getting variants by product id', error)
         return []
      }
   }

   const deleteImages = async (product_id: string) => {
      try {
         const { data, error } = await supabase
            .from('product_images')
            .delete()
            .eq('product_id', product_id)
         if (error) {
            console.error('Error deleting product images', error)
            return null
         }
         return data
      } catch (error) {
         console.error('Error deleting product images', error)
         return null
      }
   }

   const deleteVariants = async (product_id: string) => {
      try {
         const { data, error } = await supabase
            .from('product_variants')
            .delete()
            .eq('product_id', product_id)
         if (error) {
            console.error('Error deleting product variants', error)
            return null
         }
         return data
      } catch (error) {
         console.error('Error deleting product variants', error)
         return null
      }
   }

   const deleteProduct = async (product_id: string) => {
      try {
         Promise.all([deleteImages(product_id), deleteVariants(product_id)])
         const { data, error } = await supabase
            .from('products')
            .delete()
            .eq('product_id', product_id)
            .select('product_id')
         if (error) {
            console.error('Error deleting product', error)
            return null
         }
         return data[0].product_id
      } catch (error) {
         console.error('Error deleting product', error)
         return null
      }
   }

   return {
      products,
      createProduct,
      getProductsByVendorId,
      updateProduct,
      getProductById,
      getVariantsByProductId,
      deleteProduct,
      loading,
      error
   }
}
