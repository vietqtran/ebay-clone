import { ShippingCountry } from '@/types/country'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export const useCountry = () => {
   const supabase = createClient()
   const fetchCountryData = async (countryCode: string) => {
      const response = await fetch(
         `https://restcountries.com/v3.1/alpha/${countryCode}`
      )
      const data = await response.json()
      return {
         lat: data[0].latlng[0],
         lng: data[0].latlng[1]
      }
   }

   const getAllCountries = async () => {
      try {
         const { data, error } = await supabase.from('countries').select('*')
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data as ShippingCountry[]
      } catch (error) {
         console.log(error)
         return []
      }
   }

   const getCountryByCode = async (code: string) => {
      try {
         const { data, error } = await supabase
            .from('countries')
            .select('*')
            .eq('code', code)
            .single()
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data as ShippingCountry
      } catch (error) {
         console.log(error)
         return null
      }
   }

   return { fetchCountryData, getAllCountries, getCountryByCode }
}
