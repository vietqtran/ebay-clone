import { createClient } from '@/utils/supabase/client'

export const useCategory = () => {
   const supabase = createClient()

   const getCatgories = async () => {
      try {
         const { data, error } = await supabase
            .from('categories')
            .select('*')
            .throwOnError()
         if (error) {
            console.error('Error getting categories', error)
         }
         return data
      } catch (error) {
         console.error('Error getting categories', error)
      }
   }

   return { getCatgories }
}
