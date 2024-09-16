import { Address } from '@/types/address'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export const useAddress = () => {
   const supabase = createClient()
   const createAddress = async (address: Address) => {
      try {
         const { data, error } = await supabase
            .from('addresses')
            .insert(address)
            .select('*')
         if (error) {
            throw new Error(error.message)
         }
         return data[0] as Address
      } catch (error) {
         toast.error('Create address failed.')
         console.log(error)
         return null
      }
   }

   const getAddressesByUserId = async (userId: string) => {
      try {
         const { data, error } = await supabase
            .from('addresses')
            .select('*')
            .eq('user_id', userId)
         if (error) {
            throw new Error(error.message)
         }
         return data
      } catch (error) {
         console.log(error)
         return []
      }
   }

   return { createAddress, getAddressesByUserId }
}
