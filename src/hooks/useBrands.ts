import { createClient } from '@/utils/supabase/client'

export const useBrands = () => {
   const supabase = createClient()

   const getBrands = async () => {
      try {
         const { data, error } = await supabase
            .from('brands')
            .select('*')
            .throwOnError()
         if (error) {
            console.error('Error getting brands', error)
         }
         return data
      } catch (error) {
         console.error('Error getting brands', error)
      }
   }

   return { getBrands }
}
